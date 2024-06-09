import { TextField } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Component TextField", () => {
  const optionValue = "Acura";
  test("render the third autocompletes with empty values", async () => {
    render(<TextField name="teste" placeholder="Enter name" />);

    const inputs = await screen.findByPlaceholderText("Enter name");
    expect(inputs).toBeInTheDocument();
  });

  test("render textField with  value", async () => {
    render(<TextField name="teste" placeholder="Enter name" />);

    const input = await screen.findByPlaceholderText("Enter name");

    await userEvent.type(input, optionValue);

    expect(input).toHaveValue(optionValue);
  });
});
