import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { Main } from "../components/pages/Main";
import { Users } from "../components/pages/Users";
import { mockUsersData } from "./data/MockUsersData";

describe("course page", () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("render cards", async () => {
    mock.onGet().reply(200, mockUsersData);

    render(<Users />);
    await waitFor(() => {
      expect(screen.getAllByText("Email:", { exact: false }).length).toEqual(4);
    });
  });

  test("render toast", async () => {
    mock.onGet().networkError();

    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getAllByText("Erro inesperado.", { exact: false })
      ).toBeTruthy();
    });
  });
});
