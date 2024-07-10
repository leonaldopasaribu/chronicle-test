import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';

import { LandingViewModel } from '../view-models/landing.view-model';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let landingViewModel: LandingViewModel;

  const landingViewModelSpy = jasmine.createSpyObj('LandingViewModel', [
    'initializeMap',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LandingComponent],
      providers: [{ provide: LandingViewModel, useValue: landingViewModelSpy }],
    })
      .overrideComponent(LandingComponent, {
        remove: {
          providers: [LandingViewModel],
        },
        add: {
          providers: [
            { provide: LandingViewModel, useValue: landingViewModelSpy },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    landingViewModel = TestBed.inject(LandingViewModel);
  });

  it('should created the LandingComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call initializeMap from LandingViewModel when component initialization', () => {
    const initializeMapSpy = landingViewModel.initializeMap as jasmine.Spy;

    fixture.detectChanges();

    expect(initializeMapSpy).toHaveBeenCalled();
  });
});
