import { css } from 'lit';

export default css`
  .landing-welcome {
    --welcome-height: 70vw;
    --welcome-max-height: 23rem;
    --button-bg-color: var(--red-2);
    --button-text-color: var(--white);
    --button-padding: 0.5rem 1rem;
    --button-border-radius: 0.5rem;
    --button-gap: 0.5rem;
    --icon-size: 1.5rem;
    --font-size-text: 1rem;
    --line-height-text: 1.4;
    --margin-text: 1rem 0;

    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--welcome-height);
    max-height: var(--welcome-max-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    text-align: center;
    color: white;
    margin-top: 5rem;

    p {
      line-height: var(--line-height-text);
      font-size: var(--font-size-text);
      margin: var(--margin-text);
    }

    .landing-link {
      margin-top: 1.5rem;
      font-size: var(--font-size-text);
      text-decoration: none;
      color: var(--button-text-color);
      background-color: var(--button-bg-color);
      padding: var(--button-padding);
      border-radius: var(--button-border-radius);
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
      gap: var(--button-gap);
    }

    .landing-button-icon {
      width: var(--icon-size);
      height: var(--icon-size);
    }

    @media (min-width: 120rem) {
      .landing-welcome {
        --welcome-height: 35vw;
        --welcome-max-height: 7rem;
      }
    }
  }
`;
