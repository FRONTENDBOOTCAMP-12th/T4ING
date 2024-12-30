import { html, CSSResultGroup, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { LandingItem } from '../../@types/landingtype';

@customElement('landing-banner')
export class Banner extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .banner-container {
        position: relative;
        width: 100%;
        height: 70vh;
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
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        height: 200%;
      }

      @keyframes scroll-up {
        from {
          transform: translateY(0%);
        }
        to {
          transform: translateY(-100%);
        }
      }
      @keyframes scroll-down {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0%);
        }
      }
      .slides-up {
        animation: scroll-up var(--animation-duration, 5s) linear infinite;
      }
      .slides-down {
        animation: scroll-down var(--animation-duration, 10s) linear infinite;
      }

      .slide {
        text-align: center;
        margin: 1rem 0;
        img {
          width: 95%;
          max-width: 600px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
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
    `,
  ];
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

  handleResize() {
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
          img: `${this.apiUrl}/files/landing_float/${item.id}/${img}`,
          device: item.device,
        };
      })
      .filter((item: LandingItem) =>
        this.device === 'tablet'
          ? item.device === 'mobile' || item.device === 'tablet'
          : item.device === this.device
      );
  }

  async fetchSlides(): Promise<void> {
    try {
      const response = await fetch(
        `${this.apiUrl}/collections/landing_float/records`
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
      this.updateAnimation();
    } catch (error) {
      console.error('Error');
    }
  }

  updateAnimation(): void {
    const slideCount = this.slides.length;
    if (slideCount === 0) return;

    const animationDuration = slideCount * 1;
    this.style.setProperty('--animation-duration', `${animationDuration}s`);
  }

  renderSlide(animationClass: string) {
    return html`<div class="slides-container">
      <div class="${animationClass}">
        ${this.slides.map(
          (slide) => html`
            <div class="slide">
              <img src="${slide.img}" alt="${slide.title}" />
            </div>
          `
        )}
      </div>
    </div>`;
  }

  render() {
    return html`
      <section class="banner-container">
        <div class="background">
          ${this.renderSlide('slides-down')} ${this.renderSlide('slides-up')}
          ${this.renderSlide('slides-down')} ${this.renderSlide('slides-up')}
        </div>
        <hgroup class="banner">
          <h2>티빙 오리지널 콘텐츠,</h2>
          <h2>방송, 영화, 해외시리즈까지</h2>
          <h2>재미를 플레이해보세요.</h2>
          <p>간편하게 가입하고 원하실 때 해지할 수 있어요.</p>
          <a href="/src/pages/login/" target="_self" rel="noopener noreferrer">
            <img src="/assets/images/profile/default.webp" alt="taing logo" />
            새로워진 타잉을 만나보세요!
          </a>
        </hgroup>
      </section>
    `;
  }
}
