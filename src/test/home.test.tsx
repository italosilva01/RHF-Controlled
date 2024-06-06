import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "../pages";
import { brands } from "@/mock";
import { Brand } from "@/types";
import { Form } from "react-hook-form";

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

  test("render the third autocompletes with empty values", async () => {
    render(<Home brands={brandsValues} />);

    const optionValue = "Acura";
    const inputs = screen.getAllByRole("combobox");

    // Simule a digitação do valor no input
    userEvent.click(inputs[0]);

    console.log("inputs[0]", inputs[0]);
    const option = await screen.findByText(optionValue);
    // const option = await screen.findByText((content, node) => {
    //   const hasText = (node) => node.textContent === optionValue;
    //   const nodeHasText = hasText(node);
    //   const childrenDontHaveText = Array.from(node?.children).every(
    //     (child) => !hasText(child)
    //   );

    //   return nodeHasText && childrenDontHaveText;
    // });
    // userEvent.type(inputs[0], optionValue);

    // // Aguarde o item aparecer na lista de opções
    // const listItem = await screen.findByText(optionValue);

    // Clique no item para selecioná-lo
    // userEvent.click(option);

    // // Verifique se o valor do input mudou
    // expect(inputs[0]).toHaveValue(optionValue);
  });

  // test("Form with Autocomplete using Portal", async () => {
  //   let rendered: ReturnType<typeof render>;

  //   await act(() => {
  //     rendered = render(<Form />, {
  //       wrapper: Wrapper,
  //       container: document.body,
  //     });
  //   });

  //   const { findByPlaceholderText, getByText } = rendered;

  //   const autocomplete = await findByPlaceholderText("Select Option");
  //   fireEvent.mouseDown(autocomplete);
  //   const { getByText: getByBodyText } = within(document.body);
  //   const option = getByBodyText("BuBuBu");
  //   expect(option).toBeInTheDocument();
  //   fireEvent.click(option as HTMLElement);

  //   expect(autocomplete).toHaveProperty("value", "BuBuBu");
  // });
});
