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
    font-weight: 500;
    color: var(--white);

    @media (min-width: 768px) {
      font-size: 1.5vw;
      font-weight: 600;
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
    inline-size: 100%;
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
    position: relative;
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
    inline-size: 100%;
    block-size: auto;
    object-fit: cover;
    border-radius: 0.3rem;
  }

  .slide-title {
    inline-size: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    font-size: 2.8vw;
    @media (min-width: 768px) {
      font-size: 1.6vw;
    }

    @media (min-width: 1920px) {
      font-size: 1.2vw;
    }
  }

  .ranking-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem; /* 고정된 너비 */
    height: 5rem; /* 고정된 높이 */
    margin: 0 auto; /* 중앙 정렬 */
  }

  @media (min-width: 768px) {
    .ranking-container {
      width: 7rem;
      height: 7rem;
    }
  }

  @media (min-width: 1920px) {
    .ranking-container {
      width: 9rem;
      height: 9rem;
    }
  }

  .ranking {
    font-size: 2.5rem;
    font-style: italic;
    font-weight: bold;
    color: var(--white);
    line-height: 1; /* 숫자를 중앙 정렬하기 위해 사용 */
    @media (min-width: 768px) {
      font-size: 4rem;
    }

    @media (min-width: 1920px) {
      font-size: 5rem;
    }
  }

  .age-rating {
    display: inline-block;
    position: absolute;
    top: 1.5%;
    right: 1%;
  }

  .age-rating-icon {
    inline-size: 90%;
    block-size: auto;
    max-width: 1.5rem;
    max-height: 1.5rem;
    object-fit: contain;

    @media (min-width: 768px) {
      max-width: 2rem;
      max-height: 2rem;
    }

    @media (min-width: 1920px) {
      max-width: 2.5rem;
      max-height: 2.5rem;
    }
  }

  .t-original {
    display: inline-block;
    position: absolute;
    bottom: 16%;
    left: 14vw;

    @media (min-width: 768px) {
      left: 8.5vw;
    }

    @media (min-width: 1920px) {
      left: 5.6vw;
    }
  }

  .t-original-icon {
    inline-size: 12vw; /* 슬라이드 이미지 크기 비례로 설정 */
    block-size: auto; /* 비율 유지 */
    max-width: 7rem; /* 최대 크기 제한 */
    object-fit: contain; /* 비율을 유지하며 크기 맞추기 */

    @media (min-width: 768px) {
      inline-size: 7vw;
      max-width: 8rem;
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
