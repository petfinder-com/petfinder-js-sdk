import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json';

export default [
	// Browser build
	{
		input: "src/main.ts",
		external: ["axios"],
		plugins: [
			commonjs(),
			typescript(),
		],
		output: {
			name: "petfinder",
			file: pkg.browser,
			format: "umd",
		},
	},
	// Browser minified build
	{
		input: "src/main.ts",
		external: ["axios"],
		plugins: [
			commonjs(),
			typescript(),
			uglify(),
		],
		output: {
			name: "petfinder",
			file: pkg.browser.replace(/\.js$/, ".min.js"),
			format: "umd",
		},
	},
];
