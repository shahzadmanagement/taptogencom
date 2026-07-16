# Production Experimentation Rollout Report

This report outlines the active A/B experiments launched, their success metrics, rollout phases, and rollback strategies.

---

## 1. Implemented Experiments & KPIs

| Experiment ID | Experiment Name | Variants | Primary Success Metric (KPI) | Target Improvement |
| --- | --- | --- | --- | --- |
| `hero_layout_experiment` | Hero Section Copy | A: Control<br/>B: Benefit-first<br/>C: Outcome & Trust | `hero_cta_click` / `generate_click` conversion rates | +10% CTA click rate |
| `output_cards_experiment` | Output Card Actions | A: Control<br/>B: Large Copy Button<br/>C: Copy + Favorite Always Visible | `copy_clicked` & `fav_clicked` rates | +15% copy rate |
| `related_tools_experiment` | Related Sections Placement | A: Bottom of page<br/>B: Below workspace<br/>C: Sticky Sidebar on Desktop | Related tools link CTR | +8% click-through rate |
| `examples_experiment` | Onboarding Examples | A: Collapsed<br/>B: Expanded<br/>C: Interactive one-click fill | Example selection and generation rates | +12% generation rate |
| `cta_buttons_experiment` | CTA Button Wording | control: Generate<br/>create: Create<br/>generate_now: Generate Now<br/>create_instantly: Create Instantly | Primary generate button CTR | +5% generate rate |

---

## 2. Success Metrics & Conversion Tracking

All conversion signals are captured client-side and relayed through the consolidated `experiment_conversion` analytics schema:
- **Exposure Metric**: Emits `experiment_exposure` containing `experiment_id`, `variant_id`, `tool_slug`, and `timestamp`.
- **Conversion Metric**: Emits `experiment_conversion` with the specific action name (e.g. `cta_click`, `copy_clicked`, `fav_clicked`).
- **Completion Metric**: Emits `experiment_complete` upon successful task completion.

---

## 3. Rollout Strategy

1. **Phase 1: Local QA & Integration Checks (100% Traffic, Local Overrides)**
   - Validate variant display and button overrides via URLs.
   - Verify unit and integration automation runs.
2. **Phase 2: Pilot Rollout (10% Traffic on Selected Hubs)**
   - Monitor error logs and bounce metrics to identify any browser rendering glitches.
3. **Phase 3: Production Rollout (100% Traffic across Registry)**
   - Gather data over a 14-day cycle to achieve statistical significance.

---

## 4. Rollback & Kill Switch Strategy

If a critical layout issue or performance degradation is discovered in production:
1. **Remote Kill Switch**: Update the experiment's status to `'paused'` or `'archived'` in `src/lib/ab-testing.ts`.
   - Paused/archived tests immediately fall back to the `'control'` variant for all users, safely bypassing new code paths.
2. **Client-Side Bypass**: In case of emergency, the entire framework can be turned off globally by calling `localStorage.setItem('taptogen-ab-disabled', 'true')`.
