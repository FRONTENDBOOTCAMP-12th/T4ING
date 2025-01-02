import { css } from 'lit';

export default css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    inline-size: 100%;
    block-size: auto;
    min-width: 320px;
    padding-inline: 0.5rem;
    gap: 1rem;
    background-color: transparent;

    overflow: clip;
    clip: padding-box;

    @media (min-width: 768px) {
      padding-inline: 2.5rem;
    }

    @media (min-width: 1920px) {
      padding-inline: 4.375rem;
    }
  }

  h1 {
    font-size: var(--slider-title-font-size-s);
    font-weight: var(--slider-title-font-weight-s);
    color: var(--white);

    @media (min-width: 768px) {
      font-size: var(--slider-title-font-size-m);
      font-weight: var(--slider-title-font-weight-m);
    }

    @media (min-width: 1920px) {
      font-size: var(--slider-title-font-size-l);
      font-weight: var(--slider-title-font-weight-l);
    }
  }

  ::part(container),
  ::part(wrapper) {
    overflow: visible;
  }

  ::part(wrapper) {
    block-size: auto;
  }

  .swiper-outer-wrapper {
    position: relative;
  }

  swiper-container {
    inline-size: 100%;
    margin-inline: 0;

    @media (max-width: 767px) {
      width: calc(100% - 16px);
    }
  }

  swiper-slide,
  swiper-slide.swiper-slide-active {
    display: flex;
    justify-content: flex-end;
    position: relative;
    inline-size: 100%;
    transition: transform 0.3s ease-in-out;
  }

  swiper-slide:hover,
  swiper-slide:focus {
    transform: translateY(var(--slide-hover-translate-y));
  }

  .slide-img-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    inline-size: 100%;
    block-size: auto;
    min-width: 50%;
    overflow: hidden;
    gap: 0.5rem;
  }

  .slide-img-container .slide-img {
    inline-size: 100%;
    block-size: auto;
    object-fit: cover;
    border-radius: var(--slide-img-border-radius);
  }

  .slide-title {
    display: flex;
    justify-content: flex-start;
    align-items: bottom;
    inline-size: 100%;

    padding-block: 1vw;

    & p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      inline-size: 95%;
      font-size: var(--slide-title-font-size-s3);
      font-weight: var(--slide-title-font-weight-s3);
    }

    & p:first-child {
      font-size: var(--slide-title-font-size-s);
      font-weight: var(--slide-title-font-weight-s);
    }

    @media (min-width: 768px) {
      & p {
        font-size: var(--slide-title-font-size-m3);
        font-weight: var(--slide-title-font-weight-m3);
      }
      & p:first-child {
        font-size: var(--slide-title-font-size-m);
        font-weight: var(--slide-title-font-weight-m);
      }
    }

    @media (min-width: 1920px) {
      & p {
        font-size: var(--slide-title-font-size-l3);
        font-weight: var(--slide-title-font-weight-l3);
      }
      & p:first-child {
        font-size: var(--slide-title-font-size-l);
        font-weight: var(--slide-title-font-weight-l);
      }
    }
  }

  .ranking-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 40;
    min-width: 6.5vw;

    @media (min-width: 768px) {
      min-width: 5.5vw;
    }

    & .ranking {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 8vw;
      font-weight: 700;
      font-style: italic;

      @media (min-width: 768px) {
        font-weight: 700;
        font-size: 6.2vw;
      }
    }
  }

  .title-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    inline-size: 100%;
    gap: 0.3rem;
  }

  .nav-btn {
    display: none;
    position: absolute;
    border: 0;

    inline-size: 18px;
    opacity: 1;

    cursor: pointer;

    z-index: 30;

    block-size: 100%;

    &.show {
      display: block;
    }

    @media (min-width: 768px) {
      inline-size: 40px;
    }

    @media (min-width: 1920px) {
      inline-size: 70px;
    }

    &:disabled {
      display: none;
    }
  }

  .next-btn {
    right: 0;
    background: url('/assets/images/icon/banner_arrow_right.svg'),
      radial-gradient(
        ellipse at right,
        rgb(0 0 0 / 60%) 15%,
        rgb(0 0 0 / 24%),
        transparent,
        transparent
      );

    background-repeat: no-repeat;
    background-position: center;

    background-size: contain;

    @media (min-width: 768px) {
      transform: translateX(2.5rem);
    }

    @media (min-width: 1920px) {
      transform: translateX(4.375rem);
    }
  }

  .prev-btn {
    left: 0;
    background: url('/assets/images/icon/banner_arrow_left.svg'),
      radial-gradient(
        ellipse at left,
        rgb(0 0 0 / 60%) 15%,
        rgb(0 0 0 / 24%),
        transparent,
        transparent
      );

    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    @media (min-width: 768px) {
      transform: translateX(-2.5rem);
    }

    @media (min-width: 1920px) {
      transform: translateX(-4.375rem);
    }
  }
`;
