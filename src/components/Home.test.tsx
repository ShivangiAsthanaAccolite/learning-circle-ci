import { render, screen } from "@testing-library/react";

import Home from "./Home";
import React from "react";

test("renders Home component", () => {
  render(<Home />);
  expect(screen.getByText("Home Page")).toBeInTheDocument();
});
