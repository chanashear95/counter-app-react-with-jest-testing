import { useState } from "react";
import 'components/counter/Counter.css';


function Counter() {

    const [counter, setCounter] = useState(0);
    const [inputVal, setInputVal] = useState(1)

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    }

    const handleAddBtnClick = () => {
        setCounter(counter =>( Number(counter) + Number(inputVal)).toString());
    }

    const handleMinusBtnClick = () => {
        setCounter(counter => (Number(counter) - Number(inputVal)).toString());

    }

    return (
        <div>
            <h1 data-testid="header">My Counter</h1>
            <h2 data-testid="counter" className={counter >= 100 ? 'green' : counter < 0 ? 'red' : ''}>{counter}</h2>
            <input
                data-testid="input"
                type="number"
                value={inputVal}
                className="text-center"
                onChange={handleInputChange}
            />
            <button onClick={handleMinusBtnClick} data-testid="minus-btn">-</button>
            <button onClick={handleAddBtnClick} data-testid="add-btn">+</button>
        </div>
    )
}

export default Counter;