import { CSSResultGroup, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('svg-icon')
class svgIcon extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
        position: relative;
        vertical-align: middle;
      }

      svg {
        transition: 0.3s;

        &.center {
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
        }
      }
    `,
  ];

  @property({ type: Number }) width = 18;
  @property({ type: Number }) height = 18;
  @state() device = '';

  svgId: string | null = '';
  size: number[][] = [];
  centered: boolean = false;
  svgDevice: string = '';

  connectedCallback() {
    super.connectedCallback();

    this.svgId = this.getAttribute('svg-id');
    this.centered = Boolean(this.getAttribute('centered'));
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
        class=${this.centered ? 'center' : nothing}
      >
        <use
          href="/assets/images/icon/sprite/_sprite.svg#${this.svgId}_${this
            .svgDevice}"
        />
      </svg>
    `;
  }
}
