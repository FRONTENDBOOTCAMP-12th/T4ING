import { html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('t-modal')
export class Modal extends TaingElement {
  @property({ type: Boolean, reflect: true }) hidden = true;
  htmlEl = document.querySelector('html') as HTMLElement;

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('hidden')) {
      if (this.hidden) {
        this.htmlEl.classList.remove('fixed');
      } else {
        this.htmlEl.classList.add('fixed');
      }
    }
  }

  closeModal(e: Event) {
    const target = e.target as HTMLButtonElement;
    const hasClass = [...target.classList].some(
      (item) => item === 'close-modal'
    );

    if (hasClass) {
      this.htmlEl.classList.remove('fixed');
      this.hidden = true;
    }
  }

  render() {
    return html`
      <div class="modal">
        <slot @click=${this.closeModal}></slot>
      </div>
    `;
  }
}
