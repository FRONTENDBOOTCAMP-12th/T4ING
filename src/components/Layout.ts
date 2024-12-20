import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import './Header';
import './Footer';

@customElement('t-layout')
export class Layout extends TaingElement {
  @property({ type: Boolean }) hasPadding = false;
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
        display: flex;
        flex-flow: column nowrap;
        height: inherit;
      }

      .has-padding {
        --padding-top: 2.375rem;

        @media (min-width: 48rem) {
          --padding-top: 3.5rem;
        }

        @media (min-width: 120rem) {
          --padding-top: 6.25rem;
        }
      }
    `,
  ];

  render() {
    return html`
      <t-header></t-header>
      <div class=${this.hasPadding ? 'has-padding' : ''}>
        <slot></slot>
      </div>
      <t-footer></t-footer>
    `;
  }
}
