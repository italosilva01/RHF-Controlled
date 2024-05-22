import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Result from ".";

describe("Result", () => {
  test("renders without crashing", () => {
    render(<Result />);
    expect(
      screen.getByText("Este é o preço de compra do veículo")
    ).toBeInTheDocument();
  });
});
