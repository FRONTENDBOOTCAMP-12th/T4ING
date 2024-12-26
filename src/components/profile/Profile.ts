import { CSSResultGroup, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { UserProfile } from '../../@types/type';
import { requestUrl, getPbImageURL } from '../../utils/request';
import { checkLogin, getUserId, getTokenHeader } from '../../utils/authUtils';
import gsap from 'gsap';
import '../Button';
import '../SvgIcon';

@customElement('t-profile')
class Profile extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      .section-profile {
        --margin: var(--size-8) var(--size-8);
        --padding: 4.5rem 2.125rem 0;
        --grid-columns: repeat(2, 114px);
        --gap: calc(var(--size-6) + var(--nickname-height)) var(--size-6);
        --nickname-height: var(--size-5);
        --btn-inline-size: 8.4375rem;
        --caption-margin: var(--size-3);
        --caption-font-size: var(--text-size-s);
        padding: var(--padding);
        text-align: center;

        .profile-list {
          margin-block: var(--margin);
          display: inline-grid;
          grid-template-columns: var(--grid-columns);
          gap: var(--gap);
          transition: 0.3s;
        }

        .profile-list__item {
          position: relative;
        }

        .profile-list__nickname {
          position: absolute;
          inset-inline-start: 0;
          inset-block-start: 100%;
          inline-size: 100%;
          margin-block-start: var(--caption-margin);
          padding: 0;
          border: 0;
          background: initial;
          font-size: var(--caption-font-size);
          font-weight: 400;
          line-height: 1.6;
          color: inherit;
          text-align: center;
          transition: 0.3s;
        }

        .profile-list__img {
          img {
            border-radius: var(--round-xs);
          }
        }

        .profile-list__btn {
          position: absolute;
          inset: 0;
          padding: 0;
          border: none;
          background-color: initial;
          cursor: pointer;

          &.select {
            &:before {
              position: absolute;
              inset: 0;
              background-color: #00000050;
              content: '';
            }
          }

          svg-icon {
            position: absolute;
            inset-inline-start: 50%;
            inset-block-start: 50%;
            translate: -50% -50%;
          }
        }

        t-button {
          padding-block-start: var(--nickname-height);
          max-width: var(--btn-inline-size);
        }

        @media (min-width: 48rem) {
          --margin: var(--size-7) var(--size-11);
          --padding: 4.625rem 2.5rem 0;
          --grid-columns: repeat(4, 132px);
          --gap: var(--size-8);

          --btn-inline-size: 9.75rem;
        }
        @media (min-width: 120rem) {
          --margin: var(--size-11) 4.125rem;
          --padding-block: 8.125rem 4.25rem 0;
          --grid-columns: repeat(4, 234px);
          --gap: 3.25rem;
          --nickname-height: var(--size-11);
          --btn-inline-size: 17rem;
          --caption-margin: var(--size-4);
          --caption-font-size: var(--text-size-xl);
        }
      }

      .section-title {
        --row-gap: var(--size-4);
        --h-font-size: var(--text-size-m);
        --desc-font-size: var(--text-size-s);
        text-align: center;

        .section-title__h {
          font-size: var(--h-font-size);
          line-height: 1.4;
          font-weight: 700;
          color: var(--white);
          transition: 0.3s;
        }
        .section-title__desc {
          margin-block-start: var(--row-gap);
          font-size: var(--desc-font-size);
          line-height: 1.5;
          color: var(--gray200);
          transition: 0.3s;
        }

        @media (min-width: 48rem) {
          --row-gap: var(--size-2);
          --h-font-size: var(--text-size-xl);
          --desc-font-size: var(--text-size-m);
        }
        @media (min-width: 120rem) {
          --row-gap: var(--size-5);
          --h-font-size: var(--text-size-3xl);
          --desc-font-size: var(--text-size-xl);
        }
      }
    `,
  ];

  @property({ type: Array }) data: UserProfile[] = [];
  @state() isEdit = false;

  connectedCallback() {
    super.connectedCallback();

    checkLogin();
    this.dataFetch();
  }

  handleEdit() {
    this.isEdit = !this.isEdit;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    const item = this.renderRoot.querySelectorAll('.profile-list__item');
    const tButton = this.renderRoot.querySelector('t-button');

    if (item.length && !this.isEdit) {
      gsap.from([item, tButton], {
        y: 20,
        opacity: 0,
        stagger: 0.15,
      });
    }
  }

  async dataFetch() {
    try {
      const response = await fetch(
        requestUrl('users_profile', `?filter=account='${getUserId()}'`)
      );
      const data = await response.json();

      if (response.ok) {
        this.data = Array(4)
          .fill(undefined)
          .map(
            (_, i) =>
              data.items[i] || {
                name: '타잉',
                src: '/assets/images/profile/default.webp',
              }
          );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async handleSelectProfile(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    const id = target.closest('li')?.id || 'default';

    console.log(getTokenHeader());
    try {
      console.log(getUserId());
      const response = await fetch(requestUrl('users', `/${getUserId()}`), {
        method: 'PATCH',
        headers: getTokenHeader(),
        body: JSON.stringify({ profile: id }),
      });

      if (response.ok) {
        location.href = '/src/pages/main/';
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return html`<section class="section-profile">
      <hgroup class="section-title">
        <h2 class="section-title__h">프로필 선택</h2>
        <p class="section-title__desc">
          ${this.isEdit ? '편집' : '시청'}할 프로필을 선택해주세요.
        </p>
      </hgroup>

      <form>
        <ul class="profile-list">
          ${this.data.map((profile) => {
            return html`
              <li class="profile-list__item" id=${profile.id || ''}>
                <figure class="profile-list__img">
                  <img
                    src="${profile.avatar
                      ? getPbImageURL(profile)
                      : profile.src}"
                    alt="${profile.name}"
                  />
                  ${this.isEdit
                    ? html`<input
                        type="text"
                        class="profile-list__nickname"
                        value=${profile.name}
                        maxlength="8"
                      />`
                    : html`<figcaption class="profile-list__nickname">
                        ${profile.name}
                      </figcaption>`}
                </figure>
                ${this.isEdit
                  ? html`<button type="button" class="profile-list__btn">
                      <svg-icon
                        svg-id="edit"
                        .size=${[[50], , [60]]}
                      ></svg-icon>
                      <span class="sr-only">프로필 편집</span>
                    </button>`
                  : html`<a
                      href="/src/pages/main/"
                      class="profile-list__btn select"
                      @click=${this.handleSelectProfile}
                    >
                      <svg-icon
                        svg-id="lock"
                        .size=${[[50], , [60]]}
                      ></svg-icon>
                      <span class="sr-only">프로필 선택</span>
                    </a>`}
              </li>
            `;
          })}
        </ul>
        ${this.isEdit
          ? html`<t-button
              type="submit"
              color="secondary"
              size="size-s"
              @click=${this.handleEdit}
              >완료</t-button
            >`
          : this.data.length
            ? html`<t-button
                color="line"
                size="size-s"
                @click=${this.handleEdit}
                ><span>프로필 편집</span></t-button
              >`
            : ''}
      </form>
    </section>`;
  }
}
