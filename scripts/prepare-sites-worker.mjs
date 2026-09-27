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

function patchBundledModule(source, startMarker, endMarker, replacement) {
  const start = source.indexOf(startMarker);
  const end = start === -1 ? -1 : source.indexOf(endMarker, start);

  if (start === -1 || end === -1) return source;

  return `${source.slice(0, start)}${replacement}${source.slice(end + 3)}`;
}

function patchNextCloudflareRuntime(filePath) {
  const source = readFileSync(filePath, "utf8");
  const runtimeSource = `var __thinklab_fs={existsSync:()=>false,readFileSync:()=>"",writeFileSync:()=>{},appendFileSync:()=>{},mkdirSync:()=>{},readdirSync:()=>[],statSync:()=>({isFile:()=>false,isDirectory:()=>false}),promises:{readFile:async()=>new Uint8Array(),writeFile:async()=>{},mkdir:async()=>{}}};var __thinklab_os={platform:()=>"linux",tmpdir:()=>"/tmp",homedir:()=>"/",cpus:()=>[],arch:()=>"x64",release:()=>""};var __thinklab_original_require=globalThis.require;globalThis.require=(specifier)=>{if(specifier==="fs")return __thinklab_fs;if(specifier==="path")return path;if(specifier==="os")return __thinklab_os;if(typeof node_module_star!=="undefined"&&typeof node_module_star.createRequire==="function")return node_module_star.createRequire(import.meta.url)(specifier);if(__thinklab_original_require)return __thinklab_original_require(specifier);return {};};${source.replaceAll('require("fs")', "__thinklab_fs").replaceAll('require("path")', "path").replaceAll('require("os")', "__thinklab_os")}`;
  const withoutConsoleFile = patchBundledModule(
    runtimeSource,
    "var require_console_file=__commonJS({",
    "});var require_work_unit_async_storage_instance=",
    'var require_console_file=__commonJS({"console-file"(exports){}});',
  );
  const patchedSource = patchBundledModule(
    withoutConsoleFile,
    "var require_console_dim_external=__commonJS({",
    "});var require_unhandled_rejection_external=",
    'var require_console_dim_external=__commonJS({"console-dim.external"(exports){exports.setAbortedLogsStyle=()=>{}}});',
  );
  const withoutNodeCrypto = patchBundledModule(
    patchedSource,
    "var require_node_crypto=__commonJS({",
    "});var require_fast_set_immediate_external=",
    'var require_node_crypto=__commonJS({"node-crypto"(exports){}});',
  );
  const withoutFastImmediate = patchBundledModule(
    withoutNodeCrypto,
    "var require_fast_set_immediate_external=__commonJS({",
    "});var require_node_environment=",
    'var require_fast_set_immediate_external=__commonJS({"fast-set-immediate.external"(exports){}});',
  );
  const nextServerStart = withoutFastImmediate.indexOf("var require_next_server=__commonJS({");
  const nextServerEnd =
    nextServerStart === -1
      ? -1
      : withoutFastImmediate.indexOf("});var import_next_server=", nextServerStart);
  const nextServerSource =
    nextServerStart === -1 || nextServerEnd === -1
      ? withoutFastImmediate
      : withoutFastImmediate.slice(nextServerStart, nextServerEnd);
  const patchedNextServerSource = nextServerSource.replace(
    'require("fs")),_path=require("path"),',
    '{default:{existsSync:()=>false,readFileSync:()=>""}}),_path=path,',
  );
  const finalSource =
    patchedNextServerSource === nextServerSource || nextServerStart === -1 || nextServerEnd === -1
      ? withoutFastImmediate
      : `${withoutFastImmediate.slice(0, nextServerStart)}${patchedNextServerSource}${withoutFastImmediate.slice(nextServerEnd)}`;

  if (finalSource === source) return false;

  writeFileSync(filePath, finalSource);
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
