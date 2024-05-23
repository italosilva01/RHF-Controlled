import { render, screen } from "@testing-library/react";

import Home from "../pages";
import { brands } from "@/mock";
import { Brand } from "@/types";

const brandsValues = Object.values(brands) as unknown as Brand[];

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Page Home", () => {
  test("renders without crashing", () => {
    const { container } = render(<Home brands={brandsValues} />);
    expect(
      screen.getByText("Consulte o valor de um veículo de forma gratuita")
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("render two initial autocompletes", () => {
    render(<Home brands={brandsValues} />);
    const inputs = screen.getAllByRole("combobox");
    expect(inputs).toHaveLength(2);
  });

  test("render two initial autocompletes with empty values", () => {
    render(<Home brands={brandsValues} />);
    const inputs = screen.getAllByRole("combobox");

    expect(inputs[0]).toHaveValue("");
    expect(inputs[1]).toHaveValue("");
  });

  test("Button submit form is disable", () => {
    render(<Home brands={brandsValues} />);
    const button = screen.getByTestId("button-submit");
    expect(button).toBeDisabled();
  });
});
