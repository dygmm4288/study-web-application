import * as React from "react";

type TdProps = {
	data?: string;
	className?: string;
};

const Td = ({ className, data }: TdProps) => {
	return (
		<>
			<td className="className">{data}</td>
		</>
	);
};

export default Td;
