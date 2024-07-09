import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


import { PlotDtoChronicle } from './plot.dto.chronicle';
import { PlotMapperChronicle } from './plot.mapper.chronicle';

import { FetchResponseDto } from '../base/response.model';

import { PlotEntity } from 'src/app/core/entities/plot.entity';
import { PlotRepository } from 'src/app/core/repositories/plot.repository';

import { environment } from 'src/environments/environment';


@Injectable()
export class PlotRepositoryChronicle extends PlotRepository {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private mapper: PlotMapperChronicle,
  ) {
    super();
    this.baseUrl = `${environment.apiUrl}`;
  }

  override fetchAll(bounds: string): Observable<PlotEntity[]> {
    return this.http
      .get<
        FetchResponseDto<PlotDtoChronicle[]>
      >(`${this.baseUrl}/v1/ms/plots-in-viewport?bounds=${bounds}`)
      .pipe(
        map(dto => {
          return dto.features.map(dto => this.mapper.toEntity(dto));
        }),
      );
  }
}
