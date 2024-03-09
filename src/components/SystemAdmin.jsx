import React from "react";
import LayoutCenter from "./LayoutCenter";
import UsersTable from "./UsersTable";

export default function SystemAdmin() {
  return (
    <LayoutCenter title="ניהול משתמשים" greet="ברוכים השבים, Admin">
      <UsersTable />
    </LayoutCenter>
  );
}
