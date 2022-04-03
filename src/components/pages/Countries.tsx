import React from "react";
import { Placeholder, Table } from "react-bootstrap";
import { ArrayHelper } from "../../helpers/ArrayHelper";
import { IToastContext, ToastContext } from "../../helpers/ContextHelper";
import { ICountry } from "../../interfaces/ICountry";
import { apiService } from "../../services/ApiService";
import { CountryService } from "../../services/CountryService";

export function Countries() {
  const context = React.useContext<IToastContext>(ToastContext);
  const [list, setList] = React.useState<ICountry[]>();
  const [countryService] = React.useState<CountryService>(
    new CountryService(apiService, (e: string) => {
      context.setMessage(e);
    })
  );

  React.useEffect(() => {
    (async () => {
      if (!list) {
        await countryService.start();
        setList(countryService.data);
      }
    })();
  }, [countryService, list]);

  return (
    <div>
      <h1>{"Lista de Países"}</h1>
      <div className="my-4">
        <Table striped bordered className="my-2">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Fronteiras</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0
              ? list.map((country, key) => {
                  return (
                    <tr key={key}>
                      <td>{country.code}</td>
                      <td>{country.name}</td>
                      <td>{country.fronteiras.join(", ")}</td>
                    </tr>
                  );
                })
              : ArrayHelper.CreateArrayFromNumber(10).map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Placeholder animation="wave">
                          <Placeholder className="w-100" />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder animation="wave">
                          <Placeholder className="w-100" />
                        </Placeholder>
                      </td>
                      <td>
                        <Placeholder animation="wave">
                          <Placeholder className="w-100" />
                        </Placeholder>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
