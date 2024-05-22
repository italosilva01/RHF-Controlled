import { render, screen } from "@testing-library/react";
import Home from ".";
import { brands } from "@/mock";
import { Brand } from "@/types";

const cars = Object.values(brands) as unknown as Brand[];
describe("App", () => {
  test("renders without crashing", () => {
    render(<Home cars={cars} />);
    expect(screen.getByText("Tabela Fipe")).toBeInTheDocument();
  });
});
