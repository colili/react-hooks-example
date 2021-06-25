import React, { useRef, createContext, useContext, useEffect, useReducer, useState } from "react";
import { Link, Route } from "react-router-dom";
import About from "./About";
import Buttons from "./Buttons";
import ChildCounter from "./ChildCounter";
import { Color } from "./Color";
import Home from "./Home";
import ShowInfo from "./ShowInfo";
import useWindowSize from "./useWindowSize";
import Userinfo from "./Userinfo";

export const CountContext = createContext();

function Counter() {
    const count = useContext(CountContext);
    return <h3>Current count: {count}</h3>;
}

export default function UseStateExample() {
    const [count, setCount] = useState(0); // 状态管理
    const [age, setAge] = useState(18);

    useEffect(() => {
        // 替代生命周期函数：didMount, didUpdate
        console.log(`useEffect => you clicked ${count} times`);
        return () => {
            console.log("==============");
        };
    }, [count]);

    const [score, dispatch] = useReducer((state, action) => {
        switch (action) {
            case "add":
                console.log("add");
                return state + 1;
            case "sub":
                console.log("sub");
                return state > 0 ? state - 1 : state;
            default:
                return state;
        }
    }, 0);

    const inputRef = useRef(null);
    const handleClick = () => {
        console.log(inputRef.current.value);
        inputRef.current.value = "Hello, you clicked it";
        console.log(inputRef);
    };

    const windowSize = useWindowSize();

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount((x) => x + 1)}>Click me</button>
            <p>Age: {age}</p>
            <button
                onClick={() => {
                    setAge(age + 1);
                }}
            >
                增加年龄
            </button>
            <button onClick={() => setAge(age > 0 ? age - 1 : 0)}>减小年龄</button>

            <hr />
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <Route path="/home" exact component={Home} />
                <Route path="/about" exact component={About} />
            </ul>
            <hr />

            <CountContext.Provider value={count}>
                <Counter />
                <hr />
                <ChildCounter />
            </CountContext.Provider>

            <hr />
            <h2 style={{ backgroundColor: "lightblue" }}>分数：{score}</h2>
            <button
                onClick={() => {
                    dispatch("add");
                }}
            >
                加分
            </button>
            <button
                onClick={() => {
                    dispatch("sub");
                }}
            >
                减分
            </button>

            <hr />
            <div>
                <Color>
                    <ShowInfo />
                    <Buttons />
                </Color>
            </div>
            <hr />

            <input ref={inputRef} type="text"></input>
            <button onClick={handleClick}>Click to show input data</button>

            <hr />
            <h4>
                Current window size: {windowSize.width}x{windowSize.height}
            </h4>
        </div>
    );
}
