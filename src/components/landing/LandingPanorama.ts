import { CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingPanoramaCSS from '../../styles/landingPanoramaCSS';
import { LandingItem } from '../../@types/type';

@customElement('landing-panorama')
export class Panorama extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingPanoramaCSS];
  @property({ type: Array }) slides: LandingItem[] = [];
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
      <section
        class="panorama-container"
        aria-labelledby="panorama-title"
        role="region"
      >
        <h2 id="panorama-title" class="panorama-title">내가 찾던 재미</h2>
        <p class="panorama-description-primary">
          보고 싶은 콘텐츠를 발견하세요!
        </p>
        <p class="panorama-description-secondary">
          최신, 인기 TV프로그램, 영화, 해외시리즈, 파라마운트+ 오리지널 및 독점
        </p>

        <div
          class="panorama-slider"
          role="group"
          aria-label="Panorama slider with popular content"
        >
          <div class="slides-right">
            ${this.slides.map(
              (slide) => html`
                <figure class="slide">
                  <a
                    class="landing-link"
                    href="/src/pages/login/"
                    target="_self"
                    tabindex="-1"
                    rel="noopener noreferrer"
                    aria-hidden="true"
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
                <figure class="slide" role="group" aria-label="${slide.title}">
                  <a
                    class="landing-link"
                    href="/src/pages/login/"
                    target="_self"
                    tabindex="-1"
                    rel="noopener noreferrer"
                    aria-hidden="true"
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
