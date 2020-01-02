import React, {
	memo,
	useState,
	useMemo,
	useCallback,
	useEffect,
	useRef,
	useContext
} from "react";
import { COUNT_TOTAL_TIME, StopWatchContext } from "./StopWatch.jsx";

const initTime = () => {
	const date = new Date("2019/1/1/00:00:00");
	console.log("initTime");
	return {
		hours: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
	};
};

const Timer = memo(({ timeOn, subjectName }) => {
	const timer = useRef(null);
	const [timeState, setTimeState] = useState(initTime);
	const { hours, min, sec } = timeState;
	const { dispatch } = useContext(StopWatchContext);

	const setTime = useCallback(() => {
		const date = new Date();
		let tempSec = sec + 1;
		date.setHours(hours, min, tempSec);
		setTimeState({
			hours: date.getHours(),
			min: date.getMinutes(),
			sec: date.getSeconds()
		});
		dispatch({ type: COUNT_TOTAL_TIME, timeState, subjectName });
	}, [timeState]);

	useEffect(() => {
		if (timeOn) {
			timer.current = setInterval(setTime, 1000);
		}
		return () => {
			clearInterval(timer.current);
		};
	}, [timeOn, timeState]);

	return (
		<>
			<div className="subjectList__time">{`${hours}:${min}:${sec}`}</div>
		</>
	);
});
export default Timer;
