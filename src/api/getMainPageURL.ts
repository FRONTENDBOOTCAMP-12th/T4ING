import { BannerItem, RecommendItem, TopItem, VODItem } from '../@types/type';

export function getBannerImageURL(item: BannerItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_banner/${item.id}/${
    item.img || 'default.jpg'
  }`;
}

export function getRecommendImageURL(item: RecommendItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_recommend/${item.id}/${
    item.img || 'default.jpg'
  }`;
}

export function getVODImageURL(item: VODItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_vod/${item.id}/${
    item.img || 'default.jpg'
  }`;
}

export function getTopImageURL(item: TopItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_top/${item.id}/${
    item.img || 'default.jpg'
  }`;
}
