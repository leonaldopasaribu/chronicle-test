import { DialogRef } from '@angular/cdk/dialog';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingScreenComponent } from './loading-screen.component';

describe('LoadingScreenComponent', () => {
  let fixture: ComponentFixture<LoadingScreenComponent>;
  let component: LoadingScreenComponent;
  let debugElement: DebugElement;

  const dialogRefSpy = jasmine.createSpyObj('DialogRef', ['config']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreenComponent],
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRefSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create LoadingScreenComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render container with id CntrScreenLoading', () => {
    const containerId = 'CntrScreenLoading';

    const container = debugElement.query(By.css(`#${containerId}`));

    expect(container).toBeTruthy();
  });
});
