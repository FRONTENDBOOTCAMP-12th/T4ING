import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { CSSResultGroup, html, css, nothing } from 'lit';

@customElement('t-modal')
class Modal extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .modal {
        --popup-btn-wrap-padding: var(--size-2);
        --popup-btn-font-size: var(--text-size-s);
        --popup-btn-padding: var(--size-2);
        --popup-btn-gap: var(--size-5);

        --modal-min-width: 12.25rem;
        --modal-padding-inline: 1.5625rem;
        --modal-padding: var(--size-5) var(--modal-padding-inline) var(--size-3);
        --modal-btn-padding: 0.625rem;

        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        z-index: 9999;

        &:has(.modal__popup) {
          background-color: #19191990;
          backdrop-filter: var(--header-filter);
        }

        @media (min-width: 48rem) {
          --modal-padding-inline: 3.125rem;
          --modal-padding: var(--size-7) var(--modal-padding-inline)
            var(--size-4);
          --modal-min-width: 18.4375rem;
          --modal-btn-padding: 0.875rem;
        }
        @media (min-width: 120rem) {
          --popup-btn-padding: var(--size-4);
          --popup-btn-font-size: var(--text-size-l);
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
        font-size: var(--popup-btn-font-size);
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

          .modal__btn {
            flex: 1;
            padding-block: var(--modal-btn-padding);
            border: 0;
            background-color: initial;
            color: inherit;
            appearance: none;
            cursor: pointer;
          }
        }
      }

      .modal__message {
        padding: var(--modal-padding);
        color: var(--white);
        text-align: center;
      }
    `,
  ];

  @property({ type: Boolean }) popup = false;
  @property({ attribute: false }) confirmFn?: () => void;
  @property({ attribute: false }) cancelFn?: () => void;

  bodyEl = document.querySelector<HTMLElement>('html')!;

  handleConfirm() {
    if (this.confirmFn) {
      this.confirmFn();
    }
  }

  handleCancel() {
    this.bodyEl.classList.remove('fixed');

    if (this.cancelFn) {
      this.cancelFn();
    }
  }

  render() {
    this.bodyEl.classList.add('fixed');

    return html`
      <div class="modal">
        ${this.popup
          ? html`<div class="modal__popup">
              <figure class="modal__img">
                <img src="" alt="" />
              </figure>
              <div class="modal-popup__wrap">
                <button type="button" class="modal-popup__btn today">
                  오늘 하루 보지 않기
                </button>
                <button
                  type="button"
                  class="modal-popup__btn"
                  @click=${this.handleCancel}
                >
                  닫기
                </button>
              </div>
            </div>`
          : html`
              <div class="modal__inner">
                <p class="modal__message">
                  <slot></slot>
                </p>
                <div class="modal__btn-wrap">
                  <button
                    type="button"
                    class="modal__btn"
                    @click=${this.handleConfirm}
                  >
                    확인
                  </button>
                  <button
                    type="button"
                    class="modal__btn"
                    @click=${this.handleCancel}
                  >
                    취소
                  </button>
                </div>
              </div>
            `}
      </div>
    `;
  }
}
