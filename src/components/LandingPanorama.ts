import { css, CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('landing-panorama')
export class Panorama extends TaingElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: Number }) currentIndex: number = 0;
  @property({ type: String }) device: string = 'mobile';
  private resizeTimeout: number | null = null;

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .slide-container {
        position: relative;
        width: 100vw;
        height: 110vw;
        text-align: center;
        color: white;
        padding-block: 64px;
      }
      h2 {
        font-size: 24px;
        margin-bottom: 10px;
        line-height: 1.6;
        weight: bold;
      }
      p {
        font-size: 16px;
        margin-bottom: 20px;
        line-height: 1.6;
      }
      .slider {
        position: relative;
        overflow: hidden;
        inline-size: 100%;
        max-inline-size: 600px;
        margin: auto;
        white-space: nowrap;
      }
      .slides {
        display: flex;
        will-change: transform;
      }

      .slide {
        flex: 0 0 auto;
        inline-size: 100%;
        min-inline-size: 100%;
        min-block-size: auto;
        box-sizing: border-box;
        background-size: cover;
        background-position: center;
      }

      img {
        display: block;
        width: 95%;
        height: auto;
      }

      @media (min-width: 320px) {
        .slider {
          max-inline-size: 320px;
        }
      }
      @media (min-width: 768px) {
        .slider {
          max-inline-size: 768px;
        }
      }
      @media (min-width: 768px) {
        .slider {
          max-inline-size: 100%;
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.handleResize();
    this.fetchSlides();
    window.addEventListener('resize', this.debounceResize);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.debounceResize);
  }

  debounceResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = window.setTimeout(() => {
      this.handleResize();
    }, 100);
  };

  handleResize = () => {
    if (window.innerWidth <= 320) {
      this.device = 'mobile';
    } else if (window.innerWidth <= 768) {
      this.device = 'tablet';
    } else {
      this.device = 'desktop';
    }
    this.fetchSlides();
  };

  async fetchSlides() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/landing_float/records`
      );
      const data = (await response.json()).items;

      console.log('Data from API:', data);
      console.log('Current device:', this.device);

      this.slides = data
        .map((item: any) => {
          let img = item.img || 'default.jpg';
          if (this.device === 'tablet' && !item.img) {
            img = item.device === 'mobile' ? item.img : 'default.jpg';
          }
          return {
            title: item.title || 'Unknown',
            img: `${import.meta.env.VITE_PB_API}/files/landing_float/${
              item.id
            }/${img}`,
            device: item.device,
          };
        })
        .filter(
          (item: any) =>
            item.device === this.device ||
            (this.device === 'tablet' && item.device === 'mobile')
        );
      console.log('Filtered slides:', this.slides);

      this.updateAnimation();
    } catch (error) {
      console.error('Error');
    }
  }

  updateAnimation(): void {
    const slideCount = this.slides.length;
    if (slideCount === 0) return;

    const totalWidth = (slideCount - 1) * 100;
    const animationDuration = slideCount * 2;

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes scroll{
        from{
          transform:translateX(0);
        }
        to{
          transform:translateX(-${totalWidth}%);
        }
      }
        .slides{
        animation:scroll ${animationDuration}s linear infinite}
    `;

    const existingStyle = this.shadowRoot?.querySelector('style');
    if (existingStyle) {
      this.shadowRoot?.removeChild(existingStyle);
    }
    this.shadowRoot?.appendChild(styleElement);
  }

  render() {
    return html`
      <div class="slide-container">
        <h2>내가 찾던 재미</h2>
        <p>보고 싶은 콘텐츠를 발견하세요!</p>
        <div class="slider">
          <div class="slides">
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
