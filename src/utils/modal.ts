import { TaingElement } from '../components/Taing';

export function openModal(this: TaingElement, target: string) {
  (this.renderRoot.querySelector(target) as HTMLDivElement).hidden = false;
}
