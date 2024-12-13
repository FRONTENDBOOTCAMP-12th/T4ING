import { BannerItem } from '../@types/type';

export function getMainBannerImageURL(item: BannerItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_banner/${item.id}/${
    item.img || 'default.jpg'
  }`;
}
