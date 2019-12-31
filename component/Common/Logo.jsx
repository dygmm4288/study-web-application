import React, { memo } from "react";

const Logo = memo(({ logoText }) => {
	return (
		<>
			{/* <span className="header__logo">{logo}</span> */}
			<div className="header__logo">{logoText}</div>
		</>
	);
});

export default Logo;
