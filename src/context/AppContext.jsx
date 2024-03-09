import React from "react";
import { createContext, useReducer } from "react";

export const appContext = createContext({
  usersList: [],
  route: "",
  loadUsers: () => {},
  registerUser: () => {},
  loginUser: () => {},
  deleteUser: () => {},
  updateRoute: () => {},
  logoutUser: () => {},
  editUser: () => {},
});

function appReducer(state, action) {
  if (action.type === "UPDATE_ROUTE") {
    let updatedRoute = [state.route];
    updatedRoute = action.route;
    return { ...state, route: updatedRoute };
  }

  if (action.type === "LOAD_USERS") {
    if (localStorage.getItem("users") === null) {
      localStorage.setItem("users", JSON.stringify([]));
      return { ...state, usersList: [] };
    } else {
      const currentList = JSON.parse(localStorage.getItem("users"));
      return { ...state, usersList: currentList };
    }
  }

  if (action.type === "ADD_USER") {
    const updatedList = [...state.usersList];
    updatedList.push(action.user);
    localStorage.setItem("users", JSON.stringify(updatedList));
    sessionStorage.setItem("currentUser", JSON.stringify(action.user));
    return { ...state, usersList: updatedList, route: "profile" };
  }

  if (action.type === "VERIFY_USER") {
    if (
      action.payload.username === "admin" &&
      action.payload.password === "ad12343211ad"
    ) {
      sessionStorage.setItem("currentUser", "admin");
      return { ...state, route: "admin" };
    }
    const users = [...state.usersList];
    const currentUser = users.find(
      (user) =>
        user.username === action.payload.username &&
        user.password_1 === action.payload.password
    );
    if (currentUser) {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      return { ...state, route: "profile" };
    }
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    return state;
  }

  if (action.type === "LOGOUT_USER") {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (action.email === currentUser.email)
      sessionStorage.removeItem("currentUser");
    return state;
  }

  if (action.type === "EDIT_DETAILS") {
    const updatedList = [...state.usersList];
    const currentUserIndex = updatedList.findIndex(
      (user) => user.email === action.user.email
    );
    updatedList[currentUserIndex] = action.user;
    localStorage.setItem("users", JSON.stringify(updatedList));
    sessionStorage.setItem("currentUser", JSON.stringify(action.user));
    return { ...state, usersList: updatedList };
  }

  if (action.type === "REMOVE_USER") {
    const users = [...state.usersList];
    const updatedList = users.filter((user) => user.email !== action.email);
    localStorage.setItem("users", JSON.stringify(updatedList));
    return { ...state, usersList: updatedList };
  }

  return state;
}

export default function AppContextProvider({ children }) {
  const [state, dispatchAction] = useReducer(appReducer, {
    usersList: [],
    route: "login",
  });

  function handleRouteUpdate(route) {
    dispatchAction({ type: "UPDATE_ROUTE", route });
  }

  function getUsersListFromLS() {
    dispatchAction({ type: "LOAD_USERS" });
  }

  function verifyUserCredentials(username, password) {
    dispatchAction({
      type: "VERIFY_USER",
      payload: { username, password },
    });
  }
  function addUserToList(user) {
    dispatchAction({ type: "ADD_USER", user });
  }

  function handleLogout(email) {
    dispatchAction({ type: "LOGOUT_USER", email });
  }

  function EditUserDetails(user) {
    dispatchAction({ type: "EDIT_DETAILS", user });
  }

  function removeUserFromList(email) {
    dispatchAction({ type: "REMOVE_USER", email });
  }

  const appCtx = {
    usersList: state.usersList,
    route: state.route,
    loadUsers: getUsersListFromLS,
    registerUser: addUserToList,
    loginUser: verifyUserCredentials,
    deleteUser: removeUserFromList,
    logoutUser: handleLogout,
    editUser: EditUserDetails,
    updateRoute: handleRouteUpdate,
  };

  return <appContext.Provider value={appCtx}>{children}</appContext.Provider>;
}
