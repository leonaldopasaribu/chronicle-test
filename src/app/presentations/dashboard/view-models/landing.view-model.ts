import { DialogRef } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import leaflet from 'leaflet';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM_LEVEL,
  MAP_BOUNDARIES,
} from '../constants/landing.constant';
import { LandingState } from '../states/landing.state';
import { LandingStore } from '../stores/landing.store';

import { PlotEntity } from 'src/app/core/entities/plot.entity';
import { PlotPropertiesEntity } from 'src/app/core/entities/plot-properties.entity';
import { PlotRepository } from 'src/app/core/repositories/plot.repository';

import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen';
import { DynamicComponentLoaderService } from 'src/app/shared/services/dynamic-component-loader';

@Injectable()
export class LandingViewModel {
  loadingDialogRef: DialogRef<unknown, LoadingScreenComponent> | undefined;
  map!: leaflet.Map;
  selectedPlot: PlotEntity | null;

  constructor(
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    private landingStore: LandingStore,
    private plotRepository: PlotRepository,
  ) {
    this.selectedPlot = null;
  }

  get isLoading$(): Observable<boolean> {
    return this.landingStore.state$.pipe(
      map(({ isLoading }: LandingState) => isLoading),
      distinctUntilChanged(),
    );
  }

  showLoading(): void {
    this.loadingDialogRef = this.dynamicComponentLoaderService.load(
      LoadingScreenComponent,
      {
        loadStrategy: 'dialog',
        positionStrategy: ['centerVertically', 'centerHorizontally'],
      },
    );
  }

  hideLoading(): void {
    if (this.loadingDialogRef) {
      this.loadingDialogRef.close();
    }
  }

  initializeMap(): void {
    this.map = leaflet
      .map('map')
      .setView([DEFAULT_LATITUDE, DEFAULT_LONGITUDE], DEFAULT_ZOOM_LEVEL);

    const southwest = leaflet.latLng(-8.635945622432802, 115.19192682579163);
    const northeast = leaflet.latLng(-8.635783199701216, 115.19218364730479);

    const bounds = leaflet.latLngBounds(southwest, northeast);

    this.map.fitBounds(bounds);

    this.fetchPlots();
  }

  private fetchPlots(): void {
    const bounds = MAP_BOUNDARIES;

    this.landingStore.markAsLoading();

    this.plotRepository.fetchAll(bounds).subscribe({
      next: (plots: PlotEntity[]) => {
        this.onFetchPlotsSuccess(plots);
      },
      error: (error: HttpErrorResponse) => {
        this.onFetchPlotsError(error);
      },
    });
  }

  private onFetchPlotsSuccess(plots: PlotEntity[]): void {
    this.addPlotsToMap(plots);
    this.landingStore.markAsSuccess();
  }

  private onFetchPlotsError(error: HttpErrorResponse): void {
    this.landingStore.markAsError();
  }

  private addPlotsToMap(plots: PlotEntity[]): void {
    if (!plots) return;

    plots.forEach((plot: PlotEntity) => {
      const geoJSON = this.getGeoJSONByPlot(plot);
      const marker = this.getMarkerByGeoJSON(geoJSON);

      this.addMarkerEventListeners(marker, plot);
    });
  }

  private getGeoJSONByPlot(
    plot: PlotEntity,
  ): GeoJSON.Feature<GeoJSON.Geometry, PlotPropertiesEntity> {
    const { geometry, properties, type } = plot;

    return {
      type,
      geometry: {
        type: geometry.type,
        coordinates: geometry.coordinates,
      },
      properties: { ...properties },
    };
  }

  private getMarkerByGeoJSON(
    geoJSON: GeoJSON.Feature<GeoJSON.Geometry, PlotPropertiesEntity>,
  ): leaflet.GeoJSON {
    const marker = leaflet.geoJSON(geoJSON).addTo(this.map);

    marker.bindPopup(`
      <h3>${geoJSON.properties.number}</h3>
      <p>Status: ${geoJSON.properties.status}</p>
      <p>Price: ${geoJSON.properties.price}</p>
      <p>Cemetery: ${geoJSON.properties.cemeteryName}</p>
    `);

    return marker;
  }

  private addMarkerEventListeners(
    marker: leaflet.GeoJSON,
    plot: PlotEntity,
  ): void {
    marker.on({
      mouseover: () => {
        this.selectedPlot = plot;
        marker.openPopup();
      },
      mouseout: () => {
        this.selectedPlot = null;
        marker.closePopup();
      },
    });
  }
}
