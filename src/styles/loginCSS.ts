import { css } from 'lit';

export default css`
  .login {
    --button-color: var(--red-1);
    inline-size: 100%;
    block-size: 100%;
    padding-top: 2.375rem;
  }
  .login-title {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    color: var(--white);
    font-weight: 700;
    line-height: 140%;
    margin-bottom: 1.25rem;
  }
  .login__input {
    margin-top: 0.5rem;

    & input {
      display: flex;
      width: 18rem;
      height: 2.875rem;
      padding: 0rem 1.25rem 0rem 1rem;
      align-items: center;
      color: var(--gray600);
      line-height: 160%;
      font-weight: 400;
      border-radius: 0.25rem;
      background: var(--dark-bg-2);
      border: none;
    }
  }
  .login__state-checkbox-wrap {
    box-sizing: border-box;
    display: flex;
    color: var(--gray500);
    inline-size: 18rem;
    block-size: 2.6875rem;
    padding: 0.5rem 0rem 1rem 0rem;
    align-items: flex-start;
    white-space: nowrap;
    font-size: 0.7502rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;

    .login__state-checkbox {
      position: absolute;
      flex-shrink: 0;
      visibility: hidden;
    }

    .login__state-label {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }

    .icon-check {
      display: inline-block;
      margin-right: 0.25rem;
      inline-size: 1rem;
      block-size: 1rem;
      background-image: url('/assets/images/icon/login_checkbox.svg');
      background-size: cover;
      background-position: center;
    }

    .login__state-checkbox:checked + .login__state-label .icon-check {
      background-image: url('/assets/images/icon/login_checkbox_checked.svg');
    }
  }

  .login__button {
    display: flex;
    inline-size: 18rem;
    block-size: 2.625rem;
    justify-content: center;
    align-items: center;
    border: none;
    background: var(--button-color);
    padding: 1rem;
    cursor: pointer;
    inline-size: 100%;

    color: var(--white);
    font-size: 0.7502rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }

  .login-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0;
  }

  .login__register-wrap {
    margin-top: 1.25rem;
    color: var(--gray500);
    font-size: 0.7502rem;
    font-weight: 400;
    line-height: 160%;

    .login__register {
      padding: 0.75rem;
      color: var(--gray300);
    }
  }

  .login__find-acount-wrap {
    display: flex;
    justify-self: center;
    width: 18rem;
    padding-top: 1.25rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-weight: 400;

    & hr {
      margin: 0 0.5rem;
      width: 0.0625rem;
      height: 0.75rem;
      border: none;
      background: var(--gray800);
    }

    & a {
      display: flex;
      padding: 0rem 0.75rem;
      align-items: flex-start;
      color: var(--gray300);
      font-size: 0.7502rem;
      font-weight: 400;
      line-height: 160%;
    }
  }
`;
