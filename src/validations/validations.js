export const isValidTitle = (title) => {
  return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1;
};

export const isValid = (value) => {
  if (typeof value == undefined || value == null || value == 0) return false;
  if (typeof value === 'string' && value.trim().length === 0) return false;
  return true;
};


export default { isValid, isValidTitle };
