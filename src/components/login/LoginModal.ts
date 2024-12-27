import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Modal } from '../Modal';

@customElement('login-modal')
export class CustomModal extends Modal {
  static styles: CSSResultGroup = [super.styles];
  render() {
    return html`
      <div class="modal">
        <div class="modal__inner">
          <p class="modal__message"><slot></slot></p>
          <div class="modal__btn-wrap">
            <button class="modal__btn close-modal" @click=${this.closeModal}>
              확인
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
