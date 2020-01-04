import * as React from "react";
type TrProps = {
	data: string;
};
const Tr = ({ data }: TrProps) => {
	return <tr>{data}</tr>;
};
export default Tr;
