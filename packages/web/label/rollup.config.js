import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

const fileName = 'index';
const external = ['react', 'prop-types'];
const outputTypes = [
  { file: `./dist/label/cjs/${fileName}.js`, format: 'cjs', minify: false },
  { file: `./dist/label/cjs/${fileName}.min.js`, format: 'cjs', minify: true },
  { file: `./dist/label/es/${fileName}.mjs`, format: 'es', minify: false },
  // { file: `${fileName}.min.mjs`, format: 'es', minify: true }, // TODO: Investigate this
];

const basicPlugins = [
  resolve({
    jsnext: true,
  }),
  commonjs(),
  filesize(),
];

const developmentPlugins = basicPlugins.concat([
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
]);

const productionPlugins = basicPlugins.concat([
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers', 'transform-react-remove-prop-types'],
  }),
  uglify(),
  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
]);

const tasks = outputTypes.map(output => ({
  input: './src/index.js',
  external,
  output,
  name: 'construct',
  plugins: output.minify ? productionPlugins : developmentPlugins,
}));

export default tasks;
