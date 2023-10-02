import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import TimeStamps from "./TimeStamps";

const Counter = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const launchTime = new Date(launchDate);
      const diffInSeconds = differenceInSeconds(launchTime, now);

      if (diffInSeconds <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diffInSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
        const seconds = diffInSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  return (
    <div className="text-center">
      {timeLeft.days >= 0 ? (
        <div className="flex items-center justify-between">
          <TimeStamps key="days" Countnumber={timeLeft.days} content="Days" />
          <TimeStamps
            key="hours"
            Countnumber={timeLeft.hours}
            content="Hours"
          />
          <TimeStamps
            key="mins"
            Countnumber={timeLeft.minutes}
            content="Minutes"
          />
          <TimeStamps
            key="Seconds"
            Countnumber={timeLeft.seconds}
            content="Seconds"
          />
        </div>
      ) : (
        <p>Not Specified</p>
      )}
    </div>
  );
};

export default Counter;
