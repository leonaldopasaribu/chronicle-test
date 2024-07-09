export interface PlotDtoChronicle {
  type: 'Feature';
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  plot_id: string;
  status: string;
  section: string;
  row: string;
  plot_no: string;
  cemetery_id: number;
  price: number;
  persons: Person[];
  show_price: number;
  cemetery_name: string;
  roi: any[];
}

export interface Person {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  date_of_death: string;
  age: string;
  returned_serviceman: boolean;
  is_featured: any;
  story: any;
  is_admin: any;
  life_chronicle: any;
}

export interface Geometry {
  type: 'Polygon';
  coordinates: number[][][];
}
