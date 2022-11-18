import React from "react";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  gap: 10px;
  .next,
  .prev,
  .pagination-item {
    cursor: pointer;
    height: 40px;
    width: 40px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    &:hover,
    &.is-current {
      background: ${(props) => props.theme.secondary};
      color: white;
    }
  }
  .pagination-container {
    display: flex;
    gap: 10px;
  }
`;

const Pagination = () => {
  return (
    <StyledPagination>
      <span className="prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <div className="pagination-container">
        <div className="pagination-item is-current">1</div>
        <div className="pagination-item">2</div>
        <div className="pagination-item">...</div>
        <div className="pagination-item">99</div>
        <div className="pagination-item">100</div>
      </div>
      <span className="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </StyledPagination>
  );
};

export default Pagination;
