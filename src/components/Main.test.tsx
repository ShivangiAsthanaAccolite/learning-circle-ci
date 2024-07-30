import { render, screen } from "@testing-library/react";

import Main from "./Main";
import React from "react";

test("renders Main component", () => {
  render(<Main />);
  expect(screen.getByText("Main Page")).toBeInTheDocument();
});
