import { LandingItem } from '../../@types/type';

export class LandingUtils {
  static filterSlide(
    data: LandingItem[],
    apiUrl: string,
    device: string,
    collectionName: string
  ): LandingItem[] {
    return data
      .map((item) => {
        const img = item.img || 'default.jpg';
        return {
          ...item,
          title: item.title || 'Unknown',
          img: `${apiUrl}/files/${collectionName}/${item.id}/${img}`,
          device: item.device,
        };
      })
      .filter((item) =>
        device === 'tablet'
          ? item.device === 'mobile' || item.device === 'tablet'
          : item.device === device
      );
  }

  static async fetchSlides(
    apiUrl: string,
    collectionName: string,
    device: string,
    minSlides: number
  ): Promise<LandingItem[]> {
    try {
      const response = await fetch(
        `${apiUrl}/collections/${collectionName}/records`
      );
      const data = (await response.json()).items;
      const filteredSlides = this.filterSlide(
        data,
        apiUrl,
        device,
        collectionName
      );

      return Array.from(
        { length: Math.ceil(minSlides / filteredSlides.length) },
        () => filteredSlides
      )
        .flat()
        .slice(0, minSlides);
    } catch (error) {
      console.error('Error fetching slides:', error);
      return [];
    }
  }
}
