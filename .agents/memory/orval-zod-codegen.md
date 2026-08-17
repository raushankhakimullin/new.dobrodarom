---
name: Orval zod codegen quirk
description: Orval v8 emits zod v4 API but imports "zod" (v3 classic) — codegen rewrites imports to zod/v4
---

# Orval zod codegen

Orval v8 generates zod v4 calls (`z.email()`, `z.int()`) but imports from `"zod"`, which resolves to the v3-classic entry in zod 3.25.x, breaking typecheck.

**Why:** workspace pins zod 3.25.x where v4 lives at the `zod/v4` subpath.

**How to apply:** `lib/api-spec/fix-zod-imports.mjs` rewrites generated imports to `zod/v4`; it runs inside the `codegen` script. Keep that step when touching the codegen pipeline — never hand-edit files in `lib/api-zod/src/generated`.
