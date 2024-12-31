import { css } from 'lit';

export default css`
  .panorama-container {
    --title-font-size: var(--text-size-m);
    --primary-font-size: var(--text-size-s);
    --secondary-font-size: var(--text-size-s);
    --image-width: 11.25rem;
    --image-height: 6.375rem;
    --slide-margin: var(--size-3);

    position: relative;
    width: 100%;
    text-align: center;
    color: white;
    padding-block: 4rem;
    margin-bottom: 2rem;
    outline: none;

    .panorama-title {
      font-size: var(--title-font-size);
      margin-bottom: 0.625rem;
      line-height: 1.6;
    }

    .panorama-description-primary {
      font-size: var(--primary-font-size);
      margin-bottom: 1.25rem;
      line-height: 1.6;
    }

    .panorama-description-secondary {
      font-size: var(--secondary-font-size);
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
