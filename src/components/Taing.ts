import { CSSResultGroup, LitElement } from 'lit';
import resetCSS from '../styles/resetCSS';
import styleCSS from '../styles/styleCSS';

export class TaingElement extends LitElement {
  static styles: CSSResultGroup = [resetCSS, styleCSS];
}
