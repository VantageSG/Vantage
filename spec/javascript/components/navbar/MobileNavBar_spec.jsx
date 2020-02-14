import UserContext from "../../../../app/javascript/contexts/UserContext";
import React from "react";
import ResponsiveContainer from "components/navBar/NavBar.jsx";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouter, setMobileWindow } from "../../test-utils";
import { cleanup } from "@testing-library/react";

describe("Mobile devise", () => {

  describe("Responsive Container User not logged in", () => {
    setMobileWindow();
    it("should have registration button", () => {
      const containerMobileNotLoggedIn = renderWithRouter(
      <UserContext.Provider value={{
        user:{},
        isLoggedIn:false
      }}
      
      >
        <ResponsiveContainer 
          loggedInStatus={false}
          user={{}}
        />
      </UserContext.Provider>
      );
      setMobileWindow();
      expect(containerMobileNotLoggedIn.getByText("Login")).toBeInTheDocument();
      expect(containerMobileNotLoggedIn.getByText("Sign Up")).toBeInTheDocument();
    });
  });
});