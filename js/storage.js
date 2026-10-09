const Storage = {
  save(key, value) {
    localStorage.setItem(`zoo_${key}`, JSON.stringify(value));
  },
  load(key, defaultValue = null) {
    const data = localStorage.getItem(`zoo_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  clearDay() {
    localStorage.removeItem('zoo_animals');
    localStorage.removeItem('zoo_insects');
  }
};
