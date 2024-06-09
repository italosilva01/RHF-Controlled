import { act, render, screen } from "@testing-library/react";
import { Form } from ".";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Tests component Form", () => {
  const optionValue = "Acura";
  const modelOptionValue = "Legend 3.2/3.5";
  test("add value in first Input", async () => {
    render(<Form />);

    const inputs = screen.getAllByRole("combobox");
    await userEvent.type(inputs[0], optionValue);

    expect(inputs[0]).toHaveValue(optionValue);
  });
  test("Second input is required", async () => {
    render(<Form />);

    const inputs = screen.getAllByRole("combobox");
    const button = screen.getByTestId("button-submit");
    await userEvent.type(inputs[0], optionValue);

    expect(inputs[0]).toHaveValue(optionValue);
  });
  //   test("open the third Input", async () => {
  //     render(<Form />);

  //     const inputs = screen.getAllByRole("combobox");
  //     const button = screen.getByTestId("button-submit");

  //     await userEvent.type(inputs[0], optionValue);

  //     const newInputs = await screen.getAllByRole("combobox");
  //     console.log(newInputs);
  //     expect(newInputs).toHaveLength(3);
  //   });
});
