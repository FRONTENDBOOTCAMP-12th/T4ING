import { css, CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('landing-panorama')
export class Panorama extends TaingElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: Number }) currentIndex: number = 0;
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';
  private resizeTimeout: number | null = null;

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .p-container {
        position: relative;
        width: 100%;
        height: 110vw;
        max-height: 25rem;
        text-align: center;
        color: white;
        padding-block: 4rem;
        margin-bottom: 2rem;
      }
      .p-title {
        font-size: var(--size-5);
        margin-bottom: 0.625rem;
        line-height: 1.6;
        weight: bold;
      }
      .p-description-primary {
        font-size: var(--size-3);
        margin-bottom: 1.25rem;
        line-height: 1.6;
      }
      .p-description-secondary {
        font-size: var(--size-3);
        margin-bottom: 1.25rem;
        line-height: 1.6;
        visibility: hidden;
      }
      .slider {
        position: relative;
        overflow: hidden;
        width: 100%;
        margin: auto;
        white-space: nowrap;
        .slides-right {
          display: flex;
          will-change: transform;
        }
        .slides-left {
          display: flex;
          will-change: transform;
        }
      }

      .slide {
        flex: 0 0 auto;
        margin: var(--size-3);
        box-sizing: border-box;
        background-size: cover;
        background-position: center;
      }

      img {
        display: inline;
        width: 11.25rem;
        height: 6.375rem;
        @media (min-width: 120rem) {
          width: 22rem;
          height: 12.5rem;
        }
      }

      @media (min-width: 48rem) {
        .p-container {
          height: 55vw;
          max-height: 63.75rem;
        }
        .p-title {
          font-size: var(--size-7);
        }
        .p-description-primary {
          font-size: var(--size-4);
        }
        .p-description-secondary {
          font-size: var(--size-3);
          visibility: visible;
        }
      }
      @media (min-width: 120rem) {
        .p-title {
          font-size: var(--size-13);
        }
        .p-description-primary {
          font-size: var(--size-7);
        }
        .p-description-secondary {
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
    try {
      const response = await fetch(
        `${this.apiUrl}/collections/landing_float/records`
      );
      const data = (await response.json()).items;

      console.log('Data from API:', data);
      console.log('Current device:', this.device);

      let filterSlide = data
        .map((item: any) => {
          let img = item.img || 'default.jpg';
          if (this.device === 'tablet' && !item.img) {
            img = item.device === 'mobile' ? item.img : 'default.jpg';
          }
          return {
            title: item.title || 'Unknown',
            img: `${this.apiUrl}/files/landing_float/${item.id}/${img}`,
            device: item.device,
          };
        })
        .filter(
          (item: any) =>
            item.device === this.device ||
            (this.device === 'tablet' && item.device === 'mobile')
        );

      const minSlides = 20;
      while (filterSlide.length < minSlides) {
        filterSlide = [...filterSlide, ...filterSlide];
      }
      this.slides = filterSlide.slice(0, minSlides);

      this.updateAnimation();
    } catch (error) {
      console.error('Error');
    }
  }

  updateAnimation(): void {
    const slideCount = this.slides.length;
    if (slideCount === 0) return;

    const totalWidth = (slideCount - 1) * 10;
    const animationDuration = slideCount * 10;

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes scroll-right{
        from{
          transform:translateX(0);
        }
        to{
          transform:translateX(-${totalWidth}%);
        }
      }
      @keyframes scroll-left{
        from{
          transform:translateX(-${totalWidth}%);
          }
          to{
            transform:translateX(0);
        }
      }
        .slides-right{
        animation:scroll-right ${animationDuration}s linear infinite}
        .slides-left{
        animation:scroll-left ${animationDuration}s linear infinite}
    `;

    const existingStyle = this.shadowRoot?.querySelector('style');
    if (existingStyle) {
      this.shadowRoot?.removeChild(existingStyle);
    }
    this.shadowRoot?.appendChild(styleElement);
  }

  render() {
    return html`
      <div class="p-container">
        <h2 class="p-title">내가 찾던 재미</h2>
        <p class="p-description-primary">보고 싶은 콘텐츠를 발견하세요!</p>
        <p class="p-description-secondary">
          최신, 인기 TV프로그램, 영화, 해외시리즈,파라마운트+ 오리지널 및 독점
        </p>

        <div class="slider">
          <div class="slides-right">
            ${this.slides.map(
              (slide: any) =>
                html` <div class="slide">
                  <img src="${slide.img}" alt="${slide.title}" />
                </div>`
            )}
          </div>

          <div class="slides-left">
            ${this.slides.map(
              (slide: any) =>
                html` <div class="slide">
                  <img src="${slide.img}" alt="${slide.title}" />
                </div>`
            )}
          </div>
        </div>
      </div>
    `;
  }
}
