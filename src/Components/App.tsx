import React, { FC } from "react";
import style from "./App.module.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const App: FC = () => {
	return (
    <div className={style.flex}>
      <SignUp />
      <SignIn/>
		</div>
	);
};

export default App;
