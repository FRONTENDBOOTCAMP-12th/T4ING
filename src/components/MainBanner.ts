import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import reset from '../styles/reset.css';
import { taingElement } from './Taing';
// register Swiper custom elements  import { register } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import { MainData } from '../@types/type';
import { getMainBannerImageURL } from '../api/getMainBannerImageURL';

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
        background-color: var(--gray300);
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
    }
  };

  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_banner/records`
      );

      const data = await response.json();

      this.data = data;

      console.log(
        this.data.items.filter((item) => item.device === this.device)
      );

      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container pagination="{{hideOnClick: false}}">
          ${this.data.items
            .filter((item) => item.device === this.device)
            .map(
              (slide) => html`
                <swiper-slide>
                  <img
                    src="${getMainBannerImageURL(slide)}"
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

export default MainBanner;
