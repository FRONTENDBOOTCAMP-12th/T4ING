import { css } from 'lit';

export default css`
  .slide-container {
    --slide-container-min-width: 20rem;
    --slide-container-height: 30rem;
    --slide-container-padding: 3rem;

    --title-font-size: var(--text-size-l);
    --description-margin: 0;
    --description-padding: 1.625rem;
    --description-font-size: var(--text-size-s);
    --description-sub-margin: 0;

    position: relative;
    min-width: var(--slide-container-min-width);
    width: 100%;
    height: var(--slide-container-height);
    margin: 0 auto;
    padding-block-start: var(--slide-container-padding);
    aspect-ratio: 4/5;

    @media (min-width: 48rem) {
      --slide-container-padding: 2.5rem;

      --title-font-size: var(--text-size-xl);
      --description-padding: var(--size-8);
      --description-font-size: var(--text-size-m);
      --description-sub-font-size: var(--text-size-s);
    }
    @media (min-width: 120rem) {
      --slide-container-height: 50rem;
      --slide-container-padding: 10rem;

      --title-font-size: var(--text-size-3xl);
      --description-margin: var(--size-5);
      --description-padding: 3.125rem;
      --description-font-size: var(--text-size-xl);
      --description-sub-margin: var(--size-2);
      --description-sub-font-size: var(--text-size-l);
    }

    .slide-title {
      font-size: var(--title-font-size);
      font-weight: 700;
      text-align: center;
      color: var(--white);
      line-height: 1.4;
      transition: 0.3s;
    }
    .slide-description {
      margin-block-start: var(--description-margin);
      padding-block-end: var(--description-padding);
      font-size: var(--description-font-size);
      text-align: center;
      color: var(--gray200);
      line-height: 1.5;
      transition: 0.3s;

      span {
        display: block;
        margin-block-start: var(--description-sub-margin);
        font-size: var(--description-sub-font-size);
        line-height: 1.6;
      }
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
  }
`;
