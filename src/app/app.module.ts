import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app.material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home.page';
import { CompPageComponent } from './pages/comp/comp.page';
import { ReleasePageComponent } from './pages/release/release.page';
import { DarkModeToggle } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { StatusTrackerBadgeComponent } from './components/status-tracker-badge/status-tracker-badge.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SystemtestSummaryComponent } from './components/systemtest-summary/systemtest-summary.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		CompPageComponent,
		ReleasePageComponent,
  		DarkModeToggle,
    	StatusTrackerBadgeComponent,
     	DialogComponent,
      SystemtestSummaryComponent
	],
	imports: [
		appRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatNativeDateModule,
		AppMaterialModule,
		MatButtonModule,
		MatTableModule,
		MatExpansionModule,
		MatDividerModule,
		MatPaginatorModule,
		MatCardModule,
		MatChipsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatIconModule
	],
	providers: [
		Title
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);