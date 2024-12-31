import { CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingPanoramaCSS from '../../styles/landingPanoramaCSS';
import { LandingUtils } from './LandingUtils';

@customElement('landing-panorama')
export class Panorama extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingPanoramaCSS];
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
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
    this.slides = await LandingUtils.fetchSlides(
      this.apiUrl,
      'landing_float',
      this.device,
      20
    );

    this.updateAnimation();
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
