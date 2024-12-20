import Swiper from 'swiper';
import { TaingElement } from './Taing';
import { MainData } from '../@types/type';
import { register } from 'swiper/element/bundle';
import { getBannerImageURL } from '../api/getMainPageURL';
import { customElement, property } from 'lit/decorators.js';
import { html, css, CSSResultGroup } from 'lit';

register();

@customElement('t-main-banner')
class MainBanner extends TaingElement {
  @property({ type: Object }) data: MainData = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  @property({ type: String }) device = super.getDevice;
  @property({ type: Boolean }) isPlaying = true;

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

        order: -1;

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

          margin-inline-end: 1.25rem-0.75rem;
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

      ::part(button-next),
      ::part(button-prev) {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        inline-size: fit-content;
        block-size: fit-content;
      }

      ::part(hidden) {
        visibility: hidden;
        display: none; /* 버튼을 아예 제거 */
        /* visibility: hidden;  // 공간을 유지하려면 이 옵션을 사용 */
      }

      ::part(button-next-icon),
      ::part(button-prev-icon) {
        inline-size: 14px;
        block-size: 14px;
        opacity: 0.5;

        @media (min-width: 768px) {
          inline-size: 40px;
          block-size: 40px;
        }

        @media (min-width: 1920px) {
          inline-size: 70px;
          block-size: 70px;
        }
      }

      ::part(button-next-icon):hover {
        opacity: 1;
      }
      ::part(button-prev-icon):hover {
        opacity: 1;
      }
    `,
  ];

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

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_banner/records`
      );
      this.data = await response.json();
      this.initialized();
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  initialized() {
    const swiperInstance = this.swiperInstance;

    if (!swiperInstance) return;

    swiperInstance.update();
    swiperInstance?.autoplay.start();

    swiperInstance.on('slideChange', this.toggleNavigationButtons.bind(this));
    swiperInstance.on(
      'reachBeginning',
      this.toggleNavigationButtons.bind(this)
    );
    swiperInstance.on('reachEnd', this.toggleNavigationButtons.bind(this));

    console.log('Pagination object:', swiperInstance.pagination);

    this.setPaginationObserver();
    this.addNavigationButtonIcons();
    this.toggleNavigationButtons();

    console.log(this.pagination);
  }

  handleResize = () => {
    const newDevice = super.getDevice;
    if (this.device !== newDevice) {
      this.device = newDevice;
      console.log('banner-device-changed:', this.device);
    }
  };

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
    pagination.append(button);

    button.addEventListener('click', this.toggleAutoplay.bind(this));

    console.log('버튼 추가 완료', button);
  }

  toggleAutoplay() {
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

  addNavigationButtonIcons() {
    const nextBtn = this.swiperContainer?.shadowRoot?.querySelector(
      '.swiper-button-next'
    );
    const prevBtn = this.swiperContainer?.shadowRoot?.querySelector(
      '.swiper-button-prev'
    );

    if (!nextBtn || !prevBtn) return;

    nextBtn.innerHTML = `<img part="button-next-icon" src="/assets/images/icon/banner_arrow_right.svg" alt="다음 배너 보기" />`;
    prevBtn.innerHTML = `<img part="button-prev-icon"  src="/assets/images/icon/banner_arrow_left.svg" alt="이전 배너 보기" />`;

    console.log('nextBtn:', nextBtn);
    console.log('prevBtn:', prevBtn);
  }

  toggleNavigationButtons() {
    const swiperInstance = this.swiperInstance;

    if (!swiperInstance) return;

    const nextBtn = this.swiperContainer?.shadowRoot?.querySelector(
      '.swiper-button-next'
    );
    const prevBtn = this.swiperContainer?.shadowRoot?.querySelector(
      '.swiper-button-prev'
    );

    if (prevBtn && nextBtn) {
      prevBtn.part.remove('hidden');
      nextBtn.part.remove('hidden');
      swiperInstance.isBeginning
        ? prevBtn.part.add('hidden')
        : swiperInstance.isEnd
          ? nextBtn.part.add('hidden')
          : nextBtn.part.remove('hidden');
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container
          .autoplay=${{
            delay: 5000,
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
