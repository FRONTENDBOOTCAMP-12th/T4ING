import { css } from 'lit';

export default css`
  .slide-container {
    --slide-container-min-width: 20rem;
    --slide-container-height: 30rem;

    --title-font-size: var(--size-5);
    --primary-font-size: var(--size-3);
    --secondary-font-size: var(--size-3);

    position: relative;
    min-width: var(--slide-container-min-width);
    width: 100%;
    height: var(--slide-container-height);
    margin: 0 auto;
    aspect-ratio: 4/5;

    .slide-title {
      font-size: var(--title-font-size);
      text-align: center;
      color: var(--white);
      line-height: 1.6;
    }
    .slide-description-primary {
      font-size: var(--primary-font-size);
      text-align: center;
      color: var(--gray200);
      line-height: 1.6;
    }
    .slide-description-secondary {
      font-size: var(--secondary-font-size);
      text-align: center;
      color: var(--gray200);
      line-height: 1.6;
    }

    .slider-container {
      width: calc(100vw-40px);
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .landing-link {
      display: block;
      outline: none;
      text-decoration: none;
    }

    .landing-link:focus {
      outline: 2px solid var(--focus-color);
    }
    @media (min-width: 48rem) {
      --primary-font-size: var(--size-4);
      .slide-title {
        visibility: hidden;
      }
    }
    @media (min-width: 120rem) {
      --title-font-size: var(--size-13);
      --primary-font-size: var(--size-7);
      --secondary-font-size: var(--size-5);

      --slide-container-height: 50rem;
      .slide-title {
        visibility: visible;
      }
    }
  }
`;
