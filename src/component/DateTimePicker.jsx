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
  // console.log(defaultDate);
  // States, variables, ref
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [show, setShow] = useState(false);
  const calendarRef = useRef(null);
  // Effects
  useEffect(() => {
    setSelectedDate(defaultDate);
    // Events listeners
    document.addEventListener("keydown", hideOnEsc, true);
    document.addEventListener("click", hideOnClickOutSide, true);
  }, [defaultDate]);

  useEffect(() => {
    onChange(format(selectedDate, "dd/MM/yyyy"));
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
    setSelectedDate(date);
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
        value={format(selectedDate, "dd/MM/yyyy")}
        onClick={handleToggleShow}
        readOnly
        className={`w-full min-w-[332px] p-5 outline-none border border-solid cursor-pointer rounded-lg text-[#84878B] transition-all ease-linear duration-300 ${
          show ? "border-[#2EBAC1] bg-white" : "border-transparent bg-[#E7ECF3]"
        }`}
      />

      <StyledCalendarElement>
        {show && <Calendar date={selectedDate} onChange={handleSelect} />}
      </StyledCalendarElement>
    </div>
  );
};

export default DatetimePicker;
