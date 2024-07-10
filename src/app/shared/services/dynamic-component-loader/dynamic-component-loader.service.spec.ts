import { Injector, Component, StaticProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentPortal } from '@angular/cdk/portal';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  GlobalPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { of } from 'rxjs';

import { DynamicComponentLoaderConfig } from './dynamic-component-loader-config';
import { DynamicComponentLoaderService } from './dynamic-component-loader.service';
import { DYNAMIC_COMPONENT_DATA } from './dynamic-component-loader-token';

@Component({ template: '' })
class TestComponent {}

describe('DynamicComponentLoaderService', () => {
  let dynamicComponentLoaderService: DynamicComponentLoaderService;
  let dialog: Dialog;
  let injector: Injector;
  let overlay: Overlay;

  const overlayRefStub = {
    backdropClick: () => of(),
    keydownEvents: () => of(),
    outsidePointerEvents: () => of(),
    detachments: () => of(),
  };
  const dialogRefStub = new DialogRef(
    overlayRefStub as unknown as OverlayRef,
    {},
  );

  const mockInjector = (
    data: unknown = undefined,
    provider: StaticProvider[] = [],
  ) => {
    return Injector.create({
      providers: [
        {
          provide: DYNAMIC_COMPONENT_DATA,
          useValue: data,
        },
        ...provider,
      ],
      parent: injector,
    });
  };

  const dialogSpyObj = jasmine.createSpyObj(
    'Dialog',
    ['open', 'getDialogById', 'closeAll'],
    ['openDialogs', 'afterAllClosed', 'afterOpened'],
  );
  const overlaySpyObj = jasmine.createSpyObj('Overlay', ['position']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicComponentLoaderService,
        { provide: Dialog, useValue: dialogSpyObj },
        { provide: Overlay, useValue: overlaySpyObj },
      ],
    });
  });

  beforeEach(() => {
    dynamicComponentLoaderService = TestBed.inject(
      DynamicComponentLoaderService,
    );
    dialog = TestBed.inject(Dialog);
    injector = TestBed.inject(Injector);
    overlay = TestBed.inject(Overlay);
  });

  it('should be created', () => {
    expect(dynamicComponentLoaderService).toBeTruthy();
  });

  it('should call closeAll from dialog when method closeAll is called', () => {
    const closeAllSpy = dialog.closeAll;

    dynamicComponentLoaderService.closeAll();

    expect(closeAllSpy).toHaveBeenCalled();
  });

  it('openedComponents getter should return array of opened components', () => {
    (
      Object.getOwnPropertyDescriptor(dialog, 'openDialogs')?.get as jasmine.Spy
    ).and.returnValue([dialogRefStub, dialogRefStub]);

    expect(dynamicComponentLoaderService.openedComponents).toEqual([
      dialogRefStub,
      dialogRefStub,
    ]);
  });

  it('afterOpened getter should return observable of opened components', () => {
    (
      Object.getOwnPropertyDescriptor(dialog, 'afterOpened')?.get as jasmine.Spy
    ).and.returnValue({ asObservable: () => of(dialogRefStub) });

    dynamicComponentLoaderService.afterOpened.subscribe((result: unknown) => {
      expect(result).toEqual(dialogRefStub);
    });
  });

  it('should return dialogRef with selected id', () => {
    dynamicComponentLoaderService.getComponentById('test');

    expect(dialog.getDialogById).toHaveBeenCalledWith('test');
  });

  describe('load dynamic component with dialog loadStrategy', () => {
    it('should return component portal with default injector', () => {
      const componentPortal = dynamicComponentLoaderService.load(
        TestComponent,
        {
          loadStrategy: 'portal',
        },
      );
      const expectedComponentPortal = new ComponentPortal(
        TestComponent,
        null,
        mockInjector(),
      );

      expect(componentPortal).toEqual(expectedComponentPortal);
    });

    it('should return component portal with injected data', () => {
      const componentPortal = dynamicComponentLoaderService.load(
        TestComponent,
        {
          loadStrategy: 'portal',
          data: { test: 'test' },
        },
      );
      const expectedComponentPortal = new ComponentPortal(
        TestComponent,
        null,
        mockInjector({ test: 'test' }),
      );

      expect(componentPortal).toEqual(expectedComponentPortal);
    });

    it('should return component portal with injected custom provider', () => {
      const componentPortal = dynamicComponentLoaderService.load(
        TestComponent,
        {
          loadStrategy: 'portal',
          providers: [{ provide: 'test', useValue: 'test' }],
        },
      );
      const expectedComponentPortal = new ComponentPortal(
        TestComponent,
        null,
        mockInjector(undefined, [{ provide: 'test', useValue: 'test' }]),
      );

      expect(componentPortal).toEqual(expectedComponentPortal);
    });
  });

  describe('load dynamic component with portal loadStrategy', () => {
    beforeEach(() => {
      (dialog.open as jasmine.Spy).calls.reset();
    });

    it('should return dialogRef with default config', () => {
      const configStub = {
        ...new DynamicComponentLoaderConfig(),
        loadStrategy: 'dialog',
        positionStrategy: undefined,
        injector: mockInjector(),
      };

      dynamicComponentLoaderService.load(TestComponent, {
        loadStrategy: 'dialog',
      });

      expect(dialog.open).toHaveBeenCalledWith(TestComponent, configStub);
    });

    it('should return dialogRef with custom config', () => {
      const configStub = {
        ...new DynamicComponentLoaderConfig(),
        id: 'nani',
        hasBackdrop: false,
        loadStrategy: 'dialog',
        positionStrategy: undefined,
        injector: mockInjector(),
        disableClose: true,
      };

      dynamicComponentLoaderService.load(TestComponent, {
        loadStrategy: 'dialog',
        id: 'nani',
        hasBackdrop: false,
        disableClose: true,
      });

      expect(dialog.open).toHaveBeenCalledWith(TestComponent, configStub);
    });

    it('should return dialogRef with custom position', () => {
      (overlay.position as jasmine.Spy).and.returnValue({
        global: () => new GlobalPositionStrategy(),
      });

      const configStub = {
        ...new DynamicComponentLoaderConfig(),
        loadStrategy: 'dialog',
        positionStrategy: new GlobalPositionStrategy()
          .bottom()
          .centerVertically(),
        injector: mockInjector(),
      };

      dynamicComponentLoaderService.load(TestComponent, {
        loadStrategy: 'dialog',
        positionStrategy: ['bottom', 'centerVertically'],
      });

      expect(dialog.open).toHaveBeenCalledWith(TestComponent, configStub);
    });
  });
});
