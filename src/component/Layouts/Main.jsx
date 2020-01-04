import React, { memo } from "react";
import StopWatch from "../Main/StopWatch.jsx";
import Calendar from "../Main/Calendar.tsx";
import { STOP_WATCH_PAGE, CALENDAR_PAGE } from "../App.jsx";

const getPage = page => {
	switch (page) {
		case STOP_WATCH_PAGE:
			return <StopWatch />;
		case CALENDAR_PAGE:
			const date = new Date();
			return <Calendar date={date} />;
	}
};

const Main = memo(({ page }) => {
	return <>{getPage(page)}</>;
});

export default Main;
