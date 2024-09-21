import { build } from "esbuild"
import { copy } from "esbuild-plugin-copy"
import { resolve } from "path"

build({
    entryPoints: ["./src/index.ts"], // Your entry file
    bundle: true,
    platform: "node",
    outfile: "./build/index.js",
    plugins: [
        copy({
            resolveFrom: "node_modules",
            src: resolve(
                "node_modules/.prisma/client/query_engine-windows.dll.node"
            ),
            dest: resolve("build/.prisma/client/"), // Copy Prisma query engine to the build folder
        }),
    ],
}).catch(() => process.exit(1))
