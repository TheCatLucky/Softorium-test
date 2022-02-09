export const dateConversion = (date: Date|null) => {
	if (date === null) {
		return;
	}
	let d: string | number = date.getDate();
	let m: string | number = date.getMonth() + 1;
	let y: string | number = date.getFullYear();
	if (m <= 9) {
		m = `0${m}`;
	}
	if (d < 9) {
		d = `0${d}`;
	}
	return `${y}-${m}-${d}`;
};
