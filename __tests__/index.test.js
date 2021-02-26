import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expected = fs.readFileSync(getFixturePath('expected-stylish.txt'), 'utf-8');

test('two json files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});

test('json & yaml files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(expected);
});

test('two yaml files', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expected);
});
