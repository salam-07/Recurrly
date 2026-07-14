# PostHog post-wizard report

The wizard completed an Expo-focused PostHog integration for this React Native app by installing the mobile SDK and required Expo peer dependencies, wiring Expo config through environment variables, initializing a shared PostHog client, wrapping the root layout in `PostHogProvider`, enabling touch autocapture with manual Expo Router screen tracking, and instrumenting key authentication and subscription-management actions with custom analytics plus exception capture around auth flows.

| Event name | Description | File |
| --- | --- | --- |
| `sign_in_submitted` | Captures successful email sign-in attempts from the authentication flow. | `app/(auth)/sign-in.tsx` |
| `sign_up_submitted` | Captures successful account creation attempts before email verification completes. | `app/(auth)/sign-up.tsx` |
| `email_verification_completed` | Captures when a new account completes email verification and finishes signup. | `app/(auth)/sign-up.tsx` |
| `subscription_expanded` | Captures when a subscription card is expanded from the home screen. | `app/(tabs)/index.tsx` |
| `subscription_details_viewed` | Captures when a subscription detail screen is opened for a specific subscription. | `app/subscriptions/[id].tsx` |
| `sign_out_completed` | Captures when an authenticated user signs out from settings. | `app/(tabs)/settings.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/511325/dashboard/1844457)
- [Sign-ins over time (wizard)](https://us.posthog.com/project/511325/insights/55Fc0QiM)
- [Sign-ups over time (wizard)](https://us.posthog.com/project/511325/insights/0G3Q3oAw)
- [Subscription interactions (wizard)](https://us.posthog.com/project/511325/insights/R0A9c5Qn)
- [Signup to verification funnel (wizard)](https://us.posthog.com/project/511325/insights/ljNsO88K)
- [Sign-outs (wizard)](https://us.posthog.com/project/511325/insights/6liJQJAE)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names you added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Confirm the returning-visitor path also calls `identify` — a handler that only identifies on fresh login can leave returning sessions on anonymous distinct IDs.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
