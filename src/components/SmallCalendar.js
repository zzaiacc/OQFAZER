import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-yellow-100 rounded-full text-purple-500 font-bold";
    } else if (currDay === slcDay) {
      return "bg-purple-300 rounded-full text-yellow-100 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-semibold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx))
            .locale("pt-br")
            .format("MMMM YYYY")
            .toUpperCase()}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 border-2 border-yellow-100 rounded-md p-1">
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            className="text-sm py-1 text-center text-purple-500 font-bold"
          >
            {day
              .locale("pt-br")
              .format("ddd")
              .charAt(0)
              .toUpperCase()}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">
                  {day.locale("pt-br").format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
