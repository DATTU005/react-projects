import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/904735/pexels-photo-904735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full max-w-3xl p-8 bg-white bg-opacity-80 rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
          style={{ fontWeight: "bold" }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOption={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="relative w-full h-1/2" style={{ fontSize: "1.5rem" }}>
            <button
              type="button"
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-black rounded-md bg-blue-600 text-white px-4 py-1"
              onClick={swap}
              style={{ fontWeight: "bold" }}
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOption={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            style={{ fontWeight: "bold" }}
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
