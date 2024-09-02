const setCookieButton = document.querySelector("#set_cookie");
const deleteCookieButton = document.querySelector("#delete_cookie");

axios.defaults.withCredentials = true;
console.log("js");

setCookieButton.onclick = () => {
  axios.get("http://localhost:3000").then((res) => console.log(res));
};
deleteCookieButton.onclick = () => {
  axios.delete("http://localhost:3000").then((res) => console.log(res));
};
