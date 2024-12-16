import { css } from 'lit';

export const searchCSS = {
  'taing-search': css`
    input:where(
        [type='text'],
        [type='search'],
        [type='email'],
        [type='password']
      ) {
      border: none;
      appearance: none;
    }

    :host {
      --inner-padding: var(--size-5) 2.375rem var(--size-10);
      position: absolute;
      inset-block-start: 100%;
      inset-inline: 0 0;
      padding: var(--inner-padding);
      background: var(--gray900);
      z-index: 1;
      transition: padding 0.3s;

      @media (min-width: 48rem) {
        --inner-padding: var(--size-7) min(7.6875rem, 16.015625vw)
          var(--size-12);
      }
      @media (min-width: 120rem) {
        --inner-padding: 3.25rem min(13.75rem, 11.458333333333332vw) 5.75rem;
      }
    }

    .search {
      --border-size: 0.125rem;
      --font-size: var(--text-size-m);
      --line-height: 1.0625rem;
      display: flex;
      position: relative;

      .search__input {
        inline-size: 100%;
        padding-block: 0.6875rem;
        border-block-end: var(--border-size) solid var(--white);
        background-color: inherit;
        font-size: var(--font-size);
        font-weight: 600;
        line-height: var(--line-height);
        color: var(--white);

        &::placeholder {
          color: var(--gray700);
        }

        & + button {
          position: absolute;
          inset-inline-end: 0;
          border: none;
          appearance: none;

          &:focus-visible {
            outline-offset: 5px;
          }
        }
      }

      @media (min-width: 48rem) {
        --border-size: 0.1875rem;
        --font-size: var(--text-size-l);
        --line-height: var(--size-8);
      }
      @media (min-width: 120rem) {
        --font-size: var(--text-size-2xl);
        --line-height: 3.5rem;
      }
    }
  `,
};
