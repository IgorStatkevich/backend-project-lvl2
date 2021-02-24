import _ from 'lodash';
import diffTypes from './common.js';

const getAllKeys = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return _.sortBy(keys);
};

const getDiff = (obj1, obj2) => {
  const keys = getAllKeys(obj1, obj2);
  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: diffTypes.nested, children: getDiff(obj1[key], obj2[key]) };
    }
    if (!_.has(obj1, key)) {
      return { key, type: diffTypes.added, newValue: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: diffTypes.removed, newValue: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: diffTypes.equal, newValue: obj2[key], oldValue: obj1[key] };
    }
    return { key, type: diffTypes.changed, newValue: obj2[key], oldValue: obj1[key] };
  });
  return result;
};
export default getDiff;
