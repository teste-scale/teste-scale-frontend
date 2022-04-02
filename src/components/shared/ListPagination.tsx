import React from "react";
import { Pagination, Row, Spinner } from "react-bootstrap";
import { ArrayHelper } from "../../helpers/ArrayHelper";
import { IListPaginationService } from "../../interfaces/IListPaginationService";

export function ListPagination(
  props: any & { service: IListPaginationService }
) {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>();
  const [service, setService] = React.useState<IListPaginationService>();

  React.useEffect(() => {
    (async () => {
      if (!service) {
        await props.service.start();
        setService(props.service);
      }
    })();

    props.callbackData(service?.data);
    setCurrentPage(service?.page);
  }, [service, service?.data, props]);

  return (
    <>
      <Row className="mb-4" style={{ minHeight: props.height }}>
        {isLoading ? (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
          </div>
        ) : (
          props.children
        )}
      </Row>
      <Row>
        <Pagination>
          {service &&
            service.total_pages > 0 &&
            ArrayHelper.CreateArrayFromNumber(service.total_pages).map(
              (page) => {
                return (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    disabled={isLoading}
                    onClick={async () => {
                      setLoading(true);
                      await service.changePage(page);
                      setCurrentPage(service.page);
                      setLoading(false);
                    }}
                  >
                    {page}
                  </Pagination.Item>
                );
              }
            )}
        </Pagination>
      </Row>
    </>
  );
}
