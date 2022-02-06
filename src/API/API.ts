import axios from "axios";
const instance = axios.create({
	baseURL: "https://testtask.softorium.pro/",
});

const authorizedInstance = axios.create({
	baseURL: "https://testtask.softorium.pro/",
});
instance.interceptors.request.use((config) => {
	if (!config) {
		config = {};
	}
	if (!config.headers) {
		config.headers = {};
	}
	config.headers["X-APP-ID"] = `${localStorage.getItem("X-APP-ID")}`;
	return config;
});
authorizedInstance.interceptors.request.use((config) => {
	if (!config) {
		config = {};
	}
	if (!config.headers) {
		config.headers = {};
	}
	config.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
	config.headers["X-APP-ID"] = `${localStorage.getItem("X-APP-ID")}`;
	return config;
});

export const authAPI = {
	login(formData: FormData) {
		return instance
			.post("signin", formData)
			.then(({ data }) => {
				localStorage.setItem("userToken", data.access_token);
				return data;
			})
      .catch((error) => {
				if (error.response.data.detail) {
					return error.response.data;
				}
				return error;
			});
	},
	logout() {
		localStorage.removeItem("userToken");
		return;
	},
	registration(
		name: string,
		email: string,
		phone: string,
		password: string,
		birthday: string,
		avatar_img: string | ArrayBuffer | undefined
	) {
		return instance
			.post("signup", {
				phone,
				password,
				name,
				email,
				birthday,
				avatar_img,
				time_zone: "+03",
			})
			.then((data) => data)
			.catch((error) => {
				if (error.response.data.detail) {
					return error.response.data;
				}
				return error;
			});
	},
};

export const userAPI = {
	me() {
		return authorizedInstance
			.get("users/me")
			.then(({ data }) => data)
			.catch((error) => {
				if (error.response.data.detail) {
					return error.response.data;
				}
				return error;
			});
	},
};
