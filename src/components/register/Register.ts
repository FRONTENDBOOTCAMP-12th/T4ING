import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import registerCSS from '../../styles/registerCSS';
import { isValidId, isValidPw } from '../../utils/validationUtils';
import { debounce } from '../../utils/debounce';
import { isLogin } from '../../utils/authUtils';
import '../Form';
import '../Button';
import '../Modal';
import '../Checkbox';
import '../login/LoginCheckbox';

interface InputChangeEventDetail {
  value: string;
}

type InputChangeEvent = CustomEvent<InputChangeEventDetail>;

interface CheckboxChangeEvntDetail {
  checked: boolean;
}
type CheckboxChangeEvent = CustomEvent<CheckboxChangeEvntDetail>;

@customElement('register-page')
export class Register extends TaingElement {
  static styles: CSSResultGroup = [super.styles, registerCSS];
  @property({ type: Boolean }) isSubmitting = false;
  @property({ type: Boolean }) allValidPassed = false;
  @property({ type: Boolean }) agreeAll = false;
  @property({ type: Object }) valid = {
    idValid: false,
    pwValid: false,
    pwCheckValid: false,
  };
  @property({ type: Object }) requiredCheckList = {
    list1: false,
    list2: false,
    list3: false,
    list4: false,
  };
  @property({ type: Object }) optionalCheckList = {
    personalInfo: false,
    thirdPartyInfo: false,
    marketingEmail: false,
    marketingSMS: false,
  };
  @property({ type: Object }) payload = {
    userId: '',
    password: '',
    passwordConfirm: '',
    email: '',
  };
  @property({ type: String }) modalMessage = '';

  get agreeAllCheckbox() {
    return this.renderRoot.querySelector<HTMLInputElement>('#agreeAll')!;
  }

  get checkboxes() {
    return this.renderRoot.querySelectorAll<HTMLInputElement>(
      '.register__checkbox'
    )!;
  }

  get modal() {
    return this.renderRoot.querySelector<HTMLInputElement>('#registerModal')!;
  }

