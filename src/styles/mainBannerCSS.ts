import { css } from 'lit';

export default css`
  .main-banner-container {
    position: relative;
    background-color: transparent;
    min-width: 320px;
    inline-size: 100%;
    block-size: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    margin-block: 0.5rem;
  }

  swiper-container {
    block-size: 100%;
    inline-size: 100%;
    background-color: var(--gray800);
  }

  img {
    inline-size: 100%;
    block-size: auto;
    padding: 0;
    object-fit: cover;
  }

  .next,
  .prev {
    position: absolute;

    top: 50%;
    z-index: 2;
    background-color: transparent;

    border: 0;

    box-sizing: border-box;
    padding: 0;
    margin: 0;

    inline-size: 18px;
    block-size: 18px;
    opacity: 0.7;

    cursor: pointer;

    @media (min-width: 768px) {
      inline-size: 40px;
      block-size: 40px;
    }

    @media (min-width: 1920px) {
      inline-size: 70px;
      block-size: 70px;
    }

    &:hover {
      opacity: 1;
    }

    &:disabled {
      display: none;
    }
  }

  .next {
    right: 0;
    background: url('/assets/images/icon/banner_arrow_right.svg') no-repeat
      center;

    background-size: contain;
  }
  .prev {
    left: 0;
    background: url('/assets/images/icon/banner_arrow_left.svg') no-repeat
      center;
    background-size: contain;
  }

  .custom-pagination {
    position: absolute;

    bottom: 10%;
    left: 5%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    inline-size: fit-content;
    block-size: auto;
    gap: 0.375rem;
    color: var(--white);
    z-index: 100;

    cursor: pointer;

    @media (min-width: 768px) {
      gap: 0.5rem;
    }
    @media (min-width: 1920px) {
      gap: 0.75rem;
    }
  }

  .bullet {
    display: inline-block;
    border-radius: 50%;
    inline-size: 6px;
    block-size: 6px;

    margin: 0;

    background: url('/assets/images/icon/swiper_pagination_bullet.svg')
      no-repeat center center;
    background-size: contain;

    &.active {
      background: url('/assets/images/icon/swiper_pagination_bullet_active.svg')
        no-repeat center center;
      background-size: contain;
    }

    @media (min-width: 768px) {
      inline-size: 8px;
      block-size: 8px;
    }
    @media (min-width: 1920px) {
      inline-size: 12px;
      block-size: 12px;
    }
  }

  .autoplay {
    cursor: pointer;
    border: 0;
    background-color: transparent;

    padding: 0;

    inline-size: 11px;
    block-size: 11px;

    @media (min-width: 768px) {
      inline-size: 15px;
      block-size: 15px;
    }
    @media (min-width: 1920px) {
      inline-size: 25px;
      block-size: 25px;
      margin-right: calc(1.25rem - 0.75rem);
    }

    &.play {
      background: url('/assets/images/icon/play_banner.svg') no-repeat center
        center;
      background-size: contain;
    }
    &.pause {
      background: url('/assets/images/icon/pause_banner.svg') no-repeat center
        center;
      background-size: contain;
    }
  }

  .banner-description {
    position: absolute;
    bottom: 20%;
    left: 5%;
    z-index: 10;

    font-size: 0.7502rem;
    font-weight: 600;
    line-height: 150%;

    font-size: clamp(0.7502rem, 1.5vw, 2.3rem);

    @media (min-width: 1920px) {
      line-height: 160%;
    }
  }

  .view-more {
    border: solid 1px var(--gray300);
    border-radius: 0.3125rem;
    background-color: transparent;

    opacity: 0.9;

    font-size: 0.7502rem;

    color: var(--gray300);

    position: absolute;
    z-index: 10;
    right: 5%;
    bottom: 20%;

    inline-size: fit-content;
    block-size: auto;
    padding: 0.5rem 0.75rem;

    cursor: pointer;

    @media (min-width: 768px) {
      padding: 0.9rem 1.55rem;
      font-size: clamp(1rem, 1.5vw, 1.25rem);
    }

    @media (min-width: 1920px) {
      padding: 1.3rem 2.5rem;
      font-size: clamp(1.25rem, 1.5vw, 1.5rem);
    }

    &:hover {
      opacity: 1;
    }
  }
`;
