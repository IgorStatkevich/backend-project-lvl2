import parse from './src/parser.js';
import getDiff from './src/getdiff.js';
import getFormatter from './src/formatters/formatter.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const diffObj = getDiff(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diffObj);
};
export default genDiff;
