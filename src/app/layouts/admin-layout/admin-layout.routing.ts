import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { loginComponent } from 'app/pages/Login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login',      component: loginComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    
];
