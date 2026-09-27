import { cpSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const openNextRoot = path.join(projectRoot, ".open-next");
const distRoot = path.join(projectRoot, "dist");

rmSync(distRoot, { force: true, recursive: true });
mkdirSync(path.join(distRoot, "server"), { recursive: true });
copyFileSync(path.join(openNextRoot, "worker.js"), path.join(distRoot, "server", "index.js"));
cpSync(path.join(openNextRoot, "assets"), path.join(distRoot, "assets"), { recursive: true });

console.log("Prepared Sites Worker artifact in dist/server and dist/assets");
