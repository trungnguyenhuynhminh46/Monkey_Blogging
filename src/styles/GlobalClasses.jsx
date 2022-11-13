import { css } from "styled-components";

export const GlobalClasses = css`
  .container {
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .grid-layout {
    display: grid;
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 40px;
    }
    @media screen and (max-width: 1023.98px) {
      grid-auto-flow: column;
      grid-auto-columns: 235px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
    }
    & > * {
      scroll-snap-align: start;
    }
    &--secondary {
      grid-auto-columns: 220px;
      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  }
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }
`;
