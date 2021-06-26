import IconButton from "@material-ui/core/IconButton";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { React, useState, useEffect } from "react";
import useUsers from "./Users";
import { nanoid } from "nanoid";
// import { GRID_CELL_EDIT_EXIT, useGridApiRef, XGrid } from "@material-ui/x-grid";

const columns = [
    { field: "id", headerName: "用户名", width: 120, editable: false },
    { field: "name", headerName: "姓名", width: 240, editable: true },
    { field: "sex", headerName: "性别", width: 120, editable: true },
    { field: "age", headerName: "年龄", type: "number", width: 120, editable: true },
];

export default function DataTable() {
    const [users, addUser, deleteUsers] = useUsers();

    const [selected, setSelected] = useState([]);
    const [showDelBtn, setShowDelBtn] = useState(false);
    // const apiRef = useGridApiRef();

    const handleSelection = (params) => {
        const { data } = params;
        const { id } = data;

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        if (newSelected.length > 0) {
            setShowDelBtn(true);
        } else {
            setShowDelBtn(false);
        }

        setSelected(newSelected);
    };

    const handleAddUser = () => {
        addUser({ id: nanoid() });
    };

    const handleDeleteUser = () => {
        deleteUsers(selected);
        setSelected([]);
    };

    /* useEffect(() => {
        console.log(apiRef);
        return apiRef.current.subscribeEvent(GRID_CELL_EDIT_EXIT, (params, event) => {
            console.log(
                `Editing cell with value: ${params.value} and row id: ${params.id}, column: ${params.field}, triggered by ${event.type}.`
            );
        });
    }, [apiRef]); */

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                onRowSelected={(params) => {
                    handleSelection(params);
                }}
                components={{ Toolbar: GridToolbar }}
            />
            <IconButton onClick={handleAddUser} aria-label="add">
                <CloudUploadIcon />
            </IconButton>
            {showDelBtn && (
                <IconButton onClick={handleDeleteUser} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    );
}
