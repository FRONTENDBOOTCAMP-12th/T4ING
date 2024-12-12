import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('guide-buttons')
class GuideElement extends LitElement {
  render() {
    return html`
      <style>
        @import url('/src/styles/button.css');
      </style>

      <button type="button" class="btn-icon size-xs search">검색</button>
      <button type="button" class="btn-icon size-xs close">닫기</button>
    `;
  }
}

@customElement('guide-logo')
class GuideLogo extends LitElement {
  render() {
    return html`
      <style>
        @import url('/src/styles/style.css');
      </style>

      <img src="/assets/images/logo/logo.svg" class="logo" alt="TAING" />
    `;
  }
}

@customElement('guide-badge')
class GuideBadge extends LitElement {
  render() {
    return html`
      <style>
        @import url('/src/styles/base.css');
        @import url('/src/styles/button.css');
      </style>

      <span class="badge type-circle restricted-18"><span class="sr-only">18세 이상 관람가</span></span>
      <span class="badge type-circle restricted-19"><span class="sr-only">청소년 관람 불가</span></span>
      <span class="badge taing-original"><span class="sr-only">TAING Original</span></span>
      <span class="badge type-txt red">Quick VOD</span>
      <span class="badge type-txt green">무료</span>
    `;
  }
}

export { Header } from './src/components/Header';
