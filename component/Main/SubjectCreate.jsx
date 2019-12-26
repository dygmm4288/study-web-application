import React, {
	memo,
	useRef,
	useEffect,
	useState,
	useContext,
	useCallback
} from "react";
import Icon from "../Common/Icon.jsx";
import { StopWatchContext, ADD_SUBJECT, IS_CREATE } from "./StopWatch";
//dispatch
const SubjectCreate = memo(() => {
	const [value, setValue] = useState("");
	const [checkLists, setCheckLists] = useState([""]);
	const inputRef = useRef(null);
	const { dispatch } = useContext(StopWatchContext);

	const onChangeInput = useCallback(() => {
		e => {
			return setValue(e.target.value);
		};
	}, []);

	const AddSubject = useCallback(() => {
		const subjectName = inputRef.current.value;
		dispatch({ type: ADD_SUBJECT, subjectName });
	}, []);
	const Cancle = () => {
		const isCreate = true;
		dispatch({ type: IS_CREATE, isCreate });
	};

	const onSubmitForm = useCallback(() => {
		e => {
			e.preventDefault();
			const subjectName = inputRef.current.value;
			dispatch({ type: ADD_SUBJECT, subjectName });
		};
	}, []);
	const AddCheckList = useCallback(() => {
		const checkList = [...checkLists];
		checkList.push("");
		setCheckLists(checkList);
	}, [checkLists]);

	return (
		<>
			<form className="popup_form" onSubmit={onSubmitForm}>
				<label className="form__label">측정할 과목 이름</label>
				<input
					ref={inputRef}
					placeholder="ex) 영어, 수학, 한국사..."
					className="form__input"
					onChange={onChangeInput}
					type="text"
					required
				/>
				<div className="form__checkList">
					<label className="form__label">체크 리스트</label>
					<Icon
						iconInfo={{
							className: "fas fa-plus",
							onClickIcon: AddCheckList
						}}
					/>
				</div>
				{checkLists.map((list, i) => {
					return (
						<input
							key={"checkList" + i}
							type="text"
							placeholder="ex)영어 1단원 속독"
							className="form__input"
							onChange={onChangeInput}
						/>
					);
				})}
				<div className="form__select">
					<Icon
						iconInfo={{
							className: "far fa-arrow-alt-circle-left fa-2x",
							onClickIcon: Cancle
						}}></Icon>
					<Icon
						iconInfo={{
							className: "far fa-arrow-alt-circle-right fa-2x",
							onClickIcon: AddSubject
						}}></Icon>
				</div>
			</form>
		</>
	);
});
export default SubjectCreate;
