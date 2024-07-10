import { TestBed } from '@angular/core/testing';

import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotGeometryMapperChronicle } from './plot-geometry.mapper.chronicle';
import { PlotMapperChronicle } from './plot.mapper.chronicle';
import { PlotPropertiesMapperChronicle } from './plot-properties.mapper.chronicle';

import { PlotEntity } from 'src/app/core/entities/plot.entity';

describe('PlotMapperChronicle', () => {
  let mapper: PlotMapperChronicle;
  let plotGeometryMapperChronicle: PlotGeometryMapperChronicle;
  let plotPropertiesMapperChronicle: PlotPropertiesMapperChronicle;

  const stubDto: PlotDtoChronicle = {
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
    type: 'Feature',
  };

  const stubEntity: PlotEntity = {
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
    properties: {
      cemeteryId: 1,
      cemeteryName: 'Demo Bali Office',
      id: 'PB A 429',
      number: 'A-1',
      price: 1000,
      row: 'A',
      section: '1',
      status: 'Occupied',
    },
    type: 'Feature',
  };

  const plotGeometryMapperChronicleSpy = jasmine.createSpyObj(
    'PlotGeometryMapperChronicle',
    ['toEntity'],
  );

  const plotPropertiesMapperChronicleSpy = jasmine.createSpyObj(
    'PlotPropertiesMapperChronicle',
    ['toEntity'],
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PlotGeometryMapperChronicle,
          useValue: plotGeometryMapperChronicleSpy,
        },
        {
          provide: PlotPropertiesMapperChronicle,
          useValue: plotPropertiesMapperChronicleSpy,
        },
        PlotMapperChronicle,
      ],
    });
  });

  beforeEach(() => {
    mapper = TestBed.inject(PlotMapperChronicle);
    plotGeometryMapperChronicle = TestBed.inject(PlotGeometryMapperChronicle);
    plotPropertiesMapperChronicle = TestBed.inject(
      PlotPropertiesMapperChronicle,
    );
  });

  it('should create PlotMapperChronicle', () => {
    expect(mapper).toBeTruthy();
  });

  it('should transform stubDto to stubEntity when method toDto is called', () => {
    const plotGeometryMapperChronicletoEntitySpy =
      plotGeometryMapperChronicle.toEntity as jasmine.Spy;
    const plotPropertiesMapperChronicleToEntitySpy =
      plotPropertiesMapperChronicle.toEntity as jasmine.Spy;

    plotGeometryMapperChronicletoEntitySpy.and.returnValue(stubEntity.geometry);
    plotPropertiesMapperChronicleToEntitySpy.and.returnValue(
      stubEntity.properties,
    );

    const result = mapper.toEntity(stubDto);

    expect(result).toEqual(stubEntity);
  });
});
