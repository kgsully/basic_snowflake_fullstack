import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HousesComponent } from './houses/houses.component';
import { HouseDetailComponent } from './houses/house-detail/house-detail.component';

export const routes: Routes = [
    { path: '', component: HousesComponent},
    { path: 'houses/:houseName', component: HouseDetailComponent},
    { path: 'houses', component: HousesComponent},
    { path: 'events', component: EventsComponent},
    { path: 'error', component: ErrorComponent},
    { path: "**", component: NotFoundComponent},
];
