import { html, css, CSSResultGroup, nothing, notEqual } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import buttonCSS from '../styles/buttonCSS';
import './SvgIcon';
import { classMap } from 'lit/directives/class-map.js';

@customElement('t-input')
class Input extends TaingElement {
  @property({ type: String }) type = 'text';
  @property({ type: String }) value = '';
  @state() isPassword: boolean = false;

  static styles: CSSResultGroup = [
    super.styles,
    buttonCSS,
    css`
      :host {
        --padding-inline-start: var(--size-3);
        --padding-inline-end: var(--size-6);
        --padding: 1rem var(--padding-inline-end) 1rem
          var(--padding-inline-start);
        --font-size: var(--text-size-s);
        --input-line-height: 1.375rem;
        display: block;
        font-size: var(--font-size);
        color: var(--gray600);
        line-height: 1.6;

        @media (min-width: 48rem) {
          --padding-inline: var(--size-4);
          --padding: var(--padding-inline-start) 1rem;
          --font-size: var(--text-size-m);
          --line-heieght: 1.3125rem;
        }
        @media (min-width: 120rem) {
        }
      }

      .t-form {
        position: relative;

        .btn-icon {
          position: absolute;
          inset-block-start: 50%;
          translate: 0 -50%;

          &.del {
            inset-inline-end: var(--padding-inline-end);
          }

          &.toggle-field {
            inset-inline-end: var(--padding-inline-end);
            background-color: dodgerblue;
          }
        }

        &:has(.btn-icon.toggle-field) {
          .btn-icon {
            &.del {
              inset-inline-end: calc(var(--padding-inline-end) * 2);
            }
          }
        }
      }

      label,
      ::slotted(label) {
        position: absolute;
        inset-inline-start: var(--padding-inline-start);
        inset-block-start: 50%;
        translate: 0 -50%;
        transition: 0.3s;
      }

      input {
        inline-size: 100%;
        padding: var(--padding);
        border: none;
        background-color: var(--dark-bg-2);
        font-size: var(--font-size);
        line-height: var(--input-line-height);
        color: var(--white);
        border-radius: var(--size-1);
        transition: 0.3s;
      }

      ::slotted(.hint) {
        display: block;
        padding-inline-start: var(--size-1);
        transition: 0.3s;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.isPassword = this.type === 'password';
  }

  get inputField() {
    return this.renderRoot.querySelector('input');
  }

  handleResetValue() {
    this.value = '';
    this.inputField.value = '';
  }

  handleChange() {
    this.value = this.inputField.value;
  }

  handleToggleInputField() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  render() {
    return html`
      <div
        class=${classMap({
          't-form': this.type,
          password: this.isPassword,
        })}
      >
        <slot name="label" ?hidden=${this.value.length}></slot>
        <input
          type=${this.type}
          class="t-form__input"
          @input=${this.handleChange}
        />
        <button
          type="button"
          class="btn-icon del"
          @click=${this.handleResetValue}
        >
          <svg-icon svg-id="del" .size=${[[20]]} center="true"></svg-icon>
          <span class="sr-only">입력값 삭제</span>
        </button>
        ${this.isPassword
          ? html` <button
              type="button"
              class="btn-icon toggle-field"
              @click=${this.handleToggleInputField}
            >
              <svg-icon svg-id="show" .size=${[[20]]} center="true"></svg-icon>
              ${this.type === 'password'
                ? html`<span class="sr-only">비밀번호 보기</span>`
                : html`<span class="sr-only">비밀번호 숨기기</span>`}
            </button>`
          : nothing}
      </div>
      <slot name="hint"></slot>
    `;
  }
}
