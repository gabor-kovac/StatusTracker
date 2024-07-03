import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environments';
import { Application, Feature } from '../../classes/Application';
import { CompatibilitiesService } from '../../services/compatibilities/compatibilities.service';
import { Compatibility } from '../../classes/Compatibility';
import { dateSort, parseElapsed, trimToLower } from '../../misc/functions';
import { AppList } from '../../data/applicationData';
import { compareVersions } from 'compare-versions';
import { Router } from '@angular/router';

@Component({
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})

export class HomePageComponent implements OnInit {
	Applications: Application[] = AppList;

	dataSource: MatTableDataSource<Application>;

	branch_age_warning = parseElapsed(environment.branchAgeWarningMs);

	compatibleApps: Compatibility[] = [];

	options: string[] = ['App', 'Common', 'Edge', 'Phone', 'Service'];

	searchValue: string | null = '';

	now: number = Date.now();

	initialPageSize = 5;

	public displayedColumns: string[] = ['name', 'version', 'wikiVersion', 'releaseCandidates', 'tags', 'features', 'updated', 'compatibilities'];

	@ViewChild('paginator') paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(private title: Title, private compatibilitiesService: CompatibilitiesService, private router: Router){
		this.dataSource = new MatTableDataSource(this.Applications);
		this.compatibleApps = this.compatibilitiesService.get();

		this.Applications.forEach(app => {
			try {
				app.releaseCandidates.sort(compareVersions);
				app.releaseCandidates.reverse();

				app.tags.sort(compareVersions);
				app.tags.reverse();

			}catch(e){
				console.log("Sorting failed for: "+app.name+', '+e);
			}

			if(app.features){
				app.features.sort((a, b) => dateSort(b.last_commit_date, a.last_commit_date));

				app.features.forEach((feature: Feature) => {
					feature["last_commit_sha"] = feature["last_commit_sha"].substr(0,6);
					let last_commit_date = new Date(feature.last_commit_date);
					let last_commit_delta = this.now - last_commit_date.getTime();

					// Flag app and features is they're old
					if(last_commit_delta >= environment.branchAgeWarningMs){
						app['old'] = 1;
						feature['old'] = 1;
					}
					feature['last_commit_age'] = parseElapsed(last_commit_delta);

					if(feature.last_commit_scan_date){
						let last_commit_scan_date = new Date(feature.last_commit_scan_date);
						let last_commit_scan_delta = this.now - last_commit_scan_date.getTime();
						feature['last_commit_scan_age'] = parseElapsed(last_commit_scan_delta);
					}

					feature.pull_requests?.forEach(pull_request => {
						let pull_create_date = new Date(pull_request.created_at);
						let pr_delta = this.now - pull_create_date.getTime();
						pull_request['age'] = parseElapsed(pr_delta);
					});
				});
				
			}

			if(app['updated']){
				let info_delta = this.now - app['updated'];
				if(info_delta >= environment.oldInfoWarningDays * 86400000){
					app['old_info'] = 1;
				}
			}

			// If app has compatibilities
			app['compatibilities'] = this.compatibleApps.find(obj => trimToLower(obj.name) === trimToLower(app.name));

			app['pageSize'] = (app.features!.length < this.initialPageSize) ? app.features!.length : this.initialPageSize;
		});
	}

	ngOnInit(){
		this.title.setTitle("ST - Applications");
		this.Applications.forEach((app) => {
			this.updateDisplayedTests(0, app.features!, app.name!, app['pageSize']);
		});
		
		this.sortByDate();
	}

	onPageChange(event: any, content: Feature[], release: string){
        this.updateDisplayedTests(event.pageIndex * event.pageSize, content, release, event.pageSize);
		window.location.href = "#"+release;
    }

	updateDisplayedTests(startIndex: number, content: Feature[], appName: string, selectedPageSize: number){
        if(!content?.length) return;
  
        this.Applications.forEach((app) => {
			if(app.name === appName){
				app['displayedTests'] = content.slice(startIndex, startIndex + selectedPageSize);
			}
        });
    }

	ngAfterViewInit(){
		this.dataSource.sortingDataAccessor = (item, property) => {
			switch(property){
				case 'name': {
					return trimToLower(item.name);
				}
				case 'features': {
					return new Date(item.features![0].last_commit_date);
				}
				default: {
					return item[property];
				}
			}
		}
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	search(filterValue: any){
		if(typeof filterValue !== 'string'){
			filterValue = filterValue.value;
		}
		this.dataSource.filter = trimToLower(filterValue)!;
	}

	goReleases(){
		this.router.navigateByUrl('releases');
	}

	sortByDate(){
		this.dataSource.data.sort((a: Application, b: Application) => dateSort(b.features![0].last_commit_date, a.features![0].last_commit_date));
	}
}