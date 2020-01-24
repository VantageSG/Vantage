import React from "react";
import ResponsiveContainer from "components/navbar/NavBar.jsx";
import "@testing-library/jest-dom/extend-expect";
import { renderWithRouter } from "../../test-utils";

describe("Desktop ", () => {

  describe("Responsive Container User not logged in", () => {
    const containerNotLoggedIn = renderWithRouter(<ResponsiveContainer 
      loggedInStatus={false}
      user={{}}
    />);
    // TODO: fix the check for vantage logo
    it("Should have vantage logo", () => {
      expect(containerNotLoggedIn.getAllByText(/VANTAGE/i));
    });
    it("should have login", () => {
      expect(containerNotLoggedIn.getByText("Login")).toBeInTheDocument();
    });
    it("should have sign up", () => {
      expect(containerNotLoggedIn.getByText("Sign Up")).toBeInTheDocument();
    });
   
  });

  describe("Responsive Container User logged in", () => {
    const loggedInStatus = true;
    const user = {
      "id": 6,
          "username": "shermzlim",
          "email": "sherman@email.com",
          "password_digest": "$2a$12$gC1pwl.RDUYWU0Y.4lzgruZDkapGZEeJOz9EpyLk2CHm7tJ3mh84C",
          "created_at": "2019-12-30T16:56:51.584Z",
          "updated_at": "2019-12-30T16:56:51.584Z"
    }
    const containerLoggedIn = renderWithRouter(<ResponsiveContainer
      loggedInStatus={loggedInStatus}
      user={user}
      />);
    it("should have user name", () => {
      expect(containerLoggedIn.getByText("shermzlim")).toBeInTheDocument();
    });
  });
});