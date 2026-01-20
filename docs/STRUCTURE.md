# Repository Structure

This repo follows a Turborepo-style monorepo layout. The structure below is the
baseline; add or remove apps/packages as the project evolves.

```
.
├─ apps/
│  ├─ desktop/            # Existing desktop client
│  ├─ web/                # Existing web client
│  ├─ api/                # HTTP API / BFF service
│  └─ worker/             # Background jobs, queues, schedulers
├─ packages/
│  ├─ ui/                 # Shared UI components
│  ├─ shared/             # Domain logic shared across apps
│  ├─ types/              # Shared TypeScript types/contracts
│  ├─ utils/              # Cross-cutting utilities
│  ├─ eslint-config/      # Shared ESLint config
│  ├─ tsconfig/           # Shared TSConfig presets
│  └─ tailwind-config/    # Shared Tailwind presets (if used)
├─ docs/                  # Project documentation
├─ scripts/               # One-off scripts and tooling
└─ infra/                 # Deployment, Docker, IaC, CI helpers
```

Guidelines
- Keep apps as runnable products; keep packages as reusable libraries.
- Keep config packages versioned and shared to avoid drift.
- Prefer co-locating app-specific assets/configs inside each app.
- Add new top-level folders only when they serve multiple apps.
