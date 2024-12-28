import { LitElement, css, CSSResultGroup, unsafeCSS } from 'lit';
import resetCSS from '@/styles/reset.css?inline';

export class TaingElement extends LitElement {
  static styles: CSSResultGroup = [
    unsafeCSS(resetCSS),
    css`
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
        @media (min-width: 48rem) {
          display: block;
        }
      }

      /* logo */
      .logo {
        display: block;
        inline-size: 2.875rem;
        transition: all 0.3s;

        @media (min-width: 48rem) {
          inline-size: 4.6875rem;
        }
        @media (min-width: 120rem) {
          inline-size: 8.25rem;
        }
      }

      .modal {
        --popup-btn-wrap-padding: var(--size-2);
        --modal-font-size: var(--text-size-s);
        --popup-btn-padding: var(--size-2);
        --popup-btn-gap: var(--size-5);

        --modal-min-width: 12.25rem;
        --modal-padding-inline: 1.5625rem;
        --modal-padding: var(--size-5) var(--modal-padding-inline);
        --modal-btn-padding: 0.625rem;

        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        background-color: #19191999;
        backdrop-filter: var(--header-filter);
        z-index: 1000;

        @media (min-width: 48rem) {
          --modal-padding-inline: 2rem;
          --modal-padding: var(--size-7) var(--modal-padding-inline);
          --modal-min-width: 18.4375rem;
          --modal-btn-padding: 0.875rem;
        }
        @media (min-width: 120rem) {
          --modal-padding: var(--size-12) var(--modal-padding-inline);
          --modal-font-size: var(--text-size-l);
          --popup-btn-padding: var(--size-4);
          --modal-min-width: 32.875rem;
        }
      }

      .modal-popup__wrap {
        display: flex;
        column-gap: var(--popup-btn-gap);
        padding-inline: var(--popup-btn-wrap-padding);
      }

      .modal-popup__btn {
        flex: 1;
        padding: var(--popup-btn-padding) 0;
        border: 0;
        background-color: initial;
        font-size: var(--modal-font-size);
        line-height: 1.6;
        color: inherit;
        white-space: nowrap;
        appearance: none;
        cursor: pointer;

        &.today {
          flex: 1.605263157894737;
        }
      }

      .modal__inner {
        min-inline-size: var(--modal-min-width);
        background-color: var(--dark-bg-2);
        border-radius: var(--round-xs);

        .modal__btn-wrap {
          display: flex;
          padding-inline: var(--modal-padding-inline);
          border-top: 1px solid var(--gray700);

          .modal__btn {
            flex: 1;
            padding-block: var(--modal-btn-padding);
            border: 0;
            background-color: initial;
            color: inherit;
            font-size: var(--modal-font-size);
            appearance: none;
            cursor: pointer;
          }
        }
      }

      .modal__message {
        font-size: var(--modal-font-size);
        padding: var(--modal-padding);
        color: var(--white);
        text-align: center;
        align-items: center;
      }
    `,
  ];

  static PB_URL = import.meta.env.VITE_PB_URL;
  static PB_API = `${this.PB_URL}/api`;

  headers = {
    'Content-Type': 'application/json',
  };

  get getDevice() {
    if (window.matchMedia('(min-width: 1920px)').matches) {
      return 'desktop';
    } else if (
      window.matchMedia('(min-width: 768px) and (max-width: 1920px)').matches
    ) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  }
}
