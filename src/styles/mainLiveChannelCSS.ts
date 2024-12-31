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

    flex: 0 0 auto;
    position: relative;
    inline-size: calc(100% - 1rem);

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
    align-items: center;
    width: 100%;

    min-width: 80%;
    overflow: hidden;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .slide-img-container .slide-img {
    inline-size: 100%;
    block-size: auto;
    object-fit: cover;
    border-radius: var(--slide-img-border-radius);
  }

  .slide-title {
    display: flex;
    flex-direction: row;

    position: relative;
    inline-size: 100%;
    block-size: 50%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    font-size: var(--slide-title-font-size-s);
    font-weight: var(--slide-title-font-weight-s);

    @media (min-width: 768px) {
      font-size: var(--slide-title-font-size-m);
      font-weight: var(--slide-title-font-weight-m);
    }

    @media (min-width: 1920px) {
      font-size: var(--slide-title-font-size-l);
      font-weight: var(--slide-title-font-weight-l);
    }
  }

  .ranking-container {
    display: flex;
    justify-content: center;
    align-items: end;

    inline-size: 10vw;

    z-index: 40;

    & .ranking {
      font-size: 10vw;
      font-weight: 700;
      font-style: italic;

      @media (min-width: 768px) {
        font-weight: 600;
        font-size: 7vw;
      }
    }
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
