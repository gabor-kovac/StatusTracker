import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ReleaseList } from '../../data/releaseData';
import { Router } from "@angular/router";
import { ApplicationRelease, Test } from "src/app/classes/Release";
import { dateSort } from "src/app/misc/functions";

@Component({
    templateUrl: 'release.page.html',
    styleUrls: ['release.page.scss']
})

export class ReleasePageComponent implements OnInit{
    
    applicationReleaseList: ApplicationRelease[] = ReleaseList;

    initialPageSize = 5;

    constructor(private title: Title, private router: Router){
        this.applicationReleaseList = this.applicationReleaseList.filter((value) => value.releases.length);

        this.applicationReleaseList.forEach((app) => {
            app.releases.forEach((release) => {
                release.tests.forEach((test: any) => {
                    const regex = /(\d\d\d\d-\d\d-\d\d_\d\d_\d\d_\d\d)/;
                    const dateString = test.testFile.match(regex)[0];

                    const dateArray = dateString.split('_')[0].split('-').map(Number);
                    const timeArray = dateString.split('_').map(Number);
                    timeArray.shift();

                    const dateTime = new Date(dateArray[0],dateArray[1] -1 ,dateArray[2],timeArray[0], timeArray[1], timeArray[2])

                    test.dateTime = dateTime;

                    release.releaseStatus = test.summary['@outcome'];
                });
            });
        })


        this.applicationReleaseList.forEach((app) => {
            app.releases.forEach((release) => {
                release.tests.sort((a: any, b: any) => dateSort(a.dateTime, b.dateTime));
                release.tests.reverse();

                try {
                    if(release.tests[0]?.summary){
                        release.releaseStatus = release.tests[0].summary['@outcome'];
                    }
                }catch(e){
                    console.error(`Can't read releaseStatus of ${app.applicationName}:${release.release}, ${e}`);
                }

                release.pageSize = (release.tests.length < this.initialPageSize) ? release.tests.length : this.initialPageSize;
            });
        });
    }

    ngOnInit(){
        this.title.setTitle("ST - Releases");
        this.applicationReleaseList.forEach((app) => {
            app.releases.forEach((release) => {
                this.updateDisplayedTests(0, release.tests, release.release, release.pageSize);
            });
        });
    }

    onPageChange(event: any, content: Test[], release: string){
        this.updateDisplayedTests(event.pageIndex * event.pageSize, content, release, event.pageSize);
    }

    updateDisplayedTests(startIndex: number, content: Test[], releaseName: string, selectedPageSize: number){
        if(!content?.length) return;
  
        this.applicationReleaseList.forEach((app) => {
            app.releases.forEach((release) => {
                if(release.release === releaseName){
                    release.displayedTests = content.slice(startIndex, startIndex + selectedPageSize);
                }
            });
        });
    }

    goHome(){
        this.router.navigateByUrl('');
    }
}