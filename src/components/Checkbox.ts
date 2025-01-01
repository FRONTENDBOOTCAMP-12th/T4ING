import { html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('t-checkbox')
export class Checkbox extends TaingElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) id = 'default';

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .checkbox-container {
        --icon-width: 1rem;
        --icon-height: 1rem;
        --icon-margin-right: 0.25rem;
        --font-size: 0.7502rem;

        @media (min-width: 48rem) {
          --icon-margin-right: 0.75rem;
        }

        @media (min-width: 120rem) {
          --icon-width: 1.625rem;
          --icon-height: 1.625rem;
          --font-size: 1.333rem;
        }

        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        white-space: nowrap;
        padding: 0;
      }

      .checkbox {
        position: absolute;
        opacity: 0;
      }

      .checkbox-label {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: var(--gray500);
        font-size: var(--font-size);
        font-weight: 600;
        line-height: 150%;
      }

      .icon-check {
        display: inline-block;
        background-image: url('/assets/images/icon/checkbox.svg');
        background-size: cover;
        background-position: center;
        margin-right: var(--icon-margin-right);
        inline-size: var(--icon-width);
        block-size: var(--icon-height);
      }

      .checkbox:checked + .checkbox-label .icon-check {
        background-image: url('/assets/images/icon/checkbox_checked.svg');
      }
    `,
  ];

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="checkbox-container">
        <input
          type="checkbox"
          class="checkbox"
          id=${this.id}
          .checked=${this.checked}
          @change=${this.handleChange}
        />
        <label for=${this.id} class="checkbox-label">
          <span class="icon-check"></span>
          <slot></slot>
        </label>
      </div>
    `;
  }
}
