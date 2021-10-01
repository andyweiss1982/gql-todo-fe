export const loadUserNameFromLocalStorage = () =>
  localStorage.getItem("userName") || "";

export const loadIsUserConfirmedFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("isUserConfirmed") || "false");
