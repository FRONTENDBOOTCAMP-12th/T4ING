import { html, nothing } from 'lit';
import { TaingElement } from '../Taing';
import { customElement } from 'lit/decorators.js';
import '../../pages/main';
import '../../pages/landing';
import { isLogin } from '../../utils/authUtils';

@customElement('main-page')
class Main extends TaingElement {
  render() {
    return html`
      ${isLogin()
        ? html`
            <div
              class="home-container"
              style="display: flex; flex-flow: column; gap: 3rem"
            >
              <main-banner></main-banner>
              <main-recommend></main-recommend>
              <main-vod></main-vod>
              <main-top></main-top>
            </div>
            <main-modal open></main-modal>
          `
        : html`<landing-page></landing-page>`}
    `;
  }
}
