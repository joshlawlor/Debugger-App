function setToken(token){
    localStorage.setItem('token', token);
}
// function getToken() {
//     let token = localStorage.getItem('token')
//     return token;
// }

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Check if expired, remove if it is
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }

function getUserFromToken() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
    localStorage.removeItem('token');
}


function loginCheck() {
    const token = localStorage.getItem('token')
    if(token){
        return true;
    }else{
        return false;
    }
}

// function ownerCheck(post){
//     const user = getUserFromToken()
//     console.log(user)
//     console.log(post)
//     if(user.username == post.author){
//         return true
//     }else if(user.username == null){
//         return false
//     }
// }

export default {
    setToken,
    getToken,
    getUserFromToken,
    removeToken,
    loginCheck,
}