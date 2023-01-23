const saveToLocal = (name: string, item: string) => {
  localStorage.setItem(name, item);
};

export { saveToLocal };
