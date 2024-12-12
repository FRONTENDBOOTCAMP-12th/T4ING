export interface ProgramList {
  items: Item[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Item {
  cast: string;
  category: string;
  collectionId: CollectionID;
  collectionName: CollectionName;
  created: Date;
  device: Device;
  genre: string;
  id: string;
  img: string;
  title: string;
  updated: Date;
}

export enum CollectionID {
  Pbc3198651770 = 'pbc_3198651770',
}

export enum CollectionName {
  MainReccomend = 'main_reccomend',
}

export enum Device {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet',
}
