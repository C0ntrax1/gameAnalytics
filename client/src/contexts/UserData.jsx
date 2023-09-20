import React from "react";

const UserData = React.createContext({
  session: {
    personal: {
      userid: "",
    },
    isLoggedIn: false,
  },
  setSession: () => {},
  logout: () => {},
});

export default UserData;
