import React, { memo, useRef, useEffect, useState, useContext } from "react";
import Icon from "../Common/Icon.jsx";
import { StopWatchContext, ADD_SUBJECT, IS_CREATE } from "./StopWatch";
//dispatch
const SubjectCreate = memo(() => {
	const [value, setValue] = useState("");
	const inputRef = useRef(null);
	const { dispatch } = useContext(StopWatchContext);
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	const onChangeInput = e => {
		return setValue(e.target.value);
	};

	const AddSubject = e => {
		const subjectName = inputRef.current.value;
		dispatch({ type: ADD_SUBJECT, subjectName });
	};
	const Cancle = e => {
		e.preventDefault();
		const isCreate = false;
		dispatch({ type: IS_CREATE, isCreate });
	};
	const onSubmitForm = e => {
		e.preventDefault();
		const subjectName = inputRef.current.value;
		dispatch({ type: ADD_SUBJECT, subjectName });
	};

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
