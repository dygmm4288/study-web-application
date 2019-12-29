import React from "react";

const Button = ({ content, className, onClickBtn }) => {
	return (
		<button className={className} onClick={onClickBtn}>
			{content}
		</button>
	);
};

export default Button;
