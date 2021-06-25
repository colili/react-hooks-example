// import axios from "axios";
import { useEffect, useState } from "react";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const userList = ["Alice", "Bob", "Colin", "Doug"];

    useEffect(() => {
        // axios.get("https://api.github.com/users").then((resp) => {
        //     const data = resp.data;
        //     // console.log("data", data);
        //     setUsers(data);
        // });
        setUsers(userList);
    }, []);

    const deleteUser = (id) => {
        const newUsers = users.filter((user) => {
            return user !== id;
        });
        setUsers(newUsers);
    };

    const addUser = (id) => {
        if (id) {
            users.push(id);
            setUsers([...users]);
        } else {
            alert("User is empty!");
        }
    };

    return [users, addUser, deleteUser];
}
