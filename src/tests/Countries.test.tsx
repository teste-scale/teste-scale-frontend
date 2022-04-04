import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
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
      <MemoryRouter initialEntries={["/country-list"]}>
        <Main />
      </MemoryRouter>
    );

    mock.onGet().networkError();

    await waitFor(() => {
      expect(
        screen.getAllByText("Erro inesperado.", { exact: false })
      ).toBeTruthy();
    });
  });
});
