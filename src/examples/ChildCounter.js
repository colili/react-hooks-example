import { useContext } from "react";
import { CountContext } from "./HooksExample";

export default function ChildCounter() {
    const count = useContext(CountContext)
    return (
        <h3>Current count is {count}</h3>
    )
}