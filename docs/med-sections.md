# MED Sections

Source of truth for opportunity display and admin form structure.

## Dashboard Card (`OpportunityCard`)

| Field | DB Column |
|-------|-----------|
| Title | `title` |
| Score | `overall_score` |
| Best First Asset | `best_first_asset` |
| Short Summary | `short_summary` |
| Tags | `tags` |

## Detail Page Sections

Render in this order, each inside a `Card`:

### 1. OpportunitySnapshot
- `title`, `overall_score`, `best_first_asset`, `complexity`, `tags`

### 2. WhyThisExists
- `problem_summary`, `evidence_summary`, `key_pain_drivers`

### 3. SignalBreakdown
- `pressure_score`, `demand_score`, `wedge_score`, `buildability_score`, `asset_fit_score`

### 4. BuildStrategy
- `best_first_asset`, `asset_path_1`, `asset_path_2`, `asset_path_3`, `asset_reason`, `expansion_ladder`

### 5. ExecutionAngle
- `target_buyer`, `core_workflow`, `initial_wedge`, `time_to_value`

### 6. CompetitiveAngle
- `underserved_segment`, `competitor_summary`, `avoid`, `differentiation`, `entry_strategy`

### 7. WhyThisMatters
- `strategic_importance`

## Admin Form Sections

Mirror the above. Grouped as:

1. **Basic** — title, score, best_first_asset, complexity, tags, status, short_summary
2. **Why This Exists** — problem, evidence, key pain drivers
3. **Scores** — all five signal scores
4. **Build Strategy** — asset paths, reason, expansion ladder
5. **Execution** — buyer, workflow, wedge, time to value
6. **Competition** — segment, differentiation, competitors, avoid, entry strategy, strategic importance