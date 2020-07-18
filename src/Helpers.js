const setToken = (token) => {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  document.cookie =
    "token=" + token + "; path=/; expires=" + date.toGMTString();
};

const getToken = () => {
  let name = "token=";
  let allCookieArray = document.cookie.split(";");
  for (let i = 0; i < allCookieArray.length; i++) {
    let temp = allCookieArray[i].trim();
    if (temp.indexOf(name) === 0) {
      return temp.substring(name.length, temp.length);
    }
  }
  return "";
};

const createUser = (user) => {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  var cookie = [
    "user",
    "=",
    JSON.stringify(user),
    "; path=/; expires=",
    date.toGMTString(),
  ].join("");
  document.cookie = cookie;
};

const fetchUser = () => {
  var result = document.cookie.match(new RegExp("user" + "=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
};

const validateUser = (name) => {
  return new Promise((resolve, reject) => {
    if (name.length) {
      return resolve();
    } else {
      return reject("Name field is required");
    }
  });
};

const isAuthenticated = () => {
  return getToken().length > 0;
};

export {
  setToken,
  getToken,
  createUser,
  fetchUser,
  validateUser,
  isAuthenticated,
};
