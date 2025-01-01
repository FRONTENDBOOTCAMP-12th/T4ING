import { css } from 'lit';

export default css`
  .banner-container {
    position: relative;
    width: 100%;
    height: 70vh;
    overflow: hidden;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    pointer-events: none;
  }

  .slides-container {
    width: 25%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .slides {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 200%;
  }

  @keyframes scroll-up {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-100%);
    }
  }
  @keyframes scroll-down {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
  .slides-up {
    animation: scroll-up var(--animation-duration, 5s) linear infinite;
  }
  .slides-down {
    animation: scroll-down var(--animation-duration, 10s) linear infinite;
  }

  .slide {
    text-align: center;
    margin: 1rem 0;
    img {
      width: 100%;
      max-width: 600px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  }

  .banner {
    --title-font-size: var(--text-size-m);
    --desc-margin: 0 var(--size-4);
    --desc-font-size: var(--text-size-s);
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('/assets/images/bg/dimmd.webp') 50% / auto calc(100% + 2px)
      repeat-x;
    color: var(--white);
    text-align: center;

    @media (min-width: 48rem) {
      --desc-margin: var(--size-2) var(--size-7);
      --title-font-size: var(--text-size-l);
    }
    @media (min-width: 120rem) {
      --title-font-size: var(--text-size-3xl);
      --desc-margin: var(--size-5) 3.75rem;
      --desc-font-size: var(--text-size-xl);
    }

    h2 {
      font-size: var(--title-font-size);
      font-weight: 700;
      line-height: 1.4;
      transition: 0.3s;
    }

    p {
      margin-block: var(--desc-margin);
      font-size: var(--desc-font-size);
      line-height: 1.6;
      color: var(--gray400);
      transition: 0.3s;
    }
  }
`;
