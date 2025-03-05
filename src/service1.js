import axios from 'axios';
import swal from 'sweetalert';
import { jwtDecode } from 'jwt-decode';


//דפולטיבית API הגדרת כתובת 
axios.defaults.baseURL = "http://localhost:5162/"
//תפיסת שגיאות
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log("a");

  if (error.response.status === 401) {
    console.log("b");
    
    return (window.location.href = "/register");
  }
  else {
    console.log("c");

    swal(`${error.name}`, `${error.message}`, "error")
    console.log(+ ":" + error.message);
  }
});
setAuthorizationBearer();

//שמירת הטוקן בלקוח
function saveAccessToken(authResult) {
  localStorage.setItem("access_token", authResult.token);
  setAuthorizationBearer();
}
//שמירת הטוקן באופן דפולטיבי בקריאות שרת
function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}
function helpgetLoginUser(){
  const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        return jwtDecode(accessToken);
      }
      return null;
}
//API בקשות 
export default {
    //בדיקת משתמש אם הוא מחובר  
  getLoginUser: () => {
      return helpgetLoginUser()
    },
  //שליפת כל המשימות
  getTasks: async () => {
    const result = await axios.get()
    return result.data;
  }
  ,
  //שליפת כל המשתמשים
  getTUsers: async () => {
    const result = await axios.get('users');
    return result.data;
  },
  //הוספת משימה
  addTask: async (name) => {
    const id = helpgetLoginUser().id;
    const result = axios.post(`?name=${name}&usId=${id}`)
    return await result.data;
  }
  //הרשמה
  ,
  addUser: async (Id, Name, Password) => {
    const res = await axios.post(`addUser`, { Id, Name, Password })
    if (res.data != null)
      saveAccessToken(res.data);
    else
      swal("אתה  רשום אצלינו", "הכנס להתחברות", "error")
    return res;
  },
  //התחברות
  login: async (Id, Name, Password) => {
    const res = await axios.post("login", { Id, Name, Password });
    if (res.data != null)
      saveAccessToken(res.data.jwt);
    else
      swal("אתה לא רשום אצלינו", "הכנס להרשמה", " info")
    return res;
  },
  //קבלת איפורמציה
  info: async () => {
    return await axios.get("info")
  }
  ,
  //שליפת משימות ע"פ משתמש
  byId: async (id) => {
    return await axios.get(`byId?id=${id}`)
  }
  //עדכון משימה
  , setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    const result = axios.put(`?id=${id}`)
    return (await result).data;
  },
//מחיקת משימה
  deleteTask: async (id) => {
    const result = axios.delete(`?id=${id}`)

    return (await result).data;
  },

  //התנתקות
  logout:()=>{
    localStorage.setItem("access_token", "");
  },

};


