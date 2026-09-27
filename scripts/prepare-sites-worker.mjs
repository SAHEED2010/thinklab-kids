import {
  cpSync,
  mkdirSync,
  rmSync,
  copyFileSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const openNextRoot = path.join(projectRoot, ".open-next");
const distRoot = path.join(projectRoot, "dist");

function patchNextCloudflareRuntime(filePath) {
  const source = readFileSync(filePath, "utf8");
  const start = source.indexOf("var require_console_file=__commonJS({");
  const endMarker = "});var require_work_unit_async_storage_instance=";
  const end = start === -1 ? -1 : source.indexOf(endMarker, start);

  if (start === -1 || end === -1) return false;

  const replacement = 'var require_console_file=__commonJS({"console-file"(exports){}});';
  writeFileSync(filePath, `${source.slice(0, start)}${replacement}${source.slice(end + 3)}`);
  return true;
}

rmSync(distRoot, { force: true, recursive: true });
mkdirSync(path.join(distRoot, "server"), { recursive: true });
copyFileSync(path.join(openNextRoot, "worker.js"), path.join(distRoot, "server", "index.js"));
for (const entry of readdirSync(openNextRoot)) {
  if (entry === "assets" || entry === "worker.js") continue;
  cpSync(path.join(openNextRoot, entry), path.join(distRoot, "server", entry), { recursive: true });
}
cpSync(path.join(openNextRoot, "assets"), path.join(distRoot, "assets"), { recursive: true });

const handlerPath = path.join(
  distRoot,
  "server",
  "server-functions",
  "default",
  "handler.mjs",
);
if (patchNextCloudflareRuntime(handlerPath)) {
  console.log("Applied Next 16 Cloudflare runtime compatibility patch");
}

console.log("Prepared Sites Worker artifact in dist/server and dist/assets");
