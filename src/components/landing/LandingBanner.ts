import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';

@customElement('landing-banner')
export class Banner extends TaingElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';

  static styles = css`
    .container {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      pointer-events: none;
    }

    .slides-container {
      width: 25%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .slides {
      position: absolute;
      display: flex;
      flex-direction: column;
    }

    .slides.up {
      animation: scroll-up 10s linear infinite;
    }

    .slides.down {
      animation: scroll-down 10s linear infinite;
    }

    .slide {
      text-align: center;
      margin: 1rem 0;
    }

    .slide img {
      width: 80%;
      max-width: 600px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .banner {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.5);
      color: var(--white);
      text-align: center;

      h2 {
        line-height: 1.4;
        font-size: var(--text-size-l);
        margin: 0 0;
      }

      p {
        line-height: 1.6;
        font-size: var(--text-size-s);
        margin: 0.5rem 0;
        color: var(--gray400);
      }

      a {
        font-size: var(--text-size-m);
        text-decoration: none;
        background-color: var(--red-2);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        color: var(--white);
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  `;

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
    const animationDuration = slideCount * 1;

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes scroll-up {
      from {
        transform: translateY(50%);
      }
      to {
        transform: translateY(-50%);
      }
    }
      @keyframes scroll-down {
      from {
        transform: translateY(-50%);
      }
      to {
        transform: translateY(50%);
      }
    }
        .slides-up{
        animation:scroll-up ${animationDuration}s linear infinite}
        .slides-down{
        animation:scroll-down ${animationDuration}s linear infinite}
    `;

    const existingStyle = this.shadowRoot?.querySelector('style');
    if (existingStyle) {
      this.shadowRoot?.removeChild(existingStyle);
    }
    this.shadowRoot?.appendChild(styleElement);
  }

  render() {
    return html`
      <div class="container">
        <div class="background">
          <div class="slides-container">
            <div class="slides-down">
              ${this.slides.map(
                (slide) => html`
                  <div class="slide">
                    <img src="${slide.img}" alt="${slide.title}" />
                  </div>
                `
              )}
            </div>
          </div>

          <div class="slides-container">
            <div class="slides-up">
              ${this.slides.map(
                (slide) => html`
                  <div class="slide">
                    <img src="${slide.img}" alt="${slide.title}" />
                  </div>
                `
              )}
            </div>
          </div>

          <div class="slides-container">
            <div class="slides-down">
              ${this.slides.map(
                (slide) => html`
                  <div class="slide">
                    <img src="${slide.img}" alt="${slide.title}" />
                  </div>
                `
              )}
            </div>
          </div>

          <div class="slides-container">
            <div class="slides-up">
              ${this.slides.map(
                (slide) => html`
                  <div class="slide">
                    <img src="${slide.img}" alt="${slide.title}" />
                  </div>
                `
              )}
            </div>
          </div>
        </div>

        <div class="banner">
          <h2>티빙 오리지널 콘텐츠,</h2>
          <h2>방송, 영화, 해외시리즈까지</h2>
          <h2>재미를 플레이해보세요.</h2>
          <p>간편하게 가입하고 원하실 때 해지할 수 있어요.</p>
          <a href="/src/pages/login/" target="_self" rel="noopener noreferrer">
            <img src="/assets/images/profile/default.webp" alt="taing logo" />
            새로워진 타잉을 만나보세요!
          </a>
        </div>
      </div>
    `;
  }
}
