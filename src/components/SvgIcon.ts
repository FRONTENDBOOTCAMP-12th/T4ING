import { CSSResultGroup, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('svg-icon')
class svgIcon extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
        position: absolute;
        inset-inline-start: 50%;
        inset-block-start: 50%;
        translate: -50% -50%;
      }

      svg {
        transition: 0.3s;
      }
    `,
  ];

  @property({ type: Number }) width = 18;
  @property({ type: Number }) height = 18;
  @state() device = '';

  svgId: string | null = '';
  size: number[][] = [];
  svgDevice: string = '';

  connectedCallback() {
    super.connectedCallback();

    this.svgId = this.getAttribute('svg-id');
    this.device = this.getDevice;
    this.setIconSize();

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  setIconSize() {
    const index =
      this.device === 'mobile' ? 0 : this.device === 'tablet' ? 1 : 2;

    [this.width, this.height] = this.size[index]
      ? this.size[index]
      : this.size[0];
    this.height ||= this.width;
    this.svgDevice = this.size[index] ? this.device : 'mobile';
  }

  handleResize() {
    this.device = super.getDevice;
    this.setIconSize();
  }

  render() {
    return html`
      <svg
        role="img"
        width=${this.width}
        height=${this.height}
        viewBox="0 0 ${this.width} ${this.height}"
      >
        <use
          href="/assets/images/icon/sprite/_sprite.svg#${this.svgId}_${this
            .svgDevice}"
        />
        <use href="/assets/images/icon/sprite/_sprite.svg#${this.svgId}" />
      </svg>
    `;
  }
}
