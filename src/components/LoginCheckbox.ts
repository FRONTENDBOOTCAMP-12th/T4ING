import { css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Checkbox } from './Checkbox';

@customElement('login-checkbox')
export class LoginCheckbox extends Checkbox {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .checkbox-container {
        --container-padding: 0.5rem 0rem 1rem 0rem;

        @media (min-width: 48rem) {
          --container-padding: 0.75rem 0 1rem 0;
        }

        @media (min-width: 120rem) {
          --container-padding: 1rem 0 2rem 0;
        }
        padding: var(--container-padding);
      }

      .icon-check {
        background-image: url('/assets/images/icon/login_checkbox.svg');
      }

      .checkbox:checked + .checkbox-label .icon-check {
        background-image: url('/assets/images/icon/login_checkbox_checked.svg');
      }
    `,
  ];

  render() {
    return super.render();
  }
}
