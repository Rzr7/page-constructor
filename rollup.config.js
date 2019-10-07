import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import inject from 'rollup-plugin-inject';

export default {
  input: 'assets/js/constructor/entry.js',
  treeshake: false,
  output: {
    file: './dist/constructor.js',
    format: 'iife',
    name: 'PageEditor',
  },
  plugins: [
    resolve({
      mainFields: ['module', 'main', 'jsnext'],
      browser: true,
    }),
    inject({
      include: '**/*.js',
      exclude: 'node_modules/**',
      jQuery: '$',
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/styles/**',
      ],
    }),
    babel({
      babelHelpers: 'external',
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
