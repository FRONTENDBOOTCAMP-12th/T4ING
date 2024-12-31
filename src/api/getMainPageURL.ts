import {
  TopItem,
  VODItem,
  BannerItem,
  RecommendItem,
  ToriginalItem,
  EventBannerItem,
  LiveChannelItem,
  BottomBannerItem,
} from '../@types/type';

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

export function getLiveChannelImageURL(item: LiveChannelItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_live_channel/${item.id}/${
    item.img || 'default.jpg'
  }`;
}

export function getToriginalImageURL(item: ToriginalItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_t_original/${item.id}/${
    item.img || 'default.jpg'
  }`;
}

export function getBottomBannerImageURL(item: BottomBannerItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_bottom_banner/${item.id}/${
    item.img || 'default.jpg'
  }`;
}
export function getEventBannerImageURL(item: EventBannerItem) {
  return `${import.meta.env.VITE_PB_API}/files/main_event_banner/${item.id}/${
    item.img || 'default.jpg'
  }`;
}
