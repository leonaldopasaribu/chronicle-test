import { CommonModule } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NavigationEnd,
  Router,
  RouterLink,
  provideRouter,
} from '@angular/router';
import { of } from 'rxjs';

import { SidebarComponent } from './sidebar.component';

import {
  DASHBOARD_ABOUT_ROUTE_URL,
  DASHBOARD_LANDING_ROUTE_URL,
} from 'src/app/shared/constants/route-url.constant';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        RouterLink,
        SidebarComponent,
      ],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should create SidebarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set anchor tag with id BtnDashboardMenu to routerlink DASHBOARD_LANDING_ROUTE_URL', () => {
    fixture.detectChanges();

    const anchorTagId = '#BtnDashboardMenu';
    const anchorTagElement = debugElement.query(By.css(anchorTagId));

    const anchorTagRouterLink = anchorTagElement.injector.get(RouterLink);
    const expectedUrl = DASHBOARD_LANDING_ROUTE_URL;
    const result = anchorTagRouterLink.href;

    expect(result).toEqual(expectedUrl);
  });

  it('should set anchor tag with id BtnAboutMenu to routerlink DASHBOARD_ABOUT_ROUTE_URL', () => {
    const routerEventsSpy = spyOnProperty(router, 'events', 'get');
    const mockNavigationEnd = new NavigationEnd(
      1,
      DASHBOARD_LANDING_ROUTE_URL,
      DASHBOARD_ABOUT_ROUTE_URL,
    );

    routerEventsSpy.and.returnValue(of(mockNavigationEnd));

    fixture.detectChanges();

    const anchorTagId = '#BtnAboutMenu';
    const anchorTagElement = debugElement.query(By.css(anchorTagId));
    const anchorTagRouterLink = anchorTagElement.injector.get(RouterLink);
    const expectedUrl = DASHBOARD_ABOUT_ROUTE_URL;
    const result = anchorTagRouterLink.href;

    expect(result).toEqual(expectedUrl);

    routerEventsSpy.calls.reset();
  });
});
