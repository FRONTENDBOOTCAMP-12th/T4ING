import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Swiper from 'swiper';
// import { ProgramList } from '../@types/type.d';

@customElement('main-recommend')
class MainRecommend extends LitElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];

  // Swiper 설정을 Lit 속성으로 관리
  @property({ type: Object })
  swiperConfig = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 8,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
  };

  static styles: CSSResultGroup = [
    css`
      .container {
        background-color: transparent;
        min-width: 320px;
        // max-width: 767px;
        // min-height: 171px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        padding-inline: 8px;
        overflow: hidden;
        align-items: start;
        color: var(--white);

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
        height: 100%;
        width: 100%;
        margin-block: 8px;
        background-color: transparent;

        & swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          font-size: 20px;
          color: var(--white);
        }
      }

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const newDevice = this.getDevice();
    if (this.device !== newDevice) {
      this.device = newDevice;
      this.fetchData();
    }
  };

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

  device = this.getDevice();

  updated() {
    if (this.device !== this.getDevice()) {
      this.device = this.getDevice();
      // this.fetchData();
    }
  }

  async fetchData() {
    try {
      const device = this.getDevice();

      console.log('device:', device);

      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_recommend/records`
      );

      const data = (await response.json()).items;

      this.slides = data.map((item: any) => ({
        title: item.title || 'Unknown',
        img: `${import.meta.env.VITE_PB_API}/files/main_recommend/${item.id}/${
          item.img || 'default.jpg'
        }`,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  swiperInstance: Swiper | null = null;

  // Swiper 엘리먼트를 가져오기 위한 getter
  get swiperEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector('swiper-container') || null;
  }

  // initBanner() {
  //   // DOM이 처음 업데이트된 후에 Swiper 초기화
  //   const banner = this.shadowRoot?.querySelector('swiper-container');
  //   if (banner) {
  //     // Swiper 옵션 설정
  //     const swiperParams = {
  //       slidesPerView: 3,
  //       autoplay: {
  //         delay: 3000,
  //         disableOnInteraction: false,
  //       },
  //       virtual: {
  //         enabled: true,
  //       },
  //       breakpoints: {},
  //     };

  //     this.swiperInstance = new Swiper(banner, swiperParams);
  //   }
  // }

  // firstUpdated() {
  //   this.initBanner();
  // }

  render() {
    return html`
      <div class="container">
        <h1>티빙에서 꼭 봐야하는 콘텐츠</h1>
        <swiper-container
          .slidesPerView=${this.swiperConfig.slidesPerView}
          .slidesPerGroup=${this.swiperConfig.slidesPerGroup}
          .spaceBetween=${this.swiperConfig.spaceBetween}
        >
          ${this.slides.map(
            (item: any) => html`
              <swiper-slide>
                <img src="${item.img}" alt="${item.title}" />
              </swiper-slide>
            `
          )}
        </swiper-container>
      </div>
    `;
  }
}

export default MainRecommend;
