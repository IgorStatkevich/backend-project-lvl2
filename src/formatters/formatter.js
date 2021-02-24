import stylish from './stylish.js';

const formatter = {
  stylish,
};
export default (format) => formatter[format];
