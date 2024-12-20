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
      top: 0px;
      left: 0px;
      width: 100%;
      height: 1308px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-size: 1920px auto;
      background-position: 50% 0;
      background-image: url(/assets/images/background_mobile.png);
      text-align: center;
      color: var(--banner-color);
      background-repeat: repeat-x;

      @media (min-width: 48rem) {
        background-image: url(/assets/images/background_desktop.png);
      }

      & h2 {
        line-height: 1.4;
        font-size: var(--text-size-l);
        margin: 0 0;
        color: var(--banner-color);
      }

      & p {
        line-height: 1.6;
        font-size: var(--text-size-s);
        margin: 0.5rem 0;
        color: var(--gray400);
      }
      & a {
        font-size: var(--text-size-m);
        text-decoration: none;
        background-color: var(--red-2);
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
        <a href="/src/pages/login/" target="_self" rel="noopener noreferrer"
          ><img src="/assets/images/profile/profile_4.webp" alt="taing logo" />
          새로워진 타잉을 만나보세요!</a
        >
      </div>
    `;
  }
}
