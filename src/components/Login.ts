import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import Swal from 'sweetalert2';

@customElement('login-element')
class Login extends LitElement {
  static styles: CSSResultGroup = [
    css`
      a {
        text-decoration: none;
      }
      .login {
        --font-color: var(--gray600);
        --button-color: var(--red-1);
        inline-size: 100%;
        block-size: 100%;
      }
      .login-title {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        align-self: stretch;
        color: var(--white);
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        margin-bottom: 1.25rem;
      }
      .login__input {
        margin-top: 0.5rem;
        color: var(--gray600);
        font-family: Pretendard;
        font-size: 0.7502rem;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;

        & input {
          display: flex;
          width: 18rem;
          height: 2.875rem;
          padding: 0rem 1.25rem 0rem 1rem;
          align-items: center;

          border-radius: 0.25rem;
          background: var(--dark-bg-2);
          border: none;
        }
      }
      .login__state-checkbox {
        box-sizing: border-box;
        display: flex;
        color: var(--font-color);
        inline-size: 18rem;
        block-size: 2.6875rem;
        padding: 0.5rem 0rem 1rem 0rem;
        align-items: flex-start;
        white-space: nowrap;
        font-family: Pretendard;
        font-size: 0.7502rem;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;

        input[type='checkbox'] {
          width: 0.7692rem;
          height: 0.7692rem;
          flex-shrink: 0;
        }
      }
      .login__button {
        display: flex;
        width: 18rem;
        height: 2.625rem;
        justify-content: center;
        align-items: center;
        border: none;
        background: var(--button-color);
        padding: 1rem;
        cursor: pointer;
        inline-size: 100%;

        color: var(--white);
        font-family: Pretendard;
        font-size: 0.7502rem;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
      }

      .login-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 0 0;
      }

      .login__register-wrap {
        margin-top: 1.25rem;
        color: var(--gray500);
        font-family: Pretendard;
        font-size: 0.7502rem;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;

        .login__register {
          padding: 0.75rem;
          color: var(--gray300);
          font-family: Pretendard;
          font-size: 0.7502rem;
          font-style: normal;
          font-weight: 400;
          line-height: 160%;
        }
      }

      .login__find-acount-wrap {
        display: flex;
        justify-self: center;
        width: 18rem;
        padding-top: 1.25rem;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        & hr {
          margin: 0 0.5rem;
          width: 0.0625rem;
          height: 0.75rem;
          border: none;
          background: var(--gray300);
        }

        & a {
          display: flex;
          padding: 0rem 0.75rem;
          align-items: flex-start;
          color: var(--gray300);
          font-family: Pretendard;
          font-size: 12.003px;
          font-style: normal;
          font-weight: 400;
          line-height: 160%;
        }
      }
    `,
  ];

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#idField')!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#pwField')!;
  }

  async fetchData() {
    const apiUrl = `${
      import.meta.env.VITE_PB_API
    }/collections/users/auth-with-password`;
    try {
      // const id = '123@naver.com;
      // const pw = '12345678';
      const id = this.idInput.value;
      const pw = this.pwInput.value;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identity: id, password: pw }),
      });

      const result = await response.json();
      console.log('서버 응답:', result);

      if (!response.ok) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }

      sessionStorage.setItem('authToken', result.token);

      Swal.fire({
        title: '로그인 성공!',
        text: '메인 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '닫기',
      }).then(() => {
        setTimeout(() => {
          location.href = '/index.html';
        }, 300);
      });
    } catch {
      Swal.fire({
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 올바르지 않습니다.',
        icon: 'error',
        confirmButtonText: '닫기',
      }).then(() => {
        this.idInput.value = '';
        this.pwInput.value = '';

        // this.idInput.focus()
      });
    }
  }

  handleLogin(e: Event) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return html`
      <div class="login">
        <div class="login-wrap">
          <h1 class="login-title">TVING ID 로그인</h1>
          <form>
            <div class="login__input">
              <label for="idField"></label>
              <input type="email" id="idField" placeholder="아이디(이메일)" />
            </div>
            <div class="login__input">
              <label for="pwField"></label>
              <input type="password" id="pwField" placeholder="비밀번호" />
            </div>
            <div class="login__state-checkbox">
              <input type="checkbox" id="loginState" name="state" />
              <label for="loginState" class="login-state-label">
                <span class="icon-check"></span>자동로그인
              </label>
            </div>
            <button
              @click=${this.handleLogin}
              type="submit"
              class="login__button"
            >
              로그인하기
            </button>
            <div class="login__find-acount-wrap">
              <a href="/">아이디 찾기</a>
              <hr />
              <a href="/">비밀번호 찾기</a>
            </div>
          </form>
          <div class="login__register-wrap">
            아직 계정이 없으신가요?
            <a class="login__register" href="/src/pages/register/">
              회원가입하기
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
