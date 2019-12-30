import React, { useRef, useState, seEffect, useReducer } from "react";
import Icon from "../Common/Icon.jsx";

const iconInfo = (className, click) => {
	const obj = {
		className: className,
		onClickIcon: click
	};
	return obj;
};
const calendar = "fas fa-calendar-alt";
const bell = "fas fa-bell";
const home = "fas fa-home";
const chart = "fas fa-chart-bar";

const Footer = ({ onClickPage }) => {
	console.log(onClickPage);
	const calendarIcon = iconInfo(calendar, onClickPage[2]);
	const bellIcon = iconInfo(bell, onClickPage[1]);
	const homeIcon = iconInfo(home, onClickPage[0]);
	const chartIcon = iconInfo(chart, onClickPage[3]);

	return (
		<>
			<footer>
				<Icon iconInfo={calendarIcon}></Icon>
				<Icon iconInfo={bellIcon}></Icon>
				<Icon iconInfo={homeIcon}></Icon>
				<Icon iconInfo={chartIcon}></Icon>
			</footer>
		</>
	);
};
export default Footer;
