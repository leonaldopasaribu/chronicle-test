import { Component, OnInit } from '@angular/core';

import { LandingStore } from '../stores/landing.store';
import { LandingViewModel } from '../view-models/landing.view-model';

import { PlotRepository } from 'src/app/core/repositories/plot.repository';
import { PlotMapperChronicle } from 'src/app/data/plot/plot.mapper.chronicle';
import { PlotRepositoryChronicle } from 'src/app/data/plot/plot.repository.chronicle';
import { PlotGeometryMapperChronicle } from 'src/app/data/plot/plot-geometry.mapper.chronicle';
import { PlotPropertiesMapperChronicle } from 'src/app/data/plot/plot-properties.mapper.chronicle';

@Component({
  standalone: true,
  templateUrl: './landing.component.html',
  providers: [
    LandingStore,
    LandingViewModel,
    PlotMapperChronicle,
    PlotGeometryMapperChronicle,
    PlotPropertiesMapperChronicle,
    { provide: PlotRepository, useClass: PlotRepositoryChronicle },
  ],
})
export class LandingComponent implements OnInit {
  constructor(private landingViewModel: LandingViewModel) {}

  ngOnInit(): void {
    this.landingViewModel.initializeMap();
  }
}
