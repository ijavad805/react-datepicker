import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import {terser} from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            image(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json", sourceMap: true, inlineSources: true}),
            postcss({
                use: ["sass"],
                autoModules: true,
                modules: {
                    generateScopedName: "[name]__[local]___[hash:base64:5]",
                },
                sourceMap: true,
            }),

            terser(),
        ],
    },
    {
        input: "dist/esm/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],
        external: [/\.scss$/],
    },
];