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

import * as Icon from "../Common/Icon.jsx";

type TableContextProps = {
	calendarTable: string[];
	dispatch: ({ type }: { type: string }) => void;
};
export const TableContext = createContext({} as TableContextProps);
const initalState = {
	calendarTable: []
};
type InitalState = {
	calendarTable: string[][];
	dispatch: () => React.Dispatch<Action>;
};
type Action = { type: "INIT_ARRAY" };
const reducer = (state: InitalState, action: Action): any => {
	switch (action.type) {
		case "INIT_ARRAY":
			const date = new Date();
			const calendarTable = fillCalendar(date);

			return {
				calendarTable: calendarTable
			};
	}
};

const renderDays = (): JSX.Element[] => {
	const days = ["월", "화", "수", "목", "금", "토", "일"];

	const result = days.map((day: string) => {
		return <Td data={day}></Td>;
	});

	return result;
};
const renderCalendar = (table: number[][]): JSX.Element[] => {
	let result: JSX.Element[] = [];

	for (let i = 0, row: number = table.length; i < row; i++) {
		const tdData: JSX.Element[] = table[i].map(
			(data: number, index: number): JSX.Element => {
				console.log(data);
				return data !== 0 ? (
					<Td data={data.toString()} key={`${index}:${data}`}></Td>
				) : (
					<Td data={""} key={`${index}:${data}`}></Td>
				);
			}
		);

		result[i] = <Tr children={tdData} key={`row${i}`}></Tr>;
		console.log(`result[${i}] data is : ${result[i]}`);
	}
	return result;
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
	const { calendarTable } = state;

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

	return (
		<TableContext.Provider value={value}>
			<div className="main">
				<div className="calendar">
					<div className="calendar__head">
						<div className="head__logo"></div>
						<div className="head__nav"></div>
					</div>
					<div className="calendar__body">
						<table>
							{/* 요일 */}
							<Tr children={renderDays()}></Tr>
							{/* 켈린더가 들어갈 자리 */}
							{renderCalendar(calendarTable)}
						</table>
					</div>
				</div>
				<div className="calendar_history"></div>
			</div>
		</TableContext.Provider>
	);
};

export default Calendar;
