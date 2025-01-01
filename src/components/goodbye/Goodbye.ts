import { html, CSSResultGroup, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import '../Button';

@customElement('goodbye-page')
class GoodBye extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .goodbye-container {
        --font-size: var(--size-5);
        --title-margin-bottom: 2rem;
        block-size: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 2rem;

        @media (min-width: 48rem) {
          --font-size: var(--size-7);
          --title-margin-bottom: 3rem;
        }

        @media (min-width: 120rem) {
          --font-size: var(--size-10);
          --title-margin-bottom: 10rem;
        }
      }

      .title {
        font-size: var(--font-size);
        font-weight: 700;
        color: var(--gray300);
        margin-bottom: var(--title-margin-bottom);
      }

      t-button {
        margin-top: 1rem;
      }
    `,
  ];

  handleClick() {
    location.href = '/src/pages/landing/';
  }

  render() {
    return html`
      <div class="goodbye-container">
        <h1 class="title">TAING 탈퇴가 완료되었습니다</h1>
        <t-button color="secondary" @click=${this.handleClick}>
          돌아가기
        </t-button>
      </div>
    `;
  }
}
