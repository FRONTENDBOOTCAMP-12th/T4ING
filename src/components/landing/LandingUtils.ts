import { LandingItem } from '../../@types/type';

export class LandingUtils {
  static slidesDevice(data: LandingItem[]): Record<string, LandingItem[]> {
    return data.reduce(
      (acc, item) => {
        if (item.device === 'mobile' || item.device === 'tablet') {
          acc['mobile'].push(item);
        }
        if (item.device === 'tablet' || item.device === 'desktop') {
          acc['tablet'].push(item);
        }
        if (item.device === 'desktop') {
          acc['desktop'].push(item);
        }
        return acc;
      },
      { mobile: [], tablet: [], desktop: [] } as Record<string, LandingItem[]>
    );
  }
  static filterSlide(
    data: LandingItem[],
    apiUrl: string,
    device: string,
    collectionName: string,
    minSlides: number
  ): LandingItem[] {
    const filteredSlides = data
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

    for (let i = filteredSlides.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredSlides[i], filteredSlides[j]] = [
        filteredSlides[j],
        filteredSlides[i],
      ];
    }

    return Array.from(
      { length: Math.ceil(minSlides / filteredSlides.length) },
      () => filteredSlides
    )
      .flat()
      .slice(0, minSlides);
  }

  static async fetchData(
    apiUrl: string,
    collectionName: string
  ): Promise<LandingItem[]> {
    try {
      const response = await fetch(
        `${apiUrl}/collections/${collectionName}/records`
      );
      const data = (await response.json()).items;
      return data as LandingItem[];
    } catch (error) {
      console.error('Error fetching slides:', error);
      return [];
    }
  }
  static async fetchSlides(
    apiUrl: string,
    collectionName: string,
    device: string,
    minSlides: number
  ): Promise<LandingItem[]> {
    try {
      const data = await this.fetchData(apiUrl, collectionName);
      const filteredSlides = this.filterSlide(
        data,
        apiUrl,
        device,
        collectionName,
        20
      );

      for (let i = filteredSlides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredSlides[i], filteredSlides[j]] = [
          filteredSlides[j],
          filteredSlides[i],
        ];
      }

      return Array.from(
        { length: Math.ceil(minSlides / filteredSlides.length) },
        () => filteredSlides
      )
        .flat()
        .slice(0, minSlides);
    } catch (error) {
      console.error('Error processing slides:', error);
      return [];
    }
  }
}
