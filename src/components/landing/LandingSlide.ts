import { SwiperOptions } from 'swiper/types';
import { html, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingSlideCSS from '../../styles/landingSlideCSS';
import { LandingUtils } from './LandingUtils';

@customElement('landing-slide')
export class Slide extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingSlideCSS];
  @state() private slidesDevice: Record<
    string,
    Array<{ img: string; title: string }>
  > = {
    mobile: [],
    tablet: [],
    desktop: [],
  };
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';

  connectedCallback(): void {
    super.connectedCallback();
    this.device = super.getDevice;
    this.apiUrl = import.meta.env.VITE_PB_API || '';
    this.loadSlides();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  async handleResize() {
    const newDevice = super.getDevice;

    if (this.device !== newDevice) {
      this.device = newDevice;
      await this.loadSlides();
    }
  }

  async loadSlides(): Promise<void> {
    const allSlides = await LandingUtils.fetchSlides(
      this.apiUrl,
      'landing_origin',
      this.device,
      20
    );
    this.slidesDevice = LandingUtils.slidesDevice(allSlides);
    await this.requestUpdate();
  }

  render() {
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
    const slides =
      this.device === 'tablet' && this.slidesDevice['tablet'].length === 0
        ? this.slidesDevice['mobile']
        : this.slidesDevice[this.device] || [];
    return html`
      <div class="slide-container">
        <hgroup>
          <h2 class="slide-title">티빙에만 있는 재미</h2>
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
              .slides="${slides}"
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
