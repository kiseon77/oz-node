const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_password");
const loginButton = document.querySelector("#login_button");
const logoutButton = document.querySelector("#logout_button");
const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");

axios.default.withCredentials = true;

form.addEventListener("submit", (e) => e.preventDefault());

function logout() {
  return axios.delete("http://localhost:3000");
}
function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;
  console.log(userId, userPassword);
  return axios.post("http://localhost:3000", { userId, userPassword });
}
function getUserInfo() {
  return axios.get("http://localhost:3000");
}

function renderUserInfo(user) {
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then((res) => renderUserInfo(res.data));
};
logoutButton.onclick = logout;
