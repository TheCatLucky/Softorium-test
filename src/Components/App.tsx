import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import Profile from "./Profile/Profile";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const App: FC = () => {
	return (
		<BrowserRouter>
			<div className={style.flex}>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/signUp" element={<SignUp />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
