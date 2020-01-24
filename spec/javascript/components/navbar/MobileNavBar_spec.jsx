import React from "react";
import ResponsiveContainer from "components/navbar/NavBar.jsx";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouter, setMobileWindow } from "../../test-utils";
import { cleanup } from "@testing-library/react";

describe("Mobile devise", () => {

  describe("Responsive Container User not logged in", () => {
    setMobileWindow();
    it("should have registration button", () => {
      const containerMobileNotLoggedIn = renderWithRouter(<ResponsiveContainer 
        loggedInStatus={false}
        user={{}}
      />);
      setMobileWindow();
      expect(containerMobileNotLoggedIn.queryByText("Login")).toBeInTheDocument();
      expect(containerMobileNotLoggedIn.queryByText("Sign up")).toBeInTheDocument();
    });
  });
});