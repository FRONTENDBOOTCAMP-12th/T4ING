import { html, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LandingItem } from '../../@types/landingtype';
import { TaingElement } from '../Taing';

@customElement('landing-slider')
export class LandingSlider extends TaingElement {
  @property({ type: Array }) slides: Array<{
    img: string;
    title: string;
    description: string;
  }> = [];
  @property({ type: String }) apiUrl = '';
  @property({ type: String }) device: string = 'mobile';

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .slide {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
      }
      .slide img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
      .slide-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 0.5rem;
      }
      .slide-description {
        font-size: 1rem;
        color: gray;
        margin-top: 0.5rem;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.device = super.getDevice;
    this.apiUrl = import.meta.env.VITE_PB_API || '';
    this.fetchSlides();
  }

  async fetchSlides() {
    try {
      const response = await fetch(
        `${this.apiUrl}/collections/landing_float/records`
      );
      const data = (await response.json()).items;
      this.slides = data.map((item: any) => {
        let img = item.img || 'default.jpg';
        if (this.device === 'tablet' && !item.img) {
          img = item.device === 'mobile' ? item.img : 'default.jpg';
        }
        return {
          title: item.title || 'Unknown',
          img: `${this.apiUrl}/files/landing_float/${item.id}/${img}`,
          device: item.device,
          description: item.description || '상세 설명이 없습니다.',
          detailUrl: `details.html?id=${item.id}`,
        };
      });
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  }

  render() {
    return html`
      <div>
        ${this.slides.map(
          (slide) => html`
            <div class="slide">
              <img src="${slide.img}" alt="${slide.title}" />
              <div class="slide-title">${slide.title}</div>
              <div class="slide-description">${slide.description}</div>
            </div>
          `
        )}
      </div>
    `;
  }
}
