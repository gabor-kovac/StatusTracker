import { InjectionToken } from "@angular/core";

export interface DarkModeOptions {
    darkModeClass: string;
    lightModeClass: string;
    preloadingClass: string;
    storageKey: string;
    element: HTMLElement;
}

export const DARK_MODE_OPTIONS = new InjectionToken<Partial<DarkModeOptions>>('DARK_MODE_OPTIONS');