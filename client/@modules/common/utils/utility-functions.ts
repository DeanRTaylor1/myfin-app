const toNormalCase = (string: string) => {
  let newString = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  return newString.charAt(0).toUpperCase() + newString.slice(1);
};

export { toNormalCase };
