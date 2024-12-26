import { CSSResultGroup, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { buttonCSS } from '../styles/buttonCSS';
import { classMap } from 'lit/directives/class-map.js';

@customElement('t-button')
class Button extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS['t-button'],
    css`
      :host {
        --min-inline-size: 18rem;
        display: block;
        inline-size: var(--min-inline-size);
        margin-inline: auto;

        @media (min-width: 48rem) {
          --min-inline-size: 26rem;
        }
        @media (min-width: 120rem) {
          --min-inline-size: 45.75rem;
        }
      }
    `,
  ];
  @property({ type: String }) buttonType: 'submit' | 'reset' | 'button' =
    'button';
  @property({ type: String }) color: 'primary' | 'secondary' | 'line' | null =
    null;

  render() {
    return html`
      <button
        type=${this.buttonType}
        class=${classMap({
          btn: true,
          [this.color || '']: !!this.color,
        })}
      >
        <slot>확인</slot>
      </button>
    `;
  }
}
