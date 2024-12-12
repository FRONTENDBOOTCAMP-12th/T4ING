import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
// import reset from '../styles/reset.css';
import Swiper from 'swiper';
// register Swiper custom elements  import { register } from 'swiper/element';
import { Navigation, Pagination } from 'swiper/modules';

import { register } from 'swiper/element/bundle';

// Swiper 엘리먼트 등록
register();

@customElement('main-banner')
class MainBanner extends LitElement {
  static styles: CSSResultGroup = [
    css`
      .main-banner {
        background-color: transparent;
        min-width: 320px;
        min-height: 171px;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--white);
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
    `,
  ];

  swiperInstance: Swiper | null = null;
  autoplayStatus: boolean = true; // 자동 재생 상태

  initBanner() {
    // DOM이 처음 업데이트된 후에 Swiper 초기화
    const banner = this.shadowRoot?.querySelector('swiper-container');
    if (banner) {
      // Swiper 옵션 설정
      const swiperParams = {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        virtual: {
          enabled: true,
        },
        // breakpoints: {
        //   640: {
        //     slidesPerView: 2,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //   },
        // },
      };

      // 옵션을 Swiper 엘리먼트에 적용
      this.swiperInstance = new Swiper(banner, swiperParams);
    }
    console.log(banner);
  }

  // 첫 번째 업데이트 후 Swiper 초기화
  firstUpdated() {
    this.initBanner();
  }

  // 재생/일시정지 버튼 클릭 시 실행되는 함수
  toggleAutoplay() {
    if (this.swiperInstance) {
      if (this.autoplayStatus) {
        this.swiperInstance.autoplay.stop(); // 슬라이드 일시정지
      } else {
        this.swiperInstance.autoplay.start(); // 슬라이드 재생
      }
      this.autoplayStatus = !this.autoplayStatus; // 상태 토글
    }
  }

  // connectedCallback(){
  //   super.connectedCallback();
  //   this.fetchData()
  // }

  render() {
    console.log('main-banner render');

    return html`
      <div class="main-banner">
        <swiper-container pagination="{{hideOnClick: false}}">
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
        </swiper-container>
        <div class="control-buttons"></div>
      </div>
    `;
  }
}

export default MainBanner;
