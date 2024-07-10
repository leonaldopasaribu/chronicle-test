import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  ComponentType,
  GlobalPositionStrategy,
  Overlay,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, Injector, StaticProvider } from '@angular/core';
import { Observable } from 'rxjs';

import { DynamicComponentLoaderModule } from './dynamic-component-loader.module';
import { DynamicComponentLoaderConfig } from './dynamic-component-loader-config';
import { DYNAMIC_COMPONENT_DATA } from './dynamic-component-loader-token';

@Injectable({ providedIn: DynamicComponentLoaderModule })
export class DynamicComponentLoaderService {
  private dialog: Dialog = inject(Dialog);
  private injector: Injector = inject(Injector);
  private overlay: Overlay = inject(Overlay);

  /*
   * Keeps track of the currently-opened component
   * when using dialog loadStrategy.
   */
  get openedComponents(): readonly DialogRef<unknown, unknown>[] {
    return this.dialog.openDialogs;
  }

  /**
   * Stream that emits when all open component that using dialog loadStrategy
   * have finished closing.
   * Will emit on subscribe if there are no open component to begin with.
   */
  get afterAllClosed(): Observable<void> {
    return this.dialog.afterAllClosed;
  }

  /**
   * Stream that emits when a open component
   * that using dialog loadStrategy has opened.
   */
  get afterOpened(): Observable<DialogRef<unknown, unknown>> {
    return this.dialog.afterOpened.asObservable();
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  load<Component = unknown, Data = unknown>(
    component: ComponentType<Component>,
    config: DynamicComponentLoaderConfig<Data> & {
      loadStrategy: 'portal';
    },
  ): ComponentPortal<Component>;

  load<Component = unknown, Data = unknown, Result = unknown>(
    component: ComponentType<Component>,
    config: DynamicComponentLoaderConfig<Data> & {
      loadStrategy: 'dialog';
    },
  ): DialogRef<Result, Component>;

  load<Component = unknown, Data = unknown, Result = unknown>(
    component: ComponentType<Component>,
    config: DynamicComponentLoaderConfig<Data>,
  ): ComponentPortal<Component> | DialogRef<Result, Component> {
    config = this.getConfig(config);

    return {
      portal: () =>
        new ComponentPortal(component, null, this.createInjector(config)),
      dialog: () =>
        this.dialog.open<Result, Data, Component>(component, {
          ...config,
          positionStrategy: this.getPositionStrategy(config),
          injector: this.createInjector(config),
        }),
    }[config.loadStrategy]();
  }

  /**
   * Get a component that using dialog loadStrategy by id.
   */
  getComponentById<Result = unknown, Component = unknown>(
    id: string,
  ): DialogRef<Result, Component> | undefined {
    return this.dialog.getDialogById<Result, Component>(id);
  }

  private getPositionStrategy<Data = unknown>(
    config: DynamicComponentLoaderConfig<Data>,
  ): GlobalPositionStrategy | undefined {
    if (!config.positionStrategy) return;

    const positionStrategy = this.overlay.position().global();

    config.positionStrategy.forEach(strategy => {
      positionStrategy[strategy]();
    });

    return positionStrategy;
  }

  private getConfig<Data = unknown>(
    config: DynamicComponentLoaderConfig<Data>,
  ): DynamicComponentLoaderConfig<Data> {
    return {
      ...new DynamicComponentLoaderConfig(),
      ...config,
    };
  }

  private createInjector<Data = unknown>(
    config: DynamicComponentLoaderConfig<Data>,
  ): Injector {
    const providers: StaticProvider[] = [
      {
        provide: DYNAMIC_COMPONENT_DATA,
        useValue: config.data,
      },
    ];

    if (config.providers) {
      providers.push(...config.providers);
    }

    return Injector.create({
      providers,
      parent: this.injector,
    });
  }
}
