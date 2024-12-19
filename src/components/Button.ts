import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { CSSResultGroup, html } from 'lit';
import { buttonCSS } from '../styles/buttonCSS';
import { classMap } from 'lit/directives/class-map.js';

@customElement('t-button')
class Button extends TaingElement {
  static styles: CSSResultGroup = [super.styles, buttonCSS['t-button']];
  @property({ type: String }) buttonType: 'submit' | 'reset' | 'button' =
    'button';
  @property({ type: String }) color: 'primary' | 'secondary' | null = null;

  render() {
    return html`
      <button
        type=${this.buttonType}
        class=${classMap({ btn: true, [this.color || '']: !!this.color })}
      >
        <slot>확인</slot>
      </button>
    `;
  }
}