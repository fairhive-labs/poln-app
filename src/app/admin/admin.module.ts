import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    BaseChartDirective
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class AdminModule { }
