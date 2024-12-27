import { customElement, property } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { html, css, CSSResultGroup } from 'lit';
import { Banner } from './LandingBanner';
import { Slide } from './LandingSlide';
import { Panorama } from './LandingPanorama';
import { Welcome } from './LandingWelcome';
import { checkLogin, isLogin } from '../../utils/authUtils';

@customElement('landing-page')
export class LandingPage extends TaingElement {
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) device: string = 'mobile';
  @property({ type: Array }) slides: Array<{ img: string; title: string }> = [];

  static styles: CSSResultGroup = [super.styles];

  connectedCallback(): void {
    super.connectedCallback();
    if (isLogin()) {
      location.href = '/src/pages/main/';
    }
    this.device = super.getDevice;
    this.apiUrl = import.meta.env.VITE_PB_API || '';
  }

  render() {
    return html`
      <div class="landing-page">
        <landing-Banner
          .apiUrl="${this.apiUrl}"
          .device="${this.device}"
        ></landing-Banner>

        <landing-Slide
          .apiUrl="${this.apiUrl}"
          .device="${this.device}"
        ></landing-Slide>

        <landing-Panorama
          .apiUrl="${this.apiUrl}"
          .device="${this.device}"
        ></landing-Panorama>

        <landing-Welcome .apiUrl="${this.apiUrl}"></landing-Welcome>
      </div>
    `;
  }
}
