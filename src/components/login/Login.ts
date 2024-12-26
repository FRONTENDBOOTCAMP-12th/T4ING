import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import loginCSS from '../../styles/loginCSS';
import Swal from 'sweetalert2';
import { isValidId, isValidPw } from '../../utils/validationUtils';
import '../Form';
import '../Button';
import './LoginCheckbox';

@customElement('login-page')
class Login extends TaingElement {
  static styles: CSSResultGroup = [super.styles, loginCSS];
  @property({ type: Boolean }) autoLogin = false;

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#idField')!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#pwField')!;
  }

  get autoLoginInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#loginState')!;
  }

  async fetchData() {
    const apiUrl = `${
      import.meta.env.VITE_PB_API
    }/collections/users/auth-with-password`;
    const id = this.idInput.value;
    const pw = this.pwInput.value;
    if (!isValidId(id)) {
      throw new Error('아이디 형식이 올바르지 않습니다');
    }
    if (!isValidPw(pw)) {
      throw new Error('비밀번호 형식이 올바르지 않습니다.');
    }

    try {
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

      const token = result.token;

      if (this.autoLogin) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      Swal.fire({
        title: '로그인 성공!',
        text: '메인 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '닫기',
      }).then(() => {
        setTimeout(() => {
          location.href = '/src/pages/profile/';
        }, 300);
      });
    } catch {
      Swal.fire({
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 올바르지 않습니다.',
        icon: 'error',
        confirmButtonText: '닫기',
      }).then(() => {
        this.idInput.handleResetValue();
        this.pwInput.handleResetValue();
      });
    }
  }

  handleLogin(e: Event) {
    e.preventDefault();
    this.fetchData();
  }
  handleCheckboxChange(e: any) {
    this.autoLogin = e.detail.checked;
  }

  render() {
    return html`
      <div class="login-container">
        <div class="login-wrap">
          <h1 class="login__title">TVING ID 로그인</h1>
          <form>
            <div class="login__input-wrap">
              <t-input id="idField">
                <label slot="label">아이디</label>
              </t-input>
              <t-input id="pwField" type="password">
                <label slot="label">비밀번호</label>
              </t-input>
            </div>

            <login-checkbox
              id="loginState"
              .checked=${this.autoLogin}
              @change=${this.handleCheckboxChange}
            >
              자동로그인
            </login-checkbox>
            <t-button @click=${this.handleLogin} color="primary">
              로그인하기
            </t-button>
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
