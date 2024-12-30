import { html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import landingWelcomeCSS from '../../styles/landingWelcomeCSS';

@customElement('landing-welcome')
export class Welcome extends TaingElement {
  static styles: CSSResultGroup = [super.styles, landingWelcomeCSS];

  render() {
    return html`
      <section class="landing-welcome" aria-labelledby="welcome-heading">
        <img
          src="/assets/New_tving.svg"
          alt="No.1 K-콘텐츠 플랫폼 TAING"
          aria-hidden="true"
        />
        <p>지금 시작해보세요</p>
        <a
          class="landing-link"
          href="/src/pages/login/"
          target="_self"
          rel="noopener noreferrer"
          aria-label="로그인 페이지로 이동"
          ><img
            class="landing-button-icon"
            src="/assets/images/profile/default.webp"
            alt="taing logo"
          />
          새로워진 타잉을 만나보세요!</a
        >
      </section>
    `;
  }
}
