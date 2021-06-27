import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { DataGrid, GridFooter } from "@material-ui/data-grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import { nanoid } from "nanoid";
import { React, useState } from "react";
import useUsers from "./Users";

const columns = [
    { field: "id", headerName: "用户名", width: 120, editable: false },
    { field: "name", headerName: "姓名", width: 240, editable: true },
    { field: "sex", headerName: "性别", width: 120, editable: true },
    { field: "age", headerName: "年龄", type: "number", width: 120, editable: true },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: 400,
        width: "100%",
        "&.MuiDataGrid-selectedRowCount": {
            background: "#010310",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function DataTable() {
    const [users, addUsers, updateUsers, deleteUsers] = useUsers([]);

    const [selected, setSelected] = useState([]);
    const [showDelBtn, setShowDelBtn] = useState(false);

    const handleSelection = (params) => {
        const newSelected = params.selectionModel;
        // console.log(newSelected);
        setShowDelBtn(newSelected.length > 0);
        setSelected(newSelected);
    };

    const handleAddUser = (users) => {
        // console.log("to add users:", users);
        addUsers(users);
    };

    const handleDeleteUser = (ids) => {
        deleteUsers(ids);
        setSelected([]);
    };

    const handleUpdateUser = (params) => {
        // console.log(params);
        const { id, field, props } = params;
        const { value } = props;
        const newUser = { id, [field]: value };
        // console.log("user to update", newUser);
        updateUsers([newUser]);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        用户信息
                    </Typography>
                </Toolbar>
            </AppBar>
            <DataGrid
                // loading={users.length <= 0}
                rows={users}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                // hideFooterSelectedRowCount={true}
                onSelectionModelChange={(params) => {
                    handleSelection(params);
                }}
                onEditCellChangeCommitted={(params) => handleUpdateUser(params)}
                components={{ Footer: GridFooter }}
            />
            <IconButton onClick={() => handleAddUser([{ id: nanoid() }])} aria-label="add">
                <CloudUploadIcon />
            </IconButton>
            {showDelBtn && (
                <IconButton onClick={() => handleDeleteUser(selected)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    );
}
