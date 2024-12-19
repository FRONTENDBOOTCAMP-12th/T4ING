import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { LandingItem } from '../@types/landingtype';

@customElement('landing-welcome')
class Welcome extends TaingElement {
  @property({ type: Array }) images: LandingItem[] = [];
  @property({ type: String }) apiUrl: string = '';

  static styles = css`
    .landing-welcome {
      position: relative;
      top: 0;
      left: 0;
      width: 100vw;
      height: 70vw;
      max-height: 23rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;
      text-align: center;
      color: white;
      margin-top: 5rem;

      @media (min-width: 48rem) {
        height: 50vw;
        max-height: 57rem;
      }
      & p {
        line-height: 1.4;
        font-size: 1rem;
        margin: 1rem 0;
      }
    }
    .landing-link {
      margin-top: 1.5rem;
      font-size: 1rem;
      text-decoration: none;
      color: var(--white);
      background-color: red;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .landing-button-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  `;

  render() {
    return html`
      <div class="landing-welcome">
        <img src="/assets/New_tving.svg" alt="No.1 K-콘텐츠 플랫폼 TAING" />
        <p>지금 시작해보세요</p>
        <a
          class="landing-link"
          href="http://localhost:5173/src/pages/login/"
          target="_self"
          rel="noopener noreferrer"
          ><img
            class="landing-button-icon"
            src="/assets/images/profile/profile_4.webp"
            alt="taing logo"
          />
          새로워진 타잉을 만나보세요!</a
        >
      </div>
    `;
  }
}
