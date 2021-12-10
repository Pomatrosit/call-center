import { FC } from "react";
import { Pagination } from "react-bootstrap";

interface ICustomPaginationProps {
  pageCount: number;
  activePage: number;
  setActivePage: (page: number) => void;
}

const CustomPagination: FC<ICustomPaginationProps> = ({
  activePage,
  setActivePage,
  pageCount,
}) => {
  let pages = [];

  if (pageCount <= 10) {
    for (let number = 1; number <= pageCount; number++) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => setActivePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    if (activePage === 1) {
      pages.push(
        <Pagination.Item key={1} active={true}>
          1
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={2} onClick={() => setActivePage(2)}>
          2
        </Pagination.Item>
      );
      pages.push(<Pagination.Ellipsis key="ellipsis1" />);
      pages.push(
        <Pagination.Item
          key={pageCount}
          onClick={() => setActivePage(pageCount)}
        >
          {pageCount}
        </Pagination.Item>
      );
    } else if (activePage === 2) {
      pages.push(
        <Pagination.Item key={1} onClick={() => setActivePage(1)}>
          1
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={2} active={true}>
          2
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={3} onClick={() => setActivePage(3)}>
          3
        </Pagination.Item>
      );
      pages.push(<Pagination.Ellipsis key="ellipsis1" />);
      pages.push(
        <Pagination.Item
          key={pageCount}
          onClick={() => setActivePage(pageCount)}
        >
          {pageCount}
        </Pagination.Item>
      );
    } else if (activePage === pageCount) {
      pages.push(
        <Pagination.Item key={1} onClick={() => setActivePage(1)}>
          1
        </Pagination.Item>
      );
      pages.push(<Pagination.Ellipsis key="ellipsis1" />);
      pages.push(
        <Pagination.Item
          key={pageCount - 1}
          onClick={() => setActivePage(pageCount - 1)}
        >
          {pageCount - 1}
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={pageCount} active={true}>
          {pageCount}
        </Pagination.Item>
      );
    } else if (activePage === pageCount - 1) {
      pages.push(
        <Pagination.Item key={1} onClick={() => setActivePage(1)}>
          1
        </Pagination.Item>
      );
      pages.push(<Pagination.Ellipsis key="ellipsis1" />);
      pages.push(
        <Pagination.Item
          key={pageCount - 2}
          onClick={() => setActivePage(pageCount - 2)}
        >
          {pageCount - 2}
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={pageCount - 1} active={true}>
          {pageCount - 1}
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item
          key={pageCount}
          onClick={() => setActivePage(pageCount)}
        >
          {pageCount}
        </Pagination.Item>
      );
    } else {
      pages.push(
        <Pagination.Item key={1} onClick={() => setActivePage(1)}>
          1
        </Pagination.Item>
      );
      if (activePage !== 3) pages.push(<Pagination.Ellipsis key="ellipsis1" />);
      pages.push(
        <Pagination.Item
          key={activePage - 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          {activePage - 1}
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item key={activePage} active={true}>
          {activePage}
        </Pagination.Item>
      );
      pages.push(
        <Pagination.Item
          key={activePage + 1}
          onClick={() => setActivePage(activePage + 1)}
        >
          {activePage + 1}
        </Pagination.Item>
      );
      if (activePage !== pageCount - 2)
        pages.push(<Pagination.Ellipsis key="ellipsis2" />);
      pages.push(
        <Pagination.Item
          key={pageCount}
          onClick={() => setActivePage(pageCount)}
        >
          {pageCount}
        </Pagination.Item>
      );
    }
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => setActivePage(1)} />
      {pages}
      <Pagination.Last onClick={() => setActivePage(pageCount)} />
    </Pagination>
  );
};

export default CustomPagination;
