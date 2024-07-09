import { Injectable } from '@angular/core';

import { PlotDtoChronicle } from './plot.dto.chronicle';

import { PlotPropertiesEntity } from 'src/app/core/entities/plot-properties.entity';

import { EntityMapper } from 'src/app/shared/base/mapper';

@Injectable()
export class PlotPropertiesMapperChronicle
  implements EntityMapper<PlotDtoChronicle, PlotPropertiesEntity>
{
  toEntity(dto: PlotDtoChronicle): PlotPropertiesEntity {
    const { properties } = dto;
    return {
      cemeteryId: properties.cemetery_id,
      cemeteryName: properties.cemetery_name,
      id: properties.plot_id,
      number: properties.plot_no,
      price: properties.price,
      row: properties.row,
      section: properties.section,
      status: properties.status,
    };
  }
}
