import { CSSResultGroup, html, PropertyValues, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { customEventParam } from '../utils/customEvent';

@customElement('t-modal')
export class Modal extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
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

  @property({ type: Boolean, reflect: true }) hidden = true;
  @property({ type: Boolean }) cancel: boolean = false;

  htmlEl = document.querySelector('html') as HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
  }

  updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('hidden')) {
      if (this.hidden) {
        this.htmlEl.classList.remove('fixed');
      } else {
        this.htmlEl.classList.add('fixed');
      }
    }
  }

  closeModal(e?: Event) {
    if (e) {
      const target = e.target as HTMLButtonElement;
      const hasClass = [...target.classList].find(
        (item) => item === 'close-modal'
      );

      if (hasClass) {
        this.hidden = true;
      }
    } else {
      this.hidden = true;
    }
  }

  handleCancel() {
    this.closeModal();
    this.dispatchEvent(customEventParam('modalCancel'));
  }

  handleConfirm() {
    this.closeModal();
    this.dispatchEvent(customEventParam('modalConfirm'));
  }

  render() {
    return html`
      <div class="modal">
        <div class="modal__inner">
          <div class="modal__message"><slot></slot></div>
          <div class="modal__btn-wrap">
            <button
              type="button"
              class="modal__btn close-modal"
              @click=${this.handleConfirm}
            >
              확인
            </button>
            ${this.cancel
              ? html`<button
                  type="button"
                  class="modal__btn close-modal"
                  @click=${this.handleCancel}
                >
                  취소
                </button>`
              : nothing}
          </div>
        </div>
      </div>
    `;
  }
}
