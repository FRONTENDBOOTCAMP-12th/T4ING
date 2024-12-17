import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import reset from '../styles/reset.css';
import { taingElement } from './Taing';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { MainData } from '../@types/type';
import { getBannerImageURL } from '../api/getMainPageURL';

// Swiper 엘리먼트 등록
register();

@customElement('main-banner')
class MainBanner extends taingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .main-banner-container {
        position: relative;
        background-color: transparent;
        min-width: 320px;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);

        margin-block: 8px;
      }

      swiper-container {
        height: 100%;
        width: 100%;
        background-color: var(--gray800);
      }

      img {
        width: 100%;
        height: auto;
        padding: 0;
        object-fit: cover;
      }

      .swiper .swiper-wrapper ::part(pagination) {
        position: absolute;
      }

      ::part(pagination) {
        width: fit-content;
        display: flex;
        justify-content: flex-start;
        left: 4rem;

        @media (min-width: 320px) {
          gap: 6px;
        }
        @media (min-width: 768px) {
          gap: 8px;
        }
        @media (min-width: 1920px) {
          gap: 12px;
        }
      }

      ::part(bullet) {
        background: url('/assets/images/icon/swiper_pagination_bullet.svg')
          no-repeat center center;
        background-size: contain;
        margin: 0;

        @media (min-width: 320px) {
          width: 6px;
          height: 6px;
        }
        @media (min-width: 768px) {
          width: 8px;
          height: 8px;
        }
        @media (min-width: 1920px) {
          width: 12px;
          height: 12px;
        }
      }

      ::part(bullet-active) {
        background: url('/assets/images/icon/swiper_pagination_bullet_active.svg')
          no-repeat center center;
        background-size: contain;
        margin: 0;
        @media (min-width: 320px) {
          width: 6px;
          height: 6px;
        }
        @media (min-width: 768px) {
          width: 8px;
          height: 8px;
        }
        @media (min-width: 1920px) {
          width: 12px;
          height: 12px;
        }
      }
      .play-pause-btn {
        position: absolute;
        bottom: 0;
        left: 1.75rem;

        font-size: 20px;
        background: none;
        border: none;
        z-index: 999;
        color: var(--white);
        cursor: pointer;
      }
    `,
  ];

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
  @property({ type: String }) device = this.getDevice();
  swiperInstance: Swiper | null = null;
  paginationInstance: HTMLElement | null = null;

  getDevice() {
    const width = window.innerWidth;
    if (width >= 1920) {
      return 'desktop';
    } else if (width >= 768 && width < 1920) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', this.handleResize);

    this.fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const newDevice = this.getDevice();
    if (this.device !== newDevice) {
      this.device = newDevice;
      console.log('banner-device-changed:', this.device);
    }
  };

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_banner/records`
      );
      const data = await response.json();
      this.data = data;
      console.log('banner-device :', this.device);
      console.log('스와이퍼 컨테이너', this.swiperContainer);
      console.log('페이지네이션', this.swiperPagination);
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }

  get swiperContainer() {
    return this.renderRoot.querySelector<HTMLElement>('swiper-container');
  }
  get swiperPagination() {
    const swiperContainer = this.swiperContainer;
    return swiperContainer
      ? swiperContainer.shadowRoot?.querySelector('.swiper-pagination')
      : null;
  }

  @property({ type: Boolean }) isPlaying = true;
  @property({ type: HTMLElement }) pausePlayButton = this.getPausePlayButton();

  getPausePlayButton() {
    const pausePlayButton = this.querySelector('.play-pause-btn');
    return pausePlayButton as HTMLButtonElement;
  }

  togglePlayPause() {
    console.log('Before toggle:', this.isPlaying);
    console.log(this.pausePlayButton);
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container
          .autoplay="${{
            delay: 3000,
            disableOnInteraction: false,
          }}"
          .loop="${false}"
          .pagination="${{
            clickable: true,
          }}"
        >
          ${this.data.items
            .filter((item) => item.device === this.device)
            .map(
              (slide) => html`
                <swiper-slide>
                  <img src="${getBannerImageURL(slide)}" alt="${slide.title}" />
                </swiper-slide>
              `
            )}
        </swiper-container>
        <button class="play-pause-btn" @click="${this.togglePlayPause}">
          ❤️
        </button>
      </div>
    `;
  }
}

export default MainBanner;
