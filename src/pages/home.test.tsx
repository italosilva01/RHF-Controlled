import { render, screen } from "@testing-library/react";
import Home from ".";
import { brands } from "@/mock";
import { Brand } from "@/types";

const cars = Object.values(brands) as unknown as Brand[];

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("Page Home", () => {
  test("renders without crashing", () => {
    const { container } = render(<Home cars={cars} />);
    expect(container).toMatchSnapshot();
  });

  test("render two initial autocompletes", () => {
    render(<Home cars={cars} />);
    const inputs = screen.getAllByRole("combobox");
    expect(inputs).toHaveLength(2);
  });

  test("render two initial autocompletes with empty values", () => {
    render(<Home cars={cars} />);
    const inputs = screen.getAllByRole("combobox");

    expect(inputs[0]).toHaveValue("");
    expect(inputs[1]).toHaveValue("");
  });
});
