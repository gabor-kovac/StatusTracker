import { Component } from "@angular/core";
import summaryFile from "../../../assets/systemtestSummary.json";

@Component({
	selector: "systemtest-summary",
	templateUrl: "./systemtest-summary.component.html",
	styleUrls: ["./systemtest-summary.component.scss"],
	host: {"class": "flex-grow-1"}
})
export class SystemtestSummaryComponent {
	failed: boolean;
	date: string;

	constructor(){
		this.failed = summaryFile.status.toLocaleLowerCase() == "failed";
		this.date = summaryFile.date;
	}
}
