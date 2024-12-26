import { html, CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../src/components/Taing';
import { buttonCSS } from '../src/styles/buttonCSS';
import '../src/components/login/LoginCheckbox';
import '../src/components/SvgIcon';
import '../src/components/Form';
import '../src/components/Checkbox';
import '../src/components/Button';
import '../src/components/Modal';
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

@customElement('t-guide')
class Guide extends TaingElement {
  static styles = css`
    .guide-wrap {
      padding: 2rem;

      h1 {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        padding-block-end: 2rem;
        font-size: 1.6rem;
        color: #d3d3d3;

        img {
          inline-size: 108px;
        }
      }

      .guide-title {
        padding-block-end: 1rem;
        font-size: 1.5rem;
        font-weight: 900;
        color: #e93945;

        & ~ .guide-title {
          margin-block-start: 3rem;
        }
      }

      .component-wrap {
        padding-bottom: 2rem;

        &.flex {
          display: flex;
          flex-flow: column wrap;
          row-gap: 1rem;
        }
      }
    }
  `;

  render() {
    return html`
      <div class="guide-wrap">
        <h1>
          <img src="/assets/images/logo/logo.svg" class="logo" alt="TAING" />
          style guide
        </h1>

        <h2 class="guide-title">🪄 Logo</h2>
        <guide-logo></guide-logo>

        <h2 class="guide-title">🪄 Badge</h2>
        <guide-badge></guide-badge>

        <h2 class="guide-title">🪄 Form</h2>
        <div class="component-wrap">
          <login-checkbox>label</login-checkbox>
          <t-checkbox>label</t-checkbox>
        </div>
        <t-input>
          <label slot="label">아이디</label>
          <strong slot="hint" class="hint"
            >영문 또는 영문, 숫자 조합 6~12자리</strong
          >
        </t-input>
        <t-input type="password">
          <label slot="label">비밀번호</label>
          <strong slot="hint" class="hint"
            >영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리</strong
          >
        </t-input>
        <t-input type="email">
          <label slot="label">이메일</label>
        </t-input>

        <h2 class="guide-title">🪄 Buttons</h2>
        <div class="component-wrap">
          <guide-buttons></guide-buttons>
        </div>

        <div class="component-wrap flex">
          <t-button></t-button>
          <t-button type="submit" color="primary">로그인</t-button>
          <t-button color="secondary">본인인증</t-button>
          <t-button color="line">프로필 편집</t-button>
        </div>

        <h2 class="guide-title">🪄 Modal</h2>
        <t-modal
          popup
          class="popup"
          .cancelFn=${() => {
            const modal = this.renderRoot.querySelector(
              '.popup'
            ) as HTMLElement;

            if (modal) {
              modal.hidden = true;
            }
          }}
        ></t-modal>

        <!--t-modal
          class="modal-confirm"
          .confirmFn=${() => console.log('컨펌 콜백')}
          .cancelFn=${() => {
          const modal = this.renderRoot.querySelector(
            '.modal-confirm'
          ) as HTMLElement;

          if (modal) {
            modal.hidden = true;
          }
        }}
          >로그아웃 하시겠습니까?</t-modal
        -->
      </div>
    `;
  }
}
