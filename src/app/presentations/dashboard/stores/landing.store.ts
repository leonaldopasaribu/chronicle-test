import { Injectable } from '@angular/core';

import { LandingState } from '../states/landing.state';

import { PlotEntity } from 'src/app/core/entities/plot.entity';
import { Store } from 'src/app/shared/base/store';

@Injectable()
export class LandingStore extends Store<LandingState> {
  constructor() {
    super(new LandingState());
  }

  markAsLoading(): void {
    this.setState({ isLoading: true });
  }

  markAsError(): void {
    this.setState({ isError: true });
  }

  savePlot(plots: PlotEntity[]): void {
    this.setState({ isLoading: false, plots });
  }
}
