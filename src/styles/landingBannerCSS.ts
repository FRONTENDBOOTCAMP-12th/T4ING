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
      width: 95%;
      max-width: 600px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  }

  .banner {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: var(--white);
    text-align: center;

    h2 {
      line-height: 1.4;
      font-size: var(--text-size-l);
      margin: 0 0;
    }

    p {
      line-height: 1.6;
      font-size: var(--text-size-s);
      margin: 0.5rem 0;
      color: var(--gray400);
    }

    a {
      font-size: var(--text-size-m);
      text-decoration: none;
      background-color: var(--red-2);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      color: var(--white);
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`;
