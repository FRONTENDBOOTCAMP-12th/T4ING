import { css, CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { openModal } from '../../utils/modal';
import { getTokenHeader, getUserId } from '../../utils/authUtils';
import '../Modal';

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

  logout(option: boolean = false) {
    sessionStorage.clear();
    if (option === true) {
      localStorage.clear();
    } else {
      location.href = '/src/pages/landing/';
    }
  }

  async deleteUser() {
    const apiUrl = `${
      import.meta.env.VITE_PB_API
    }/collections/users/records/${getUserId()}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: getTokenHeader(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원탈퇴 실패');
      }

      this.logout(true);

      location.href = '/src/pages/goodbye/';
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return html`
      <ul class="user-menu">
        <li>
          <a href="/src/pages/profile/" class="user-menu__btn">프로필 편집</a>
        </li>
        <li>
          <button
            type="button"
            class="user-menu__btn"
            @click=${openModal.bind(this, '.modal-logout')}
          >
            로그아웃
          </button>
        </li>
        <li>
          <button
            type="button"
            class="user-menu__btn"
            @click=${openModal.bind(this, '.modal-withdraw')}
          >
            회원 탈퇴
          </button>
        </li>
      </ul>

      <t-modal class="modal-logout" cancel hidden @modalConfirm=${this.logout}
        >로그아웃 하시겠습니까?</t-modal
      >
      <t-modal
        class="modal-withdraw"
        cancel
        hidden
        @modalConfirm=${this.deleteUser}
        >회원 탈퇴 하시겠습니까?</t-modal
      >
    `;
  }
}
