import { TestBed } from '@angular/core/testing';

import { LandingStore } from './landing.store';

import { LandingState } from '../states/landing.state';

import { PlotEntity } from 'src/app/core/entities/plot.entity';

describe('LandingStore', () => {
  let store: LandingStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandingStore],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(LandingStore);
  });

  it('should create LandingStore', () => {
    expect(store).toBeTruthy();
  });

  it('should set isLoading to true when markAsLoading is called', (done: DoneFn) => {
    store.markAsLoading();

    store.state$.subscribe({
      next: ({ isLoading }: LandingState) => {
        expect(isLoading).toBeTrue();
        done();
      },
    });
  });

  it('should set isError to true when markAsError is called', (done: DoneFn) => {
    store.markAsError();

    store.state$.subscribe({
      next: ({ isError }: LandingState) => {
        expect(isError).toBeTrue();
        done();
      },
    });
  });

  it('should set isLoading to false when markAsError is called', (done: DoneFn) => {
    store.markAsError();

    store.state$.subscribe({
      next: ({ isLoading }: LandingState) => {
        expect(isLoading).toBeFalse();
        done();
      },
    });
  });

  it('should set isLoading to false when markAsSuccess is called', (done: DoneFn) => {
    store.markAsSuccess();

    store.state$.subscribe({
      next: ({ isLoading }: LandingState) => {
        expect(isLoading).toBeFalse();
        done();
      },
    });
  });

  it('should set isError to false when markAsSuccess is called', (done: DoneFn) => {
    store.markAsSuccess();

    store.state$.subscribe({
      next: ({ isError }: LandingState) => {
        expect(isError).toBeFalse();
        done();
      },
    });
  });

  it('should set plots when savePlots is called', (done: DoneFn) => {
    const stubPlotEntity: PlotEntity[] = [
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

    store.savePlot(stubPlotEntity);

    store.state$.subscribe({
      next: ({ plots }: LandingState) => {
        expect(plots).toEqual(stubPlotEntity);
        done();
      },
    });
  });
});
