import { html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../src/components/Taing';
import { buttonCSS } from '../src/styles/buttonCSS';
import '../src/components/login/LoginCheckbox';
import '../src/components/SvgIcon';
import '../src/components/Form';
import '../src/components/Checkbox';
import '../src/components/Button';
import '../main.ts';

@customElement('guide-logo')
class GuideLogo extends TaingElement {
  render() {
    return html`
      <img src="/assets/images/logo/logo.svg" class="logo" alt="TAING" />
    `;
  }
}

@customElement('guide-buttons')
class GuideButton extends TaingElement {
  static styles: CSSResultGroup = [super.styles, buttonCSS['t-button']];

  render() {
    return html`
      <button type="button" class="btn-icon size-xs">
        <svg-icon
          svg-id="search"
          .size=${[[18], [24], [40]]}
          centered="true"
        ></svg-icon>
        <span class="sr-only">검색</span>
      </button>
      <button type="button" class="btn-icon size-xs">
        <svg-icon
          svg-id="close"
          .size=${[[22], [28], [50]]}
          centered="true"
        ></svg-icon>
        <span class="sr-only">닫기</span>
      </button>
    `;
  }
}

@customElement('guide-badge')
class GuideBadge extends TaingElement {
  static styles: CSSResultGroup = [super.styles, buttonCSS['t-button']];

  render() {
    return html`
      <span class="badge type-circle restricted-18"
        ><span class="sr-only">18세 이상 관람가</span></span
      >
      <span class="badge type-circle restricted-19"
        ><span class="sr-only">청소년 관람 불가</span></span
      >
      <span class="badge taing-original"
        ><span class="sr-only">TAING Original</span></span
      >
      <span class="badge type-txt red">Quick VOD</span>
      <span class="badge type-txt green">무료</span>
    `;
  }
}
