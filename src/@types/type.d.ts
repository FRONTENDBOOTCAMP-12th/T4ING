export interface MainData {
  items: Item[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

/* 메인 페이지 배너 */
export interface BannerItem {
  cast: string;
  category: string;
  collectionId: BannerCollectionID;
  collectionName: BannerCollectionName;
  created: Date;
  description: BannerDescription;
  device: Device;
  genre: string;
  id: string;
  img: string;
  title: BannerTitle;
  updated: Date;
}

export enum BannerCollectionID {
  Pbc7349125 = 'pbc_7349125',
}

export enum BannerCollectionName {
  MainBanner = 'main_banner',
}

export enum BannerDescription {
  인생2회차를사는판타지드라마 = '인생 2회차를 사는 판타지 드라마',
}

export enum BannerTitle {
  재벌집막내아들 = '재벌집 막내아들',
}

/* 메인 페이지 추천 콘텐츠 */
export interface RecommendItem {
  cast: string;
  category: string;
  collectionId: RecommendCollectionID;
  collectionName: RecommendCollectionName;
  created: Date;
  device: Device;
  genre: string;
  id: string;
  img: string;
  title: string;
  updated: Date;
}

export enum RecommendCollectionID {
  Pbc3198651770 = 'pbc_3198651770',
}

export enum RecommendCollectionName {
  MainRecommend = 'main_recommend',
}

/* 메인 페이지 공통 */
export enum Device {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet',
}
