import path from 'path';
import {readFile, readFileSync} from 'fs';
import {promisify} from 'util';
import process from 'process';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';

const readFileAsync = promisify(readFile);

/**
 * @function getFilename
 * @description Gets the absolute file path and name of the current file
 * @param {Object} meta The module's meta information. Typically would pass `import.meta` as the argument
 * @returns {String} The file's absolute path
 */
export const getFilename = (meta) => fileURLToPath(meta.url);

/**
 * @function getDirname
 * @description Gets the absolute path of the current file's directory
 * @param {Object} meta The module's meta information. Typically would pass `import.meta` as the argument
 * @returns {String} The absolute path of the current file's directory
 */
export const getDirname = (meta) => {
  const file = fileURLToPath(meta.url);

  return path.dirname(file);
};

export const resolve = (metaOrPath, ...paths) => {
  const errMessage = 'First argument must be an import.meta object or an absolute path';
  const isString = typeof metaOrPath === 'string';

  if (metaOrPath == null || (isString && metaOrPath.indexOf('/') !== 0) || (!isString && !metaOrPath.url)) {
    throw new Error(errMessage);
  }

  const base = metaOrPath.url ? getDirname(metaOrPath) : metaOrPath;

  return path.resolve(base, ...paths);
};

/**
 * @function readJson
 * @description Gets and parses JSON content asynchronously
 * @param {String} file full path of json file
 * @returns {Object} parsed JSON object
 */
export const readJson = (file) => {
  return readFileAsync(file, 'utf-8')
  .then((content) => {
    return JSON.parse(content);
  })
  .catch((err) => {
    console.error(err);

    return null;
  });
};

/**
 * @function readJsonSync
 * @description Gets and parses JSON content synchronously
 * @param {String} file full path of json file
 * @returns {Object} parsed JSON object
 */
export const readJsonSync = (file) => {
  const content = readFileSync(file, 'utf-8');
  let json = null;

  try {
    json = JSON.parse(content);
  } catch (err) {
    console.error(err);
  }

  return json;
};

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

  return argvPath === metaPath.slice(0, metaExt.length * -1);
};
