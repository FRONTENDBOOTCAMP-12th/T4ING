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

      ::part(pagination) {
        width: fit-content;
        display: flex;
        justify-content: flex-start;
        left: 1.5rem;
      }

      ::part(pagination-bullet) {
        color: var(--white);
      }

      img {
        width: 100%;
        height: auto;
        padding: 0;
        object-fit: cover;
      }

      ::part(pagination) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

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
        font-size: 20px;
        background: none;
        border: none;
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

      this.addPlayPauseButton();
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

  // updated(changedProperties: Map<string | number | symbol, unknown>) {
  //   super.updated(changedProperties);

  //   // swiper-container가 렌더링된 후에 쿼리 셀렉터를 사용
  //   const swiperContainer = this.shadowRoot?.querySelector('swiper-container');
  //   if (swiperContainer) {
  //     // swiper-container 내부에 접근하여 swiperInstance 설정
  //     console.log('swiper-container found in updated lifecycle');
  //     this.swiperInstance = swiperContainer.swiper;

  //     const paginationElement =
  //       swiperContainer.shadowRoot?.querySelector('.swiper-pagination');
  //     this.paginationInstance = paginationElement as HTMLElement;

  //     console.log('swiperInstance:', this.swiperInstance);
  //     // 버튼 추가
  //     this.addPlayPauseButton();
  //   }
  // }

  addPlayPauseButton() {
    if (this.swiperPagination) {
      console.log('페이지네이션:', this.swiperPagination);
      const button = document.createElement('button');
      button.className = 'play-pause-btn';
      button.innerHTML = '▶️ / ❚❚';
      button.addEventListener('click', () => this.togglePlayPause());
      this.swiperPagination.insertAdjacentHTML('beforeend', button.outerHTML);
    }
  }

  togglePlayPause() {
    if (this.swiperInstance) {
      if (this.swiperInstance.autoplay.running) {
        this.swiperInstance.autoplay.stop();
        console.log('Autoplay stopped');
      } else {
        this.swiperInstance.autoplay.start();
        console.log('Autoplay started');
      }
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container .loop="${false}" .pagination="${{ clickable: true }}">
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

export default MainBanner;
