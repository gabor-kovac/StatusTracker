import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../../classes/Application"
import compatibilitiesDataFile from "../../../assets/compatibilitiesDataFile.json";
import applicationDataFile from '../../../assets/applicationDataFile.json';
import { CompatibilitiesService } from "../../services/compatibilities/compatibilities.service";
import { Compatibility } from "../../classes/Compatibility";

@Component({
    templateUrl: 'comp.page.html',
    styleUrls: ['comp.page.scss']
})

export class CompPageComponent implements OnInit{

    Applications: Application[] = applicationDataFile;

    uniqueApps: Compatibility[] = [];
    comp: Object[] = compatibilitiesDataFile;

    app: string | undefined;
    version: string | undefined;

    compatibleApps: Compatibility[] = [];

    appVersions: string[] = [];

    selectedAppName: string | undefined;
    selectedAppVersion: string | undefined;

    constructor(private title: Title, private route: ActivatedRoute, private router: Router, private compatibilitiesService: CompatibilitiesService){ }

    ngOnInit(){
        this.title.setTitle("ST - Compatibilities");

        this.uniqueApps = this.compatibilitiesService.get();
        
        this.route.queryParams.subscribe((params: any) => {
            this.app = params.app;
            this.version = params.version;

            if(this.app){
                this.appVersions = [];

                if(this.comp.length > 1){
                    this.comp.forEach((tag) => {
                        let prim = Object.entries(tag).flat()[5];
                        
                        for(let appl of prim){
                            if(appl.name === this.app){
                                this.appVersions.push(appl.version);
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
                if(this.appVersions.includes(this.version)){
                    console.log("valid app version");
                    this.selectedAppVersion = this.version;
                }else{
                    console.log("invalid app version");
                    console.log("selecting app version: "+this.appVersions[0]);
                    this.version = this.selectedAppVersion = this.appVersions[0];
                }
            }

            if(this.app && this.selectedAppVersion){
                console.log("ok: "+this.app+", "+this.version);

                let compats: string[] = [];
                if(this.comp.length > 1){
                    this.comp.forEach((tag) => {
                        let prim = Object.entries(tag).flat()[5];
                        
                        for(let appl of prim){
                            if(appl.name === this.app && appl.version === this.version){
                                //remove app self from compatibility list
                                for(let i = 0; i < prim.length; i++){
                                    if(prim[i].name === this.app){
                                        prim.splice(i,1);
                                    }
                                }
                                compats.push(prim);
                            }
                        } 
                    });

                    if(compats){
                        compats = compats.slice(-1).flat();

                        this.compatibleApps = compats.map((item) => ({
                            name: Object.values(item)[0],
                            version: Object.values(item)[1]
                        }));
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
        searchParams.set("version",appVersion);
        let newUrl = `${window.location.origin}${window.location.pathname}?${searchParams}`;
        window.location.href = newUrl;
    }
    
}
