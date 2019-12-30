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
import SubjectUpdate from "../Main/SubjectUpdate.jsx";

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
const include = (arr, predi) => {
	for (let i = 0, len = arr.length; i < len; i++) {
		if (predi(arr[i])) return true;
	}
	return false;
};
const filter = (list, predi) => {
	const result = [];
	for (let i = 0, len = list.length; i < len; i++) {
		if (predi(list[i])) result.push(list[i]);
	}
	return result;
};
const find = (list, predi) => {
	for (let i = 0, len = list.length; i < len; i++) {
		if (predi(list[i])) return list[i];
	}
	return null;
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
	onUpdate: false,
	currentSelect: ""
};

export const StopWatchContext = createContext({
	subjects: [{ subjectName: "", timeOn: false, time: "0:0:0" }],
	isCreate: false,
	dispatch: () => {},
	onUpdate: false,
	currentSelect: ""
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
			const exsistSubject = include(state.subjects, subject => {
				return subject.subjectName === action.subjectName;
			});
			if (exsistSubject) {
				alert("이미 등록된 과목입니다");
			} else {
				return {
					...state,
					subjects: [
						...state.subjects,
						{
							subjectName: action.subjectName,
							timeOn: false,
							time: "0:0:0"
						}
					],
					isCreate: false
				};
			}
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
			const current = action.subjectName;
			if (action.changedCheckList) {
				//서버에서 체크리스트 가져오든가 해야할 듯
				//중복 값 제거 상태 DB에 저장해서 불러오거나 할 수 있도록...
			}
			if (action.delete) {
				//서버에서 체크리스트를 삭제하든가 해야할 듯

				//화면에서 삭제
				const subjects = [...state.subjects];
				const resultSubjects = filter(subjects, subject => {
					return action.subjectName !== subject.subjectName;
				});
				return {
					...state,
					onUpdate: onUpdate,
					subjects: resultSubjects
				};
			}
			return {
				...state,
				onUpdate: onUpdate,
				currentSelect: current
			};
		}
		case COUNT_TOTAL_TIME: {
			//뭐가 됐든 무조건 1초씩 증가하면 되겠넹
			const date = new Date();

			const { hours, min, sec } = parseHours(state.totalTime);

			date.setHours(hours, min, sec + 1);
			const nextHours = date.format("hh:mm:ss");
			const timeState = action.timeState;
			date.setHours(timeState.hours, timeState.min, timeState.sec);
			const nextTime = date.format("hh:mm:ss");
			const subjects = [...state.subjects].map(subject => {
				if (subject.subjectName === action.subjectName) {
					return {
						subjectName: action.subjectName,
						timeOn: true,
						time: nextTime
					};
				} else {
					return subject;
				}
			});
			return {
				...state,
				totalTime: nextHours,
				subjects: subjects
			};
		}
		default:
			return;
	}
};
const StopWatch = memo(() => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { subjects, isCreate, onUpdate, currentSelect } = state;

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
				{onUpdate && (
					<SubjectUpdate subjectName={currentSelect}>
						ONUPDATEPAGE
					</SubjectUpdate>
				)}
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
