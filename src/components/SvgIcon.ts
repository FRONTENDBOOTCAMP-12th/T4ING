import { CSSResultGroup, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TaingElement } from './Taing';

@customElement('svg-icon')
class SvgIcon extends TaingElement {
  static styles: CSSResultGroup = [
    super.styles,
    css`
      :host {
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

  @property({
    hasChanged(newVal: string, oldVal: string) {
      return newVal !== oldVal;
    },
  })
  device: string = '';

  width: number = 18;
  height: number = 18;
  svgId: string | null = '';
  size: Array<number[] | null> = [];
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
    const size = this.size[index] ?? this.size[0] ?? [18, 18];
    [this.width, this.height] = size;
    this.height ||= this.width;
    this.svgDevice = this.size[index] ? this.device : 'mobile';

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

  handleResize() {
    this.device = super.getDevice;
  }

  render() {
    return this.setIconSize();
  }
}
