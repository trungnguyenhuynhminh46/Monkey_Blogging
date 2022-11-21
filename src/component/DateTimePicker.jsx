import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// Components
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import format from "date-fns/format";

const StyledCalendarElement = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(calc(100% + 8px));
  z-index: 10;
`;

const DatetimePicker = ({
  name,
  id,
  defaultDate = new Date(),
  onChange,
  ...props
}) => {
  // States, variables, ref
  const [selectedDate, setSelectedDate] = useState("");
  const [show, setShow] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const calendarRef = useRef(null);
  // Effects
  useEffect(() => {
    setSelectedDate(format(defaultDate, "dd/MM/yyyy"));
    // Events listeners
    document.addEventListener("keydown", hideOnEsc, true);
    document.addEventListener("click", hideOnClickOutSide, true);
  }, []);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate]);
  // Functions, Handlers

  const hideOnEsc = (e) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  };

  const hideOnClickOutSide = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  const handleSelect = (date) => {
    if (!isDirty) {
      setIsDirty(true);
    }
    setSelectedDate(format(date, "dd/MM/yyyy"));
  };

  const handleToggleShow = () => {
    setShow((show) => {
      return !show;
    });
  };

  return (
    <div
      ref={calendarRef}
      className="relative w-full inline-flex flex-grow-0 flex-col gap-4"
    >
      <input
        type="text"
        value={selectedDate}
        onClick={handleToggleShow}
        readOnly
        className={`w-full min-w-[332px] p-5 outline-none border border-solid cursor-pointer rounded-lg text-[#84878B] transition-all ease-linear duration-300 ${
          isDirty
            ? "border-[#2EBAC1] bg-white"
            : "border-transparent bg-[#E7ECF3]"
        }`}
      />

      <StyledCalendarElement>
        {show && <Calendar date={defaultDate} onChange={handleSelect} />}
      </StyledCalendarElement>
    </div>
  );
};

export default DatetimePicker;
