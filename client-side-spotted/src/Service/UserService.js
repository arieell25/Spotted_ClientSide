import HttpService from "./httpService";

export const userService = {
  save,
  isLoggedIn,
  isAdmin,
  allUsersEncounters,
  login,
  getUserName,
  register,
  logout,
  getLocalStorageUser,
  getAllUsers,
  setAdmin,
  updateUser,
  changePassword,
};

async function save(user) {
  if (user.id) {
    return HttpService.put(`users/${user.id}`, user);
  } else {
    return HttpService.post(`users`, user);
  }
}

async function setAdmin(email) {
  if (email) {
    if (isLoggedIn()) {
      const body = { email };
      return HttpService.put(`/api/setUserAdmin`, body).then((res) => {
        if (res.data.user[0] === 1) return true;
      });
    } else {
      return false;
    }
  } else {
    return "no email data";
  }
}

async function changePassword(oldpass, newpass) {
  console.log(oldpass, newpass);
  if (oldpass && newpass) {
    const body = { oldPassword: oldpass, newPassword: newpass };

    if (isLoggedIn()) {
      return HttpService.post(`/api/changePassword`, body)
        .then((res) => {
          console.log(res);
          if (res.success) return "Password has changed successfully.";
          else return "Oops...Somethong went wrong.";
        })
        .catch((err) => {
          return err.data.errorMessage;
        });
    } else {
      return false;
    }
  } else {
    return "no email data";
  }
}

async function updateUser(data) {
  console.log(data);
  if (data) {
    if (isLoggedIn()) {
      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
      return HttpService.put(`/api/updateUser`, body)
        .then((res) => {
          if (res.data.user[0] === 1) return "New Profile data was saved.";
        })
        .catch((err) => {
          return err.data.errorMessage;
        });
    } else {
      return "Please login first";
    }
  } else {
    return "Please fill in fields first.";
  }
}

function isLoggedIn() {
  var user = JSON.parse(localStorage.getItem("user"));
  return user;
}
function isAdmin() {
  let status = false;
  if (localStorage.getItem("user") != null) {
    if (JSON.parse(localStorage.getItem("user")).isAdmin) status = true;
  }
  return status;
}

// This method returns the user from the localStorage
// Be careful, the value is the one when the user logged in for the last time
function getLocalStorageUser() {
  console.log(JSON.parse(localStorage.getItem("user")));
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user.firstName);
  return user;
}
//  function getLocalStorageUserName() {
//   console.log(JSON.parse(localStorage.getItem('user')));
//   var user =  JSON.parse(localStorage.getItem('user'));
//   console.log(user.firstName);
//   return user.firstName;

// }

// This method signs up and logs in the user
function register(userInfo) {
  const body = {
    email: userInfo.email,
    password: userInfo.password,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  };
  return HttpService.post("/pub/register", body).then((res) => {
    console.log(res);
    login(userInfo.email, userInfo.password);
    // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
    // localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  });
}

function login(email, password) {
  return HttpService.post("/pub/login", {
    email,
    password,
  }).then((res) => {
    console.log("log in respons:" + res);
    // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    return res.data;
  });
}

function getUserName(id) {
  const body = { id: id };
  return HttpService.put(`/api/user`, body).then((res) => {
    console.log(res);
    return res.data.user;
  });
}

function getAllUsers(count) {
  return HttpService.get(`/api/getAllUsers`).then((res) => {
    console.log(res);
    if (count) {
      return res.data.users;
    } else {
      return res.data.users.rows;
    }
  });
}
async function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return true;
}

function allUsersEncounters(count) {
  return HttpService.get(`/api/allUsersEncounters`).then((res) => {
    console.log(res);
    if (count) {
      return res.data.users;
    } else {
      return res.data.users.rows;
    }
  });
}
