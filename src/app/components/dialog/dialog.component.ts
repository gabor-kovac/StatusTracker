import { Component } from "@angular/core";
import * as sonarExtra from "../../../assets/sonarExtra.json";

export const DIALOG_CONTAINER = "dialogContainer";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
	dialogContainer: HTMLElement | undefined;
	extraProjects: string[] = [];
	open: boolean = false;

	constructor(){
		if(sonarExtra){
			this.extraProjects = Array.from(sonarExtra);
			if(this.extraProjects.length > 0)
			{
				this.open = true;
			}
		}
	}

	ngAfterViewInit(){
		const element = document.getElementById(DIALOG_CONTAINER);
		if(element){
			this.dialogContainer = element;
		}
	}

	dismissDialog(){
		console.warn("Warning dialog dismissed");
		this.dialogContainer!.classList.remove("d-block");
		this.dialogContainer!.classList.add("d-none");
	}
}
