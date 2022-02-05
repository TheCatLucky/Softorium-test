import axios from "axios";
const instance = axios.create({
  baseURL: "https://testtask.softorium.pro/",
  headers: {
    "X-APP-ID" : "123123123123"
  }
});

const authorizedInstance = axios.create({
  baseURL: "https://testtask.softorium.pro/",
  headers: {
    "X-APP-ID" : "123123123123"
  }
});

authorizedInstance.interceptors.request.use(config => {
  //@ts-ignore
  config.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
  return config;
});

export const authAPI = {
  login(formData:FormData) {
    return instance.post("signin",formData)
      .then((response) => {
        localStorage.setItem("userToken", response.data.access_token);
        return response.data;
      });
  },
  logout() {
    localStorage.removeItem("userToken");
    return;
  },
  registration(name:string, email:string, phone:string, password:string, birthday:string, avatar_img:string, ) {
    return instance.post("signup", {
      phone, password, name, email, birthday, avatar_img, time_zone: "+03"
    })
      .then(response => {
        return response.data;
      });
  }
};

export const userAPI = {
  me() {
    return authorizedInstance.get("users/me")
      .then((response) => { console.log(response); });
  }
};