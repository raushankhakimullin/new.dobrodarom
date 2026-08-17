// Orval v8 emits zod v4 API calls (z.email(), z.int()) but imports from "zod",
// which resolves to the v3-classic entry in zod 3.25.x. Rewrite generated
// imports to the "zod/v4" subpath so types and runtime match.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "api-zod",
  "src",
  "generated",
);

for (const file of readdirSync(dir)) {
  if (!file.endsWith(".ts")) continue;
  const p = path.join(dir, file);
  const src = readFileSync(p, "utf8");
  const out = src.replace(/from ['"]zod['"]/g, "from 'zod/v4'");
  if (out !== src) writeFileSync(p, out);
}
console.log("zod imports rewritten to zod/v4");
