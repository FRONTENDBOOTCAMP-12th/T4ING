import { BannerDescription } from '../../@types/type';
import { Swiper } from 'swiper';
import { TaingElement } from '../Taing';
import { MainData } from '../../@types/type';
import { register } from 'swiper/element/bundle';
import { getBannerImageURL } from '../../api/getMainPageURL';
import { customElement, property } from 'lit/decorators.js';
import { html, CSSResultGroup } from 'lit';
import bannerCSS from '../../styles/mainBannerCSS';

register();

interface SwiperContainerElement extends HTMLElement {
  swiper: Swiper;
}

@customElement('main-banner')
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
  @property({ type: Boolean }) isBeginning = true;
  @property({ type: Boolean }) isEnd = false;
  @property({ type: Number }) currunetBannerIndex = 0;

  static styles: CSSResultGroup = [super.styles, bannerCSS];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }
  async fetchData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/main_banner/records`
      );
      this.data = await response.json();
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  }

  get swiperContainer(): SwiperContainerElement | null {
    return this.renderRoot.querySelector(
      'swiper-container'
    ) as SwiperContainerElement | null;
  }

  get swiperInstance(): Swiper | null {
    return this.swiperContainer?.swiper || null;
  }

  firstUpdated() {
    if (this.swiperContainer) {
      // Swiper 인스턴스가 초기화될 때까지 기다리기
      if (!this.swiperInstance) {
        this.swiperContainer.addEventListener('swiper-init', (event: Event) => {
          this.attachNavigation();
          this.attachPagination();
          this.handleAutoplay();
          this.handleSlideState();
        });
      } else {
        this.attachNavigation();
        this.attachPagination();
        this.handleAutoplay();
        this.handleSlideState();
      }
    }
  }

  handleSlideState() {
    const swiper = this.swiperInstance;
    if (swiper) {
      this.swiperInstance.on('slideChange', () => {
        this.isBeginning = swiper.isBeginning;
        this.isEnd = swiper.isEnd;
      });
    }
  }

  handleAutoplay() {
    const autoplayBtn = this.renderRoot.querySelector('.autoplay');

    if (this.swiperInstance && autoplayBtn) {
      autoplayBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.swiperInstance?.autoplay.stop();
        } else {
          this.swiperInstance?.autoplay.start();
        }
        this.isPlaying = !this.isPlaying;
        console.log('autoplay:', this.isPlaying);
      });
    }
  }

  attachNavigation() {
    // 커스텀 네비게이션 버튼 요소 선택
    const prevButton = this.renderRoot.querySelector('.prev');
    const nextButton = this.renderRoot.querySelector('.next');

    if (this.swiperInstance && prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        this.swiperInstance?.slidePrev();
      });

      nextButton.addEventListener('click', () => {
        this.swiperInstance?.slideNext();
      });
    }
  }

  attachPagination() {
    const pagination = this.renderRoot.querySelector('.custom-pagination');
    if (pagination) {
      pagination.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('bullet')) {
          const index =
            Array.from(target.parentElement!.children).indexOf(target) - 1;
          this.swiperInstance?.slideTo(index);

          this.currunetBannerIndex = index;
        }
      });

      this.swiperInstance?.on('slideChange', () => {
        const bullets = pagination.querySelectorAll('.bullet');
        bullets.forEach((bullet, index) => {
          if (index === this.swiperInstance?.activeIndex) {
            bullet.classList.add('active');
          } else {
            bullet.classList.remove('active');
          }
        });
      });
      this.swiperInstance?.pagination.update();
    }
  }

  render() {
    return html`
      <div class="main-banner-container">
        <swiper-container
          .autoplay=${{
            delay: 7000,
            disableOnInteraction: false,
          }}
          .loop=${false}
          .navigation=${{
            nextEl: '.next',
            prevEl: '.prev',
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
        <p class="banner-description" aria-label="Banner content description">
          ${this.data.items.filter((item) => item.device === this.device)[
            this.currunetBannerIndex
          ]?.description}
        </p>
        <button
          class="prev"
          ?disabled=${this.isBeginning}
          aria-label="Go to previous slide"
        ></button>
        <button
          class="next"
          ?disabled=${this.isEnd}
          aria-label="Go to next slide"
        ></button>
        <div class="custom-pagination" part="pagination">
          <button
            class="autoplay ${this.isPlaying ? 'pause' : 'play'}"
            aria-label="${this.isPlaying
              ? 'pause banner slide'
              : 'play banner slide'}}"
          ></button>
          ${this.data.items
            .filter((item) => item.device === this.device)
            .map(
              (_, index) => html`
                <span
                  class="bullet ${index === 0 ? 'active' : ''}"
                  aria-label="Go to slide ${index + 1}"
                  role="button"
                  tabIndex="0"
                ></span>
              `
            )}
        </div>
        <button
          class="view-more"
          role="button"
          tabindex="0"
          aria-label="View more details of the banner content"
        >
          자세히보기
        </button>
      </div>
    `;
  }
}
