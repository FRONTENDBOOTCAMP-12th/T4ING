import { LitElement, html, css, CSSResultGroup } from 'lit';
import { taingElement } from './Taing';
import { customElement, property } from 'lit/decorators.js';
import Swiper from 'swiper';
import { MainData } from '../@types/type';
import { getRecommendImageURL } from '../api/getMainPageURL';
// import { ProgramList } from '../@types/type.d';

@customElement('main-recommend')
class MainRecommend extends taingElement {
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

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .container {
        background-color: transparent;
        min-width: 320px;
        // max-width: 767px;
        // min-height: 171px;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;

        padding-left: 8px;
        overflow: hidden;
        align-items: start;
        color: var(--white);

        @media (min-width: 768px) {
          padding-left: 40px;
        }
        @media (min-width: 1920px) {
          padding-left: 70px;
        }

        & h1 {
          font-size: 20px;
          font-weight: 700;
        }
      }

      swiper-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
        margin-block: 8px;
        background-color: transparent;
      }

      ::part(wrapper) {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        padding: 0;

        & img {
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }
    `,
  ];

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
      console.log('rec-device-changed:', this.device);
      console.log();
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
    } catch (error) {
      console.error('Error fetching recommend data:', error);
    }
  }

  render() {
    return html`
      <div class="container">
        <h1>티빙에서 꼭 봐야하는 콘텐츠</h1>
        <swiper-container
          .slidesPerView=${this.device === 'desktop'
            ? 7.1
            : this.device === 'tablet'
              ? 5.1
              : 3.1}
          .slidesPerGroup=${3}
          .spaceBetween=${8}
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
        </swiper-container>
      </div>
    `;
  }
}

export default MainRecommend;
