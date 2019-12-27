import React, {
	useState,
	useEffect,
	memo,
	useCallback,
	createContext,
	useMemo,
	useReducer
} from "react";
import Icon from "../Common/Icon.jsx";
import SubjectCreate from "../Main/SubjectCreate.jsx";
import SubjectListBar from "../Main/SubjectListBar.jsx";
Date.prototype.format = function(f) {
	if (!this.valueOf()) {
		return " ";
	}
	const date = this;
	String.prototype.zero = function() {
		return "0" + this;
	};
	Number.prototype.zero = function() {
		return this.toString().zero();
	};
	var h, m, s;
	return f.replace(/(yyyy|MM|DD|dd|hh|mm|ss)/gi, replaced => {
		switch (replaced) {
			case "yyyy":
				return date.getFullYear();
			case "MM":
				return date.getMonth() + 1;
			case "DD":
				return date.getDate();
			case "dd":
				return date.getDate();
			case "hh":
				return (h = date.getHours()) < 10 ? h.zero() : h;
			case "mm":
				return (m = date.getMinutes()) < 10 ? m.zero() : m;
			case "ss":
				return (s = date.getSeconds()) < 10 ? s.zero() : s;
			default:
				return replaced;
		}
	});
};
const date = new Date();

const today = date.format("yyyy.MM.DD");
const parseHours = strHours => {
	if (typeof strHours !== "string") {
		return "Not String";
	}

	const hours = parseInt(strHours.slice(0, 2));
	const min = parseInt(strHours.slice(3, 5));
	const sec = parseInt(strHours.slice(6, 8));

	return {
		hours: hours,
		min: min,
		sec: sec
	};
};

const initialState = {
	subjects: [],
	isCreate: false,
	totalTime: "00:00:00",
	onUpdate: false
};

export const StopWatchContext = createContext({
	subjects: [],
	isCreate: false,
	dispatch: () => {},
	onUpdate: false
});
export const COUNT_TOTAL_TIME = "COUNT_TOTAL_TIME";
export const ADD_SUBJECT = "ADD_SUBJECT";
export const IS_CREATE = "IS_CREATE";
export const START_TIME = "START_TIME";
export const END_TIME = "END_TIME";
export const UPDATE_SUBJECT = "UPDATE_SUBJECT";

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_SUBJECT: {
			return {
				...state,
				subjects: [
					...state.subjects,
					{ subjectName: action.subjectName, timeOn: false }
				],
				isCreate: false
			};
		}
		case IS_CREATE: {
			const isCreate = action.isCreate ? false : true;

			return {
				...state,
				isCreate: isCreate
			};
		}
		case START_TIME: {
			const runningSubject = action.subjectName;
			const prevSubject = [...state.subjects];
			const resultSubjects = prevSubject.map(subject => {
				const name = subject.subjectName;
				let timeOn;
				if (name === runningSubject) {
					timeOn = true;
				} else {
					timeOn = false;
				}
				return {
					subjectName: name,
					timeOn: timeOn
				};
			});
			return {
				...state,
				subjects: resultSubjects
			};
		}
		case END_TIME: {
			const pausingSubject = action.subjectName;
			const prevSubject = [...state.subjects];
			const resultSubjects = prevSubject.map(subject => {
				const name = subject.subjectName;
				let timeOn;
				if (name === pausingSubject) {
					timeOn = false;
				}
				return {
					subjectName: name,
					timeOn: timeOn
				};
			});
			return {
				...state,
				subjects: resultSubjects
			};
		}
		case UPDATE_SUBJECT: {
			const onUpdate = state.onUpdate ? false : true;

			return {
				...state,
				onUpdate: onUpdate
			};
		}
		case COUNT_TOTAL_TIME: {
			//뭐가 됐든 무조건 1초씩 증가하면 되겠넹
			const date = new Date();
			const { hours, min, sec } = parseHours(state.totalTime);
			date.setHours(hours, min, sec + 1);
			const nextHours = date.format("hh:mm:ss");
			return {
				...state,
				totalTime: nextHours
			};
		}
		default:
			return;
	}
};
const StopWatch = memo(() => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { subjects, isCreate, onUpdate } = state;

	const value = useMemo(() => {
		return {
			subjects: subjects,
			dispatch: dispatch
		};
	}, [subjects]);

	const onClickAdd = useCallback(() => {
		dispatch({ type: IS_CREATE, isCreate });
	}, [isCreate]);

	return (
		<StopWatchContext.Provider value={value}>
			<div className="main">
				{isCreate && <SubjectCreate></SubjectCreate>}
				{onUpdate && <div>ONUPDATEPAGE</div>}
				<div className="stopWatch">
					<div className="stopWatch__time">
						<p className="time__date">{today}</p>
						<p className="time__study_time">{state.totalTime}</p>
					</div>
					<div className="stopWatch__subject">
						{subjects.map((subject, i) => {
							return (
								<SubjectListBar
									key={subject.subjectName}
									subjectName={subject.subjectName}
									timeOn={subject.timeOn}
								/>
							);
						})}
						<div className="subject__list" onClick={onClickAdd}>
							<Icon
								iconInfo={{
									className: "fas fa-plus-circle"
								}}
								style={{ padding: 10 }}
							/>
							과목 추가하기
						</div>
					</div>
				</div>
			</div>
		</StopWatchContext.Provider>
	);
});

export default StopWatch;
