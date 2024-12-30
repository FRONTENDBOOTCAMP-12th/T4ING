import { css, CSSResultGroup, noChange } from 'lit';
import { html } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { fetchData, getPbImageURL } from '../../utils/request';
import { ProfileDataList, ProfileImages } from '../../@types/type';
import { customEventParam } from '../../utils/customEvent';

@customElement('profile-img-list')
class ProfileImageList extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .profile-img-list-wrap {
        --margin: var(--size-8) var(--size-8);
        --grid-columns: repeat(2, 114px);
        --gap: calc(var(--size-6) + var(--nickname-height)) var(--size-6);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
        background-color: var(--black);
        z-index: 1000;

        @media (min-width: 48rem) {
          --margin: var(--size-7) var(--size-11);
          --grid-columns: repeat(4, 132px);
          --gap: var(--size-8);
        }
        @media (min-width: 120rem) {
          --margin: var(--size-11) 4.125rem;
          --grid-columns: repeat(4, 234px);
          --gap: 3.25rem;
        }
      }

      .profile-img-list {
        display: inline-grid;
        grid-template-columns: var(--grid-columns);
        gap: var(--gap);
        transition: 0.3s;

        .profile-img-list__item {
          position: relative;
        }

        .profile-img-list__btn {
          position: absolute;
          inset: 0;
          border: 0;
          background-color: initial;
          appearance: none;
          cursor: pointer;
        }
      }

      .btn-close {
        position: absolute;
        inset-inline-end: 0;
        inset-block-start: 0;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) hidden = false;
  @property({ type: Object }) data: ProfileDataList = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };

  constructor() {
    super();
    this.fetchData();
  }

  async fetchData() {
    this.data = await fetchData('profile_image');
  }

  selectImage(obj: ProfileImages) {
    this.closeProfileImgList();
    this.dispatchEvent(
      customEventParam('select-image', {
        imgObj: obj,
      })
    );
  }

  closeProfileImgList() {
    this.hidden = true;
  }

  render() {
    const { items } = this.data;

    return items.length
      ? html`
          <div class="profile-img-list-wrap">
            <ul class="profile-img-list">
              ${items.map(
                (img) => html`
                  <li class="profile-img-list__item" id=${img.id}>
                    <img src="${getPbImageURL(img)}" />
                    <button
                      type="button"
                      class="profile-img-list__btn"
                      @click=${this.selectImage.bind(this, img)}
                    >
                      <span class="sr-only">선택</span>
                    </button>
                  </li>
                `
              )}
            </ul>
            <button
              type="button"
              class="btn-close"
              @click=${this.closeProfileImgList}
            >
              닫기
            </button>
          </div>
        `
      : noChange;
  }
}
