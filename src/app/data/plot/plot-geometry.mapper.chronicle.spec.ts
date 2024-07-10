import { PlotGeometryMapperChronicle } from './plot-geometry.mapper.chronicle';
import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotGeometryEntity } from 'src/app/core/entities/plot-geometry.entity';

describe('PlotGeometryMapperChronicle', () => {
  let mapper: PlotGeometryMapperChronicle;

  const stubDto: Pick<PlotDtoChronicle, 'geometry'> = {
    geometry: {
      coordinates: [
        [
          [115.19205243105435, -8.635955336963123],
          [115.19207411231265, -8.63594010452793],
          [115.19208194259656, -8.635950648793845],
          [115.19206026133706, -8.635965881231908],
          [115.19205243105435, -8.635955336963123],
        ],
      ],
      type: 'Polygon',
    },
  };

  beforeEach(() => {
    mapper = new PlotGeometryMapperChronicle();
  });

  it('should create PlotGeometryMapperChronicle', () => {
    expect(mapper).toBeTruthy();
  });

  it('should map PlotDtoChronicle to PlotGeometryEntity correctly', () => {
    const dto = stubDto;
    const result: PlotGeometryEntity = mapper.toEntity(dto);

    expect(result.coordinates).toEqual([
      [
        [115.19205243105435, -8.635955336963123],
        [115.19207411231265, -8.63594010452793],
        [115.19208194259656, -8.635950648793845],
        [115.19206026133706, -8.635965881231908],
        [115.19205243105435, -8.635955336963123],
      ],
    ]);
    expect(result.type).toEqual('Polygon');
  });
});
