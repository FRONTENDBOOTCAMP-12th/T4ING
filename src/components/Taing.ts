import { LitElement, css, CSSResultGroup, unsafeCSS } from 'lit';
import resetCSS from '@/styles/reset.css?inline';

export class taingElement extends LitElement {
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
    `,
  ];
}
