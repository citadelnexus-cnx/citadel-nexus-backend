// backend/src/services/payoutService.ts
import {
  getPayoutReadyUser,
  reserveCnx,
  releaseReservedCnx,
  finalizeReservedCnx,
} from "./userService";

export type PayoutStatus =
  | "QUEUED"
  | "APPROVED"
  | "REJECTED"
  | "SENT"
  | "CONFIRMED"
  | "FAILED";

export type PayoutRecord = {
  payoutId: string;
  userId: string;
  wallet: string;
  amount: number;
  status: PayoutStatus;
  createdAt: string;

  approvedBy?: string;
  approvedAt?: string;

  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;

  txId?: string;
  sentAt?: string;

  confirmedAt?: string;

  failedAt?: string;
  failureReason?: string;
};

const payoutLog: PayoutRecord[] = [];

const MIN_PAYOUT_THRESHOLD = 25;

function getPayoutOrNull(payoutId: string): PayoutRecord | null {
  return payoutLog.find((p) => p.payoutId === payoutId) || null;
}

export async function queuePayout(userId: string): Promise<PayoutRecord | null> {
  const user = await getPayoutReadyUser(userId);
  if (!user) return null;
  if (!user.wallet) return null;

  const amount = user.cnxBalance - user.reservedCnx;

  if (amount < MIN_PAYOUT_THRESHOLD) {
    return null;
  }

  const reserved = await reserveCnx(user.id, amount);
  if (!reserved) {
    return null;
  }

  const payout: PayoutRecord = {
    payoutId: Date.now().toString(),
    userId: user.id,
    wallet: user.wallet,
    amount,
    status: "QUEUED",
    createdAt: new Date().toISOString(),
  };

  payoutLog.push(payout);
  return payout;
}

export async function approvePayout(
  payoutId: string,
  adminId: string
): Promise<PayoutRecord | { error: string } | null> {
  const payout = getPayoutOrNull(payoutId);
  if (!payout) return null;

  if (payout.status !== "QUEUED") {
    return { error: "Only QUEUED payouts can be approved" };
  }

  payout.status = "APPROVED";
  payout.approvedBy = adminId;
  payout.approvedAt = new Date().toISOString();

  return payout;
}

export async function rejectPayout(
  payoutId: string,
  reason: string,
  adminId?: string
): Promise<PayoutRecord | { error: string } | null> {
  const payout = getPayoutOrNull(payoutId);
  if (!payout) return null;

  if (payout.status !== "APPROVED") {
    return { error: "Only APPROVED payouts can be rejected" };
  }

  const released = await releaseReservedCnx(payout.userId, payout.amount);
  if (!released) {
    return { error: "Failed to release reserved CNX for rejected payout" };
  }

  payout.status = "REJECTED";
  payout.rejectionReason = reason;
  payout.rejectedBy = adminId;
  payout.rejectedAt = new Date().toISOString();

  return payout;
}

export async function markPayoutSent(
  payoutId: string,
  txId: string
): Promise<PayoutRecord | { error: string } | null> {
  const payout = getPayoutOrNull(payoutId);
  if (!payout) return null;

  if (payout.status !== "APPROVED") {
    return { error: "Only APPROVED payouts can be marked as SENT" };
  }

  payout.status = "SENT";
  payout.txId = txId;
  payout.sentAt = new Date().toISOString();

  return payout;
}

export async function confirmPayout(
  payoutId: string
): Promise<PayoutRecord | { error: string } | null> {
  const payout = getPayoutOrNull(payoutId);
  if (!payout) return null;

  if (payout.status !== "SENT") {
    return { error: "Only SENT payouts can be confirmed" };
  }

  const finalized = await finalizeReservedCnx(payout.userId, payout.amount);
  if (!finalized) {
    return { error: "Failed to finalize reserved CNX for confirmed payout" };
  }

  payout.status = "CONFIRMED";
  payout.confirmedAt = new Date().toISOString();

  return payout;
}

export async function failPayout(
  payoutId: string,
  reason: string
): Promise<PayoutRecord | { error: string } | null> {
  const payout = getPayoutOrNull(payoutId);
  if (!payout) return null;

  if (payout.status !== "SENT") {
    return { error: "Only SENT payouts can be failed" };
  }

  const released = await releaseReservedCnx(payout.userId, payout.amount);
  if (!released) {
    return { error: "Failed to release reserved CNX for failed payout" };
  }

  payout.status = "FAILED";
  payout.failureReason = reason;
  payout.failedAt = new Date().toISOString();

  return payout;
}

export async function getPayoutLog(): Promise<PayoutRecord[]> {
  return payoutLog;
}

export async function getPayoutById(
  payoutId: string
): Promise<PayoutRecord | null> {
  return getPayoutOrNull(payoutId);
}