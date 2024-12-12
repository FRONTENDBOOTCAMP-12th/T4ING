import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('landing-page')
class ImageSlider extends LitElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: Number }) currentIndex: number = 0;
  @property({ type: String }) device: string = 'mobile';

  static styles = css`
    .slider {
      position: relative;
      inline-size: 100%;
      max-inline-size: 600px;
      overflow: hidden;
      margin: auto;
    }
    .slides {
      display: flex;
      flex-direction: row;
      transition: transform 0.5s ease-in-out;
    }

    .slide {
      min-inline-size: 100%;
      min-block-size: auto;
      box-sizing: border-box;
      background-size: cover;
      background-position: center;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    .buttons {
      position: absolute;
      top: 50%;
      inline-size: 100%;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
    }

    .button {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    @media (max-width: 320px) {
      .slider {
        max-inline-size: 320px;
      }
    }

    @media (max-width: 768px) {
      .slider {
        max-inline-size: 768px;
      }
    }

    @media (min-width: 768px) {
      .slider {
        max-inline-size: 100%;
      }
    }
  `;

  private resizeTimeout: number | null = null;
  connectedCallback(): void {
    super.connectedCallback();
    this.handleResize();
    this.fetchSlides();
    this.startAutoSlide();
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
    }, 300);
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
        `${import.meta.env.VITE_PB_API}/collections/landing_origin/records`
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
            img: `${import.meta.env.VITE_PB_API}/files/landing_origin/${
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
    } catch (error) {
      console.error('Error');
    }
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
  }

  nextSlide() {
    this.currentIndex =
      this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
  }

  render() {
    return html`
      <div class="slider">
        <div
          class="slides"
          style="transform: translateX(-${this.currentIndex * 100}%);"
        >
          ${this.slides.map(
            (slide) => html`
              <div class="slide">
                <img src="${slide.img}" alt="${slide.title}" />
              </div>
            `
          )}
        </div>
        <div class="buttons">
          <button class="button prev" @click="${this.prevSlide}">Prev</button>
          <button class="button next" @click="${this.nextSlide}">Next</button>
        </div>
      </div>
    `;
  }
}
