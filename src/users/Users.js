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

export default function useUsers(initialValue) {
    const [users, setUsers] = useState(initialValue);

    useEffect(() => {
        // axios.get("https://api.github.com/users").then((resp) => {
        //     const data = resp.data;
        //     // console.log("data", data);
        //     setUsers(data);
        // });
        setUsers(userList);
    }, []);

    // update and add if not found
    const updateUsers = (newUsers) => {
        const eUsers = [...users];
        for (const newUser of newUsers) {
            let found = false;
            for (const user of users) {
                if (user.id === newUser.id) {
                    found = true;
                    const index = users.indexOf(user);
                    // console.log("user index:", index);
                    Object.assign(user, newUser);
                    eUsers.splice(index, 1, user);
                    // console.log(users);
                }
            }
            if (!found) {
                eUsers.unshift(newUser);
            }
        }
        // console.log("final:", eUsers);
        setUsers([...eUsers]);
    };

    const deleteUsers = (newIds) => {
        const newUsers = users.filter((user) => !newIds.includes(user.id));
        setUsers([...newUsers]);
    };

    const addUsers = (newUsers) => {
        if (newUsers) {
            // console.log("to add:", newUsers);
            const data = [...newUsers, ...users];
            // console.log("after add:", data);
            setUsers([...data]);
        }
    };

    return [users, addUsers, updateUsers, deleteUsers];
}
