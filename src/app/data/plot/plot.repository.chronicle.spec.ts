import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotMapperChronicle } from './plot.mapper.chronicle';
import { PlotRepositoryChronicle } from './plot.repository.chronicle';

import { FetchResponseDto } from '../base/response.model';

import { PlotEntity } from 'src/app/core/entities/plot.entity';

import { environment } from 'src/environments/environment';

describe('PlotRepositoryChronicle', () => {
  let httpTestingController: HttpTestingController;
  let repository: PlotRepositoryChronicle;

  const plotMapperChronicleSpy = jasmine.createSpyObj('PlotMapperChronicle', [
    'toEntity',
  ]);

  const baseUrl = `${environment.apiUrl}/v1/ms/plots-in-viewport`;

  const mockPlotDtoChronicle: PlotDtoChronicle = {
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

  const mockResponse: FetchResponseDto<PlotDtoChronicle[]> = {
    features: [mockPlotDtoChronicle],
    type: 'FeatureCollection',
  };

  const mockPlotEntity: PlotEntity = {
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

  const MAP_BOUNDARIES =
    '115.19192682579163,-8.635945622432802,115.19218364730479,-8.635783199701216';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlotRepositoryChronicle,
        {
          provide: PlotMapperChronicle,
          useValue: plotMapperChronicleSpy,
        },
      ],
    });
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(PlotRepositoryChronicle);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should created the PlotRepositoryChronicle', () => {
    expect(repository).toBeTruthy();
  });

  it(`should call ${baseUrl}?bounds=${MAP_BOUNDARIES} when method fetchAll is called`, (done: DoneFn) => {
    const url = `${baseUrl}?bounds=${MAP_BOUNDARIES}`;
    const expectedUrl = url;

    plotMapperChronicleSpy.toEntity.and.returnValue(mockPlotEntity);

    repository.fetchAll(MAP_BOUNDARIES).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.url;

    expect(result).toBe(expectedUrl);

    request.flush(mockResponse);
  });

  it(`should call get on httpClient when method fetchAll is called`, (done: DoneFn) => {
    const url = `${baseUrl}?bounds=${MAP_BOUNDARIES}`;
    const expectedMethod = 'GET';

    plotMapperChronicleSpy.toEntity.and.returnValue(mockPlotEntity);

    repository.fetchAll(MAP_BOUNDARIES).subscribe({
      next: () => done(),
      error: fail,
    });

    const request = httpTestingController.expectOne(url);
    const result = request.request.method;

    expect(result).toBe(expectedMethod);

    request.flush(mockResponse);
  });

  it(`should return PlotEntity when fetchAll is called`, (done: DoneFn) => {
    const url = `${baseUrl}?bounds=${MAP_BOUNDARIES}`;
    const expectedResult = [mockPlotEntity];

    plotMapperChronicleSpy.toEntity.and.returnValue(mockPlotEntity);

    repository.fetchAll(MAP_BOUNDARIES).subscribe({
      next: (result: PlotEntity[]) => {
        expect(result).toEqual(expectedResult);
        done();
      },
      error: fail,
    });

    const request = httpTestingController.expectOne(url);

    request.flush(mockResponse);
  });
});
