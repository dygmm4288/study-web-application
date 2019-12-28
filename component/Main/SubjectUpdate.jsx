import React, {
	useState,
	memo,
	useCallback,
	useEffect,
	useContext
} from "react";
import Icon from "../Common/Icon.jsx";
import { StopWatchContext } from "./StopWatch.jsx";
import Button from "../Common/Button.jsx";

const filter = (list, predi) => {
	let result = [];
	for (let i = 0, len = list.length; i < len; i++) {
		if (predi(list[i])) result.push(list[i]);
	}
	return result;
};
const printInput = list => {
	if (list !== "") return <input type="text" placeholder={list} />;
	else return <input type="text" placeholder="ex) 영어 1단원..." />;
};
const SubjectUpdate = memo(({ subjectName, checkList }) => {
	const { dispatch } = useContext(StopWatchContext);
	const [stateCheckList, setStateCheckList] = useState(checkList);
	const [value, setValue] = useState("");
	const minus = "fas fa-minus-circle";
	const plus = "fas fa-plus-circle";

	const onClickIcon = useCallback(() => {
		if (stateCheckList) {
			const checkLists = [...stateCheckList];
			checkLists.push("");
			console.log(checkLists);
			setStateCheckList(checkLists);
		} else {
			setStateCheckList([""]);
		}
	}, [stateCheckList]);

	const onClickInput = useCallback(
		e => {
			const checkLists = [...stateCheckList];
			console.log(e.current.target);
			console.log(e.current.target.name);
			const name = e.current.target.name;
			const resultList = filter(checkLists, checklist => {
				return checklist !== name;
			});
			setStateCheckList(resultList);
		},
		[stateCheckList]
	);

	return (
		<>
			<div className="popup">
				<span>{subjectName}</span>
				<div className="headerCheckList">
					<span>체크리스트</span>
					<Icon
						iconInfo={{
							className: plus,
							onClickIcon: onClickIcon
						}}></Icon>
				</div>
				<form className="popup__form">
					<ul>
						{stateCheckList &&
							stateCheckList.map((list, i) => {
								return (
									<li key={subjectName + "checklist" + i}>
										{printInput(list)}
										<Icon
											iconInfo={{
												className: minus,
												onClickIcon: onClickInput
											}}
										/>
									</li>
								);
							})}
					</ul>
				</form>
				<div className="popup__button_bar">
					<Button></Button>
					<Button></Button>
				</div>
			</div>
		</>
	);
});

export default SubjectUpdate;
