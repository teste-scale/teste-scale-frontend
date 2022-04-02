import React from "react";
import { Col } from "react-bootstrap";
import { IToastContext, ToastContext } from "../../helpers/ContextHelper";
import { IUser } from "../../interfaces/IUser";
import { apiService } from "../../services/ApiService";
import { UserService } from "../../services/UserService";
import { Card } from "../shared/Card";
import { ListPagination } from "../shared/ListPagination";

export function Users() {
  const context = React.useContext<IToastContext>(ToastContext);
  const [list, setList] = React.useState<IUser[]>();
  const [userService] = React.useState<UserService>(
    new UserService(apiService, (e: string) => {
      context.setMessage(e);
    })
  );

  React.useEffect(() => {
    (async () => {
      await userService.start();
    })();
  }, [userService, list]);

  const handlePaginationList = (list: IUser[]) => {
    setList(list);
  };

  return (
    <div>
      <h1>{"Lista de Usuários"}</h1>
      <div className="my-4">
        <ListPagination
          service={userService}
          callbackData={handlePaginationList}
          height={"400px"}
        >
          {list &&
            list.map((user, key) => {
              return (
                <Col key={key} className="p-0 mx-2 my-2">
                  <Card
                    title={`${user.first_name} ${user.last_name}`}
                    text={`Email: ${user.email}`}
                    image={user.avatar}
                  />
                </Col>
              );
            })}
        </ListPagination>
      </div>
    </div>
  );
}
