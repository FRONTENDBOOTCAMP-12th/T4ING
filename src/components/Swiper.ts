import { html, css, CSSResultGroup, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Swiper from 'swiper';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import swiperCSS from '../styles/swiperCSS';

@customElement('swiper-element')
export class SwiperElement extends LitElement {
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];
  @property({ type: Object }) options: Record<string, any> = {};
  private swiper: Swiper | null = null;

  static styles: CSSResultGroup = [swiperCSS];

  firstUpdated() {
    this.initializeSwiper();
  }

  async initializeSwiper() {
    if (this.swiper) this.swiper.destroy(true, true);

    await this.updateComplete;
    const swiperElement = this.renderRoot.querySelector(
      '.swiper'
    ) as HTMLElement;
    if (!swiperElement) {
      console.error('Swiper element not found!');
      return;
    }
    this.swiper = new Swiper(
      this.renderRoot.querySelector('.swiper')! as HTMLElement,
      {
        modules: [Navigation, Keyboard, Autoplay],
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
        centeredSlides: true,
        effect: 'cards',
        navigation: {
          nextEl: swiperElement.querySelector(
            '.swiper-button-next'
          ) as HTMLElement,
          prevEl: swiperElement.querySelector(
            '.swiper-button-prev'
          ) as HTMLElement,
        },
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        loop: true,

        ...this.options,
      }
    );
  }

  render() {
    return html`
    <div class="swiper">
          <div class="swiper-wrapper">
            ${this.slides.map(
              (slide) => html`
                <div class="swiper-slide">
                  <img src="${slide.img}" alt="${slide.title}" />
                </div>
              `
            )}
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    `;
  }
}
