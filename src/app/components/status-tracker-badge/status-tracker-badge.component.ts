import { Component } from "@angular/core";
import packageJson from 'package.json';

@Component({
  selector: "status-tracker-badge",
  templateUrl: "./status-tracker-badge.component.html",
  styleUrls: ["./status-tracker-badge.component.scss"],
  host: { '(click)': 'onClick()' }
})
export class StatusTrackerBadgeComponent {
	st_version: string = "0.0.0";

	constructor(){
		this.st_version = packageJson.version;
	}

	onClick(){
		window.open("https://github.com/gabor-kovac/StatusTracker");
	}
}
