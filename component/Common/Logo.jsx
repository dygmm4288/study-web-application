import React, { memo, useEffect, useState } from "react";

const Logo = ({ logoText }) => {
	const [logo, setLogo] = useState("");
	useEffect(() => {
		console.log("logo use effect");
		setLogo(logoText);
	}, [logo]);
	return (
		<>
			{/* <span className="header__logo">{logo}</span> */}
			<div className="header__logo">{logo}</div>
		</>
	);
};

export default Logo;
