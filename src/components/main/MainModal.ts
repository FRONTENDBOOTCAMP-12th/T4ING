import { CSSResultGroup, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Modal } from '../Modal';
import { fetchData, getPbImageURL } from '../../utils/request';
import { PopupImage } from '../../@types/type';

@customElement('main-modal')
class MainModal extends Modal {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .modal__popup {
        --popup-width: 15.75rem;
        inline-size: var(--popup-width);
        transition: width 0.3s;

        @media (min-width: 48rem) {
          --popup-width: 20.5rem;
        }
        @media (min-width: 120rem) {
          --popup-width: 36.625rem;
        }
      }
    `,
  ];

  @property({ attribute: false }) popupImage = { src: '', alt: '' };
  @property({ type: Boolean }) open = false;

  constructor() {
    super();
    this.dataFetch();
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.openPopup();
  }

  async dataFetch() {
    const data = await fetchData('modal');
    [this.popupImage] = data.items.map((item: PopupImage) => ({
      src: getPbImageURL(item, 'image'),
      alt: item.alt,
    }));
  }

  openPopup() {
    if (this.open) {
      this.hidden = false;
    }
  }

  closePopup() {
    this.handleCancel();
  }

  render() {
    return html`
      ${this.popupImage.src
        ? html`
            <div class="modal">
              <div class="modal__popup">
                <figure class="modal__img">
                  <a href="/">
                    <img
                      src=${this.popupImage.src}
                      alt=${this.popupImage.alt}
                    />
                  </a>
                </figure>
                <div class="modal-popup__wrap">
                  <button type="button" class="modal-popup__btn today">
                    오늘 하루 보지 않기
                  </button>
                  <button
                    type="button"
                    class="modal-popup__btn"
                    @click=${this.closePopup}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          `
        : nothing}
    `;
  }
}
