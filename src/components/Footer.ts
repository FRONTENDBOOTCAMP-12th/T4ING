import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { taingElement } from './Taing';
import './Sns';

@customElement('taing-footer')
class Footer extends taingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
        --footer-padding: 3.25rem 1rem 5.125rem;
        margin-top: auto;
        padding: var(--footer-padding);

        @media (min-width: 48rem) {
          --footer-padding: 4.375rem 2.5rem 6.25rem;
        }
        @media (min-width: 120rem) {
          --footer-padding: 8.75rem 4.25rem 10.625rem;
        }
      }

      .footer {
        position: relative;
        font-size: var(--text-size-s);
        line-height: 1.1875rem;
        color: var(--gray500);
        transition: 0.3s;

        .notice {
          padding-block-end: 1.625rem;

          .notice__title {
            color: var(--gray200);
          }
        }

        .link-list {
          position: absolute;
          inset-inline-end: 0;
          inset-block-start: 0;

          button {
            border: none;
            background-color: initial;
            font-size: inherit;
            line-height: inherit;
            color: var(--gray200);
            vertical-align: top;
            appearance: none;
            cursor: pointer;

            &:after {
              margin-inline-start: var(--size-4);
              content: '+';
            }
          }
        }

        .footer__corp-menu {
          padding-block: var(--size-2);
          border-block-start: 1px solid var(--dark-bg-2);
        }

        @media (min-width: 48rem) {
          .notice {
            padding-block-end: var(--size-4);
          }

          .link-list {
            display: flex;
          }

          .footer__corp-menu {
            display: flex;
            column-gap: var(--size-5);
            padding-block: var(--size-4) var(--size-3);
          }
        }
        @media (min-width: 120rem) {
          font-size: var(--text-size-l);
          line-height: 2.125rem;

          .footer__corp-menu {
            column-gap: var(--size-9);
            padding-block: 1.625rem var(--size-6);
          }
        }
      }
    `,
  ];

  corpMenu = [
    { corpName: '고객센터', url: '/' },
    { corpName: '이용약관', url: '/' },
    { corpName: '개인정보처리방침', url: '/' },
    { corpName: '청소년', url: '/' },
    { corpName: '이벤트', url: '/' },
    { corpName: '인재채용', url: '/' },
  ];

  render() {
    return html`
      <footer id="footer" class="footer">
        <div class="notice">
          <span>공지사항</span>
          <a href="/" class="notice__title"
            >[안내] 합병보고 주주총회에 갈음하는 공고</a
          >
        </div>

        <aside class="link-list mobile-hidden">
          <div class="link-list__item">
            <button type="button" class="link-list__button">
              브랜드 바로가기
            </button>
          </div>
          <div class="link-list__item">
            <button type="button" class="link-list__button">
              그룹 계열사 바로가기
            </button>
          </div>
        </aside>

        <ul class="footer__corp-menu">
          ${this.corpMenu.map(
            ({ corpName, url }) =>
              html`<li><a href="${url}">${corpName}</a></li>`
          )}
        </ul>
        <address class="footer__info mobile-hidden">
          <ul>
            <li>
              <span class="footer__info-title">대표이사</span>
              <span>YANG JIEUL</span>
              <a
                href="/"
                title="사업자정보 새창으로 이동합니다."
                class="line"
                target="_blank"
                rel="noopener noreferrer"
                >사업자정보확인</a
              >
              <span class="footer__info-title">사업자등록번호</span>
              <span>188-88-01893</span>
              <span class="footer__info-title">통신판매신고번호</span>
              <span>2020-서울마포-3641호</span>
            </li>
            <li>
              <span class="footer__info-title">사업장</span>
              <span
                >서울특별시 마포구 상암산로 34, DMC디지털큐브 15층(상암동)</span
              >
              <span class="">호스팅사업자</span>
              <span>씨제이올리브네트웍스(주)</span>
            </li>
            <li>
              <a href="/">고객문의 바로가기</a>
              <span class="footer__info-title">대표메일</span>
              <a href="mailto:tving@cj.net">tving@cj.net</a>
              <span class="footer__info-title">고객센터</span>
              <span
                ><a href="tel:821670-1525">1670-1525</a> (평일/주말 09시~18시,
                공휴일 휴무)</span
              >
            </li>
            <li>
              <span class="footer__info-title"
                >ENM 시청자 상담실 (편성 문의 및 시청자 의견)</span
              >
              <span><a href="tel:8280-080-0780">080-080-0780</a></span>
              <span class="">Mnet 고객센터(반송편성문의)</span>
              <span><a href="tel:1855-1631">1855-1631</a></span>
            </li>
          </ul>
        </address>
        <sns-group></sns-group>
        <span class="copyright"
          >Copyright &copy; 주식회사 타잉 All right reserved.</span
        >
      </footer>
    `;
  }
}
