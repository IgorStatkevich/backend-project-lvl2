import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const result2 = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

const result3 = `{
  - host: hexlet.io
  - timeout: 20
  - verbose: true
}`;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('two json files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result1);
});

test('empty source, non-empty target', () => {
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('file2.json'))).toEqual(result2);
});

test('non-empty source, empty target', () => {
  expect(genDiff(getFixturePath('file2.json'), getFixturePath('empty.json'))).toEqual(result3);
});

test('json & yaml files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(result1);
});

test('two yaml files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(result1);
});
