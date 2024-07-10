import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { LandingViewModel } from './landing.view-model';

import { LandingStore } from '../stores/landing.store';

import { PlotEntity } from 'src/app/core/entities/plot.entity';
import { PlotRepository } from 'src/app/core/repositories/plot.repository';

import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

describe('LandingViewModel', () => {
  let viewModel: LandingViewModel;
  let landingStore: LandingStore;
  let plotRepository: PlotRepository;
  let dynamicComponentLoaderService: DynamicComponentLoaderService;

  const plotRepositorySpy = jasmine.createSpyObj('PlotRepository', [
    'fetchAll',
  ]);

  const landingStoreSpy = jasmine.createSpyObj('LandingStore', [
    'markAsError',
    'markAsLoading',
    'markAsSuccess',
    'savePlots',
    'state',
    'state$',
  ]);

  const dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

  const dynamicComponentLoaderServiceSpy = jasmine.createSpyObj(
    'DynamicComponentLoaderService',
    ['load'],
  );

  const mockPlots: PlotEntity[] = [
    {
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
    },
  ];

  function setupMapContainer() {
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    document.body.appendChild(mapContainer);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LandingViewModel,
        {
          provide: LandingStore,
          useValue: landingStoreSpy,
        },
        {
          provide: DynamicComponentLoaderService,
          useValue: dynamicComponentLoaderServiceSpy,
        },
        {
          provide: PlotRepository,
          useValue: plotRepositorySpy,
        },
      ],
    });
  });

  beforeEach(() => {
    viewModel = TestBed.inject(LandingViewModel);
    landingStore = TestBed.inject(LandingStore);
    plotRepository = TestBed.inject(PlotRepository);
    dynamicComponentLoaderService = TestBed.inject(
      DynamicComponentLoaderService,
    );

    setupMapContainer();
  });

  afterEach(() => {
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
      document.body.removeChild(mapContainer);
    }
  });

  it('should created the LandingViewModel', () => {
    expect(viewModel).toBeTruthy();
  });

  it('should return false as isLoading when subscribe to isLoading$', () => {
    const expectedValue = false;
    const mockState = {
      isLoading: false,
    };
    const store = of(mockState);

    landingStoreSpy.state$ = store;

    viewModel.isLoading$.subscribe(value => {
      expect(value).toEqual(expectedValue);
    });
  });

  it('should close the loading dialog when hideLoading is called', () => {
    viewModel.loadingDialogRef = dialogRefSpy;

    viewModel.hideLoading();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call load with config from DynamicComponentLoaderService when showLoading is called', () => {
    const loadSpy = dynamicComponentLoaderService.load as jasmine.Spy;

    viewModel.showLoading();

    expect(loadSpy).toHaveBeenCalledWith(LoadingScreenComponent, {
      loadStrategy: 'dialog',
      positionStrategy: ['centerVertically', 'centerHorizontally'],
    });
  });

  describe('initializeMap', () => {
    it('should call fetchAll from PlotRepository when initializeMap is called', () => {
      const fetchAllSpy = plotRepository.fetchAll as jasmine.Spy;

      plotRepositorySpy.fetchAll.and.returnValue(of(mockPlots));
      viewModel.initializeMap();

      expect(fetchAllSpy).toHaveBeenCalled();
    });

    it('should call markAsLoading from LandingStore when initializeMap is called', () => {
      const markAsLoadingSpy = landingStore.markAsLoading as jasmine.Spy;

      plotRepositorySpy.fetchAll.and.returnValue(of(mockPlots));
      viewModel.initializeMap();

      expect(markAsLoadingSpy).toHaveBeenCalled();
    });

    it('should call markAsError from LandingStore when initializeMap is called', () => {
      const markAsErrorSpy = landingStore.markAsError as jasmine.Spy;

      plotRepositorySpy.fetchAll.and.returnValue(throwError(() => 'Error'));
      viewModel.initializeMap();

      expect(markAsErrorSpy).toHaveBeenCalled();
    });
  });
});
