import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from './Taing';
import { property } from 'lit/decorators.js';

@customElement('login-checkbox')
export class LoginCheckbox extends TaingElement {
  @property({ type: String }) id = 'default';
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) label = '';

  static styles: CSSResultGroup = [
    super.styles,
    css`
      .checkbox-wrap {
        --wrap-width: 18rem;
        --wrap-height: 2.6875rem;
        --wrap-padding: 0.5rem 0rem 1rem 0rem;
        --icon-width: 1rem;
        --icon-height: 1rem;
        --font-size: 0.7502rem;

        @media (min-width: 48rem) {
          --wrap-width: 26rem;
          --wrap-height: 2.875rem;
          --wrap-padding: 0.75rem 0 1rem 0;
          --icon-width: 1rem;
          --icon-height: 1rem;
          --font-size: 0.7502rem;
        }

        @media (min-width: 120rem) {
          --wrap-width: 45.75rem;
          --wrap-height: 5rem;
          --wrap-padding: 1rem 0 2rem 0;
          --icon-width: 1.625rem;
          --icon-height: 1.625rem;
          --font-size: 1.333rem;
        }

        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        white-space: nowrap;
        inline-size: var(--wrap-width);
        block-size: var(--wrap-height);
        padding: var(--wrap-padding);
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
        margin-right: 0.25rem;
        background-image: url('/assets/images/icon/login_checkbox.svg');
        background-size: cover;
        background-position: center;
        inline-size: var(--icon-width);
        block-size: var(--icon-height);
      }

      .checkbox:checked + .checkbox-label .icon-check {
        background-image: url('/assets/images/icon/login_checkbox_checked.svg');
      }
    `,
  ];

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="checkbox-wrap">
        <input
          type="checkbox"
          class="checkbox"
          id=${this.id}
          name="state"
          ?checked=${this.checked}
          @change=${this.handleChange}
        />
        <label for=${this.id} class="checkbox-label">
          <span class="icon-check"></span>${this.label}
        </label>
      </div>
    `;
  }
}
