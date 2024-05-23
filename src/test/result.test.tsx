import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Result from "../pages/result";

describe("Result", () => {
  test("renders without crashing", () => {
    render(<Result />);
    expect(
      screen.getByText("Este é o preço de compra do veículo")
    ).toBeInTheDocument();
  });
});
