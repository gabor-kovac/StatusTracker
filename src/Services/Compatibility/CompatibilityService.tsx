import { stringSort } from '../../Helper/Parsers';
import { type Compatibility } from '../../Types/Compatibility';
import compatibilityDataFile from "../../Assets/compatibilityDataFile.json";

export class CompatibilitiesService {

	private compatibilities: object[] = [];
	private uniqueApps: Compatibility[] = [];

	public time: string;

	constructor() {
		this.time = Date.now().toString();
		console.log("Initialized "+this.time);
		this.compatibilities = compatibilityDataFile;
		if (this.compatibilities.length > 1) {
			this.compatibilities.forEach((tag) => {
				let prim: Compatibility = Object.entries(tag).flat()[5];
				this.uniqueApps.push(prim);
			});

			this.uniqueApps = this.uniqueApps.flat();

			this.uniqueApps.forEach(x => x.name = x.name.toLowerCase());

			this.uniqueApps = this.uniqueApps.filter((obj, index, self) => {
				return self.findIndex((o) => o.name === obj.name) === index;
			});

			this.uniqueApps.sort((a, b) => stringSort(a.name, b.name));
		}else{
			console.warn(`Compatibilities file is empty!`);
		}
	}

	public get() {
		return this.uniqueApps;
	}

	public getRaw() {
		return this.compatibilities;
	}
}

