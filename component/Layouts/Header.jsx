import React from "react";
import Icon from "../Common/Icon.jsx";
import Logo from "../Common/Logo.jsx";
const listIconInfo = {
	className: "fas fa-list",
	onClickIcon: () => {}
};
const barIconInfo = {
	className: "far fa-check-square",
	onClickIcon: () => {}
};
const Header = () => {
	return (
		<>
			<header>
				<Icon iconInfo={listIconInfo}></Icon>
				<Logo logoText={"Main Page"}></Logo>
				<Icon iconInfo={barIconInfo}></Icon>
			</header>
		</>
	);
};

export default Header;
