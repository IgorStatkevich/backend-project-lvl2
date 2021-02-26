import _ from 'lodash';
import diffTypes from './common.js';

const getAllKeys = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return _.sortBy(keys);
};

const getDiff = (obj1, obj2) => {
  const keys = getAllKeys(obj1, obj2);
  const result = keys.map((key) => {
    const condition1 = _.isObject(obj1[key]) && _.isObject(obj2[key]);
    const condition2 = !_.has(obj1, key);
    const condition3 = !_.has(obj2, key);
    const condition4 = obj1[key] === obj2[key];

    switch (true) {
      case condition1:
        return { key, type: diffTypes.nested, children: getDiff(obj1[key], obj2[key]) };
      case condition2:
        return { key, type: diffTypes.added, newValue: obj2[key] };
      case condition3:
        return { key, type: diffTypes.removed, newValue: obj1[key] };
      case condition4:
        return {
          key, type: diffTypes.equal, newValue: obj2[key], oldValue: obj1[key],
        };
      default:
        return {
          key, type: diffTypes.changed, newValue: obj2[key], oldValue: obj1[key],
        };
    }
  });
  return result;
};
export default getDiff;
