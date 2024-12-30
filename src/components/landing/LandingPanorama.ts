import { css, CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { LandingItem } from '../../@types/landingtype';

@customElement('landing-panorama')
export class Panorama extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .panorama-container {
        --container-height: 110vw;
        --container-max-height: 25rem;
        --title-font-size: var(--text-size-m);
        --desc-primary-font-size: var(--text-size-s);
        --desc-secondary-font-size: var(--text-size-s);
        --image-width: 11.25rem;
        --image-height: 6.375rem;
        --slide-margin: var(--size-3);
        --animation-duration-multiplier: 1s;

        position: relative;
        width: 100%;
        height: var(--container-height);
        max-height: var(--container-max-height);
        text-align: center;
        color: white;
        padding-block: 4rem;
        margin-bottom: 2rem;

        .panorama-title {
          font-size: var(--title-font-size);
          margin-bottom: 0.625rem;
          line-height: 1.6;
        }

        .panorama-description-primary {
          font-size: var(--desc-primary-font-size);
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .panorama-description-secondary {
          font-size: var(--desc-secondary-font-size);
          margin-bottom: 1.25rem;
          line-height: 1.6;
          visibility: hidden;
        }

        .panorama-slider {
          position: relative;
          overflow: hidden;
          width: 100%;
          margin: auto;
          white-space: nowrap;
        }

        .slides-right,
        .slides-left {
          display: flex;
          will-change: transform;
        }

        .slide {
          flex: 0 0 auto;
          margin: var(--slide-margin);
          box-sizing: border-box;
          background-size: cover;
          background-position: center;
        }

        img {
          display: inline-block;
          width: var(--image-width);
          height: var(--image-height);
        }

        @media (min-width: 120rem) {
          .panorama-container {
            --container-height: 55vw;
            --container-max-height: 63.75rem;
          }

          .panorama-title {
            --title-font-size: var(--size-13);
          }

          .panorama-description-primary {
            --desc-primary-font-size: var(--size-7);
          }

          .panorama-description-secondary {
            --desc-secondary-font-size: var(--size-5);
            visibility: visible;
          }

          img {
            --image-width: 22rem;
            --image-height: 12.5rem;
          }
        }
      }
    `,
  ];
  @property({ type: Array }) slides: LandingItem[] = [];
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';
  private resizeTimeout: number | null = null;

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

  async fetchSlides() {
    try {
      if (!this.apiUrl) {
        console.error('Error');
        return;
      }
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
      console.error('Error fetching slides:', error);
    }
  }

  updateAnimation(): void {
    const slideCount = this.slides.length;
    if (slideCount === 0) return;

    const totalWidth = (slideCount - 1) * 10;
    const animationDuration = slideCount * 1;

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes scroll-right {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-${totalWidth}%);
        }
      }
      @keyframes scroll-left {
        from {
          transform: translateX(-${totalWidth}%);
        }
        to {
          transform: translateX(0);
        }
      }
      .slides-right {
        animation: scroll-right ${animationDuration}s linear infinite;
      }
      .slides-left {
        animation: scroll-left ${animationDuration}s linear infinite;
      }
    `;

    const existingStyle = this.shadowRoot?.querySelector('style');
    if (existingStyle) {
      this.shadowRoot?.removeChild(existingStyle);
    }
    this.shadowRoot?.appendChild(styleElement);
  }

  render() {
    return html`
      <section class="panorama-container">
        <h2 class="panorama-title">내가 찾던 재미</h2>
        <p class="panorama-description-primary">
          보고 싶은 콘텐츠를 발견하세요!
        </p>
        <p class="panorama-description-secondary">
          최신, 인기 TV프로그램, 영화, 해외시리즈, 파라마운트+ 오리지널 및 독점
        </p>

        <div class="panorama-slider">
          <div class="slides-right">
            ${this.slides.map(
              (slide) => html`
                <figure class="slide">
                  <a
                    class="landing-link"
                    href="/src/pages/login/"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <img src="${slide.img}" alt="${slide.title}" />
                  </a>
                </figure>
              `
            )}
          </div>

          <div class="slides-left">
            ${this.slides.map(
              (slide) => html`
                <figure class="slide">
                  <a
                    class="landing-link"
                    href="/src/pages/login/"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <img src="${slide.img}" alt="${slide.title}" />
                  </a>
                </figure>
              `
            )}
          </div>
        </div>
      </section>
    `;
  }
}
