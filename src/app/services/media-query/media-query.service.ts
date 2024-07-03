import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class MediaQueryService {
	matchMedia(query: string): MediaQueryList {
		return window.matchMedia(query);
	}

	prefersDarkMode(): boolean {
		return this.matchMedia(prefersDarkSchemeQuery).matches;
	}
}

export const prefersDarkSchemeQuery = '(prefers-color-scheme: dark)';