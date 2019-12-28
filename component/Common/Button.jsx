import React from "react";

const Button = ({ content, className, onClickBtn }) => {
	return (
		<button className={className} onClickBtn={onClickBtn}>
			{content}
		</button>
	);
};

export default Button;
