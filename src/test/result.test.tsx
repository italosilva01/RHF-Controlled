import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Result from "../pages/result";

describe("Page Result", () => {
  test("renders without crashing", () => {
    const { container } = render(<Result />);
    expect(
      screen.getByText("Este é o preço de compra do veículo")
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
