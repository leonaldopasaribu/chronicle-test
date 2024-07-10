import { StaticProvider } from '@angular/core';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';

export type DynamicComponentDialogPositionStrategy = keyof Pick<
  GlobalPositionStrategy,
  | 'centerHorizontally'
  | 'centerVertically'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
>;

export class DynamicComponentLoaderConfig<Data = unknown> {
  /**
   * Whether the rendered component should close when the user navigates backwards or forwards through browser
   * history. This does not apply to navigation via anchor element unless using URL-hash based
   * routing (`HashLocationStrategy` in the Angular router).
   */
  closeOnNavigation?: boolean = true;

  /** Data being injected into the rendered component. */
  data?: Data;

  /** Whether the component closes with the escape key or pointer events outside the panel element (like
   * clicking on backdrop). */
  disableClose?: boolean = true;

  /** Whether the overlay has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Class to be added to the backdrop element. */
  backdropClass?: string | string[] = 'bg-neutral-700/70';

  /** ID for the rendered component. If omitted, a unique one will be generated. */
  id?: string;

  /**
   * Strategy to use when positioning the rendered component when using 'dialog' loadStrategy.
   * Defaults to centering it on the page.
   */
  positionStrategy?: DynamicComponentDialogPositionStrategy[];

  /** Providers that will be exposed to the dynamically rendered component. */
  providers?: StaticProvider[];

  /**
   *Select one based on the type of component to be rendered.

   *Choose 'dialog' if you will be rendering a floating component, such as a bottom sheet, dialog, or tooltip.

   *Choose 'portal' if you only want to render the component dynamically.
   */
  loadStrategy: 'portal' | 'dialog' = 'dialog';
}
