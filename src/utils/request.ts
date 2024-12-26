import { UserProfile } from '../@types/type';

export function requestUrl(collection: string = 'users', param: string = '') {
  return `${
    import.meta.env.VITE_PB_API
  }/collections/${collection}/records${param}`;
}

export function getPbImageURL(item: UserProfile, fileName = 'avatar') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${item[fileName]}`;
}
