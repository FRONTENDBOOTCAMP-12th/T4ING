export interface DefaultResponseData {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface DefaultCollectionField {
  id: string;
  collectionId: BannerCollectionID;
  collectionName: BannerCollectionName;
  created: Date;
  updated: Date;
}

/* 메인 페이지 배너 */
export interface BannerItem extends RecommendItem {
  title: BannerTitle;
  description: BannerDescription;
}

/* 메인 페이지 추천 콘텐츠 */
export interface RecommendItem extends DefaultResponseData {
  id: string;
  age: number;
  cast: string;
  category: string;
  device: Device;
  genre: string;
  img: string;
  original: boolean;
  title: string;
}
export interface VODItem extends DefaultResponseData {
  id: string;
  cast: string;
  category: string;
  device: Device;
  ep: number;
  genre: string;
  img: string;
  title: string;
}
export interface TopItem extends DefaultResponseData {
  id: string;
  age: number;
  cast: string;
  category: string;
  device: Device;
  genre: string;
  img: string;
  new_ep: boolean;
  original: boolean;
  title: string;
  views: number;
}
export interface LiveChannelItem extends DefaultResponseData {
  id: string;
  channel: string;
  device: Device;
  img: string;
  progress: number;
  ranking: number;
  title: string;
}
export interface ToriginalItem extends DefaultResponseData {
  id: string;
  device: Device;
  img: string;
  title: string;
}
export interface BottomBannerItem extends DefaultResponseData {
  id: string;
  device: Device;
  img: string;
  description: string;
}
export interface EventBannerItem extends DefaultResponseData {
  id: string;
  device: Device;
  img: string;
  description: string;
}

export interface MainData extends DefaultResponseData {
  items: Item[];
}

export enum Device {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet',
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

export enum RecommendCollectionID {
  Pbc3198651770 = 'pbc_3198651770',
}

export enum RecommendCollectionName {
  MainRecommend = 'main_recommend',
}

export interface ProfileDataList extends DefaultResponseData {
  items: ProfileImages[];
}

export interface PopupCollection extends RecommendItem {
  items: PopupImage[];
}

export interface ProfileImages extends DefaultCollectionField {
  avatar: string;
  alt: string;
  [key?: string]: string;
}

export interface PopupImage extends DefaultCollectionField {
  image: string;
  alt: string;
  [key?: string]: string;
}

export interface UserProfile extends DefaultCollectionField {
  account: string;
  name: string;
  avatar?: string | null;
  index: number;
  [key?: string]: string;
}

export interface KeywordArray {
  id: number;
  keyword: string;
}

export interface LandingMain extends DefaultResponseData {
  items: LandingItem[];
}

export interface LandingItem extends DefaultCollectionField {
  cast: string;
  category: string;
  device: string;
  genre: string;
  id: string;
  img: string;
  title: string;
}
