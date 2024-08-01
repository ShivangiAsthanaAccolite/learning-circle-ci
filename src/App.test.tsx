import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";

test("renders App component", () => {
  render(<App />);
  const text = screen.getByText("App Component");
  expect(text).toBeInTheDocument();
});
