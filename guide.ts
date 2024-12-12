import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('guide-buttons')
class GuideElement extends LitElement {
  render() {
    return html`
      <style>
        @import url('/src/styles/button.css');
      </style>
      <button type="button" class="btn-icon search">검색</button>
      <button type="button" class="btn-icon close">닫기</button>
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
      <img src="/assets/logo/logo.svg" class="logo" alt="TAING" />
    `;
  }
}

export { Header } from './src/components/Header';
