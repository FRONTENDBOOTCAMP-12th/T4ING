import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { CSSResultGroup, html } from 'lit';
import { buttonCSS } from '../styles/buttonCSS';
import { classMap } from 'lit/directives/class-map.js';

@customElement('t-button')
class Button extends TaingElement {
  static styles: CSSResultGroup = [super.styles, buttonCSS['t-button']];

  buttonType: string | null = this.getAttribute('type') || 'button';
  color: string | null = this.getAttribute('color') || null;

  handleClick(cb: () => {}) {
    if (cb) {
      cb();
    }
  }

  render() {
    console.log(this.color);
    return html`
      <button
        type=${this.buttonType}
        class=${classMap({ btn: true, [this.color]: this.color })}
        @click=${() => {
          this.handleClick();
        }}
      >
        <slot>확인</slot>
      </button>
    `;
  }
}
