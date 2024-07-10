import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotPropertiesMapperChronicle } from './plot-properties.mapper.chronicle';

import { PlotPropertiesEntity } from 'src/app/core/entities/plot-properties.entity';

describe('PlotPropertiesMapperChronicle', () => {
  let mapper: PlotPropertiesMapperChronicle;

  const stubDto: Pick<PlotDtoChronicle, 'properties'> = {
    properties: {
      cemetery_id: 1,
      cemetery_name: 'Demo Bali Office',
      plot_id: 'PB A 429',
      plot_no: 'A-1',
      price: 1000,
      row: 'A',
      section: '1',
      status: 'Occupied',
      persons: [],
      show_price: 0,
      roi: [],
    },
  };

  beforeEach(() => {
    mapper = new PlotPropertiesMapperChronicle();
  });

  it('should create PlotPropertiesMapperChronicle', () => {
    expect(mapper).toBeTruthy();
  });

  it('should map PlotDtoChronicle to PlotPropertiesEntity correctly', () => {
    const dto = stubDto;
    const expectedEntity: PlotPropertiesEntity = {
      cemeteryId: stubDto.properties.cemetery_id,
      cemeteryName: stubDto.properties.cemetery_name,
      id: stubDto.properties.plot_id,
      number: stubDto.properties.plot_no,
      price: stubDto.properties.price,
      row: stubDto.properties.row,
      section: stubDto.properties.section,
      status: stubDto.properties.status,
    };

    const result = mapper.toEntity(dto);

    expect(result).toEqual(expectedEntity);
  });
});
