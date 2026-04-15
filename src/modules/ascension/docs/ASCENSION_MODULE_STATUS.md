# Citadel Ascension Module Status

Status: Verified prototype, pre-integration
Version: v2.4 + gap fixes
Transport: Discord
Current Discord Surface: Test server
Database: MongoDB
Scope: Phase 1 only

## Current player commands
- /start
- /claim
- /mission
- /build
- /status

## Current admin commands
- /admin_player_view
- /admin_inventory_view
- /admin_add_xp
- /admin_remove_xp
- /admin_set_xp
- /admin_grant_resource
- /admin_remove_resource
- /admin_set_resource
- /admin_reset_player
- /admin_delete_player
- /admin_reset_all
- /admin_recalc_player
- /admin_lock_player
- /admin_unlock_player
- /admin_restore_player
- /admin_award_all
- /admin_award_top
- /admin_prize_pool_view
- /admin_prize_pool_add
- /admin_prize_pool_award
- /admin_prize_pool_remove

## Locked future scope
These are intentionally not part of the current module:
- /scan
- /explore
- /focus
- /challenge

## Integration rule
- Preserve behavior before refactor
- Migrate into backend module first
- Keep Discord as the current live gameplay surface
- Use the website to explain and route, not to replace gameplay authority yet
- Build web app gameplay views only after module migration is verified