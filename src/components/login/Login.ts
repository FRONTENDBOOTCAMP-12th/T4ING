import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import loginCSS from '../../styles/loginCSS';
import { isValidId, isValidPw } from '../../utils/validationUtils';
import { debounce } from '../../utils/debounce';
import { isLogin } from '../../utils/authUtils';
import '../Form';
import '../Button';
import '../Modal';
import './LoginCheckbox';
import './LoginModal';

interface CustomInputElement extends HTMLInputElement {
  handleResetValue: () => void;
}

@customElement('login-page')
class Login extends TaingElement {
  static styles: CSSResultGroup = [super.styles, loginCSS];
  @property({ type: Boolean }) autoLogin = false;
  @property({ type: String }) errorMessage = '';

  connectedCallback() {
    if (isLogin()) {
      location.href = '/src/pages/main/';
    }
    super.connectedCallback();
  }

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>(
      '#idField'
    )! as CustomInputElement;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>(
      '#pwField'
    )! as CustomInputElement;
  }

  get autoLoginInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#loginState')!;
  }

  get modal() {
    return this.renderRoot.querySelector<HTMLInputElement>('#loginModal')!;
  }

  async fetchData() {
    const apiUrl = `${
      import.meta.env.VITE_PB_API
    }/collections/users/auth-with-password`;
    const id = this.idInput.value;
    const pw = this.pwInput.value;

    try {
      if (!isValidId(id)) {
        this.errorMessage = '아이디 형식이 올바르지 않습니다';
        throw new Error();
      }
      if (!isValidPw(pw)) {
        this.errorMessage = '비밀번호 형식이 올바르지 않습니다.';
        throw new Error();
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identity: id, password: pw }),
      });

      const result = await response.json();

      if (!response.ok) {
        this.errorMessage = '아이디 또는 비밀번호가 올바르지 않습니다.';
        throw new Error();
      }

      const token = result.token;

      if (this.autoLogin) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
      location.href = '/src/pages/profile/';
    } catch {
      this.handleLoginFail();
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.fetchData();
  }

  debouncedSubmit = debounce((e: Event) => this.handleSubmit(e), 200);

  handleCheckboxChange(e: any) {
    this.autoLogin = e.detail.checked;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.debouncedSubmit(e);
    }
  }

  handleLoginFail() {
    this.modal.hidden = false;
    this.idInput.handleResetValue();
    this.pwInput.handleResetValue();
  }

  render() {
    return html`
      <div class="login-container">
        <login-modal id="loginModal"
          ><div>${this.errorMessage}</div></login-modal
        >
        <div class="login-wrap">
          <h1 class="login__title">TVING ID 로그인</h1>
          <form @keydown=${this.handleKeyDown} @submit=${this.debouncedSubmit}>
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
            <t-button buttonType="submit" color="primary">
              로그인하기
            </t-button>
            <div class="login__find-acount-wrap">
              <a href="/src/pages/findUser">아이디 찾기</a>
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
