import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingSlideCSS from '../../styles/landingSlideCSS';
import { LandingItem } from '../../@types/type';

@customElement('landing-slide')
export class Slide extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingSlideCSS];
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';

  connectedCallback(): void {
    super.connectedCallback();
    this.device = super.getDevice;
    this.apiUrl = import.meta.env.VITE_PB_API || '';
    this.fetchSlides();
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleResize);
  }

  async handleResize() {
    const newDevice = super.getDevice;

    if (this.device !== newDevice) {
      this.device = newDevice;
    }
  }

  filterSlide(data: LandingItem[]): LandingItem[] {
    return data
      .map((item: LandingItem) => {
        const img = item.img || 'default.jpg';
        return {
          ...item,
          title: item.title || 'Unknown',
          img: `${this.apiUrl}/files/landing_origin/${item.id}/${img}`,
          device: item.device,
        };
      })
      .filter((item: LandingItem) =>
        this.device === 'tablet'
          ? item.device === 'mobile' || item.device === 'tablet'
          : item.device === this.device
      );
  }

  async fetchSlides() {
    try {
      if (!this.apiUrl) {
        console.error('Error');
        return;
      }
      const response = await fetch(
        `${this.apiUrl}/collections/landing_origin/records`
      );
      const data = (await response.json()).items;
      let filterSlide = this.filterSlide(data);

      const minSlides = 20;

      this.slides = filterSlide = Array.from(
        { length: Math.ceil(minSlides / filterSlide.length) },
        () => filterSlide
      )
        .flat()
        .slice(0, minSlides);

      await this.requestUpdate();
    } catch (error) {
      console.error('Error');
    }
  }

  render() {
    return html`
      <div class="slide-container">
        <hgroup>
          <h2 class="slide-title">티빙에만 있는 재미</h2>
          <p class="slide-description-primary">오리지널 콘텐츠를 만나보세요!</p>
          <p class="slide-description-secondary">
            차별화된 웰메이드 오리지널 콘텐츠
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
              .slides="${this.slides}"
              .options=${{
                autoplay: {
                  delay: 1000,
                  disableOnInteraction: false,
                },
                effect: 'cards',
                speed: 500,
                slidesPerView: 'auto',
                spaceBetween: 16,
                centeredSlides: true,
                loop: true,
              }}
              key="${this.device}"
            >
            </swiper-element>
          </a>
        </div>
      </div>
    `;
  }
}
