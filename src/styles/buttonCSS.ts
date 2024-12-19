import { css } from 'lit';

export const buttonCSS = {
  't-button': css`
    :host {
      display: block;
    }

    button {
      border: none;
      background-color: initial;
      appearance: none;
      cursor: pointer;
    }

    .btn-icon {
      display: inline-block;
      overflow: hidden;
      position: relative;
      padding: 0;
      line-height: 0;
      aspect-ratio: 1/1;
      vertical-align: top;
      transition: 0.3s;

      &.size-xs {
        inline-size: 1.125rem;
      }
      &.size-s {
        inline-size: 1.25rem;
      }

      @media (min-width: 48rem) {
        &.size-xs {
          inline-size: 1.5rem;
        }
      }
      @media (min-width: 120rem) {
        &.size-xs {
          inline-size: 2.5rem;
        }
      }
    }

    .btn {
      --min-inline-size: 18rem;
      --padding: var(--size-3);
      --background-color: var(--gray700);
      --font-size: var(--text-size-s);
      --line-height: 1.5;
      --color: var(--gray400);
      --hoaver-color: var(--gray800);
      inline-size: var(--min-inline-size);
      padding: var(--padding);
      background-color: var(--background-color);
      font-size: var(--font-size);
      font-weight: 600;
      line-height: var(--line-height);
      color: var(--color);
      border-radius: var(--round-xs);
      transition: 0.3s;

      &:hover {
        --background-color: var(--hoaver-color);
      }

      &.primary {
        --background-color: var(--red-1);
        --color: var(--white);

        &:hover {
          --background-color: #cc1030;
        }
      }

      &.secondary {
        --background-color: var(--gray100);
        --color: var(--black);

        &:hover {
          --background-color: var(--white);
        }
      }

      @media (min-width: 48rem) {
        --min-inline-size: 26rem;
        --padding: 0.8125rem;
        --font-size: var(--text-size-m);
        --line-height: 1.5;
      }
      @media (min-width: 120rem) {
        --min-inline-size: 45.75rem;
        --padding: 1.375rem;
        --font-size: var(--text-size-xl);
      }
    }

    /* badge */
    .badge {
      display: inline-block;
      vertical-align: top;
      transition: 0.3s;

      &.type-txt {
        --text-size: 0.5625rem;
        --round: 0.125rem;
        padding: 3px 6px 4px;
        font-size: var(--text-size);
        line-height: 1;
        color: var(--white);
        border-radius: var(--round);

        &.red {
          background-color: #c73e4e;
        }
        &.green {
          background-color: #32b032;
        }
      }

      &.type-circle {
        inline-size: 0.8125rem;
        background-position: 50%;
        background-size: contain;
        background-repeat: no-repeat;
        aspect-ratio: 1/1;
      }

      &.restricted-18 {
        background-image: url(/assets/images/icon/restricted_18_s.png);
      }
      &.restricted-19 {
        background-image: url(/assets/images/icon/restricted_19_s.png);
      }
      &.taing-original {
        inline-size: 3.25rem;
        block-size: 0.5625rem;
        background-image: url(/assets/images/icon/taing_original_s.png);
        background-position: 50%;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    @media (min-width: 48rem) {
      .badge {
        &.type-circle {
          inline-size: 1rem;
        }

        &.restricted-18 {
          background-image: url(/assets/images/icon/restricted_18_m.png);
        }
        &.restricted-19 {
          background-image: url(/assets/images/icon/restricted_19_m.png);
        }
        &.taing-original {
          inline-size: 4.6875rem;
          block-size: 0.8125rem;
          background-image: url(/assets/images/icon/taing_original_m.png);
        }
      }

      @media (min-width: 120rem) {
        &.type-txt {
          --text-size: 1rem;
          --round: var(--round-xs);
          padding: 0.4375rem 0.5625rem;
        }

        &.type-circle {
          inline-size: 1.875rem;
        }

        &.restricted-18 {
          background-image: url(/assets/images/icon/restricted_18_l.png);
        }
        &.restricted-19 {
          background-image: url(/assets/images/icon/restricted_19_l.png);
        }
        &.taing-original {
          inline-size: 115px;
          block-size: 1.25rem;
          background-image: url(/assets/images/icon/taing_original_l.png);
        }
      }
    }
  `,
};
