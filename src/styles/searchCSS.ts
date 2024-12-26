import { css } from 'lit';
import { Panorama } from './../components/landing/LandingPanorama';

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
      background: var(--header-search-bg);
      z-index: 1;
      transition: 0.3s;

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
          inset-block: 0 var(--border-size);
          border: none;
          background-color: initial;
          aspect-ratio: 1/1;
          appearance: none;
          cursor: pointer;

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

    .search-keyword {
      --padding: 3rem 3.25rem;
      --title-padding-bottom: var(--size-5);
      --title-font-size: var(--text-size-m);
      --btn-del-size: 1.125rem;
      display: flex;
      position: relative;
      column-gap: 4.375rem;
      margin-block: var(--padding);

      .search-keyword__item {
        color: var(--gray300);
      }

      .search-keyword__title {
        padding-block-end: var(--title-padding-bottom);
        font-size: var(--title-font-size);
        font-weight: 600;
        line-height: 1.6;
      }

      .search-keyword__item {
        flex: 1;
      }

      .keyword-list {
        display: inline-flex;
        flex-flow: column nowrap;
        row-gap: var(--size-2);
        overflow-y: auto;
        max-block-size: 16.25rem;

        &::-webkit-scrollbar {
          background-color: transparent;
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: var(--gray500);
          border-radius: var(--size-4);
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: #a0a0a5;
        }
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: transparent;
        }
        &::-webkit-scrollbar-track:hover {
          background-color: transparent;
        }
        &::-webkit-scrollbar-button {
          display: none;
        }

        li {
          display: flex;
          column-gap: var(--size-4);
        }
      }

      .trending-keyword-list {
        display: flex;
        flex-flow: column nowrap;
        row-gap: var(--size-2);
        counter-reset: number;

        li {
          a {
            display: inline-flex;
            font-weight: 600;
            line-height: 1.6;

            &:before {
              min-inline-size: var(--size-5);
              color: var(--red-1);
              counter-increment: number;
              content: counter(number);
            }
          }
        }
      }

      .btn-del {
        position: relative;
        inline-size: var(--btn-del-size);
        border: 0;
        background-color: initial;
        cursor: pointer;
        aspect-ratio: 1/1;
      }

      .btn-clear {
        position: relative;
        border: 0;
        background-color: initial;
        color: var(--gray600);
        appearance: none;
        cursor: pointer;
      }

      @media (min-width: 48rem) {
        .search-keyword {
          &:before {
            position: absolute;
            inset-block: 0;
            inset-inline-start: 50%;
            inline-size: 1px;
            background: var(--gray800);
            content: '';
          }
      }
      @media (min-width: 120rem) {
      }
    }
  `,
};
