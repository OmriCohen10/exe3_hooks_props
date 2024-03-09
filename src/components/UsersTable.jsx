import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { appContext } from "../context/AppContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMessage from "./DialogMessage";
import EditForm from "./EditForm";
import { handleBday } from "../utilities/functions";

export default function UsersTable() {
  const [showDialog, setShowDialog] = useState(false);
  const { usersList, deleteUser, route } = useContext(appContext);
  const [editUser, setEditUser] = useState({});
  
  function handleEditOperation(e) {
    const userEmail = e.currentTarget.name;
    const editUser = usersList.find(user => user.email === userEmail)
    setEditUser(editUser);
    setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  return (
    <>
      {showDialog && (
        <DialogMessage
          openDialog={showDialog}
          closeDialog={handleCloseDialog}
          title="עריכת פרטים"
          closeBtn="ביטול"
          customStyle={{ marginY: 2, width: 100, marginX: "auto" }}
        >
          <EditForm user={editUser} onClose={handleCloseDialog}/>
        </DialogMessage>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">שם משתמש</TableCell>
              <TableCell align="center">שם מלא</TableCell>
              <TableCell align="center">תאריך לידה</TableCell>
              <TableCell align="center">כתובת</TableCell>
              <TableCell align="center">דואר אלקטרוני</TableCell>
              <TableCell align="center">אפשרויות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow
                key={user.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: 150,
                  }}
                  align="center"
                >
                  <img
                    id="img-admin-table"
                    src={user.userImage}
                    loading="lazy"
                  />
                  {user.username}
                </TableCell>
                <TableCell align="center">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell align="center">{handleBday(user.bDay)}</TableCell>
                <TableCell align="center">{`${user.street} ${user.flatNumber}, ${user.city}`}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <Button name={user.email} onClick={(e) => handleEditOperation(e)}>
                    <EditIcon color="info" />
                  </Button>
                  <Button onClick={() => deleteUser(user.email)}>
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
