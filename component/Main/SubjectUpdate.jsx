import React, {
	useState,
	memo,
	useRef,
	useCallback,
	useEffect,
	useContext
} from "react";
import Icon from "../Common/Icon.jsx";
import { StopWatchContext, UPDATE_SUBJECT } from "./StopWatch.jsx";
import Button from "../Common/Button.jsx";

const filter = (list, predi) => {
	let result = [];
	for (let i = 0, len = list.length; i < len; i++) {
		if (predi(list[i])) result.push(list[i]);
	}
	return result;
};

const SubjectUpdate = memo(({ subjectName, checkList }) => {
	const { dispatch } = useContext(StopWatchContext);
	const [stateCheckList, setStateCheckList] = useState(checkList);
	const [value, setValue] = useState("");
	const minus = "fas fa-minus-circle";
	const plus = "fas fa-plus-circle";
	const input = useRef(null);

	const printInput = list => {
		if (list !== "") return <input type="text" placeholder={list} />;
		else return <input type="text" placeholder="ex) 영어 1단원..." />;
	};

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

	const onClickMinus = useCallback(
		e => {
			const checkLists = [...stateCheckList];
			const prevInputValue = window.document.getSelection(e).focusNode
				.previousSibling.value;
			console.log("checklists is ", checkLists);
			console.log(prevInputValue);
		},
		[stateCheckList]
	);

	const cancle = useCallback(() => {
		console.log("cancle");
		dispatch({ type: UPDATE_SUBJECT, subjectName: null });
	}, []);

	const confirm = useCallback(() => {
		console.log("confirm");
		const changedCheckList = stateCheckList
			? filter(stateCheckList, checklist => {
					checkList !== "";
			  })
			: null;

		const onUpdate = true;
		dispatch({
			type: UPDATE_SUBJECT,
			subjectName,
			changedCheckList,
			onUpdate
		});
	}, []);

	return (
		<>
			<div className="popup">
				<div className="popup_update">
					<span className="header">{subjectName}</span>
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
													onClickIcon: onClickMinus
												}}
											/>
										</li>
									);
								})}
						</ul>
					</form>
					<div className="popup__button_bar">
						<Button
							className="cancle"
							onClickBtn={cancle}
							content="취소"></Button>
						<Button
							className="confirm"
							onClickBtn={confirm}
							content="확인"></Button>
					</div>
				</div>
			</div>
		</>
	);
});

export default SubjectUpdate;
