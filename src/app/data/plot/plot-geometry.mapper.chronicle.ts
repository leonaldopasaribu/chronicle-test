import { Injectable } from '@angular/core';

import { PlotDtoChronicle } from './plot.dto.chronicle';

import { PlotGeometryEntity } from 'src/app/core/entities/plot-geometry.entity';

import { EntityMapper } from 'src/app/shared/base/mapper';

@Injectable()
export class PlotGeometryMapperChronicle
  implements EntityMapper<PlotDtoChronicle, PlotGeometryEntity>
{
  toEntity(dto: PlotDtoChronicle): PlotGeometryEntity {
    const { coordinates, type } = dto.geometry;

    return { coordinates, type };
  }
}
