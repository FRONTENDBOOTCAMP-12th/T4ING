import { TaingElement } from '../Taing';
import { MainData } from '../../@types/type';
import { customElement, property } from 'lit/decorators.js';
import { html, css, CSSResultGroup } from 'lit';
import { getBottomBannerImageURL } from '../../api/getMainPageURL';
import Swiper from 'swiper';

interface SwiperContainerElement extends HTMLElement {
  swiper: Swiper;
}
@customElement('main-bottom-banner')
class MainRecommend extends TaingElement {
  @property({ type: Object }) data: MainData = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  @property({ type: Array }) slides: Array<{
    img: string;
    title: string;
  }> = [];
  @property({ type: String }) device = super.getDevice;

  static styles: CSSResultGroup = [
    super.styles,
    css`
      * {
        --slide-img-border-radius: 0.4rem;

        box-sizing: border-box;
        padding: 0; /* 내부 여백 제거 */
        margin: 0;
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        inline-size: 100%;
        block-size: auto;
        min-width: 320px;
        height: auto;
        padding-inline: 0.5rem;
        background-color: transparent;

        @media (min-width: 768px) {
          padding-inline: 2.5rem;
        }

        @media (min-width: 1920px) {
          padding-inline: 4.375rem;
        }
      }

      swiper-slide,
      swiper-slide.swiper-slide-active {
        display: flex;

        padding-top: 0.5rem;

        position: relative;
        inline-size: 100%;

        transition: transform 0.2s ease-in-out;
      }

      swiper-slide:hover,
      swiper-slide:focus {
        transform: translateY(-0.3rem);
      }

      .slide-img-container {
        inline-size: 100%;

        overflow: hidden;
        gap: 0.5rem;
        align-items: flex-start;
      }

      .slide-img-container .slide-img {
        inline-size: 100%;
        block-size: auto;
        object-fit: cover;
        border-radius: var(--slide-img-border-radius);
      }
    `,
  ];

  get swiperContainer(): SwiperContainerElement | null {
    return this.renderRoot.querySelector(
      'swiper-container'
    ) as SwiperContainerElement | null;
  }

  get swiperInstance(): Swiper | null {
    return this.swiperContainer?.swiper || null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  firstUpdated() {
    if (this.swiperContainer) {
      // Swiper 인스턴스가 초기화될 때까지 기다리기
      if (!this.swiperInstance) {
        this.swiperContainer.addEventListener('swiper-init', (event: Event) => {
          this.handleResize();
          window.addEventListener('resize', this.handleResize);
        });
      } else {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
      }
    }
  }

  handleResize = () => {
    const newDevice = super.getDevice;
    if (this.device !== newDevice) {
      this.device = newDevice;
      console.log('rec-device-changed:', this.device);
    }
  };

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_bottom_banner/records`
      );
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error('Error fetching recommend data:', error);
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="swiper-outer-wrapper">
          <swiper-container
            .slidesPerView=${1}
            .observer=${true}
            .observeParents=${true}
          >
            ${this.data.items
              .filter((item) => item.device === this.device)
              .map(
                (slide) => html`
                  <swiper-slide tabindex="0">
                    <figure class="slide-img-container">
                      <img
                        class="slide-img"
                        src="${getBottomBannerImageURL(slide)}"
                        aria-label="${slide.description}"
                      />
                      <figcaption class="banner-description sr-only">
                        ${slide.description}
                      </figcaption>
                  </swiper-slide>
                `
              )}
          </swiper-container>
        </div>
      </div>
    `;
  }
}

export default MainRecommend;
