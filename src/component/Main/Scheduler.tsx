import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import Icon from "../Common/Icon.jsx";
type Color = string;
export type Schedule = {
	content: string;
	color: Color;
};
type Scheduler = {
	schedules: Schedule[];
};
type SchedulerList = {
	data: {
		color: Color;
		content: string;
	};
};
type ColorCircle = {
	color: Color;
};
const ellipsis_v = "fas fa-ellipsis-v";

const ColorCircle = ({ color }: ColorCircle) => {
	return (
		<>
			<div className={`border-circle ${color}`}></div>
		</>
	);
};
const SchedulerList = ({ data }: SchedulerList) => {
	const color = data.color;
	const content = data.content;
	const onClickIcon = useCallback(() => {
		//dispatch
		console.log("click icon ellipsis");
	}, []);

	console.log("content is :", content);
	return (
		<>
			<div className="scheduler__list">
				<ColorCircle color={color}></ColorCircle>
				<div>{content}</div>
				<Icon
					iconInfo={{
						className: ellipsis_v,
						onClickIcon: onClickIcon
					}}></Icon>
			</div>
		</>
	);
};
const Scheduler = ({ schedules }: Scheduler) => {
	console.log(schedules);
	return (
		<>
			<div className="scheduler">
				<ul>
					{schedules &&
						schedules.map(schedule => {
							return (
								<li>
									<SchedulerList
										data={schedule}></SchedulerList>
								</li>
							);
						})}
				</ul>
			</div>
		</>
	);
};

export default Scheduler;
