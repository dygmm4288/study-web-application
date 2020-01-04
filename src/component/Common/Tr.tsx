import * as React from "react";
type TrProps = {
	className?: string;
	children?: JSX.Element | JSX.Element[];
};
const Tr = ({ className, children }: TrProps) => {
	return <tr className={className}>{children}</tr>;
};
export default Tr;
