import { ImageResponseData, UserProfile } from '../@types/type';
import { getTokenHeader } from './authUtils';

export const PB_API = import.meta.env.VITE_PB_API;

export function requestUrl(collection: string = 'users', param: string = '') {
  return `${PB_API}/collections/${collection}/records${param}`;
}

export async function fetchData(
  collection: string = 'users',
  param: string = ''
) {
  const response = await fetch(requestUrl(collection, param));

  return response.json();
}

export async function createUserProfile(
  collection: string = 'users',
  data: {
    name: string;
    account: string;
    avatar: string;
    index: number;
  }
) {
  const response = await fetch(requestUrl(collection), {
    method: 'POST',
    headers: getTokenHeader(),
    body: JSON.stringify(data),
  });

  return response.json();
}

export function getPbImageURL(
  item: ImageResponseData | UserProfile,
  fileName = 'avatar'
) {
  return `${PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}
