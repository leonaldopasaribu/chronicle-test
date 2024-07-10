import { InjectionToken } from '@angular/core';

/**
 * Injection token that can be used to access
 * the data that was passed in to a rendered component.
 */
export const DYNAMIC_COMPONENT_DATA = new InjectionToken<unknown>(
  'Dynamic Component Data',
);
