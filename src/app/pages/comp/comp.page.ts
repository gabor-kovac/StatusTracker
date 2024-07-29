import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../../classes/Application"
import { CompatibilitiesService } from "../../services/compatibilities/compatibilities.service";
import { Compatibility } from "../../classes/Compatibility";
import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import applicationDataFile from '../../../assets/applicationDataFile.json';
import { environment } from "src/environments/environments";
import { stringSort } from "src/app/misc/functions";

@Component({
    templateUrl: 'comp.page.html',
    styleUrls: ['comp.page.scss']
})

export class CompPageComponent implements OnInit{

    applications: Application[] = applicationDataFile;

    uniqueApps: Compatibility[] = [];
    comp: Object[];

    app: string | undefined;
    version: string | undefined;

    compatibleApps: Compatibility[] = [];

    appVersions: string[] = [];

    selectedAppName: string | undefined;
    selectedAppVersion: string | undefined;

    env = environment;

    constructor(private title: Title, private route: ActivatedRoute, private router: Router, compatibilityService: CompatibilitiesService){ 
        this.uniqueApps = compatibilityService.get();
        this.comp = compatibilityService.getRaw();
        console.log(`Comps time ${compatibilityService.time}`);
    }

    ngOnInit(){
        this.title.setTitle("ST - Compatibilities");
        
        this.route.queryParams.subscribe((params: any) => {
            this.app = params.app.toLowerCase();
            console.log(`Param app: ${this.app}`);
            this.version = params.version;
            console.log(`Param version: ${this.version}`);

            if(this.app){
                this.appVersions = [];

                if(this.comp.length > 1){
                    console.log(`Comp length: ${this.comp.length}`);
                    this.comp.forEach((tag) => {
                        let compatibilityEntry: Compatibility[] = Object.entries(tag).flat()[5];
                        console.log(compatibilityEntry);
                        
                        for(let application of compatibilityEntry){
                            if(application.name === this.app){
                                this.appVersions.push(application.version);
                            }
                        }
                    });

                    this.appVersions = this.appVersions.filter(
                        (obj, index, self) => index === self.findIndex((o) => o === obj)
                    );
                }

                console.log("appVersions:");
                console.log(this.appVersions);
            }

            if(this.version){
                console.log("Test version select");
                if(this.appVersions.includes(this.version)){
                    console.log("valid app version");
                    this.selectedAppVersion = this.version;
                }else{
                    this.version = this.selectedAppVersion = this.appVersions[0];
                }
            }

            if(!this.version){
                console.log("invalid app version");
                console.log("selecting app version: "+this.appVersions[0]);
                this.version = this.selectedAppVersion = this.appVersions[0];
            }

            if(this.app && this.selectedAppVersion){
                console.log("ok: "+this.app+", "+this.version);

                let compats: Compatibility[] = [];

                if (this.comp.length > 1) {
                    this.comp.forEach((tag) => {
                        let compatibilityEntry = Object.entries(tag).flat()[5];
                        
                        compatibilityEntry.forEach((appl: any, index: number) => {
                            if (appl.name === this.app && appl.version === this.version) {
                                // Remove app self from compatibility list
                                compatibilityEntry = compatibilityEntry.filter((item: any, i: any) => i !== index);
                                compats.push(compatibilityEntry);
                            }
                        });
                    });
                
                    if (compats.length > 0) {
                        compats = compats.flat().sort((a: Compatibility, b: Compatibility) => stringSort(a.name, b.name));
                        this.compatibleApps = compats;
                    }
                }

                this.selectedAppName = this.app;
                console.log("compatibleApps:");
                console.log(this.compatibleApps);

            }else{
                console.log("app and version params not present");
            }
        });

    }

    selectApp(appName: any){
        console.log("select app: "+appName);
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("app",appName);
        let newUrl = `${window.location.origin}${window.location.pathname}?${searchParams}`;
        window.location.href = newUrl;
    }

    selectVersion(appVersion: any){
        console.log("select app version: "+appVersion);
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("version", appVersion);
        let newUrl = `${window.location.origin}${window.location.pathname}?${searchParams}`;
        window.location.href = newUrl;
    }
    
}
