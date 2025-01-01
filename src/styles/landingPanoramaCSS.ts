import { css } from 'lit';

export default css`
  .panorama-container {
    --container-padding: 5rem;
    --title-font-size: var(--text-size-l);
    --description-margin: 0;
    --description-padding: 1.625rem;
    --description-font-size: var(--text-size-s);
    --description-sub-margin: 0;
    --image-width: 11.25rem;
    --image-height: 6.375rem;
    --slide-margin: var(--size-3);

    position: relative;
    width: 100%;
    text-align: center;
    color: white;
    padding-block-start: var(--container-padding);
    margin-bottom: 2rem;
    outline: none;

    @media (min-width: 48rem) {
      --title-font-size: var(--text-size-xl);
      --description-padding: var(--size-8);
      --description-font-size: var(--text-size-m);
      --description-sub-font-size: var(--text-size-s);
    }
    @media (min-width: 120rem) {
      --container-padding: 12.5rem;
      --slide-container-height: 50rem;

      --title-font-size: var(--text-size-3xl);
      --description-margin: var(--size-5);
      --description-padding: 3.125rem;
      --description-font-size: var(--text-size-xl);
      --description-sub-margin: var(--size-2);
      --description-sub-font-size: var(--text-size-l);
    }

    .panorama-title {
      margin-bottom: 0.625rem;
      font-size: var(--title-font-size);
      font-weight: 700;
      line-height: 1.4;
      transition: 0.3s;
    }

    .panorama-description {
      margin-block-start: var(--description-margin);
      padding-block-end: var(--description-padding);
      font-size: var(--description-font-size);
      line-height: 1.5;
      transition: 0.3s;

      span {
        display: block;
        margin-block-start: var(--description-sub-margin);
        font-size: var(--description-sub-font-size);
        line-height: 1.6;
      }
    }

    .panorama-slider {
      position: relative;
      overflow: hidden;
      width: 100%;
      margin: auto;
      white-space: nowrap;
    }

    .slides-right,
    .slides-left {
      display: flex;
      will-change: transform;
    }

    .slide {
      flex: 0 0 auto;
      margin: var(--slide-margin);
      box-sizing: border-box;
      background-size: cover;
      background-position: center;
    }

    img {
      display: inline-block;
      width: var(--image-width);
      height: var(--image-height);
      aspect-ratio: 4/5;
    }
    .landing-link:focus {
      outline: 2px solid white;
      outline-offset: 4px;
    }

    @media (min-width: 120rem) {
      .panorama-title {
        --title-font-size: var(--size-13);
      }

      .panorama-description-primary {
        --primary-font-size: var(--size-7);
      }

      .panorama-description-secondary {
        --secondary-font-size: var(--size-5);
        visibility: visible;
      }

      img {
        --image-width: 22rem;
        --image-height: 12.5rem;
      }
    }
  }
`;
