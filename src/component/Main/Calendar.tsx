import * as React from "react";
import {
	useState,
	useCallback,
	useEffect,
	createContext,
	useReducer,
	useMemo
} from "react";
import Td from "../Common/Td";
import Tr from "../Common/Tr";
import "../Common/Date";
import Icon from "../Common/Icon.jsx";
import { Schedule } from "./Scheduler";
import Scheduler from "./Scheduler";

const right_arrow = "fas fa-chevron-right fa-2x";
const left_arrow = "fas fa-chevron-left fa-2x";

type TableContextProps = {
	calendarTable: string[];
	dispatch: ({ type }: { type: string }) => void;
};
export const TableContext = createContext({} as TableContextProps);
const initalState = {
	calendarTable: [],
	onDay: ""
};
type InitalState = {
	calendarTable: string[][];
	dispatch: () => React.Dispatch<Action>;
	onDay: string;
};
type Action =
	| { type: "INIT_ARRAY" }
	| { type: "NEXT_MONTH"; onDay: string }
	| { type: "PREV_MONTH"; onDay: string }
	| { type: "CHANGE_MONTH"; onDay: string; isPrev?: string };
const reducer = (state: InitalState, action: Action): any => {
	switch (action.type) {
		case "INIT_ARRAY": {
			const date = new Date();
			const calendarTable = fillCalendar(date);
			return {
				calendarTable: calendarTable,
				onDay: date.format("yyyy.MM")
			};
		}
		case "CHANGE_MONTH": {
			const onDay: number[] = action.onDay
				.split(".")
				.map((time: string): number => parseInt(time));
			const date =
				action.isPrev === "left"
					? new Date(onDay[0], onDay[1] - 1, 0)
					: new Date(onDay[0], onDay[1] + 1, 0);
			const calendarTable = fillCalendar(date);

			return {
				...state,
				calendarTable,
				onDay: date.format("yyyy.MM")
			};
		}
		case "CHANGE_CURRENT_DATE": {
			//onDay 2020.1
			const { onDay, schedules } = state;
			const selected_date = onDay + "." + action.date;

			if (!selected_date) {
				return {
					...state
				};
			}
			const selected_schedule = _.filter(
				schedules,
				schedule => schedule.key === selected_date
			);
			return {
				...state,
				showingSchedules: selected_schedule
			};
		}
	}
};

const renderDays = (): JSX.Element => {
	const days: string[] = ["일", "월", "화", "수", "목", "금", "토"];

	const result = days.map((day: string) => {
		return <div className="calendar__date">{day}</div>;
	});

	return <div className="calendar__week">{result}</div>;
};

const initArray = (size: number, length: number): number[][] => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result[i] = Array(size).fill(0);
	}
	return result;
};

const fillTable = (
	table: number[][],
	startDay: number,
	endDate: number,
	value: number,
	week: number
): number[][] => {
	if (value > endDate) {
		return table;
	}
	table[week][startDay++] = value++;
	if (startDay === 7) {
		startDay = 0;
		week++;
	}
	return fillTable(table, startDay, endDate, value, week);
};
const fillCalendar = (today: Date) => {
	let tableCalendar: number[][] = initArray(7, 6);

	const year: number = today.getFullYear(),
		month: number = today.getMonth(),
		thisDate: Date = new Date(year, month, 1),
		lastDate: Date = new Date(year, month + 1, 0);

	tableCalendar = fillTable(
		tableCalendar,
		thisDate.getDay(),
		lastDate.getDate(),
		1,
		0
	);
	return tableCalendar;
};
const Calendar = () => {
	const [state, dispatch] = useReducer(reducer, initalState);
	const { calendarTable, onDay, showingSchedules, schedules } = state;

	const renderCalendar = (table: number[][]): JSX.Element[] => {
		let result: JSX.Element[] = [];
		for (let i = 0, row: number = table.length; i < row; i++) {
			const tdData: JSX.Element[] = table[i].map(
				(data: number, index: number): JSX.Element => {
					const thisDate: string | undefined =
						data !== 0 ? onDay + "." + data.toString() : undefined;

					return data !== 0 ? (
						<div className="calendar__date">{data}</div>
					) : (
						<div className="calendar__date"></div>
					);
				}
			);

			result[i] = <div className="calendar__week">{tdData}</div>;
		}
		return result;
	};

	const value = useMemo(
		() => ({
			calendarTable: calendarTable,
			dispatch: dispatch
		}),
		[calendarTable]
	);
	useEffect(() => {
		dispatch({ type: "INIT_ARRAY" });
	}, []);
	const onClickLeft = useCallback(() => {
		dispatch({ type: "CHANGE_MONTH", onDay, isPrev: "left" });
	}, [onDay]);
	const onClickRight = useCallback(() => {
		dispatch({ type: "CHANGE_MONTH", onDay, isPrev: "right" });
	}, [onDay]);

	return (
		<TableContext.Provider value={value}>
			<div className="main">
				<div className="calendar">
					<div className="calendar__head">
						<Icon
							iconInfo={{
								className: left_arrow,
								onClickIcon: onClickLeft
							}}></Icon>

						<div className="head__logo">{onDay}</div>

						<Icon
							iconInfo={{
								className: right_arrow,
								onClickIcon: onClickRight
							}}></Icon>
					</div>
					<div className="calendar__body">
						{renderDays()}
						{renderCalendar(calendarTable)}
					</div>
				</div>
				<div className="calendar__schedule">
					{/* schedules 어떻게 데이터 처리 할 것인지 */}
					<Scheduler schedules={showingSchedules}></Scheduler>
				</div>
			</div>
		</TableContext.Provider>
	);
};

export default Calendar;
