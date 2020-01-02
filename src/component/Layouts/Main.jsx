import React, { memo } from "react";
import StopWatch from "../Main/StopWatch.jsx";
import { STOP_WATCH_PAGE } from "../App.jsx";

const getPage = page => {
	switch (page) {
		case STOP_WATCH_PAGE:
			return <StopWatch />;
	}
};

const Main = memo(({ page }) => {
	return <>{getPage(page)}</>;
});

export default Main;
