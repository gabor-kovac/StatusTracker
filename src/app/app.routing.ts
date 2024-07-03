import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.page';
import { CompPageComponent } from './pages/comp/comp.page';
import { ReleasePageComponent } from './pages/release/release.page';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'comp', component: CompPageComponent },
    { path: 'releases', component: ReleasePageComponent },

    // redirects
    { path: 'compatibility', redirectTo: 'comp' },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);