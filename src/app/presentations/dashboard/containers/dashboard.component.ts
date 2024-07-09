import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SidebarComponent } from '../components/sidebar.component';

@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, SidebarComponent],
})
export class DashboardComponent {}
