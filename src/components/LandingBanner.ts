import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { LandingItem } from '../@types/landingtype';

@customElement('landing-banner')
export class Banner extends TaingElement {
  @property({ type: Array }) images: LandingItem[] = [];
  @property({ type: String }) apiUrl: string = '';

  static styles = css`
    .banner {
      --banner-color: var(--white);

      position: relative;
      top: 0;
      left: 0;
      width: 100vw;
      height: 70vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;
      background-image: url(/assets/images/background_mobile.png);
      text-align: center;
      color: var(--banner-color);

      @media (min-width: 48rem) {
        background-image: url(/assets/images/background_desktop.png);
      }

      & h2 {
        line-height: 1.4;
        font-size: 1rem;
        margin: 0 0;
        color: var(--banner-color);
      }

      & p {
        line-height: 1.6;
        font-size: 0.75rem;
        margin: 0.5rem 0;
        color: var(--gray400);
      }
      & a {
        font-size: 1rem;
        text-decoration: none;
        background-color: red;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        color: var(--banner-color);
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  `;

  render() {
    return html`
      <div class="banner">
        <h2>티빙 오리지널 콘텐츠,</h2>
        <h2>방송, 영화, 해외시리즈까지</h2>
        <h2>재미를 플레이해보세요.</h2>
        <p>간편하게 가입하고 원하실 때 해지할 수 있어요.</p>
        <a
          href="http://localhost:5173/src/pages/login/"
          target="_self"
          rel="noopener noreferrer"
          ><img src="/assets/images/profile/profile_4.webp" alt="taing logo" />
          새로워진 타잉을 만나보세요!</a
        >
      </div>
    `;
  }
}
