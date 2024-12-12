import { CSSResultGroup, LitElement } from 'lit';
import resetCSS from '../styles/resetCSS';
import fontsCSS from '../styles/fontsCSS';
import baseCSS from '../styles/baseCSS';
import styleCSS from '../styles/styleCSS';

export class taingElement extends LitElement {
  static styles: CSSResultGroup = [resetCSS, fontsCSS, baseCSS, styleCSS];
}
