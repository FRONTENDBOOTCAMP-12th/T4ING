import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('landing-slide')
export class Slide extends TaingElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';
  private resizeTimeout: number | null = null;

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .slide-container {
        position: relative;
        width: calc(100vw-40px);
        margin: 0 auto;
        aspect-ratio: 4/5;
      }
      .slide-title {
        font-size: var(--size-5);
        text-align: center;
        color: var(--white);
        line-height: 1.6;
      }
      .slide-description-primary {
        font-size: var(--size-3);
        text-align: center;
        color: var(--gray200);
        line-height: 1.6;
      }
      .slide-description-secondary {
        font-size: var(--size-3);
        text-align: center;
        color: var(--gray200);
        line-height: 1.6;
      }

      .slider-container {
        max-width: 100%;
        box-sizing: border-box;
      }

      @media (min-width: 48rem) {
        .slide-title {
          visibility: hidden;
        }
        .slide-description-primary {
          font-size: var(--size-4);
        }
        .slide-description-secondary {
          font-size: var(--size-3);
        }
      }
      @media (min-width: 120rem) {
        .slide-title {
          font-size: var(--size-13);
          visibility: visible;
        }
        .slide-description-primary {
          font-size: var(--size-7);
        }
        .slide-description-secondary {
          font-size: var(--size-5);
        }
      }
    `,
  ];

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

  async fetchSlides() {
    console.log(this.device);
    try {
      if (!this.apiUrl) {
        console.error('Error');
        return;
      }
      const response = await fetch(
        `${this.apiUrl}/collections/landing_origin/records`
      );
      const data = (await response.json()).items;

      this.slides = data
        .map((item: any) => {
          let img = item.img || 'default.jpg';
          if (this.device === 'tablet' && !item.img) {
            img = item.device === 'mobile' ? item.img : 'default.jpg';
          }
          return {
            title: item.title || 'Unknown',
            img: `${this.apiUrl}/files/landing_origin/${item.id}/${img}`,
            device: item.device,
          };
        })
        .filter(
          (item: any) =>
            item.device === this.device ||
            (this.device === 'tablet' && item.device === 'mobile')
        );
      await this.requestUpdate();
      console.log(this.slides);
    } catch (error) {
      console.error('Error');
    }
  }

  render() {
    return html`
      <div class="slide-container">
        <h2 class="slide-title">티빙에만 있는 재미</h2>
        <p class="slide-description-primary">오리지널 콘텐츠를 만나보세요!</p>
        <p class="slide-description-secondary">
          차별화된 웰메이드 오리지널 콘텐츠
        </p>
        <div class="slider-container">
          <swiper-element
            .slides="${this.slides}"
            .options=${{
              autoplay: true,
              speed: 400,
              slidesPerView: 1,
              delay: 4000,
              centered: true,
            }}
            key="${this.device}"
          >
          </swiper-element>
        </div>
      </div>
    `;
  }
}
