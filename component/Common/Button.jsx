import React, { memo } from "react";

const Button = memo(({ content, className, onClickBtn }) => {
	return (
		<button className={className} onClick={onClickBtn}>
			{content}
		</button>
	);
});

export default Button;
