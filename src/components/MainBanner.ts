import Swiper from 'swiper';
import { taingElement } from './Taing';
import { MainData } from '../@types/type';
import { register } from 'swiper/element/bundle';
import { getBannerImageURL } from '../api/getMainPageURL';
import { customElement, property } from 'lit/decorators.js';
import { LitElement, html, css, CSSResultGroup } from 'lit';

register();

@customElement('t-main-banner')
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

        margin-block: 0.5rem;
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

      ::part(pagination) {
        inline-size: fit-content;
        position: absolute;
        bottom: 10%;
        left: 5%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        inline-size: fit-content;
        gap: 0.375rem;

        @media (min-width: 768px) {
          gap: 0.5rem;
        }
        @media (min-width: 1920px) {
          gap: 0.75rem;
        }
      }

      ::part(bullet),
      ::part(bullet-active) {
        inline-size: 100%;
        block-size: 100%;
        min-width: 6px;
        min-height: 6px;

        background-size: contain;
        margin: 0;

        @media (min-width: 768px) {
          min-width: 8px;
          min-height: 8px;
        }
        @media (min-width: 1920px) {
          min-width: 12px;
          min-height: 12px;
        }
      }

      ::part(bullet) {
        background: url('/assets/images/icon/swiper_pagination_bullet.svg')
          no-repeat center center;
      }

      ::part(bullet-active) {
        background: url('/assets/images/icon/swiper_pagination_bullet_active.svg')
          no-repeat center center;
      }

      ::part(autoplay-play),
      ::part(autoplay-pause) {
        cursor: pointer;
        border: 0;
        background-color: transparent;

        inline-size: 100%;
        block-size: 100%;

        min-width: 11px;
        min-height: 11px;

        @media (min-width: 768px) {
          min-width: 15px;
          min-height: 15px;
        }
        @media (min-width: 1920px) {
          min-width: 25px;
          min-height: 25px;
        }
      }

      ::part(autoplay-play) {
        background: url('/assets/images/icon/pause_banner.svg') no-repeat center
          center;
        background-size: contain;
      }

      ::part(autoplay-pause) {
        background: url('/assets/images/icon/play_banner.svg') no-repeat center
          center;
        background-size: contain;
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
  @property({ type: Boolean }) isPlaying = true;
  @property({ type: Object }) swiper: Swiper | null = null;

  getDevice() {
    const width = window.outerWidth;
    if (width >= 1920) {
      return 'desktop';
    } else if (width >= 768 && width < 1920) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  }

  get swiperContainer() {
    return this.renderRoot.querySelector<HTMLElement>('swiper-container');
  }

  get pagination() {
    const swiperContainer = this.swiperContainer;
    return swiperContainer
      ? swiperContainer.shadowRoot?.querySelector('.swiper-pagination')
      : null;
  }

  get swiperInstance() {
    return (this.swiperContainer as any)?.swiper || null; // Swiper 인스턴스를 반환
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

      const swiperInstance = this.swiperInstance;

      if (swiperInstance) {
        swiperInstance.autoplay.start();
      }
      this.setPaginationObserver();
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }

  setPaginationObserver() {
    const pagination = this.pagination;
    if (!pagination) return;

    const observer = new MutationObserver(() => {
      if (!pagination.querySelector('.banner-autoplay-btn')) {
        this.addAutoplayButton(pagination as any);
        observer.disconnect();
      }
    });

    observer.observe(pagination, { childList: true, subtree: true });
  }

  addAutoplayButton(pagination: HTMLElement) {
    const button = document.createElement('button');
    button.classList.add('banner-autoplay-btn');
    button.part.add('autoplay-play');
    pagination.prepend(button);

    button.addEventListener('click', this.handleAutoplay.bind(this));

    console.log('버튼 추가 완료', button);
  }

  handleAutoplay() {
    const swiperInstance = this.swiperInstance;
    const button = this.pagination?.querySelector('.banner-autoplay-btn');

    if (!this.swiperContainer || !button) return;

    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      button.part.toggle('autoplay-play');
      button.part.toggle('autoplay-pause');
      swiperInstance.autoplay.start();
    } else {
      button.part.toggle('autoplay-play');
      button.part.toggle('autoplay-pause');
      swiperInstance.autoplay.stop();
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container
          .autoplay=${{
            delay: 2000,
            disableOnInteraction: false,
          }}
          .loop=${false}
          .pagination=${{
            clickable: true,
            observer: true,
            observeParents: true,
          }}
          navigation=${{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
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
      </div>
    `;
  }
}
