import { Card as CardBootstrap, Spinner } from "react-bootstrap";

export function Card(props: any) {
  return (
    <CardBootstrap>
      {props.image ? (
        <CardBootstrap.Img variant="top" src={props.image} />
      ) : (
        <div className="card-img-top d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )}
      <CardBootstrap.Body>
        <CardBootstrap.Title>{props.title}</CardBootstrap.Title>
        <CardBootstrap.Text>{props.text}</CardBootstrap.Text>
      </CardBootstrap.Body>
    </CardBootstrap>
  );
}
