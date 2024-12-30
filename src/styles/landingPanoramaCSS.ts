import { css } from 'lit';

export default css`
  .panorama-container {
    --container-height: 110vw;
    --container-max-height: 25rem;
    --title-font-size: var(--text-size-m);
    --desc-primary-font-size: var(--text-size-s);
    --desc-secondary-font-size: var(--text-size-s);
    --image-width: 11.25rem;
    --image-height: 6.375rem;
    --slide-margin: var(--size-3);
    --animation-duration-multiplier: 1s;

    position: relative;
    width: 100%;
    height: var(--container-height);
    max-height: var(--container-max-height);
    text-align: center;
    color: white;
    padding-block: 4rem;
    margin-bottom: 2rem;

    .panorama-title {
      font-size: var(--title-font-size);
      margin-bottom: 0.625rem;
      line-height: 1.6;
    }

    .panorama-description-primary {
      font-size: var(--desc-primary-font-size);
      margin-bottom: 1.25rem;
      line-height: 1.6;
    }

    .panorama-description-secondary {
      font-size: var(--desc-secondary-font-size);
      margin-bottom: 1.25rem;
      line-height: 1.6;
      visibility: hidden;
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

    @media (min-width: 120rem) {
      .panorama-container {
        --container-height: 55vw;
        --container-max-height: 63.75rem;
      }

      .panorama-title {
        --title-font-size: var(--size-13);
      }

      .panorama-description-primary {
        --desc-primary-font-size: var(--size-7);
      }

      .panorama-description-secondary {
        --desc-secondary-font-size: var(--size-5);
        visibility: visible;
      }

      img {
        --image-width: 22rem;
        --image-height: 12.5rem;
      }
    }
  }
`;
