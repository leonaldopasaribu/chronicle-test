import { PlotEntity } from 'src/app/core/entities/plot.entity';

export class LandingState {
  isLoading = false;
  isError = false;
  plots: PlotEntity[] = [];
}
