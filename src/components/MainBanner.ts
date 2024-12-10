import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
// import reset from '../styles/reset.css';

@customElement('main-banner')
class MainBanner extends LitElement {
  static styles: CSSResultGroup = css`
    .main-banner {
      background-color: #f0f0f0;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  render() {
    return html`
      <div class="main-banner">
        <h1>메인 배너</h1>
      </div>
    `;
  }
}
