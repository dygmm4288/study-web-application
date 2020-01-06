type DateType = string;
interface Date {
	format: (f: string) => string;
}
Date.prototype.format = function(f: string): DateType {
	const date: Date = this;
	return f.replace(
		/yyyy|MM|DD|dd|hh|mm|ss/gi,
		(replaced: string): DateType => {
			switch (replaced) {
				case "yyyy":
					return date.getFullYear().toString();
				case "MM":
					return (date.getMonth() + 1).toString();
				case "DD":
					return date.getDate().toString();
				case "dd":
					return date.getDay().toString();
				case "hh":
					let h = date.getHours().toString();
					return h < "10" ? "0" + h : h;
				case "mm":
					let m = date.getMinutes().toString();
					return m < "10" ? "0" + m : m;
				case "ss":
					let s = date.getSeconds().toString();
					return s < "10" ? "0" + s : s;
			}
		}
	);
};
