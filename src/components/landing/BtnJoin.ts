import { html, CSSResultGroup, css, nothing, notEqual } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { buttonCSS } from '../../styles/buttonCSS';
import '../../components/SvgIcon';

@customElement('button-join')
class ButtonJoin extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS['t-button'],
    css`
      :host {
        margin-inline: auto;
      }

      .btn {
        --logo-width: 1.625rem;
        --padding-block: 0.4375rem;
        --padding-left: 0.5rem;
        --padding-right: 1rem;
        --padding: var(--padding-block) var(--padding-right)
          var(--padding-block)
          calc(0.5rem + var(--logo-width) + var(--padding-left));
        --background-color: var(--red-2);
        --color: var(--white);
        display: inline-block;
        position: relative;
        inline-size: initial;
        line-height: 1.5;
        cursor: pointer;

        &:not(:disabled):hover {
          --background-color: var(--red-1);
        }

        svg-icon {
          position: absolute;
          inset-block-start: 0;
          inset-inline-start: 0.5rem;
        }

        @media (min-width: 48rem) {
          --logo-width: 2.25rem;
          --padding-block: 0.6875rem;
          --padding-left: 1rem;
          --padding-right: 2.75rem;
        }
        @media (min-width: 120rem) {
          --logo-width: 3.9375rem;
          --padding-block: 1.0625rem;
          --padding-left: 2.5rem;
          --padding-right: 4.75rem;
        }
      }
    `,
  ];

  @property({ type: String }) href = '/src/pages/login/';

  render() {
    return html`
      <a class="btn" href=${this.href}>
        <svg-icon svg-id="taing" .size=${[[26], [36], [63]]}></svg-icon>
        <slot></slot>
      </a>
    `;
  }
}
