import _ from 'lodash';
import diffTypes from '../common.js';

const getDiffString = (level, symbol, key, value) => {
  const indent = ' '.repeat(level);
  if (!_.isObject(value)) {
    return `${indent}${symbol} ${key}: ${value}`;
  }
  const childValue = Object.keys(value).map((childKey) => getDiffString(level + 4, ' ', childKey, value[childKey]));
  return `${' '.repeat(level)}${symbol} ${key}: {\n${childValue}\n${' '.repeat(level + 2)}}`;
};

const printStylish = (data, level = 0) => {
  const curLvl = level + 2;
  const diffText = data.map((item) => {
    const {
      key, type, children, newValue, oldValue,
    } = item;
    switch (type) {
      case diffTypes.added:
        return getDiffString(curLvl, '+', key, newValue);
      case diffTypes.removed:
        return getDiffString(curLvl, '-', key, newValue);
      case diffTypes.equal:
        return getDiffString(curLvl, ' ', key, newValue);
      case diffTypes.changed: {
        const prev = getDiffString(curLvl, '-', key, oldValue);
        const next = getDiffString(curLvl, '+', key, newValue);
        return `${prev}\n${next}`;
      }
      case diffTypes.nested: {
        const childrenObj = printStylish(children, curLvl + 2);
        return `${' '.repeat(curLvl + 2)}${key}: {\n${childrenObj}\n${' '.repeat(curLvl + 2)}}`;
      }
      default:
        throw new Error('Unexpected value');
    }
  });
  return diffText.join('\n').replace(/, /gi, '\n ');
};
export default (data) => `{\n${printStylish(data)}\n}`;
