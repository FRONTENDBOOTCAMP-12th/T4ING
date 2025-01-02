import { css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Checkbox } from '../Checkbox';

@customElement('login-checkbox')
export class LoginCheckbox extends Checkbox {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .checkbox-container {
        --container-padding: 1rem 0 1rem 0;
        --icon-margin-right: 0.25rem;

        @media (min-width: 48rem) {
          --container-padding: 1rem 0 1rem 0;
        }

        @media (min-width: 120rem) {
          --container-padding: 1rem 0 2rem 0;
          --icon-margin-right: 0.75rem;
        }
        padding: var(--container-padding);
      }

      .checkbox {
        background-image: url('/assets/images/icon/login_checkbox.svg');
        border-radius: 50%;

        &:checked {
          background-image: url('/assets/images/icon/login_checkbox_checked.svg');
        }
      }
    `,
  ];

  render() {
    return super.render();
  }
}
