import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  Subscription,
  SubscriptionLike,
  distinctUntilChanged,
} from 'rxjs';

import { LandingStore } from '../stores/landing.store';
import { LandingViewModel } from '../view-models/landing.view-model';

import { PlotRepository } from 'src/app/core/repositories/plot.repository';
import { PlotMapperChronicle } from 'src/app/data/plot/plot.mapper.chronicle';
import { PlotRepositoryChronicle } from 'src/app/data/plot/plot.repository.chronicle';
import { PlotGeometryMapperChronicle } from 'src/app/data/plot/plot-geometry.mapper.chronicle';
import { PlotPropertiesMapperChronicle } from 'src/app/data/plot/plot-properties.mapper.chronicle';

import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

@Component({
  standalone: true,
  templateUrl: './landing.component.html',
  providers: [
    DynamicComponentLoaderService,
    LandingStore,
    LandingViewModel,
    PlotMapperChronicle,
    PlotGeometryMapperChronicle,
    PlotPropertiesMapperChronicle,
    { provide: PlotRepository, useClass: PlotRepositoryChronicle },
  ],
})
export class LandingComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  private subscription: Subscription;

  constructor(private landingViewModel: LandingViewModel) {
    this.isLoading$ = this.landingViewModel.isLoading$;

    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.subscribeToIsLoading());
    this.landingViewModel.initializeMap();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToIsLoading(): SubscriptionLike {
    return this.isLoading$
      .pipe(distinctUntilChanged())
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.landingViewModel.showLoading();
          return;
        }

        this.landingViewModel.hideLoading();
      });
  }
}
