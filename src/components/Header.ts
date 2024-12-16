import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import buttonCSS from '../styles/buttonCSS';
import './Search';
import './SvgIcon';

@customElement('taing-header')
class Header extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS,
    css`
      :host {
        position: relative;
      }
      .header {
        --header-padding: 0.625rem 1rem;
        --header-height: 2.375rem;
        --column-gap: var(--size-4);
        display: flex;
        align-items: center;
        column-gap: var(--column-gap);
        block-size: var(--header-height);
        padding: var(--header-padding);

        @media (min-width: 48rem) {
          --header-padding: 1rem 2.5rem;
          --header-height: 3.5rem;
          --column-gap: 1.75rem;
          --gnb-font-size: var(--text-size-s);
        }
        @media (min-width: 120rem) {
          --header-padding: 1.5625rem 70px;
          --header-height: 6.25rem;
          --column-gap: 3.25rem;
          --gnb-font-size: var(--text-size-l);
        }

        .header__gnb {
          display: none;
          margin-block-end: auto;
        }

        aside {
          display: flex;
          column-gap: var(--column-gap);
          margin-inline-start: auto;
        }

        .header__user {
          border-radius: var(--round-xs);
        }

        @media (min-width: 48rem) {
          .header__gnb {
            display: contents;
            font-size: var(--gnb-font-size);
            transition: 0.3s;
          }
        }

        aside {
          column-gap: var(--size-6);
        }
        @media (min-width: 120rem) {
          aside {
            column-gap: var(--size-10);
          }
        }
      }
    `,
  ];

  @property({ type: Boolean }) isActiveSearch = false;

  navMenu = [
    { navName: '실시간', url: '/' },
    { navName: 'TV프로그램', url: '/', className: 'tv' },
    { navName: '영화', url: '/' },
    { navName: 'Paramount+', url: '/', className: 'paramount' },
  ];

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
          ${this.navMenu.map(
            ({ navName, url, className }) =>
              html`<a href=${url} class="header__gnb-item ${className}"
                >${navName}</a
              >`
          )}
        </nav>
        <aside>
          ${!this.isActiveSearch
            ? html`<button
                type="button"
                @click=${this.search}
                class="btn-icon size-xs"
              >
                <svg-icon
                  svg-id="search"
                  .size=${[[18], [24], [40]]}
                ></svg-icon>
                <span class="sr-only">검색</span>
              </button>`
            : html`<button
                type="button"
                @click=${this.search}
                class="btn-icon size-xs"
              >
                <svg-icon svg-id="close" .size=${[[22], [28], [50]]}></svg-icon>
                <span class="sr-only">닫기</span>
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
      <taing-search ?hidden=${!this.isActiveSearch}></taing-search>
    `;
  }
}
