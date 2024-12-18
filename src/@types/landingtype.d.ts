export interface LandingMain {
  items: Item[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface LandingItem {
  cast?: string;
  category?: string;
  collectionId?: string;
  collectionName?: string;
  created?: Date;
  device?: string;
  genre?: string;
  id?: string;
  img?: string;
  title?: string;
  updated?: Date;
}
