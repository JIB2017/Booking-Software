import { useState } from "react";
import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calendar = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getItems = () => {
    if (!date.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 17 });
    const interval = 30;

    const times = [];

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getItems();

  return (
    <div className="flex-center h-screen flex-col">
      {date.justDate ? (
        <div className="flex-center flex-row gap-2">
          {times?.map((time, value) => (
            <div key={`time-${value}`} className="rounded-sm bg-green-300 p-2">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, justDate: time }))}
              >{format(time,"kk:mm")}</button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          locale="sp"
          minDate={new Date()}
          className="py-2"
          view="month"
          onClickDay={(date) =>
          setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
