import { html, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import loginCSS from '../styles/loginCSS';
import Swal from 'sweetalert2';
import { taingElement } from './Taing';

@customElement('login-element')
class Login extends taingElement {
  static styles: CSSResultGroup = [super.styles, loginCSS];

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#idField')!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#pwField')!;
  }

  get rememberMeInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#loginState')!;
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
              <input type="email" id="idField" placeholder="아이디" />
            </div>
            <div class="login__input">
              <label for="pwField"></label>
              <input type="password" id="pwField" placeholder="비밀번호" />
            </div>
            <div class="login__state-checkbox-wrap">
              <input
                type="checkbox"
                class="login__state-checkbox"
                id="loginState"
                name="state"
              />
              <label for="loginState" class="login__state-label">
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
