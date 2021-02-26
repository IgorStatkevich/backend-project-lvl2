import fs from 'fs';
import genDiff from '../index.js';

const cases = [
  ['.json', 'stylish'],
  ['.yml', 'stylish'],
  ['.json', 'plain'],
  ['.yml', 'plain'],
];

const getFixturePath = (name, ext = '.json') => `__fixtures__/${name}${ext}`;

test.each(cases)('%j, %j', (ext, format) => {
  const file1 = getFixturePath('file1', ext);
  const file2 = getFixturePath('file2', ext);
  const diff = genDiff(file1, file2, format);
  const expected = fs.readFileSync(getFixturePath(`expected-${format}`, '.txt'), 'utf-8');
  expect(diff).toEqual(expected);
});
