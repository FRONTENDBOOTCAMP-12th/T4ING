import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingBannerCSS from '../../styles/landingBannerCSS';
import { LandingUtils } from './LandingUtils';
import './BtnJoin';

@customElement('landing-banner')
export class Banner extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingBannerCSS];
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

    const animationDuration = slideCount * 10;
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
          <h2>
            타잉 오리지널 콘텐츠,<br />방송, 영화, 해외시리즈까지<br />재미를
            플레이해보세요.
          </h2>
          <p>간편하게 가입하고 원하실 때 해지할 수 있어요.</p>
          <button-join>새로워진 타잉을 만나보세요!</button-join>
        </hgroup>
      </section>
    `;
  }
}
