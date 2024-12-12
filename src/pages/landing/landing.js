import { getPbImageURL } from '/src/api/getPbImageURL';

async function renderSwiper() {
  const response = await fetch(
    `${import.meta.env.VITE_PB_API}/collections/landing_origin/records`
  );
  const data = (await response.json()).items;
  console.log(getPbImageURL);
  const slide = data
    .map(
      (item) => `
      <div class="swiper-slide">
        <img src="${getPbImageURL(item)}" alt="${item.contentName}">
      </div>
  `
    )
    .join('');

  const card = data.map(
    (item) => `
      <div class="card">
        <img src="${getPbImageURL(item)}" alt="${item.contentName}">
      </div>
    `
  );

  const tag = /*html */ `
  <div class="banner">
        <h2>티빙 오리지널 콘텐츠, 방송, 영화, 해외 시리즈까지!</h2>
        <p>재미를 플레이해보세요.</p>
        <a href="/">새로워진 티빙을 만나보세요!</a>
      </div>

      <div class="section">
        <h2>티빙에만 있는 재미</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            ${slide}
          <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>내가 찾던 재미</h2>
        ${card}
      </div>
      `;
  document.body.insertAdjacentHTML('beforeend', tag);

  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
  });
}
renderSwiper();
