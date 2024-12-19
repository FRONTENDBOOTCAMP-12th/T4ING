import { css } from 'lit';

export default css`
  .swiper {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .swiper-wrapper {
    display: flex;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      aspect-ratio: 4/5;
      object-fit: cover;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--white);
  }
`;
