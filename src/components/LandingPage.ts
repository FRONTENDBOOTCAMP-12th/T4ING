import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import Swiper from 'swiper';

@customElement('landing-page')
class LandingPage extends LitElement {
  @state() private slides: Array<{ contentName: string; img: string }> = [];

  static styles: CSSResultGroup = [
    css`
      body {
        margin: 0;
        color: white;
      }
      .container {
        max-width: 20rem;
        margin: 0 auto;
        padding: 1rem;
      }

      .banner {
        background-image: url(/public/TAING.svg);
        background-size: cover;
        background-position: center;
        text-align: center;
        padding: 3.125rem 1.25rem;

        & h2 {
          font-size: 1.5rem;
          margin-bottom: 0.625rem;
        }

        & p {
          font-size: 1rem;
          margin-bottom: 1.25rem;
        }

        & button {
          background-color: #e93945;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
      }

      .section {
        margin: 20px 0;

        h2 {
          margin-bottom: 15px;
          font-size: 20px;
        }

        .swiper-container {
          inline: 100%;
          block: auto;
        }
        .swiper-wrapper {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }
        .swiper-slide img {
          width: 100%;
          border-radius: 0.25rem;
        }

        .card {
          display: inline-block;
          width: calc(33%-20px);
          margin: 10px;
          text-align: center;

          & img {
            width: 100%;
            border-radius: 0.25rem;
          }
        }
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PB_API}/collections/landing_origin/records`
      );
      if (!response.ok) {
        throw new Error('error');
      }

      const data = await response.json();
      console.log(data.items);
      this.slides = data.items.map((item: any) => ({
        contentName: item.contentName || 'Unknown',
        img: `${import.meta.env.VITE_PB_API}/files/landing_origin/${item.id}/${
          item.img || 'default.jpg'
        }`,
      }));

      this.swiper();
      console.log(this.swiper());
    } catch (error) {
      console.error('Error');
    }
  }

  swiper() {
    const container = this.renderRoot.querySelector('.swiper-container');
    new Swiper(container, {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      speed: 500,
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('slides') && this.slides.length > 0) {
      this.swiper();
    }
  }

  render() {
    return html`
      <div class="banner">
        <h2>티빙 오리지널 콘텐츠, 방송, 영화, 해외 시리즈까지!</h2>
        <p>재미를 플레이해보세요.</p>
        <a href="/">새로워진 티빙을 만나보세요!</a>
      </div>

      <div class="section">
        <h2>티빙에만 있는 재미</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            ${this.slides.map(
              (slide) => html`
                <div class="swiper-slide">
                  <img src="${slide.img}" alt="${slide.contentName}" />
                </div>
              `
            )}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>

      <div class="section">
        <h2>내가 찾던 재미</h2>
        ${this.slides.map(
          (slide) => html`
            <div class="card">
              <img src="${slide.img}" alt="${slide.contentName}" />
            </div>
          `
        )}
      </div>
    `;
  }
}
