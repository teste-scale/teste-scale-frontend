import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { Countries } from "../components/pages/Countries";
import { Main } from "../components/pages/Main";
import { mockCountriesData } from "./data/MockCountriesData";

describe("country page", () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("render table", async () => {
    mock.onGet().reply(200, mockCountriesData);

    render(<Countries />);
    await waitFor(() => {
      expect(screen.getAllByRole("cell").length).toEqual(
        3 * mockCountriesData.length
      );
    });
  });

  test("render toast", async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    mock.onGet().networkError();
    userEvent.click(screen.getByText("Lista de Países"));

    await waitFor(() => {
      expect(
        screen.getAllByText("Erro inesperado.", { exact: false })
      ).toBeTruthy();
    });
  });
});
