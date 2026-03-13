import * as esbuild from "esbuild";
import * as path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

execSync("vite build", { stdio: "inherit" });

await esbuild.build({
  bundle: true,
  entryPoints: [path.resolve(__dirname, "../server/index.ts")],
  platform: "node",
  format: "cjs",
  packages: "external",
  outfile: path.resolve(__dirname, "../dist/index.cjs"),
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`,
  },
});
