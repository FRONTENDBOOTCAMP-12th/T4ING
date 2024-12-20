import { TaingElement } from './Taing';
import { MainData } from '../@types/type';
import { customElement, property } from 'lit/decorators.js';
import { html, css, CSSResultGroup } from 'lit';
import { getRecommendImageURL } from '../api/getMainPageURL';
import Swiper from 'swiper';

@customElement('t-main-recommend')
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
  @property({ type: Boolean }) isBeginning = true;
  @property({ type: Boolean }) isEnd = false;

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 320px;
        height: auto;
        gap: 8px;
        padding-inline: 0.5rem;

        box-sizing: border-box;
        overflow: clip;
        overflow-clip-box: padding-box;

        background-color: transparent;

        @media (min-width: 768px) {
          padding-inline: 2.5rem;
        }
        @media (min-width: 1920px) {
          padding-inline: 4.375rem;
        }

        & h1 {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--white);

          @media (min-width: 768px) {
            font-size: 1rem;
            font-weight: 700;
          }
          @media (min-width: 1920px) {
            font-size: 1.7769rem;
            font-weight: 700;
          }
        }
      }

      swiper-container {
        position: relative;
        inline-size: 100%;
        margin-inline: 0;

        @media (max-width: 767px) {
          width: calc((100% - 16px));

          &.is-middle {
            margin-inline: 0.5rem;
          }
          &.is-end {
            transform: translateX(1rem);
          }
        }

        overflow: visible;

        box-sizing: border-box;
      }
      ::part(container) {
        inline-size: 100%;
        box-sizing: border-box;

        overflow: visible;
      }

      ::part(wrapper) {
        inline-size: 100%;
        position: relative;
        box-sizing: border-box;
        overflow: visible;
      }

      swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        inline-size: 100%;
        block-size: auto;

        & img {
          inline-size: 100%;
          block-size: auto;
          object-fit: cover;
          border-radius: 0.5rem;
        }
      }
    `,
  ];

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
    const newDevice = super.getDevice;
    if (this.device !== newDevice) {
      this.device = newDevice;
      console.log('rec-device-changed:', this.device);
    }
  };

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_recommend/records`
      );
      const data = await response.json();
      this.data = data;
      console.log('rec-device :', this.device);

      this.addSwiperEvents();
    } catch (error) {
      console.error('Error fetching recommend data:', error);
    }
  }

  get swiperInstance() {
    return (this.renderRoot.querySelector('swiper-container') as any)?.swiper;
  }

  addSwiperEvents() {
    const swiper = this.swiperInstance;
    if (swiper) {
      swiper.on('slideChange', this.updateSwiperState);
      swiper.on('reachBeginning', this.updateSwiperState);
      swiper.on('reachEnd', this.updateSwiperState);
    }
  }

  removeSwiperEvents() {
    const swiper = this.swiperInstance;
    if (swiper) {
      swiper.off('slideChange', this.updateSwiperState);
      swiper.off('reachBeginning', this.updateSwiperState);
      swiper.off('reachEnd', this.updateSwiperState);
    }
  }

  updateSwiperState = () => {
    const swiper = this.swiperInstance;
    if (swiper) {
      const isBeginningChanged = this.isBeginning !== swiper.isBeginning;
      const isEndChanged = this.isEnd !== swiper.isEnd;

      // 상태가 변경된 경우에만 업데이트
      if (isBeginningChanged || isEndChanged) {
        this.isBeginning = swiper.isBeginning;
        this.isEnd = swiper.isEnd;

        const swiperContainer =
          this.renderRoot.querySelector('swiper-container');
        if (swiperContainer) {
          swiperContainer.classList.toggle('is-beginning', this.isBeginning);
          swiperContainer.classList.toggle('is-end', this.isEnd);
        }

        console.log('swiper-state:', this.isBeginning, this.isEnd);

        this.requestUpdate();
      }
    }
  };

  render() {
    return html`
      <div class="container">
        <h1>티빙에서 꼭 봐야하는 콘텐츠</h1>
        <swiper-container
          class="${this.isBeginning
            ? 'is-beginning'
            : this.isEnd
              ? 'is-end'
              : 'is-middle'}"
          .slidesPerView=${3}
          .slidesPerGroup=${3}
          .spaceBetween=${8}
          .observer=${true}
          .observeParents=${true}
          .breakpoints=${{
            768: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 8,
            },
            1920: {
              slidesPerView: 7,
              slidesPerGroup: 7,
              spaceBetween: 8,
            },
          }}
        >
          ${this.data.items
            .filter((item) => item.device === this.device)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(
              (slide) => html`
                <swiper-slide>
                  <img
                    src="${getRecommendImageURL(slide)}"
                    alt="${slide.title}"
                  />
                </swiper-slide>
              `
            )}
          ${this.data.items
            .filter((item) => item.device === this.device)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(
              (slide) => html`
                <swiper-slide>
                  <img
                    src="${getRecommendImageURL(slide)}"
                    alt="${slide.title}"
                  />
                </swiper-slide>
              `
            )}
        </swiper-container>
      </div>
    `;
  }
}

export default MainRecommend;
