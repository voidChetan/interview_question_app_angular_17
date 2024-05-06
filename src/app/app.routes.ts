import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component:HomeComponent,
        title:'Home'
    },
    {
        path:'projects',
        component:ProjectsComponent,
        title:'Youtube-Projects'
    }

];
