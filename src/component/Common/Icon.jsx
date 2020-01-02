import React, { useEffect, memo } from "react";

const Icon = memo(({ iconInfo, style }) => {
	const { className, onClickIcon } = iconInfo;

	return (
		<>
			<i className={className} onClick={onClickIcon} style={style}></i>
		</>
	);
});

export default Icon;
