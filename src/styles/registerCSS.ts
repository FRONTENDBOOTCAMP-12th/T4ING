import { css } from 'lit';

export default css`
  .register-container {
    --transition: 0.3s;
    --title-font-size: var(--size-4);
    --subtitle-font-size: var(--size-3);
    --font-size: var(--size-3);
    --wrap-padding: 1.875rem;
    --title-wrap-margin-bottom: 1.5625rem;
    --title-margin-bottom: 1rem;
    --input-container-gap: 1rem;
    --checkbox-wrap-margin-bottom: 1.3125rem;
    --checkbox-marketing-wrap-padding: 2.25rem;

    @media (min-width: 48rem) {
      --title-font-size: var(--size-7);
      --subtitle-font-size: var(--size-4);
      --font-size: var(--size-3);
      --wrap-padding: 1.75rem;
      --title-wrap-margin-bottom: 1.5625rem;
      --title-margin-bottom: 1rem;
      --input-container-gap: 1.125rem;
      --checkbox-wrap-margin-bottom: 1.3125rem;
    }

    @media (min-width: 120rem) {
      --title-font-size: var(--size-10);
      --subtitle-font-size: var(--size-7);
      --font-size: var(--size-5);
      --wrap-padding: 2.75rem;
      --title-wrap-margin-bottom: 3.75rem;
      --title-margin-bottom: 1.75rem;
      --input-container-gap: 2.125rem;
      --checkbox-wrap-margin-bottom: 2.25rem;
    }

    justify-self: center;
  }

  .register-wrap {
    padding-top: var(--wrap-padding);
  }

  .register__title-wrap {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--title-wrap-margin-bottom);
    transition: var(--transition);
    align-items: center;

    .register__title {
      color: var(--white);
      font-weight: 700;
      font-size: var(--title-font-size);
      margin-bottom: var(--title-margin-bottom);
      transition: inherit;
    }
    & span {
      font-size: var(--subtitle-font-size);
      transition: inherit;
    }
  }

  .register__input-container {
    display: flex;
    flex-direction: column;
    gap: var(--input-container-gap);
  }

  .register__checkbox-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-self: stretch;
    margin-bottom: var(--checkbox-wrap-margin-bottom);
  }

  .register__checkbox-marketing-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: var(--checkbox-marketing-wrap-padding);
  }

  .inValid {
    color: red;
  }
`;
