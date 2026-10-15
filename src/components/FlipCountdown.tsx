import { useEffect, useState } from "react";

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

// One split-flap card. When the digit changes, the top half of the old digit
// folds down, then the bottom half of the new one falls into place.
const FlipDigit = ({ digit }: { digit: string }) => {
  const [flip, setFlip] = useState({ prev: digit, curr: digit, count: 0 });

  useEffect(() => {
    setFlip((f) =>
      f.curr === digit ? f : { prev: f.curr, curr: digit, count: f.count + 1 },
    );
  }, [digit]);

  return (
    <div className="flip-card">
      <div className="flip-half flip-top">
        <span>{flip.curr}</span>
      </div>
      <div className="flip-half flip-bottom">
        <span>{flip.prev}</span>
      </div>
      {flip.count > 0 && (
        // Keyed by count so each change restarts the animation.
        <div key={flip.count}>
          <div className="flip-half flip-top flap-top">
            <span>{flip.prev}</span>
          </div>
          <div className="flip-half flip-bottom flap-bottom">
            <span>{flip.curr}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const FlipUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flip-unit">
    <div className="flip-digits">
      {value
        .toString()
        .padStart(2, "0")
        .split("")
        .map((digit, i) => (
          <FlipDigit key={i} digit={digit} />
        ))}
    </div>
    <span className="flip-label">{label}</span>
  </div>
);

const FlipCountdown = ({
  targetDate,
  heading,
}: {
  targetDate: string;
  heading: string;
}) => {
  // Computed only in the browser: a server-rendered time would never match the
  // client's and trigger a hydration mismatch.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <>
      <style>
        {`
          /* A frosted panel, so the countdown reads as one card over the photo. */
          .flip-countdown {
            display: flex;
            width: fit-content;
            flex-direction: column;
            align-items: center;
            padding: 1.25rem 1.75rem;
            border-radius: 1rem;
            background: rgba(20, 16, 4, 0.35);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
          }

          /* Label with short gold rules on either side. */
          .flip-heading {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: white;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            margin-bottom: 0.9rem;
          }

          .flip-heading::before,
          .flip-heading::after {
            content: "";
            width: 1.75rem;
            height: 1px;
            background: #F3C02C;
          }


          .flip-units {
            display: flex;
            gap: 1.25rem;
          }

          /* Too wide for phones. */
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
            gap: 0.3rem;
          }

          .flip-label {
            color: white;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.7rem;
            margin-top: 0.4rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .flip-card {
            position: relative;
            border-radius: 0.375rem;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
            width: 2.6rem;
            height: 3.5rem;
            perspective: 200px;
            font-weight: bold;
            font-size: 1.9rem;
            color: #A3841D;
          }

          .flip-half {
            position: absolute;
            left: 0;
            right: 0;
            height: 50%;
            box-sizing: border-box;
            overflow: hidden;
            background: white;
          }

          /* Each half shows its half of a full-height digit. */
          .flip-half span {
            position: absolute;
            left: 0;
            right: 0;
            height: 200%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .flip-top {
            top: 0;
            border-radius: 0.375rem 0.375rem 0 0;
          }

          /* The hinge: a faint dark line above the flaps. */
          .flip-card::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: calc(50% - 0.5px);
            height: 1px;
            background: rgba(0, 0, 0, 0.12);
            z-index: 3;
          }

          .flip-top span {
            top: 0;
          }

          .flip-bottom {
            bottom: 0;
            border-radius: 0 0 0.375rem 0.375rem;
            background: #f7f5ee;
          }

          .flip-bottom span {
            bottom: 0;
          }

          .flap-top {
            z-index: 2;
            transform-origin: bottom;
            backface-visibility: hidden;
            animation: flip-top 0.3s ease-in forwards;
          }

          .flap-bottom {
            z-index: 2;
            transform-origin: top;
            backface-visibility: hidden;
            transform: rotateX(90deg);
            animation: flip-bottom 0.3s ease-out 0.3s forwards;
          }

          /* Hidden once folded, or it sits edge-on across the hinge. */
          @keyframes flip-top {
            to {
              transform: rotateX(-90deg);
              visibility: hidden;
            }
          }

          @keyframes flip-bottom {
            to {
              transform: rotateX(0deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .flap-top,
            .flap-bottom {
              animation-duration: 0s;
              animation-delay: 0s;
            }
          }

          /* Beside the heading on 1024-1279px screens: a touch smaller to fit. */
          @media (min-width: 1024px) and (max-width: 1279px) {
            .flip-countdown {
              padding: 1rem 1.25rem;
            }

            .flip-units {
              gap: 0.75rem;
            }

            .flip-digits {
              gap: 0.2rem;
            }

            .flip-card {
              width: 1.9rem;
              height: 2.6rem;
              font-size: 1.4rem;
            }

            .flip-heading {
              font-size: 0.72rem;
              gap: 0.5rem;
            }

            .flip-heading::before,
            .flip-heading::after {
              width: 1.1rem;
            }
          }
        `}
      </style>

      <div className="flip-countdown hidden md:flex">
        <span className="flip-heading">{heading}</span>
        <div className="flip-units">
          <FlipUnit value={timeLeft.days} label="Days" />
          <FlipUnit value={timeLeft.hours} label="Hours" />
          <FlipUnit value={timeLeft.minutes} label="Minutes" />
          <FlipUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </>
  );
};

export default FlipCountdown;
