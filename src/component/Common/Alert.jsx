import React, { memo, useCallback } from "react";
import Button from "./Button.jsx";

const Alert = memo(({ content, onClick }) => {
	const cancle = onClick[0];
	const confirm = onClick[1];

	return (
		<>
			<div className="alert">
				{content}
				<Button
					className={}
					content={"예"}
					onClickBtn={cancle}></Button>
				<Button
					className={}
					content={"아니요"}
					onClickBtn={confirm}></Button>
			</div>
		</>
	);
});
export default Alert;
