import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LandingComponent } from './landing.component';

import { LandingViewModel } from '../view-models/landing.view-model';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let landingViewModel: LandingViewModel;

  const landingViewModelSpy = jasmine.createSpyObj('LandingViewModel', [
    'hideLoading',
    'initializeMap',
    'showLoading',
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

    component.isLoading$ = of(false);
    fixture.detectChanges();

    expect(initializeMapSpy).toHaveBeenCalled();
  });

  it('should call hideLoading from LandingViewModel when isLoading is false', () => {
    const hideLoadingSpy = landingViewModel.hideLoading as jasmine.Spy;

    component.isLoading$ = of(false);
    fixture.detectChanges();

    expect(hideLoadingSpy).toHaveBeenCalled();
  });

  it('should call showLoading from LandingViewModel when isLoading is true', () => {
    const showLoadingSpy = landingViewModel.showLoading as jasmine.Spy;

    component.isLoading$ = of(true);
    fixture.detectChanges();

    expect(showLoadingSpy).toHaveBeenCalled();
  });
});
