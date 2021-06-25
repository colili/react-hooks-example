import React, { useState } from "react";
import useUsers from "./Users";

export default function UserInfo() {
    const [users, addUser, deleteUser] = useUsers();
    const [userId, setUserId] = useState();
    return (
        <div>
            <p>User list</p>
            <ul>
                {users.map((u) => {
                    return (
                        <div>
                            <li key={u}>name: {u}</li>
                            <button
                                onClick={(e) => {
                                    deleteUser(u);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </ul>
            <input
                type="text"
                placeholder="user to add"
                onChange={(e) => {
                    // console.log(e.currentTarget.value);
                    setUserId(e.currentTarget.value);
                }}
            ></input>
            <button
                onClick={() => {
                    addUser(userId);
                }}
            >
                Add user
            </button>
        </div>
    );
}
