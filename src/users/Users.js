// import axios from "axios";
import { useEffect, useState } from "react";

const userList = [
    { id: "jonsnow", name: "Snow Jon", age: 35, sex: "Male" },
    { id: "cerseilanni", name: "Lannister Cersei", age: 42, sex: "Female" },
    { id: "jaimelanni", name: "Lannister Jaime", age: 45, sex: "Male" },
    { id: "aryastark", name: "Stark Arya", age: 16, sex: "Female" },
    { id: "daenerys", name: "Targaryen Daenerys", age: null, sex: "Male" },
    { id: "melisandre", name: "Melisandre", age: 150, sex: null },
    { id: "ferraraclif", name: "Clifford Ferrara", age: 44, sex: "Male" },
    { id: "rossini", name: "Frances Rossini", age: 36, sex: "Male" },
    { id: "harveyroxie", name: "Roxie Harvey", age: 65, sex: "Male" },
];

export default function useUsers() {
    const [users, setUsers] = useState([]);
    // const userList = ["Alice", "Bob", "Colin", "Doug"];

    useEffect(() => {
        // axios.get("https://api.github.com/users").then((resp) => {
        //     const data = resp.data;
        //     // console.log("data", data);
        //     setUsers(data);
        // });
        setUsers(userList);
    }, []);

    const deleteUsers = (ids) => {
        // TODO: useReducer
        const newUsers = users.filter((user) => !ids.includes(user.id));
        setUsers([...newUsers]);
    };

    const addUser = (user) => {
        if (user) {
            setUsers([user, ...users]);
        } else {
            alert("User is empty!");
        }
    };

    return [users, addUser, deleteUsers];
}
