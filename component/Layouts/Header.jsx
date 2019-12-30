import React, { useEffect, useState, memo } from "react";
import Icon from "../Common/Icon.jsx";
import Logo from "../Common/Logo.jsx";
import {
	STOP_WATCH_PAGE,
	BELL_PAGE,
	CALENDAR_PAGE,
	CHART_PAGE
} from "../App.jsx";

const listIconInfo = {
	className: "fas fa-list",
	onClickIcon: () => {}
};
const barIconInfo = {
	className: "far fa-check-square",
	onClickIcon: () => {}
};
const changePage = page => {
	console.log(page);
	switch (page) {
		case STOP_WATCH_PAGE:
			return "StopWatch Page";
		case BELL_PAGE:
			return "Bell Page";
		case CALENDAR_PAGE:
			return "Calendar Page";
		case CHART_PAGE:
			return "Chart Page";
	}
};
const Header = memo(({ page }) => {
	const [currentPage, setCurrentPage] = useState(changePage(page));

	useEffect(() => {
		setCurrentPage(changePage(page));
		console.log("currentPage is :", currentPage);
	}, [page]);

	return (
		<>
			<header>
				<Icon iconInfo={listIconInfo}></Icon>
				<Logo logoText={currentPage}></Logo>
				<Icon iconInfo={barIconInfo}></Icon>
			</header>
		</>
	);
});

export default Header;
