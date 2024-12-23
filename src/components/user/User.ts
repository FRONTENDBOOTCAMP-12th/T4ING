import { css, CSSResultGroup, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../Taing';

@customElement('t-user')
class User extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .user-menu {
        --block-size: 20rem;
        --row-gap: var(--size-3);
        --btn-font-size: var(--text-size-m);
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        row-gap: var(--row-gap);
        min-block-size: var(--block-size);
        text-align: center;

        @media (min-width: 48rem) {
          --block-size: 30rem;
          --row-gap: var(--size-4);
          --btn-font-size: var(--text-size-l);
        }
        @media (min-width: 120rem) {
          --btn-font-size: var(--text-size-xl);
        }

        button {
          padding: 0;
          border: none;
          background-color: initial;
          appearance: none;
        }

        .user-menu__btn {
          font-size: var(--btn-font-size);
          line-height: 1.6;
          color: var(--gray300);
          transition: 0.3s;
          cursor: pointer;

          &:hover {
            color: var(--gray100);
          }
        }
      }
    `,
  ];
  render() {
    return html`
      <ul class="user-menu">
        <li>
          <a href="/src/pages/profile/" class="user-menu__btn">프로필 편집</a>
        </li>
        <li><button type="button" class="user-menu__btn">로그아웃</button></li>
        <li><button type="button" class="user-menu__btn">회원 탈퇴</button></li>
      </ul>
    `;
  }
}
