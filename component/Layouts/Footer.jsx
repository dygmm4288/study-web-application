import React, { useRef, useState, seEffect, useReducer } from "react";
import Icon from "../Common/Icon.jsx";

const iconInfo = (className, click) => {
	const obj = {
		className: className,
		onClickIcon: click
	};
	return obj;
};
const Footer = ({ dispatch, currentPage }) => {
	const [calendarIcon, setCalendarIcon] = useState(
		iconInfo("fas fa-calendar-alt", () => {
			dispatch({ type: "CALENDAR", calendar: true });
		})
	);
	const [bellIcon, setBellIcon] = useState(iconInfo("fas fa-bell", () => {}));
	const [homeIcon, setHomeIcon] = useState(
		iconInfo("fas fa-home", () => {
			dispatch({ type: "STOP_WATCH", stopWatch: true });
		})
	);
	const [charBarIcon, setCharBarIcon] = useState(
		iconInfo("fas fa-chart-bar", () => {})
	);
	return (
		<>
			<footer>
				<Icon iconInfo={calendarIcon}></Icon>
				<Icon iconInfo={bellIcon}></Icon>
				<Icon iconInfo={homeIcon}></Icon>
				<Icon iconInfo={charBarIcon}></Icon>
			</footer>
		</>
	);
};
export default Footer;
