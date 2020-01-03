import * as React from "react";
import {useState} from 'react';
import * as Icon from "../Common/Icon.jsx";

const renderDays = (): string => {
	const days = ["월", "화", "수", "목", "금", "토", "일"];
	let result = "<tr>";
	for (let i = 0; i < 7; i++) {
		result += `${days[i]}</tr><tr>`;
	}
	result = result.replace(/<tr>$/, "");
	console.log(result);
	return result;
};
const renderCalendar = (): string => {
	let resultCalendar = "";

	return resultCalendar;
};

const Calendar = () => {
	const [calendarData, setCalendarData] = useState<string[]>([]);

	const fillCalendarData = (): string[] => {
		const tableData = [];
		for(let i = 0;i<6;i++) {
			tableData[i] = new Array().fill(0);
		}
		console.log(tableData);
		
	}
	
	return (
		<>
			<div className="main">
				<div className="calendar">
					<div className="calendar__head">
						<div className="head__logo"></div>
						<div className="head__nav"></div>
					</div>
					<div className="calendar__body">
						<table>
							{/* 요일 */}
							{renderDays()}
							{/* 켈린더가 들어갈 자리 */}
						</table>
					</div>
				</div>
				<div className="calendar_history"></div>
			</div>
		</>
	);
};

export default Calendar;
