import { html, CSSResultGroup, PropertyValues, noChange, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { searchCSS } from '../../styles/searchCSS';
import { getStorage, setStorage, deleteStorage } from '../../utils/storage';
import { KeywordArray } from '../../@types/type';
import gsap from 'gsap';
import '../SvgIcon';

@customElement('taing-search')
class Search extends TaingElement {
  static styles: CSSResultGroup = [super.styles, searchCSS['taing-search']];

  @query('.search__input') input!: HTMLInputElement;
  @property({ type: Array }) keywordArray: KeywordArray[] = [];
  @property({ type: Boolean, reflect: true }) hidden = true;

  storageKey = 'taing-search-keyword';
  trendingKeyword = [
    '재벌집 막내아들',
    '미스터트롯2: 새로운 전설의 시작',
    '유 퀴즈 온 더 블럭',
    '대행사',
    'SHOW ME THE MONEY 11',
    '미씽: 그들이 있었다2',
    '술꾼도시여자들2',
    '캐나다 체크인',
    '미씽: 그들이 있었다 - 그들을 ′다시′만나다',
    '술꾼도시여자들',
  ];

  constructor() {
    super();
    this.getStorageKeyword();
  }

  update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has('hidden')) {
      const trendingKeywordLlist = this.renderRoot.querySelectorAll(
        '.trending-keyword-list > li'
      );

      if (!this.hidden) {
        gsap.from(trendingKeywordLlist, {
          y: 20,
          opacity: 0,
          stagger: 0.075,
          clearProps: 'all',
        });
      }
    }
  }

  async getStorageKeyword() {
    this.keywordArray = (await getStorage(this.storageKey)) || [];
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.input.value) {
      this.keywordArray.push({ id: Date.now(), keyword: this.input.value });
      setStorage(this.storageKey, this.keywordArray);
      this.requestUpdate();
      this.input.value = '';
    }
  }

  handleClearStorage() {
    this.keywordArray = [];
    deleteStorage(this.storageKey);
  }

  deleteKeyword(e: Event) {
    const button = e.target as HTMLButtonElement;
    const keywordItem = button.closest('li') as HTMLLIElement;
    const deleteId = +keywordItem.id;

    this.keywordArray = this.keywordArray.filter(({ id }) => id !== deleteId);
    setStorage(this.storageKey, this.keywordArray);
  }

  renderKeyword(keywordArray: KeywordArray[] = this.keywordArray) {
    return html`
      ${keywordArray.length
        ? html`
            <ul class="keyword-list">
              ${keywordArray
                .map(
                  ({ id, keyword }) =>
                    html`<li id=${id}>
                      ${keyword}<button
                        type="button"
                        class="btn-del"
                        @click=${this.deleteKeyword}
                      >
                        <span class="sr-only">검색어 삭제</span>
                        <svg-icon
                          svg-id="del3"
                          .size=${[[12], null, [15]]}
                          centered="true"
                        ></svg-icon>
                      </button>
                    </li>`
                )
                .reverse()}
            </ul>
          `
        : html`<span>검색 내역이 없습니다.</span>`}
    `;
  }

  render() {
    return html`
      <section>
        <h2 class="sr-only">컨텐츠 검색</h2>
        <form @submit=${this.handleSubmit}>
          <div class="search">
            <label><span class="sr-only">검색어</span></label>
            <input
              type="search"
              class="search__input"
              placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
            />
            <button type="submit">
              <span class="sr-only">검색</span>
              <svg-icon
                svg-id="search_submit"
                .size=${[[22], [28], [50]]}
                centered="true"
              ></svg-icon>
            </button>
          </div>
        </form>
        <div class="search-keyword">
          <div class="search-keyword__item mobile-hidden">
            <h3 class="search-keyword__title">
              최근 검색어
              ${this.keywordArray.length
                ? html`
                    <button
                      type="button"
                      class="btn-clear"
                      @click=${this.handleClearStorage}
                    >
                      모두 지우기
                      <svg-icon
                        svg-id="del2"
                        .size=${[[12], null, [14]]}
                      ></svg-icon>
                    </button>
                  `
                : nothing}
            </h3>
            ${this.renderKeyword(this.keywordArray)}
          </div>
          <div class="search-keyword__item">
            <h3 class="search-keyword__title">실시간 인기 검색어</h3>
            <ul class="trending-keyword-list">
              ${this.trendingKeyword.length
                ? this.trendingKeyword.map(
                    (keyword) => html`<li><a href="/">${keyword}</a></li>`
                  )
                : noChange}
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}
