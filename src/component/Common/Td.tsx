import * as React from "react";

type TdProps = {
	data: string;
};

const Td = ({ data }: TdProps) => {
	return (
		<>
			<td>{data}</td>
		</>
	);
};

export default Td;