  async signUp() {
    this.isSubmitting = true;
    const apiUrl = `${import.meta.env.VITE_PB_API}/collections/users/records`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.modalMessage = errorData.message;
        throw new Error();
      }
      this.modalMessage = '회원가입이 완료되었습니다';
      await this.showModal();
    } catch {
      await this.showModal();
    } finally {
      this.isSubmitting = false;
      location.href = '/src/pages/login/';
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.signUp();
  }

  handleAgreeAll(e: CheckboxChangeEvent) {
    const isChecked = e.detail.checked;

    this.requiredCheckList = {
      ...this.requiredCheckList,
      list1: isChecked,
      list2: isChecked,
      list3: isChecked,
      list4: isChecked,
    };
    this.optionalCheckList = {
      ...this.optionalCheckList,
      personalInfo: isChecked,
      thirdPartyInfo: isChecked,
      marketingEmail: isChecked,
      marketingSMS: isChecked,
    };

    this.agreeAll = isChecked;

    this.requestUpdate();
    this.updateAllValidPassed();
  }

  handleRequiredChange(
    e: CheckboxChangeEvent,
    key: keyof typeof this.requiredCheckList
  ) {
    this.requiredCheckList[key] = e.detail.checked;
    this.updateAllValidPassed();
  }

  handleOptionalChange(
    e: CheckboxChangeEvent,
    key: keyof typeof this.optionalCheckList
  ) {
    this.optionalCheckList[key] = e.detail.checked;
  }

  handleIdInputChange(e: InputChangeEvent) {
    this.payload.userId = e.detail.value;
    this.valid.idValid = isValidId(e.detail.value);
    this.updateAllValidPassed();
  }

  handlePwInputChange(e: InputChangeEvent) {
    this.payload.password = e.detail.value;
    this.valid.pwValid = isValidPw(e.detail.value);
    this.updateAllValidPassed();
  }

  handlePwCheckInputChange(e: InputChangeEvent) {
    this.payload.passwordConfirm = e.detail.value;
    this.valid.pwCheckValid = this.payload.password === e.detail.value;
    this.updateAllValidPassed();
  }

  handleEmailInputChange(e: InputChangeEvent) {
    this.payload.email = e.detail.value;
    this.updateAllValidPassed();
  }

  updateAllValidPassed() {
    this.allValidPassed =
      Object.values(this.valid).every((value) => value) &&
      Object.values(this.requiredCheckList).every((list) => list);
  }

  async showModal(): Promise<void> {
    this.modal.hidden = false;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.modal.hidden = true;
        resolve();
      }, 2000);
    });
  }

  render() {
    if (isLogin()) {
      location.href = '/src/pages/main/';
    } else {
      return html`
        <div class="register-container">
          <t-modal id="registerModal">${this.modalMessage}</t-modal>
          <div class="register-wrap">
            <div class="register__title-wrap">
              <h1 class="register__title">타잉 회원가입</h1>
              <span>아이디와 이메일로 간편하게 타잉을 시작하세요!</span>
            </div>
            <form @submit=${this.handleSubmit}>
              <div class="register__input-container">
              <div class="register__input-wrap">
                <t-input
                  class="register__input"
                  id="idField"
                  @inputChange=${debounce(this.handleIdInputChange, 300)}
                >
                  <label slot="label">아이디</label>
                </t-input>
                <p>영문 또는 영문, 숫자 조합 6~12자리</p>
              </div>
              <div class="register__input-wrap">
                <t-input
                  class="register__input"
                  id="pwField"
                  type="password"
                  @inputChange=${debounce(this.handlePwInputChange, 300)}
                >
                  <label slot="label">비밀번호</label>
                </t-input>
                <p>영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리</p>
              </div>
              <t-input
                class="register__input"
                id="pwCheckField"
                type="password"
                @inputChange=${debounce(this.handlePwCheckInputChange, 300)}
              >
                <label slot="label">비밀번호</label>
              </t-input>
              <t-input
                class="register__input"
                id="emailField"
                type="email"
                @inputChange=${debounce(this.handleEmailInputChange, 300)}
              >
                <label slot="label">이메일</label>
              </t-input>
              </div>
              <login-checkbox class="register__checkbox-agreeAll" .checked=${
                this.agreeAll
              } @change=${this.handleAgreeAll}
                >모두 동의합니다</login-checkbox
              >
              <div class="register__checkbox-wrap">
                <t-checkbox class="register__checkbox" .checked=${
                  this.requiredCheckList.list1
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleRequiredChange(e, 'list1')}
                  >만 14세 이상입니다.</t-checkbox
                >
                <t-checkbox class="register__checkbox" .checked=${
                  this.requiredCheckList.list2
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleRequiredChange(e, 'list2')}
                  >[필수] 서비스 이용약관 동의
                </t-checkbox>
                <t-checkbox class="register__checkbox" .checked=${
                  this.requiredCheckList.list3
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleRequiredChange(e, 'list3')}
                  >[필수] 개인정보 수집 및 서비스 활용 동의</t-checkbox
                >
                <t-checkbox class="register__checkbox" .checked=${
                  this.requiredCheckList.list4
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleRequiredChange(e, 'list4')}
                  >[필수] 채널 홈페이지 개인정보 제 3자 제공동의</t-checkbox
                >
                <t-checkbox class="register__checkbox" .checked=${
                  this.optionalCheckList.personalInfo
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleOptionalChange(e, 'personalInfo')}
                  >[선택] 개인정보 제 3자 제공동의
                </t-checkbox>
                <t-checkbox class="register__checkbox" .checked=${
                  this.optionalCheckList.thirdPartyInfo
                } @change=${(e: CheckboxChangeEvent) =>
                  this.handleOptionalChange(e, 'thirdPartyInfo')}
                  >[선택] 개인정보 수집 및 서비스 활용 동의</t-checkbox
                >
                <div class="register__checkbox-marketing-wrap">
                  <t-checkbox class="register__checkbox" .checked=${
                    this.optionalCheckList.marketingSMS
                  } @change=${(e: CheckboxChangeEvent) =>
                    this.handleOptionalChange(e, 'marketingSMS')}
                    >[선택] 마케팅 정보 SMS 수신동의</t-checkbox
                  >
                  <t-checkbox class="register__checkbox" .checked=${
                    this.optionalCheckList.marketingEmail
                  } @change=${(e: CheckboxChangeEvent) =>
                    this.handleOptionalChange(e, 'marketingEmail')}
                  <t-checkbox class="register__checkbox" 
                    >[선택] 마케팅 정보 이메일 수신동의</t-checkbox
                  >
                </div>
              </div>
              <t-button
                buttonType="submit"
                color="primary"
                .disabled=${!this.allValidPassed || this.isSubmitting}
              >
                확인
              </t-button>
            </form>
          </div>
        </div>
      `;
    }
  }
}
