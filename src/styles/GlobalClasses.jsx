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
    gap: 40px;
    /* Hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media screen and (max-width: 1023.98px) {
      grid-auto-flow: column;
      grid-auto-columns: 280px;
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
  /* Visually hide any element (mostly text) accessibly. */
  .hidden-input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
  /* Image gallery */
  .gallery {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    grid-auto-flow: dense;

    padding: 10px;
    max-width: 100%;
    margin: 0 auto;
  }

  .gallery div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .v-stretch {
    @media screen and (min-width: 640px) {
      grid-row: span 2;
    }
  }

  .h-stretch {
    @media screen and (min-width: 640px) {
      grid-column: span 2;
    }
  }

  .big-stretch {
    @media screen and (min-width: 640px) {
      grid-row: span 2;
      grid-column: span 2;
    }
  }
`;
