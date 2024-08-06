import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";

test("renders App component", () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Characters/i)).toBeInTheDocument();
});
