interface BasicCollege {
  id: number;
  name: string;
  city: string;
  state: string;
  enrolled: number;
  image_url: string;
  similarity?: number;
}

export type { BasicCollege };
