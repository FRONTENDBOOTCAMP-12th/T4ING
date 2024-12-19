import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { searchCSS } from '../styles/searchCSS';

@customElement('taing-search')
class Search extends TaingElement {
  static styles: CSSResultGroup = [super.styles, searchCSS['taing-search']];

  handleSubmit(e: Event) {
    e.preventDefault();
  }

  render() {
    return html`
      <section>
        <h2 class="sr-only">컨텐츠 검색</h2>
        <form @submit=${this.handleSubmit}>
          <div class="search">
            <input
              type="search"
              class="search__input"
              placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
            />
            <button type="submit">검색</button>
          </div>
        </form>
      </section>
    `;
  }
}
