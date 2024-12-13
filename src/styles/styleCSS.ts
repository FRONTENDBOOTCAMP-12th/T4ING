import { css } from 'lit';

export default css`
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

  .mobile-hidden {
    display: none;
  }
  @media (width >= 48rem) {
    .mobile-hidden {
      display: block;
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
