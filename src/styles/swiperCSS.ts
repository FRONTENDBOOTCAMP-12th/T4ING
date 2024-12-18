import { css } from 'lit';

export default css`
  .swiper {
    display: flex;
    inline-size: 100%;
    block-size: 100%;
  }
  .swiper-wrapper {
    display: flex;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      inline-size: 100%;
      block-size: auto;
      object-fit: cover;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--white);
  }
`;
