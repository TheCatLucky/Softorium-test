import ru from "date-fns/locale/ru";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("ru", ru);

type Props = {
	date: Date | null;
	handleDateChange: (date: Date) => void;
};
const PickData: FC<Props> = ({ date, handleDateChange }) => {
	return (
		<>
			<DatePicker
				selected={date}
				onChange={handleDateChange}
				dateFormat="yyyy/MM/dd"
				required
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				fixedHeight
				locale="ru"
				placeholderText="Дата рождения"
				maxDate={new Date()}
			/>
		</>
	);
};

export default PickData;
