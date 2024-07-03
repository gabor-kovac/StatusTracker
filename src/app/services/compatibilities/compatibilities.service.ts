import { Injectable } from '@angular/core';
import compatibilitiesDataFile from "../../../assets/compatibilitiesDataFile.json";
import { Compatibility } from '../../classes/Compatibility';
import { stringSort } from '../../misc/functions';

@Injectable({
	providedIn: 'root'
})
export class CompatibilitiesService {

	compatibilities: Object[] = compatibilitiesDataFile;

	private uniqueApps: Compatibility[] = [];

	constructor() {
		if (this.compatibilities.length > 1) {
			this.compatibilities.forEach((tag) => {
				let prim = Object.entries(tag).flat()[5];
				this.uniqueApps.push(prim);
			});

			this.uniqueApps = this.uniqueApps.flat();

			this.uniqueApps = this.uniqueApps.filter((obj, index, self) => {
				return self.findIndex((o) => o.name === obj.name) === index;
			});
		}
	}

	public get(){
		return this.uniqueApps.sort((a, b) => stringSort(a.name, b.name));
	}
}

