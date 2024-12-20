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
    display: 0 0 auto;
    width:calc(100% / 1.3 - 16px);
    justify-content: center;
    align-items: center;

    & img {
      min-width:17rem;
      min-height:25rem;
      aspect-ratio: 4/5;
      object-fit: cover;

      @media(min-width:120rem){
        min-width:56rem;
        min-height:31rem;
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--white);
  }
`;
