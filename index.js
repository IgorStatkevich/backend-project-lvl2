import parse from './src/parser.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

  const mergedKeys = [...Object.keys(file1), ...Object.keys(file2)];
  const uniqKeys = [...new Set(mergedKeys)].sort();
  const entries = uniqKeys
    .map((key) => {
      const hasProperty1 = Object.prototype.hasOwnProperty.call(file1, key);
      const hasProperty2 = Object.prototype.hasOwnProperty.call(file2, key);
      if (hasProperty1 && hasProperty2) {
        return file1[key] === file2[key]
          ? `    ${key}: ${file1[key]}`
          : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
      }
      return hasProperty1 ? `  - ${key}: ${file1[key]}` : `  + ${key}: ${file2[key]}`;
    })
    .join('\n');
  return `{\n${entries}\n}`;
};
export default genDiff;
