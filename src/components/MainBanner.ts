import { AutoplayOptions } from './../../node_modules/swiper/types/modules/autoplay.d';
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
        inline-size: 100%;
        block-size: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);

        margin-block: 8px;
      }

      swiper-container {
        block-size: 100%;
        inline-size: 100%;
        background-color: var(--gray800);
      }

      img {
        inline-size: 100%;
        block-size: auto;
        padding: 0;
        object-fit: cover;
      }

      .swiper .swiper-wrapper ::part(pagination) {
        position: absolute;
      }

      ::part(pagination) {
        inline-size: fit-content;
        display: flex;
        justify-content: flex-start;
        bottom: 1.5rem;
        left: 3.5rem;
        gap: 6px;

        @media (min-width: 768px) {
          gap: 8px;
          bottom: 2.5rem;
          left: 5.5rem;
        }
        @media (min-width: 1920px) {
          gap: 12px;
          bottom: 3.5rem;
          left: 7rem;
        }
      }

      ::part(bullet) {
        background: url('/assets/images/icon/swiper_pagination_bullet.svg')
          no-repeat center center;
        background-size: contain;
        margin: 0;
        inline-size: 6px;
        block-size: 6px;

        @media (min-width: 768px) {
          inline-size: 8px;
          block-size: 8px;
        }
        @media (min-width: 1920px) {
          inline-size: 12px;
          block-size: 12px;
        }
      }

      ::part(bullet-active) {
        background: url('/assets/images/icon/swiper_pagination_bullet_active.svg')
          no-repeat center center;
        background-size: contain;
        margin: 0;

        inline-size: 6px;
        block-size: 6px;

        @media (min-width: 768px) {
          inline-size: 8px;
          block-size: 8px;
        }
        @media (min-width: 1920px) {
          inline-size: 12px;
          block-size: 12px;
        }
      }
      .play-pause-btn {
        position: absolute;
        bottom: 1.8rem;
        left: 1.75rem;
        block-size: 6px;

        font-size: 20px;
        background: none;
        border: none;
        z-index: 999;
        color: var(--white);
        cursor: pointer;

        @media (min-width: 768px) {
          bottom: 2.9rem;
          left: 3.5rem;
        }
        @media (min-width: 1920px) {
          bottom: 4.3rem;
          left: 4rem;
        }

        & .icon-pause-play {
          inline-size: 11px;
          block-size: 11px;

          @media (min-width: 768px) {
            inline-size: 15px;
            block-size: 15px;
          }
          @media (min-width: 1920px) {
            inline-size: 25px;
            block-size: 25px;
          }
        }
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

  get pausePlayButton() {
    return this.renderRoot.querySelector('.play-pause-btn');
  }

  togglePlayPause() {
    const button = this.pausePlayButton;
    if (!this.swiperContainer || !button) return;

    const swiperContainer = this.swiperContainer as any; // swiper-container를 any로 캐스팅
    const swiperInstance = swiperContainer.swiper; // swiper 인스턴스를 가져오기

    if (this.isPlaying) {
      this.isPlaying = !this.isPlaying;
      button.classList.toggle('pause');
      swiperInstance.autoplay.stop();
    } else {
      this.isPlaying = !this.isPlaying;
      button.classList.toggle('pause');
      swiperInstance.autoplay.start();
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container
          .navigation="${{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}"
          .autoplay="${{
            delay: 2000,
            disablezOnInteraction: false,
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
          ${this.isPlaying
            ? html`<img
                class="icon-pause-play"
                src="/assets/images/icon/pause_banner.svg"
                alt="play"
              />`
            : html`<img
                class="icon-pause-play"
                src="/assets/images/icon/play_banner.svg"
                alt="pause"
              />`}
        </button>
      </div>
    `;
  }
}
