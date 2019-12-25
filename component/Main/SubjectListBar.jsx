import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
	memo,
	useContext
} from "react";
import Icon from "../Common/Icon";
import {
	StopWatchContext,
	START_TIME,
	END_TIME,
	UPDATE_SUBJECT
} from "./StopWatch.jsx";
import Timer from "./Timer.jsx";

const PLAY_CIRCLE = "fas fa-play-circle fa-2x subjectList__playIcon";
const PAUSE_CIRCLE = "fas fa-pause-circle fa-2x subjectList__playIcon";
const ELLIPSIS_V = "fas fa-ellipsis-v subjectList__ellipIcon";
const SubjectListBar = memo(({ subjectName, timeOn }) => {
	const [iconClass, setIconClass] = useState(PLAY_CIRCLE);
	const { dispatch } = useContext(StopWatchContext);

	const onClickEllpsis = useCallback(() => {
		dispatch({ type: UPDATE_SUBJECT, subjectName });
	}, []);

	const onClickPlayIcon = useCallback(() => {
		//해당 버튼을 눌르면 시간을 측정되거나 멈춤.
		//PLAY CIRCLE이 true면 스타트 아니면.. 멈춰야지
		iconClass === PLAY_CIRCLE
			? dispatch({ type: START_TIME, subjectName })
			: dispatch({ type: END_TIME, subjectName });
		setIconClass(iconClass === PLAY_CIRCLE ? PAUSE_CIRCLE : PLAY_CIRCLE);
	}, [iconClass]);

	useEffect(() => {
		if (!timeOn) {
			setIconClass(PLAY_CIRCLE);
		}
	}, [timeOn]);

	return (
		<>
			<div className="subjectList__bar">
				<Icon
					iconInfo={{
						className: iconClass,
						onClickIcon: onClickPlayIcon
					}}></Icon>
				<div className="subjectList__state">{subjectName}</div>
				<Timer timeOn={timeOn} subjectName={subjectName} />
				<Icon
					iconInfo={{
						className: ELLIPSIS_V,
						onClickIcon: onClickEllpsis
					}}></Icon>
			</div>
		</>
	);
});
export default SubjectListBar;
