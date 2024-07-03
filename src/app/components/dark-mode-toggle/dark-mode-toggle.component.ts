import { Component } from "@angular/core";
import { DarkModeService } from "src/app/services/dark-mode/dark-mode.service";
import { Observable } from "rxjs";

@Component({
	selector: "dark-mode-toggle",
	templateUrl: "./dark-mode-toggle.component.html",
})
export class DarkModeToggle {
	darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
	isDarkMode: boolean;

	constructor(private darkModeService: DarkModeService) { 
		this.isDarkMode = false;
		this.darkMode$.subscribe((value: boolean) => {
			this.isDarkMode = value;
		});
	}
	onToggle(element?: HTMLElement): void {
		this.darkModeService.toggle();
		element?.classList.toggle("bi-lightbulb-off");
	}
}
