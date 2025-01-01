import { html, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import registerCSS from '../../styles/registerCSS';
import {
  isValidId,
  isValidPw,
  isValidEmail,
} from '../../utils/validationUtils';
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

interface CheckboxElement extends HTMLInputElement {
  checked: boolean;
}

@customElement('register-page')
export class Register extends TaingElement {
  static styles: CSSResultGroup = [super.styles, registerCSS];
  @property({ type: Boolean }) isSubmitting = false;
  @property({ type: Boolean }) allValidPassed = false;
  @property({ type: Boolean }) agreeAll = false;
  @property({ type: Object }) valid = {
    idValid: false,
    pwValid: false,
    pwConfirmValid: false,
    emailValid: false,
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
  @property({ type: String }) idHint = '영문 또는 영문, 숫자 조합 6~12자리';
  @property({ type: String }) pwHint =
    '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리';
  @property({ type: String }) pwConfirmHint = '';
  @property({ type: String }) emailHint = '';
  @property({ type: String }) modalMessage = '';

  get agreeAllCheckbox() {
    return this.renderRoot.querySelector<HTMLInputElement>(
      '.register__checkbox-agreeAll'
    )!;
  }

  get modal() {
    return this.renderRoot.querySelector<HTMLInputElement>('#registerModal')!;
  }

  getInputElement(id: string) {
    return this.renderRoot.querySelector<HTMLInputElement>(`#${id}`)!;
  }

  async signUp() {
    this.isSubmitting = true;
    const apiUrl = `${import.meta.env.VITE_PB_API}/collections/users/records`;
    const payload = Object.assign(this.payload, this.optionalCheckList);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.modalMessage = errorData.message;
        throw new Error();
      }
      this.modalMessage = '회원가입이 완료되었습니다';
      this.showModal();
    } catch {
      this.showModal();
    } finally {
      this.isSubmitting = false;
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
    this.updateAgreeAllCheckbox();
  }

  handleOptionalChange(
    e: CheckboxChangeEvent,
    key: keyof typeof this.optionalCheckList
  ) {
    this.optionalCheckList[key] = e.detail.checked;
    this.updateAgreeAllCheckbox();
  }

  handleIdInputChange(e: InputChangeEvent) {
    const value = e.detail.value;
    const isValid = isValidId(value);

    this.payload.userId = value;
    this.valid.idValid = isValid;
    this.idHint = !value
      ? '영문 또는 영문, 숫자 조합 6~12자리'
      : isValid
        ? '사용 가능한 아이디입니다.'
        : '영문 또는 영문, 숫자 조합 6~12자리로 입력해주세요';
    this.updateAllValidPassed();
  }

  handlePwInputChange(e: InputChangeEvent) {
    const value = e.detail.value;
    const isValid = isValidPw(value);

    this.payload.password = value;
    this.valid.pwValid = isValid;
    this.pwHint = !value
      ? '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리'
      : isValid
        ? '사용 가능한 비밀번호입니다.'
        : '영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리로 입력해주세요';
    this.updateAllValidPassed();
  }

  handlePwConfirmInputChange(e: InputChangeEvent) {
    const value = e.detail.value;
    const isMatch = this.payload.password === value;

    this.payload.passwordConfirm = value;
    this.valid.pwConfirmValid = isMatch;
    this.pwConfirmHint = !value
      ? ''
      : isMatch
        ? ''
        : '비밀번호가 일치하지 않습니다.';
    this.updateAllValidPassed();
  }

  handleEmailInputChange(e: InputChangeEvent) {
    const value = e.detail.value;
    const isValid = isValidEmail(value);

    this.payload.email = value;
    this.valid.emailValid = isValid;
    this.emailHint = !value
      ? ''
      : isValid
        ? ''
        : '이메일 형식이 올바르지 않습니다.';
    this.updateAllValidPassed();
  }

  updateAllValidPassed() {
    this.allValidPassed =
      Object.values(this.valid).every((value) => value) &&
      Object.values(this.requiredCheckList).every((list) => list);
  }

  updateAgreeAllCheckbox() {
    if (
      Object.values(this.optionalCheckList).every((value) => value) &&
      Object.values(this.requiredCheckList).every((list) => list)
    ) {
      this.agreeAllCheckbox.checked = true;
    } else {
      this.agreeAllCheckbox.checked = false;
    }
  }

  showModal() {
    this.modal.hidden = false;
  }

  handleModalConfirm() {
    location.href = '/src/pages/login/';
  }
  render() {
    if (isLogin()) {
      location.href = '/src/pages/main/';
    } else {
      return html`
        <div class="register-container">
          <t-modal id="registerModal" @modalConfirm=${
            this.handleModalConfirm
          }>${this.modalMessage}</t-modal>
          <div class="register-wrap">
            <div class="register__title-wrap">
              <h1 class="register__title">타잉 회원가입</h1>
              <span>아이디와 이메일로 간편하게 타잉을 시작하세요!</span>
            </div>
            <form @submit=${this.handleSubmit}>
              <div class="register__input-container">
                <t-input
                  class="register__input"
                  id="idField"
                  @inputChange=${debounce(this.handleIdInputChange, 300)}
                >
                  <label slot="label">아이디</label>
                  <p slot="hint" class=${
                    this.payload.userId && !this.valid.idValid ? 'inValid' : ''
                  }>${this.idHint}</p>
                </t-input>
                <t-input
                  class="register__input"
                  id="pwField"
                  type="password"
                  @inputChange=${debounce(this.handlePwInputChange, 300)}
                >
                  <label slot="label">비밀번호</label>
                  <p slot="hint" class=${
                    this.payload.password && !this.valid.pwValid
                      ? 'inValid'
                      : ''
                  }>${this.pwHint}</p>
                </t-input>
                
              <t-input
                class="register__input"
                id="pwConfirmField"
                type="password"
                @inputChange=${debounce(this.handlePwConfirmInputChange, 300)}
              >
                <label slot="label">비밀번호</label>
                <p slot="hint" class=${
                  this.payload.passwordConfirm && !this.valid.pwConfirmValid
                    ? 'inValid'
                    : ''
                }>${this.pwConfirmHint}</p>
              </t-input>
              <t-input
                class="register__input"
                id="emailField"
                type="email"
                @inputChange=${debounce(this.handleEmailInputChange, 300)}
              >
                <label slot="label">이메일</label>
                <p slot="hint" class=${
                  this.payload.email && !this.valid.emailValid ? 'inValid' : ''
                }>${this.emailHint}</p>
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
