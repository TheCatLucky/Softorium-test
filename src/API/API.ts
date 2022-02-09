import axios from "axios";
import { Registation } from "../Common/Types/Types";
const instance = axios.create({
	baseURL: "https://testtask.softorium.pro/",
});

instance.interceptors.request.use((config) => {
	if (localStorage.getItem("userToken")) {
		config.headers!.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
	}
	config.headers!["X-APP-ID"] = `${localStorage.getItem("X-APP-ID")}`;
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
	registration({ name, email, phone, password, birthday, avatar_img }: Registation) {
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
		return instance
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
