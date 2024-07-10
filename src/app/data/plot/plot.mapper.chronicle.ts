import { Injectable } from '@angular/core';

import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotGeometryMapperChronicle } from './plot-geometry.mapper.chronicle';
import { PlotPropertiesMapperChronicle } from './plot-properties.mapper.chronicle';

import { PlotEntity } from 'src/app/core/entities/plot.entity';

import { EntityMapper } from 'src/app/shared/base/mapper';

@Injectable()
export class PlotMapperChronicle
  implements EntityMapper<PlotDtoChronicle, PlotEntity>
{
  constructor(
    private plotGeometry: PlotGeometryMapperChronicle,
    private plotProperties: PlotPropertiesMapperChronicle,
  ) {}
  toEntity(dto: PlotDtoChronicle): PlotEntity {
    return {
      geometry: this.plotGeometry.toEntity(dto),
      properties: this.plotProperties.toEntity(dto),
      type: dto.type,
    };
  }
}
