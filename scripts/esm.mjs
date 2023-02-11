import path from 'path';
import process from 'process';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';

/**
 * @function isCliCall
 * @description Indicates whether the file was called from the command line
 * @param {Object} meta The module's meta information. Typically would pass `import.meta` as the argument
 * @returns {Boolean} Whether the file was called from the command line
 */
export const isCliCall = (meta) => {
  const argv1 = process.argv && process.argv[1];

  if (!meta || !argv1) {
    return false;
  }
  const require = createRequire(meta.url);
  const argvPath = require.resolve(argv1);
  const argvExt = path.extname(argvPath);

  const metaPath = fileURLToPath(meta.url);
  const metaExt = path.extname(metaPath);

  if (argvExt) {
    return argvPath === metaPath;
  }

  return argvPath === metaPath.slice(0, -metaExt.length);
};

/**
 * @function getFilename
 * @description Gets the absolute file path and name of the current file
 * @param {Object} meta The module's meta information. Typically would pass `import.meta` as the argument
 * @param {String} meta.url The url property of the module's meta information.
 * @returns {String} The file's absolute path
 */
export const getFilename = (meta) => fileURLToPath(meta.url);

/**
 * @function getDirname
 * @description Gets the absolute path of the current file's directory
 * @param {Object} meta The module's meta information. Typically would pass `import.meta` as the argument
 * @returns {String} The absolute path of the module file's directory
 */
export const getDirname = (meta) => {
  const file = fileURLToPath(meta.url);

  return path.dirname(file);
};
