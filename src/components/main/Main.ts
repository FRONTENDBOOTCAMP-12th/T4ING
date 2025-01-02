import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaingElement } from '../Taing';
import { isLogin } from '../../utils/authUtils';
import '../../components/main/MainModal';
import '../../components/main/MainBanner';
import '../../components/main/MainRecommend';
import '../../components/main/MainVOD';
import '../../components/main/MainTop';
import '../../components/main/MainLiveChannel';
import '../../components/main/MainToriginal';
import '../../components/main/MainBottomBanner';
import '../../components/main/MainEventBanner';

@customElement('main-page')
class Main extends TaingElement {
  render() {
    if (!isLogin()) {
      location.href = '/src/pages/landing/';
    } else {
      return html`
        <div
          class="home-container"
          style="display: flex; flex-flow: column; gap: 4rem"
        >
          <main-banner></main-banner>
          <main-recommend></main-recommend>
          <main-vod></main-vod>
          <main-top></main-top>
          <main-live-channel></main-live-channel>
          <main-t-original></main-t-original>
          <main-bottom-banner></main-bottom-banner>
          <main-event-banner></main-event-banner>
        </div>
      `;
    }
  }
}
