import fs from "fs";
import path from "path";

const src = path.resolve("node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const dest = path.resolve("public/pdf.worker.min.mjs");

fs.copyFileSync(src, dest);
