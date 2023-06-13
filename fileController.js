import fs from 'fs';
import { resolve } from 'path';

const basePath = resolve();

export const readJSON = (path) => {
  try {
    return JSON.parse(fs.readFileSync(resolve(basePath, path), 'utf-8'));
  } catch (e) {
    console.error(e);
  }
};
