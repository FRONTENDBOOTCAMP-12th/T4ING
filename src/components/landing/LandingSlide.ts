import './../Swiper';
import { SwiperOptions } from 'swiper/types';
import { html, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingSlideCSS from '../../styles/landingSlideCSS';
import { LandingUtils } from './LandingUtils';
import { LandingItem } from '../../@types/type';

@customElement('landing-slide')
export class Slide extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingSlideCSS];
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';
  private landingData: Array<LandingItem> = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.device = super.getDevice;
    this.apiUrl = import.meta.env.VITE_PB_API || '';
    this.initSlides();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  async initSlides(): Promise<void> {
    this.landingData = await LandingUtils.fetchData(
      this.apiUrl,
      'landing_origin'
    );
    this.updateSlides();
  }
  async handleResize() {
    const newDevice = super.getDevice;

    if (this.device !== newDevice) {
      this.device = newDevice;
      this.updateSlides();

      if (this.device === 'tablet' && this.slides.length === 0) {
        this.device = 'mobile';
        this.updateSlides();
      }
    }
  }
  updateSlides(): void {
    this.slides = LandingUtils.filterSlide(
      this.landingData,
      this.apiUrl,
      this.device,
      'landing_origin',
      20
    );
  }

  render() {
    if (this.slides.length === 0) {
      return;
    }

    const swiperOptions: SwiperOptions = {
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 500,
      slidesPerView: 'auto',
      spaceBetween: 16,
      centeredSlides: true,
      loop: true,
    };
    return html`
      <div class="slide-container">
        <hgroup>
          <h2 class="slide-title">타잉에만 있는 재미</h2>
          <p class="slide-description">
            오리지널 콘텐츠를 만나보세요!
            <span>차별화된 웰메이드 오리지널 콘텐츠</span>
          </p>
        </hgroup>
        <div class="slider-container">
          <a
            class="landing-link"
            href="/src/pages/login/"
            target="_self"
            rel="noopener noreferrer"
            aria-label="Go to the login page"
          >
            <swiper-element
              .slides="${[...this.slides]}"
              .options=${swiperOptions}
              key="${this.device}"
            >
            </swiper-element>
          </a>
        </div>
      </div>
    `;
  }
}
