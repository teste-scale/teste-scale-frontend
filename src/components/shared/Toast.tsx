import React from "react";
import { Toast as ToastBootstrap, ToastContainer } from "react-bootstrap";
import { IToastContext, ToastContext } from "../../helpers/ContextHelper";

export function Toast() {
  const [show, setShow] = React.useState<boolean>(false);
  const context = React.useContext<IToastContext>(ToastContext);

  React.useEffect(() => {
    if (context.message !== "" && !show) {
      setShow(true);
    }
  }, [context, show]);

  return (
    <ToastContainer position="bottom-end" className="position-fixed p-3">
      <ToastBootstrap
        show={show}
        delay={3000}
        autohide
        onClose={() => {
          context.setMessage("");
          setShow(false);
        }}
      >
        <ToastBootstrap.Body>{context.message}</ToastBootstrap.Body>
      </ToastBootstrap>
    </ToastContainer>
  );
}
