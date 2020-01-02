import React, {
	useReducer,
	useState,
	memo,
	useCallback,
	useMemo,
	useEffect
} from "react";
import Header from "./Layouts/Header.jsx";

import Main from "./Layouts/Main.jsx";
import Footer from "./Layouts/Footer.jsx";
//import "../css/index.css";
import "../../css/index.scss";
//page
export const STOP_WATCH_PAGE = "STOP_WATCH";
export const BELL_PAGE = "BEll_PAGE";
export const CALENDAR_PAGE = "CALENDAR_PAGE";
export const CHART_PAGE = "CHART_PAGE";

const App = memo(() => {
	const [page, setPage] = useState(STOP_WATCH_PAGE);

	const onChangeSWPage = useCallback(() => {
		setPage(STOP_WATCH_PAGE);
	}, []);
	const onChangeBellPage = useCallback(() => {
		setPage(BELL_PAGE);
	}, []);
	const onChangeCalendarPage = useCallback(() => {
		setPage(CALENDAR_PAGE);
	}, []);
	const onChangeChartPage = useCallback(() => {
		setPage(CHART_PAGE);
	}, []);

	useEffect(() => {
		console.log("app current page is:", page);
	}, [page]);

	const onClickPages = [
		onChangeSWPage,
		onChangeBellPage,
		onChangeCalendarPage,
		onChangeChartPage
	];
	return (
		<>
			<Header page={page}></Header>
			<Main page={page}></Main>
			<Footer onClickPage={onClickPages}></Footer>
		</>
	);
});

export default App;
