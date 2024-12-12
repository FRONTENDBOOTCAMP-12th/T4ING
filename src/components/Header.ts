import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('taing-header')
export class Header extends LitElement {
  @property() isActiveSearch = false;

  search() {
    this.isActiveSearch = !this.isActiveSearch;
  }
  render() {
    return html`
      <style>
        @import url('/src/styles/style.css');
      </style>
      <header id="header" class="header">
        <h1>
          <a href="/" title="메인">
            <img src="/assets/logo/logo.svg" class="logo" alt="TAING" />
          </a>
        </h1>
        <nav class="header__gnb">
          <ul>
            <li><a href="/">실시간</a></li>
            <li><a href="/" class="header__gnb-item tv">TV프로그램</a></li>
            <li><a href="/" class="header__gnb-item">영화</a></li>
            <li>
              <a href="/" class="header__gnb-item paramount">Paramount+</a>
            </li>
          </ul>
        </nav>
        <aside>
          ${!this.isActiveSearch
            ? html`<button
                type="button"
                @click=${this.search}
                class="btn-icon search"
              >
                검색
              </button>`
            : html`<button
                type="button"
                @click=${this.search}
                class="btn-icon close"
              >
                닫기
              </button>`}
          <a href="/" class="btn-icon header__user" aria-label="프로필 변경">
            <img src="/assets/profile/profile_4.webp" alt="user name" />
          </a>
        </aside>
      </header>
    `;
  }
}
