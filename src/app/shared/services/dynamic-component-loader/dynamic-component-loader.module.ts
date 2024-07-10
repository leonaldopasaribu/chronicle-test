import { NgModule } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [DialogModule, OverlayModule, PortalModule],
  exports: [PortalModule],
})
export class DynamicComponentLoaderModule {}
