import { Slider } from "@material-tailwind/react";
import "./App.css";
import Circle from "./Circle";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Spinner from "./components/Spinner";

const CHANCES = [
  { name: "Min", value: 0.01 },
  { name: "10%", value: 10 },
  { name: "25%", value: 25 },
  { name: "50%", value: 50 },
  { name: "Max", value: 80 },
];

function App() {
  const price = 150000000;
  const [odd, setOdd] = useState(CHANCES[4].value);
  const [range, setRange] = useState(100);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  let intervalId;
  const [maxAngle, setMaxAngle] = useState(1000);
  const [angleDiff, setAngleDiff] = useState((2 * Math.PI * odd) / 100.0);
  const [startAngle, setStartAngle] = useState(0);
  const [canShowResult, setCanShowResult] = useState(false);

  const startSpin = () => {
    if (spinning) return;

    setAngle(0);
    setMaxAngle(Math.floor(Math.random() * 360) + 1000);
    setCanShowResult(true);

    setSpinning(true);
  };

  const showResult = () => {
    let stop = (angle - 90) % 360;
    let start = ((startAngle * 180) / Math.PI) % 360;
    let end = (((startAngle + angleDiff) * 180) / Math.PI) % 360;
    if (stop < 0) stop = stop + 360;
    if (start < 0) start = start + 360;
    if (end < 0) end = end + 360;

    let win = false;
    if (start <= end) {
      if (stop >= start && stop <= end) {
        win = true;
      }
    } else {
      if (stop >= start || stop <= end) {
        win = true;
      }
    }

    setTimeout(() => {
      if (canShowResult) alert(win);
    }, 20);
  };

  useEffect(() => {
    if (spinning) {
      intervalId = setInterval(() => {
        setAngle((angle) => angle + 10);
      }, 10);
    } else {
      showResult();
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [spinning]);

  useEffect(() => {
    if (angle > maxAngle) {
      setSpinning(false);
    }
  }, [angle, maxAngle]);

  useEffect(() => {
    setAngleDiff((2 * Math.PI * odd) / 100.0);
  }, [odd]);

  const changeAngle = (startAngle) => {
    setStartAngle(startAngle);
  };

  return (
    <div className="flex flex-col justify-center items-center px-8">
      <div className="flex flex-col justify-center items-center mt-[150px]">
        <div
          className="cursor-pointer absolute  w-[400px] h-[400px] bg-[#f5f5f5] border-[6px] border-[#ffffff] box-border rounded-full flex justify-center "
          style={{
            boxShadow:
              "0px 4px 10px rgba(0, 0, 0, 0.35), inset 0px 4px 20px rgba(0, 0, 0, 0.35)",
          }}
        ></div>
        <div className="cursor-pointer absolute  w-[350px] h-[350px] bg-gradient-to-b from-green-200 to-green-50 border-4 border-[#ffffff] box-border rounded-full flex flex-col justify-center items-center">
          <div className="text-lg font-bold">Watch</div>
          <img
            src="/watch1.avif"
            width={50}
            height={50}
            className="w-[200px] h-[200px]"
            alt="Watch"
          />
          <div className="text-lg font-bold">${price.toFixed(2)}</div>
        </div>
        <Circle
          angleDiff={angleDiff}
          startAngle={startAngle}
          changeAngle={changeAngle}
        />
        <Spinner angle={angle} />
      </div>

      <div className="mt-[150px] flex">
        <div className="bg-green-600 flex py-2 px-4 text-white font-bold cursor-pointer hover:bg-green-500 items-center justify-center">
          DEAL FOR ${((odd * price) / 100.0).toFixed(2)}
        </div>
        <div
          className="ml-4 p-4 bg-blue-600 cursor-pointer hover:bg-blue-500"
          onClick={() => {
            startSpin();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
        </div>
      </div>
      <div className="mt-8 flex flex-col p-8 bg-gray-50 rounded-md">
        <div className="flex flex-col">
          <div className="text-black font-bold text-lg">CHANCE</div>
          <div className="flex mt-4 border-gray-[500] border-[1px] p-2">
            <CurrencyInput
              decimalsLimit={2}
              decimalScale={2}
              value={odd}
              onValueChange={(value) => {
                setOdd(value);
              }}
              allowNegativeValue={false}
              suffix="%"
              className="px-4 appearance-none bg-transparent border-none focus:appearance-none focus:outline-none"
            />
            {CHANCES.map((chance, index) => {
              return (
                <div
                  key={index}
                  className="bg-black p-2 ml-2 text-white font-bold cursor-pointer"
                  onClick={() => {
                    setOdd(chance.value);
                    setRange(chance.value / 0.8);
                  }}
                >
                  {chance.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="text-black font-bold text-lg">PRICE</div>
          <div className="text-black font-bold text-lg mt-4 p-4 bg-white">
            ${((odd * price) / 100.0).toFixed(2)}
          </div>
          <div className="mt-8">
            <Slider
              color="green"
              value={range}
              onChange={(e) => {
                setRange(e.target.value);
                setOdd(e.target.value * 0.8);
              }}
            />
          </div>
          <div className="flex justify-between text-gray-500">
            <div>${((CHANCES[0].value * price) / 100.0).toFixed(2)}</div>
            <div>${((CHANCES[4].value * price) / 100.0).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
