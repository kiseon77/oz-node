const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_password");
const loginButton = document.querySelector("#login_button");
const logoutButton = document.querySelector("#logout_button");
const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");

axios.defaults.withCredentials = true;
let asccessToken;

form.addEventListener("submit", (e) => e.preventDefault());

function logout() {
  asccessToken = "";
}
function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;
  console.log(userId, userPassword);
  return axios
    .post("http://localhost:3000", { userId, userPassword })
    .then((res) => (asccessToken = res.data));
}
function getUserInfo() {
  return axios.get("http://localhost:3000", {
    headers: { Authorization: `Bearer ${asccessToken}` },
  });
}

function renderUserInfo(user) {
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}
function renderLoginForm(user) {
  userName.textContent = "";
  userInfo.textContent = "";
}
loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then((res) => renderUserInfo(res.data));
};
logoutButton.onclick = () => {
  logout();
  renderLoginForm();
};
