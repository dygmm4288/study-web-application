import React, { useReducer, useState, createContext, useMemo } from "react";
import Header from "./Layouts/Header.jsx";
import Main from "./Layouts/Main.jsx";
import Footer from "./Layouts/Footer.jsx";
//import "../css/index.css";
import "../css/index.scss";

const App = () => {
	return (
		<>
			<Header></Header>
			<Main></Main>
			<Footer></Footer>
		</>
	);
};

export default App;
