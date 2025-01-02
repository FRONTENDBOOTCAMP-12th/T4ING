import { html, css, CSSResultGroup, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { buttonCSS } from '../../styles/buttonCSS';
import { debounce } from '../../utils/debounce';
import { isLogin } from '../../utils/authUtils';
import { fetchData, getPbImageURL } from '../../utils/request';
import '../search/Search';
import '../SvgIcon';

@customElement('t-header')
class Header extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS['t-button'],
    css`
      :host {
        position: fixed;
        inset-inline-start: 0;
        inset-block-start: 0;
        inline-size: 100%;
        z-index: 1000;
      }

      :host(.bg) {
        background: var(--header-bg);
        backdrop-filter: var(--header-filter);
        transition: 0.6s ease-out;
      }
      :host(.open-search) {
        background: var(--header-search-bg);
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

        .header__gnb-item {
          transition: 0.3s;

          &:hover {
            color: var(--white);
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

        @media (min-width: 48rem) {
          .header__gnb {
            display: contents;
            font-size: var(--gnb-font-size);
            transition: 0.3s;
          }

          .header__gnb-item {
            display: flex;
            align-items: center;
            column-gap: var(--size-1);
          }
        }

        aside {
          column-gap: var(--size-6);
        }
        @media (min-width: 120rem) {
          .header__gnb-item {
            column-gap: 0.625rem;
          }
          aside {
            column-gap: var(--size-10);
          }
        }
      }
    `,
  ];

  @state() isActiveSearch = false;
  @property({ type: String }) userImgPath =
    '/assets/images/profile/default.webp';
  @property({ type: String }) userName = '타잉';

  connectedCallback() {
    super.connectedCallback();

    this.fetchProfile();
    window.addEventListener('scroll', this.debounceScroll.bind(this));
    window.addEventListener('keydown', this.closeSearch.bind(this));
  }

  get header() {
    return this.renderRoot.querySelector('.header') as HTMLHeadElement;
  }

  async fetchProfile() {
    if (isLogin()) {
      const { profile } =
        JSON.parse(localStorage.getItem('taingUserProfile')!) ||
        JSON.parse(sessionStorage.getItem('taingUserProfile')!) ||
        {};

      if (profile) {
        try {
          console.log(profile);
          const { name, avatar } = await fetchData(
            'users_profile',
            `/${profile}`
          );

          this.userImgPath = avatar
            ? getPbImageURL(await fetchData('profile_image', `/${avatar}`))
            : '/assets/images/profile/default.webp';
          this.userName = name;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  search() {
    this.isActiveSearch = !this.isActiveSearch;

    if (this.isActiveSearch) {
      this.classList.add('open-search');
    } else {
      this.classList.remove('open-search');
    }
  }

  debounceScroll = debounce(this.handleScroll, 150);

  handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY) {
      this.classList.add('bg');
    } else {
      this.classList.remove('bg');
    }
  }

  closeSearch(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.search();
    }
  }

  navMenu = [
    { navName: '실시간', url: '/guide/', className: 'tv' },
    { navName: 'TV프로그램', url: '/guide/' },
    { navName: '영화', url: '/guide/' },
    {
      navName: 'Paramount+',
      url: '/guide/',
      className: 'paramount',
      iconOnly: true,
    },
  ];

  render() {
    const mainPage =
      location.href.split(location.origin).filter((str) => str !== '')[0] ===
      '/';

    return html`
      <header id="header" class="header">
        <h1>
          <a href="/" title="메인">
            <img src="/assets/images/logo/logo.svg" class="logo" alt="TAING" />
          </a>
        </h1>
        ${isLogin() && mainPage
          ? html`
              <nav class="header__gnb">
                ${this.navMenu.map(
                  ({ navName, url, className, iconOnly }) =>
                    html`<a href=${url} class="header__gnb-item ${className}">
                      ${className === 'tv'
                        ? html`<svg-icon
                            svg-id="live"
                            .size=${[null, [20], [34]]}
                          ></svg-icon>`
                        : nothing}
                      ${className === 'paramount'
                        ? html`<svg-icon
                            svg-id="paramount"
                            .size=${[null, [65, 20], [112, 34]]}
                          ></svg-icon>`
                        : nothing}
                      ${iconOnly ? nothing : navName}
                    </a>`
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
                        centered="true"
                      ></svg-icon>
                      <span class="sr-only">검색</span>
                    </button>`
                  : html`<button
                      type="button"
                      @click=${this.search}
                      class="btn-icon size-xs"
                    >
                      <svg-icon
                        svg-id="close"
                        .size=${[[22], [28], [50]]}
                        centered="true"
                      ></svg-icon>
                      <span class="sr-only">닫기</span>
                    </button>`}
                <a
                  href="/src/pages/user/"
                  class="btn-icon size-xs header__user"
                >
                  ${this.userImgPath
                    ? html`<img src=${this.userImgPath} alt=${this.userName} />`
                    : nothing}
                  <span class="sr-only">사용자 메뉴</span>
                </a>
              </aside>
            `
          : nothing}
      </header>
      ${isLogin()
        ? html`<taing-search ?hidden=${!this.isActiveSearch}></taing-search>`
        : nothing}
    `;
  }
}
