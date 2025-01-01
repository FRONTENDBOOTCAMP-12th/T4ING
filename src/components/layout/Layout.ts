import { html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import './Header';
import './Footer';
import { Panorama } from './../landing/LandingPanorama';

@customElement('t-layout')
export class Layout extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
        display: flex;
        flex-flow: column nowrap;
        height: inherit;
      }
      t-header + div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }

      .has-padding {
        --padding-top: 2.375rem;

        @media (min-width: 48rem) {
          --padding-top: 3.5rem;
        }

        @media (min-width: 120rem) {
          --padding-top: 6.25rem;
        }
        padding-top: var(--padding-top);
      }
    `,
  ];

  constructor() {
    super();

    this.metaOg();
  }

  metaOg() {
    const head = document.querySelector('head') as HTMLHeadElement;
    const metaTag = `
      <meta name="author" content="TAING">
      <meta name="description" content="멋쟁이 사자처럼 태킷 프론트엔드 스쿨 12기 바닐라 프로젝트 4조 4인머스캣의 바닐라 프로젝트 웹사이트.">
      <meta name="keywords" content="멋쟁이 사자처럼, 프론트엔드 스쿨">
      <meta property="og:site_name" content="TAING">
      <meta property="og:type" content="website">
      <meta property="og:title" content="TAING">
      <meta property="og:description" content="멋쟁이 사자처럼 태킷 프론트엔드 스쿨 12기 바닐라 프로젝트 4조 4인머스캣의 바닐라 프로젝트 웹사이트.">
      <meta property="og:image" content="/assets/images/og.png">
      <meta property="og:image:width" content="800">
      <meta property="og:image:height" content="400">
      <meta property="og:url" content="https://t4ing.vercel.app">
      <meta property="og:locale" content="ko_KR">
    `;

    head.insertAdjacentHTML('afterbegin', metaTag);
  }

  render() {
    return html`
      <t-header></t-header>
      <div class=${this.dataset.padding === 'yes' ? 'has-padding' : ''}>
        <slot></slot>
      </div>
      <t-footer></t-footer>
    `;
  }
}
