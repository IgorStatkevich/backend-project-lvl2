import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const ext = path.extname(filepath);
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      return {};
  }
};
