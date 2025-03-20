import { Routes } from '@angular/router';
import { DataDisplayComponent } from './data-display/data-display.component';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: DataDisplayComponent},
    { path: 'error', component: ErrorComponent},
    { path: "**", component: NotFoundComponent},
];
