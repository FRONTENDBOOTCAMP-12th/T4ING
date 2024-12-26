import { html, CSSResultGroup, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { searchCSS } from '../../styles/searchCSS';
import { getStorage, setStorage, deleteStorage } from '../../../lib/storage';
import '../SvgIcon';

@customElement('taing-search')
class Search extends TaingElement {
  static styles: CSSResultGroup = [super.styles, searchCSS['taing-search']];

  @query('.search__input') input!: HTMLInputElement;
  @property({ type: Array }) keywordArray: string[] = [];
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
    '미씽: 그들이 있었다 - 그들을 ‘다만나다',
    '술꾼도시여자들',
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.getStorageKeyword();
  }

  renderKeyword(keywordArray: string[] = this.keywordArray) {
    return html`
      ${keywordArray.length
        ? html`
            <ul class="keyword-list" @click=${this.handleDeleteKeyword}>
              ${keywordArray
                .map(
                  (keyword) =>
                    html`<li>
                      ${keyword}<button type="button" class="btn-del">
                        <span class="sr-only">검색어 삭제</span>
                        <svg-icon
                          svg-id="del3"
                          .size=${[[12], , [15]]}
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

  async getStorageKeyword() {
    this.keywordArray = (await getStorage(this.storageKey)) || [];
  }

  async addKeyword() {
    if (this.input.value) {
      this.keywordArray.push(this.input.value);
      setStorage(this.storageKey, this.keywordArray);

      return this.keywordArray;
    }
  }

  handleDeleteKeyword(e: Event) {
    const button = e.target as HTMLButtonElement;
    const ul = button.closest('ul') as HTMLUListElement;
    const li = button.closest('li') as HTMLLIElement;
    const liList = Array.from(ul.children);
    const index = liList.indexOf(li);

    this.keywordArray = this.keywordArray
      .reverse()
      .filter((k: string, i: number) => i !== index);

    setStorage(this.storageKey, this.keywordArray);
  }

  handleClearStorage() {
    this.keywordArray = [];
    deleteStorage(this.storageKey);
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    this.addKeyword().then((res) => {
      this.renderKeyword(res);
      this.requestUpdate();
    });
    this.input.value = '';
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
                        .size=${[[12], , [14]]}
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
              ${this.trendingKeyword.map(
                (keyword) => html`<li><a href="/">${keyword}</a></li>`
              )}
            </ul>
          </div>
        </div>
      </section>
    `;
  }
}
