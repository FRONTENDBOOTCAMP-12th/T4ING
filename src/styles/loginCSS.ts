import { css } from 'lit';
import { register } from 'swiper/element';

export default css`
  .login-container {
    --transition: 0.3s;
    --container-size: 19.5625rem;
    --container-padding-top: 2.375rem;
    --title-margin-bottom: 1.25rem;
    --title-font-size: var(--text-size-m);
    --input-gap: 0.5rem;
    --find-account-wrap-padding-top: 1.25rem;
    --font-size: var(--text-size-s);
    --find-acount-padding: 0rem 0.75rem;
    --hr-height: 0.75rem;
    --hr-margin: 0 0.5rem;
    --login-register-wrap-padding-top: 1.25rem;
    --login-register-padding: 0 0.75rem;

    @media (min-width: 48rem) {
      --container-size: 23.25rem;
      --container-padding-top: 2.5rem;
      --title-margin-bottom: 1.5rem;
      --title-font-size: var(--text-size-l);
      --input-gap: 0.5rem;
      --find-account-wrap-padding-top: 1.5rem;
      --font-size: var(--text-size-m);
      --find-acount-padding: 0rem 1rem;
      --hr-height: 0.875rem;
      --hr-margin: 0 0.5rem;
      --login-register-wrap-padding-top: 1rem;
      --login-register-padding: 0 0.75rem;
    }

    @media (min-width: 120rem) {
      --container-size: 45.75rem;
      --container-padding-top: 4.375rem;
      --title-margin-bottom: 3.75rem;
      --title-font-size: var(--text-size-xl);
      --input-gap: 0.9375rem;
      --find-account-wrap-padding-top: 3rem;
      --font-size: var(--text-size-l);
      --find-acount-padding: 0rem 2.4rem;
      --hr-height: 1.125rem;
      --hr-margin: 0 0.75rem;
      --login-register-wrap-padding-top: 2.75rem;
      --login-register-padding: 0 1rem;
    }

    justify-self: center;
    padding-top: var(--container-padding-top);
  }

  .login-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;
  }
  .login__title {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: var(--white);
    font-size: var(--title-font-size);
    font-weight: 700;
    line-height: 140%;
    margin-bottom: var(--title-margin-bottom);
    transition: var(--transition);
  }
  .login__input-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--input-gap);
    transition: var(--transition);
  }

  .login__register-wrap {
    padding-top: var(--login-register-wrap-padding-top);
    color: var(--gray500);
    font-size: var(--font-size);
    font-weight: 400;
    line-height: 160%;
    transition: var(--transition);
    .login__register {
      color: var(--gray300);
      padding: var(--login-register-padding);
    }
  }

  .login__find-acount-wrap {
    display: flex;
    justify-content: center;
    padding-top: var(--find-account-wrap-padding-top);
    align-items: center;
    gap: 0.5rem;
    font-weight: 400;
    transition: var(--transition);

    & hr {
      margin: var(--hr-margin);
      width: 0.0625rem;
      height: var(--hr-height);
      border: none;
      background: var(--gray800);
      transition: var(--transition);
    }

    & a {
      display: flex;
      padding: var(--find-acount-padding);
      align-items: flex-start;
      color: var(--gray300);
      font-size: var(--font-size);
      font-weight: 400;
      line-height: 160%;
      transition: var(--transition);
    }
  }
`;
