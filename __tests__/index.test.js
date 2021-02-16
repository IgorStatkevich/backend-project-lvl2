import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('two JSON files', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
});

test('empty source, non-empty target', () => {
  const result = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('file2.json'))).toEqual(result);
});

test('non-empty source, empty target', () => {
  const result = `{
  - host: hexlet.io
  - timeout: 20
  - verbose: true
}`;
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('empty.json'))).toEqual(result);
});
