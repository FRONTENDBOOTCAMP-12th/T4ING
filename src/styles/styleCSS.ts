import { css } from 'lit';

export default css`
  :root {
    /* text color */
    --base-font-color: var(--gray200);

    /* rounded */
    --round-xs: var(--size-1);

    min-inline-size: 20rem;
    background: var(--black);
    font-family: 'Pretendard-Regular', sans-serif;
    color: var(--base-font-color);
  }

  /* 숨김 콘텐츠 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* header */
  .header {
    display: flex;
    align-items: center;
    column-gap: var(--size-6);
    position: relative;
    block-size: 2.375rem;
    padding: 0.625rem 1rem;

    .header__gnb {
      display: none;
      margin-block-end: auto;

      ul {
        display: contents;
      }
    }

    aside {
      display: flex;
      column-gap: var(--size-6);
      margin-inline-start: auto;
    }

    .header__user {
      border-radius: var(--round-xs);
    }
  }
  @media (width >= 48rem) {
    .header {
      .header__gnb {
        display: contents;
        font-size: 0.75rem;
      }
    }
  }

  /* logo */
  .logo {
    display: block;
    inline-size: 2.875rem;
    transition: all 0.3s;
  }

  @media (width >= 48rem) {
    .logo {
      inline-size: 4.6875rem;
    }
  }
  @media (width >= 120rem) {
    .logo {
      inline-size: 8.25rem;
    }
  }
`;
