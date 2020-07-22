import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    output: {
        dir: "dist",
        format: "cjs"
    },
    plugins: [
        typescript({
            tsconfig: "./tsconfig.json",
            module: "ES2015",
            sourceMap: false,
            outDir: "./dist"
        })
    ]
};
