import React, {
	useState,
	memo,
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
		if (predi(list[i], i)) result.push(list[i]);
	}
	return result;
};
const minus = "fas fa-minus-circle";
const plus = "fas fa-plus-circle";
const trash = "fas fa-trash-alt";
const SubjectUpdate = memo(({ subjectName, checkList }) => {
	const { dispatch } = useContext(StopWatchContext);
	const [stateCheckList, setStateCheckList] = useState(checkList);

	const printInput = (list, i) => {
		if (list !== "")
			return (
				<input
					name={i}
					type="text"
					placeholder={list}
					onChange={onChangeInput}
				/>
			);
		else
			return (
				<input
					name={i}
					type="text"
					placeholder="ex) 영어 1단원..."
					onChange={onChangeInput}
				/>
			);
	};

	const onChangeInput = e => {
		const current = e.currentTarget.value;
		const currentIndex = e.currentTarget.attributes["name"].value;
		const checkList = [...stateCheckList];

		checkList[currentIndex] = current;
		setStateCheckList(checkList);
	};

	const onClickTrash = useCallback(() => {
		dispatch({ type: UPDATE_SUBJECT, subjectName, delete: true });
	});

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
			checkLists.pop();
			setStateCheckList(checkLists);
		},
		[stateCheckList]
	);

	const cancle = useCallback(() => {
		console.log("cancle");
		dispatch({ type: UPDATE_SUBJECT, subjectName: null });
	}, []);

	const confirm = useCallback(() => {
		console.log("confirm");
		if (stateCheckList === undefined) {
			dispatch({
				type: UPDATE_SUBJECT,
				subjectName,
				changedCheckList: []
			});
			return;
		}
		const checkLists = [...stateCheckList];
		//중복 알아서 제거.

		const changedCheckList = checkLists.reduce((unique, item) => {
			return unique.includes(item) ? unique : [...unique, item];
		}, []);

		dispatch({
			type: UPDATE_SUBJECT,
			subjectName,
			changedCheckList
		});
	}, [stateCheckList]);

	return (
		<>
			<div className="popup">
				<div className="popup_update">
					<div className="header">
						<span>{subjectName}</span>
						<Icon
							iconInfo={{
								className: trash,
								onClickIcon: onClickTrash
							}}></Icon>
					</div>
					<div className="headerCheckList">
						<span>체크리스트</span>
						<div>
							<Icon
								iconInfo={{
									className: plus,
									onClickIcon: onClickIcon
								}}></Icon>
							<Icon
								iconInfo={{
									className: minus,
									onClickIcon: onClickMinus
								}}
							/>
						</div>
					</div>
					<form className="popup__form">
						<ul>
							{stateCheckList &&
								stateCheckList.map((list, i) => {
									return (
										<li key={subjectName + "checklist" + i}>
											{printInput(list, i, subjectName)}
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
