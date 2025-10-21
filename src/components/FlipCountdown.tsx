import { useEffect, useRef, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (target: string): TimeLeft => {
  const total = new Date(target).getTime() - Date.now();
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
  return { days, hours, minutes, seconds };
};

const FlipUnit = ({ value, label }: { value: number; label: string }) => {
  const padded = value.toString().padStart(2, "0");
  const prevValueRef = useRef(padded);
  const [shouldAnimate, setShouldAnimate] = useState([false, false]);

  useEffect(() => {
    const prev = prevValueRef.current.split("");
    const curr = padded.split("");
    const changed = curr.map((digit, i) => digit !== prev[i]);
    setShouldAnimate(changed);
    prevValueRef.current = padded;
  }, [padded]);

  return (
    <div className="flip-unit">
      <div className="flip-digits">
        {padded.split("").map((digit, i) => (
          <div
            key={i}
            className={`flip-container ${shouldAnimate[i] ? "animate-flip" : ""}`}
          >
            <div className="flip-card">{digit}</div>
          </div>
        ))}
      </div>
      <span className="flip-label text-white">{label}</span>
    </div>
  );
};

const FlipCountdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <style>
        {`
          .flip-countdown {
            border: 2px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.5rem;
            font-family: sans-serif;
          }

          @media (max-width: 767px) {
            .flip-countdown {
              display: none !important;
            }
          }

          .flip-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .flip-digits {
            display: flex;
          }

          .flip-label {
            color: white;
            font-family: 'DM Sans', sans-serif;
            font-weight: 400;
            font-size: 0.75rem;
            margin-top: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .flip-container {
            width: 3rem;
            height: 4rem;
            margin: 0 0.25rem;
          }

          .flip-card {
            background: white;
            color: #A3841D;
            font-weight: bold;
            font-size: 2rem;
            width: 100%;
            height: 100%;
            border-radius: 0.375rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
            transform-style: preserve-3d;
            backface-visibility: hidden;
          }

          @media (max-width: 768px) {
            .flip-container {
              width: 2.5rem;
              height: 3.25rem;
            }

            .flip-card {
              font-size: 1.5rem;
            }

            .flip-label {
              font-size: 0.65rem;
            }
          }
        `}
      </style>

      <div className="flip-countdown py-4 px-4 mt-2 rounded-lg hidden md:flex">
        <FlipUnit value={timeLeft.days} label="Days" />
        <FlipUnit value={timeLeft.hours} label="Hours" />
        <FlipUnit value={timeLeft.minutes} label="Minutes" />
        <FlipUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </>
  );
};

export default FlipCountdown;
