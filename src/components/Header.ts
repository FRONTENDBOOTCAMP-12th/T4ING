import { CSSResultGroup, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { taingElement } from './Taing';
import buttonCSS from '../styles/buttonCSS';

@customElement('taing-header')
class Header extends taingElement {
  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS,
    css`
      .header {
        --header-padding: 0.625rem 1rem;
        --header-height: 2.375rem;
        --column-gap: var(--size-4);
        display: flex;
        align-items: center;
        column-gap: var(--column-gap);
        position: relative;
        block-size: var(--header-height);
        padding: var(--header-padding);

        .header__gnb {
          display: none;
          margin-block-end: auto;

          ul {
            display: contents;
          }
        }

        aside {
          display: flex;
          column-gap: var(--column-gap);
          margin-inline-start: auto;
        }

        .header__user {
          border-radius: var(--round-xs);
        }
      }
      @media (width >= 48rem) {
        .header {
          --header-padding: 1rem 2.5rem;
          --header-height: 3.5rem;
          --column-gap: 1.75rem;
          --gnb-font-size: var(--text-size-s);
          .header__gnb {
            display: contents;
            font-size: var(--gnb-font-size);
            transition: 0.3s;
          }
        }

        aside {
          column-gap: var(--size-6);
        }
      }
      @media (width >= 120rem) {
        .header {
          --header-padding: 1.5625rem 70px;
          --header-height: 6.25rem;
          --column-gap: 3.25rem;
          --gnb-font-size: var(--text-size-l);

          aside {
            column-gap: var(--size-10);
          }
        }
      }
    `,
  ];

  @property() isActiveSearch = false;

  search() {
    this.isActiveSearch = !this.isActiveSearch;
  }

  render() {
    return html`
      <header id="header" class="header">
        <h1>
          <a href="/" title="메인">
            <img src="/assets/images/logo/logo.svg" class="logo" alt="TAING" />
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
                class="btn-icon size-xs search"
              >
                검색
              </button>`
            : html`<button
                type="button"
                @click=${this.search}
                class="btn-icon size-xs close"
              >
                닫기
              </button>`}
          <a
            href="/"
            class="btn-icon size-xs header__user"
            aria-label="프로필 변경"
          >
            <img src="/assets/images/profile/profile_4.webp" alt="user name" />
          </a>
        </aside>
      </header>
    `;
  }
}
