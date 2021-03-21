import HttpService from './httpService'

export const userService = {
  save,
  isLoggedIn,
  isAdmin,
  isResearcher,
  login,
  register,
  logout,
  getLocalStorageUser
}

async function save(user) {
  if (user.id) {
    return HttpService.put(`users/${user.id}`, user)
  } else {
    return HttpService.post(`users`, user);
  }
}

 function isLoggedIn() {
   console.log(localStorage.getItem('user') );
  return (localStorage.getItem('user'));
}
 function isAdmin() {
  let status = false;
  if (localStorage.getItem('user') != null) {
    if( JSON.parse(localStorage.getItem('user')).isAdmin)
      status = true;;
  }
  return status;
}
 function isResearcher() {
  let status = false;
  if (localStorage.getItem('user') != null) {
    if( JSON.parse(localStorage.getItem('user')).UserTypeID === 2)
      status = true;;
  }
  return status;
}

// This method returns the user from the localStorage
// Be careful, the value is the one when the user logged in for the last time
 function getLocalStorageUser() {
  console.log(JSON.parse(localStorage.getItem('user')));
  var user =  JSON.parse(localStorage.getItem('user'));
  console.log(user.firstName);
  return user.firstName;
}

// This method signs up and logs in the user
 function register(userInfo) {
   const body = {
    email: userInfo.email, password: userInfo.password, firstName: userInfo.firstName, lastName: userInfo.lastName
   }
   return HttpService
    .post('/pub/register', body)
    .then(res => {
      console.log(res);
      login(userInfo.email, userInfo.password);
      // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
      // localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    })

}

 function login(email, password) {
  return HttpService
    .post('/pub/login', {
      email,
      password,
    })
    .then(res => {
      console.log('log in respons:' + res)
      // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);

      return res.data;
    })
}

async function logout() {
   localStorage.removeItem('user');  
   localStorage.removeItem('token');
   return true;
}