import { css } from 'lit';

export default css`
  * {
    box-sizing: border-box;
    padding: 0; /* 내부 여백 제거 */
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    inline-size: 100%;
    block-size: auto;
    min-width: 320px;
    height: auto;
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
    font-size: 100%;
    font-weight: 600;
    color: var(--white);

    @media (min-width: 768px) {
      font-size: 1.5vw;
      font-weight: 700;
    }

    @media (min-width: 1920px) {
      font-size: 1.5vw;
      font-weight: 700;
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
    width: 100%;
    margin-inline: 0;

    @media (max-width: 767px) {
      width: calc(100% - 16px);

      &.is-middle {
        margin-inline: 0.5rem;
      }

      &.is-end {
        transform: translateX(1rem);
      }
    }
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 100%;

    transition: transform 0.2s ease-in-out;
  }

  swiper-slide:hover,
  swiper-slide:focus {
    transform: translateY(-0.3rem);
  }

  .slide-img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .slide-img-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0.3rem;
  }

  .slide-title {
    font-size: 0;
    white-space: nowrap;
    overflow: ellipsis;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      font-size: 1.6vw;
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
      // block-size: 40px;
    }

    @media (min-width: 1920px) {
      inline-size: 70px;
      // block-size: 70px;
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
