import { Observable } from 'rxjs';

import { PlotEntity } from '../entities/plot.entity';

export abstract class PlotRepository {
  abstract fetchAll(bounds: string): Observable<PlotEntity[]>;
}
