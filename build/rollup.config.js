import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel"; // Transpile/polyfill with reasonable browser support
import pkg from './../package.json'
import filesize from "rollup-plugin-filesize";
export default {
  input: 'src/wrapper.js', // Path relative to package.json
  output: {
    name: 'AceEditor',
    exports: 'named',
  },
  external: Object.keys(pkg.dependencies),
  plugins: [
    commonjs(),
    filesize(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ],
};
