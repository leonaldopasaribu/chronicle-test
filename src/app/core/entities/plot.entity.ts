import { PlotGeometryEntity } from './plot-geometry.entity';
import { PlotPropertiesEntity } from './plot-properties.entity';

export interface PlotEntity {
  geometry: PlotGeometryEntity;
  properties: PlotPropertiesEntity;
  type: 'Feature';
}
