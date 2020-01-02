import React from "react";

const PlayButton = ({ size }) => {
	const className = "fas fa-play-circle" + size;
	return (
		<>
			<i class={className}></i>
		</>
	);
};
export default PlayButton;
