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
    inline-size: 70%;
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
    position: relative;
    inline-size: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    font-size: var(--slide-title-font-size-s);

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

  .new {
    position: absolute;
    inline-size: 0.8vw;
    block-size: 0.8vw;
    background-color: var(--red-1);
    border-radius: 50%;
    margin-left: 0.2vw;
    opacity: 0;
    z-index: 50;

    @media (min-width: 768px) {
      inline-size: 0.5vw;
      block-size: 0.5vw;
    }

    @media (min-width: 1920px) {
      inline-size: 0.3vw;
      block-size: 0.3vw;
    }

    &.updated {
      opacity: 1;
    }
  }

  .ranking-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 40;

    & .ranking {
      position: absolute;
      left: 0;
      font-size: 10vw;
      font-weight: 700;
      font-style: italic;

      @media (min-width: 768px) {
        font-weight: 700;
        font-size: 6.2vw;
      }
    }
  }

  .icons-container {
    display: flex;
    position: absolute;
    inline-size: 70%;
    block-size: 100%;
  }

  .icons-wrapper {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
  }

  .age-rating {
    inline-size: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    padding-right: 0.5vw;
    padding-top: 0.3vw;

    & .age-rating-icon {
      inline-size: 100%;
      max-width: 1.5rem;
      max-height: 1.5rem;
      object-fit: contain;

      @media (min-width: 768px) {
        max-width: 2rem;
        max-height: 2rem;
      }
      @media (min-width: 1920px) {
        max-width: 2.3rem;
        max-height: 2.3rem;
      }
    }
  }

  .t-original {
    inline-size: 100%;
    position: absolute;
    bottom: 20%;
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
      bottom: 16%;
    }

    & .t-original-icon {
      inline-size: 16vw;
      max-width: 5rem;
      object-fit: contain;

      @media (min-width: 768px) {
        inline-size: 9vw;
        max-width: 10rem;
      }

      @media (min-width: 1920px) {
        inline-size: 10vw;
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
