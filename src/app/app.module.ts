import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app.material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CompPageComponent } from './pages/comp/comp.page';
import { DarkModeToggle } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home/home.page';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReleasePageComponent } from './pages/release/release.page';
import { StatusTrackerBadgeComponent } from './components/status-tracker-badge/status-tracker-badge.component';
import { SystemtestSummaryComponent } from './components/systemtest-summary/systemtest-summary.component';
import { CompatibilitiesService } from './services/compatibilities/compatibilities.service';

@NgModule({
	declarations: [
		AppComponent,
		CapitalizePipe,
		CompPageComponent,
		HomePageComponent,
		ReleasePageComponent,
		SystemtestSummaryComponent,
  		DarkModeToggle,
    	StatusTrackerBadgeComponent,
     	DialogComponent
	],
	imports: [
		AppMaterialModule,
		appRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatChipsModule,
		MatDividerModule,
		MatExpansionModule,
		MatIconModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatSelectModule,
		MatTableModule,
		ReactiveFormsModule
	],
	providers: [
		Title,
		CompatibilitiesService
	],
	bootstrap: [AppComponent]
})
export class AppModule { 

}

//platformBrowserDynamic().bootstrapModule(AppModule);