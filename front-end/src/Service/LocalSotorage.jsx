export const fetchInformationFromLocalstorage = (local) => {
  const user = JSON.parse(localStorage.getItem(local));
  return user;
};

export const saveInformationToLocalstorage = (local, data) => {
  localStorage.setItem(local, JSON.stringify(data));
};
