import fs from 'fs';
import path from 'path';

export default (filepath) => {
  // const filePath = [filepath1, filepath2];
  const result = fs.readFileSync(path.resolve(filepath));
  return JSON.parse(result);
};
