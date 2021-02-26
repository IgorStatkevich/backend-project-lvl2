import _ from 'lodash';
import diffTypes from '../common.js';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const printPlain = (data, ancestry = '') => {
  const result = data
    .map((item) => {
      const {
        key, children, newValue, type, oldValue,
      } = item;
      const curKey = ancestry === '' ? key : `${ancestry}.${key}`;

      switch (type) {
        case diffTypes.nested:
          return printPlain(children, curKey);
        case diffTypes.added: {
          const curValue = getValue(newValue);
          return `Property '${curKey}' was added with value: ${curValue}`;
        }
        case diffTypes.removed:
          return `Property '${curKey}' was removed`;
        case diffTypes.changed: {
          const curNew = getValue(newValue);
          const curOld = getValue(oldValue);
          return `Property '${curKey}' was updated. From ${curOld} to ${curNew}`;
        }
        case diffTypes.equal:
          return null;
        default:
          throw new Error('Unexpected value');
      }
    })
    .filter((item) => item)
    .join('\n');
  return result;
};
export default (data) => printPlain(data);
