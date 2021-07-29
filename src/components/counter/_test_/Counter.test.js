import Counter from 'components/counter/Counter';
import { render, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
})

afterEach(cleanup); //Happens by default

afterAll(cleanup); // Happens after all tests are done

test('header renders with correct text', () => {
    const headerEl = getByTestId('header');
    expect(headerEl.textContent).toBe('My Counter');
})

test('counter initially starts at 0', () => {
    const counterEl = getByTestId('counter');
    expect(counterEl.textContent).toBe('0');
})

test('input contains initial value of 1', () => {
    const inputEl = getByTestId('input');
    expect(inputEl.value).toBe('1');
})

test('add button renders with + sign', () => {
    const addBtnEl = getByTestId('add-btn');
    expect(addBtnEl.textContent).toBe('+');
})

test('minus button renders with - sign', () => {
    const minusBtnEl = getByTestId('minus-btn');
    expect(minusBtnEl.textContent).toBe('-');
})

test('changing value of input works correctly', () => {
    const inputEl = getByTestId('input');

    expect(inputEl.value).toBe('1');

    fireEvent.change(inputEl, {
        target: {
            value: '5'
        }
    })
    expect(inputEl.value).toBe('5');
}) 

test('click on plus button adds 1 to counter', () => {
    const addBtnEl = getByTestId('add-btn');
    const counterEl = getByTestId('counter');
    expect(counterEl.textContent).toBe('0');

    fireEvent.click(addBtnEl);
    expect(counterEl.textContent).toBe('1');
})

test('click on minus button subtracts 1 from counter', () => {
    const minusBtnEl = getByTestId('minus-btn');
    const counterEl = getByTestId('counter');
    expect(counterEl.textContent).toBe('0');

    fireEvent.click(minusBtnEl);
    expect(counterEl.textContent).toBe('-1');
})

test('changing input value and adding to counter by clicking on button works', () => {
    const inputEl = getByTestId('input');
    const counterEl = getByTestId('counter');
    const addBtnEl = getByTestId('add-btn');

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    })

    fireEvent.click(addBtnEl);
    expect(counterEl.textContent).toBe('5');
})

test('changin input value and subtracting from counter by clicking minus button', () => {
    const inputEl = getByTestId('input');
    const counterEl = getByTestId('counter');
    const minusBtnEl = getByTestId('minus-btn');

    fireEvent.change(inputEl, {
        target: {
            value: '5',
        }
    })

    fireEvent.click(minusBtnEl);
    expect(counterEl.textContent).toBe('-5')
})

test('adding and then subtracting leads to the correct counter value', () => {
    const inputEl = getByTestId('input');
    const counterEl = getByTestId('counter');
    const addBtnEl = getByTestId('add-btn');
    const minusBtnEl = getByTestId('minus-btn');

    fireEvent.change(inputEl, {
        target: {
            value: '10',
        }
    })

    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(addBtnEl);
    fireEvent.click(minusBtnEl);
    fireEvent.click(minusBtnEl);

    expect(counterEl.textContent).toBe('20');

    fireEvent.change(inputEl, {
        target: {
            value: '5',
        }
    })
    fireEvent.click(addBtnEl);
    fireEvent.click(minusBtnEl);
    fireEvent.click(minusBtnEl);

    expect(counterEl.textContent).toBe('15')
})

test('counter contains correct classname', () => {
    const counterEl = getByTestId('counter');
    const inputEl = getByTestId('input');
    const addBtnEl = getByTestId('add-btn');
    const minusBtnEl = getByTestId('minus-btn');

    expect(counterEl.className).toBe('');

    fireEvent.change(inputEl, {
        target: {
            value: '50'
        }
    })

    fireEvent.click(addBtnEl);

    expect(counterEl.className).not.toContain('red' || 'green');

    fireEvent.click(addBtnEl);

    expect(counterEl.classList).toContain('green');

    fireEvent.click(minusBtnEl);
    fireEvent.click(minusBtnEl);

    expect(counterEl.classList).not.toContain('red' || 'green');

    fireEvent.click(minusBtnEl);
    fireEvent.click(minusBtnEl);

    expect(counterEl.classList).toContain('red');
})