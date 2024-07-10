import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  DASHBOARD_ABOUT_ROUTE_URL,
  DASHBOARD_LANDING_ROUTE_URL,
} from 'src/app/shared/constants/route-url.constant';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [RouterModule],
})
export class SidebarComponent {
  readonly aboutMenuRouteUrl: typeof DASHBOARD_ABOUT_ROUTE_URL;
  readonly dashboardMenuRouteUrl: typeof DASHBOARD_LANDING_ROUTE_URL;

  constructor() {
    this.aboutMenuRouteUrl = DASHBOARD_ABOUT_ROUTE_URL;
    this.dashboardMenuRouteUrl = DASHBOARD_LANDING_ROUTE_URL;
  }
}
