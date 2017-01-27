/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardEcm, AuthGuardBpm } from 'ng2-alfresco-core';

import {
    FilesComponent,
    UploadButtonComponent,
    SearchComponent,
    LoginDemoComponent,
    ActivitiDemoComponent,
    SettingComponent
} from './components/index';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientDetailsComponent } from './components/patients/patientdetails.component';
import { CreatePatientComponent } from './components/patients/createpatient.component';
import { StartVisitComponent } from './components/visit/start-visit.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginDemoComponent },
    {
        path: '',
        component: LoginDemoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: PatientsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'files',
        component: FilesComponent,
        canActivate: [AuthGuardEcm]
    },
    {
        path: 'files/:id',
        component: FilesComponent,
        canActivate: [AuthGuardEcm]
    },
    {
        path: 'uploader',
        component: UploadButtonComponent,
        canActivate: [AuthGuardEcm]
    },
    {
        path: 'login',
        component: LoginDemoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuardEcm]
    },
    {
        path: 'visits',
        component: ActivitiDemoComponent,
        canActivate: [AuthGuardBpm]
    },
    {
        path: 'patientdetails/:id',
        component: PatientDetailsComponent,
        canActivate: [AuthGuardBpm]
    },
    {
        path: 'createpatient',
        component: CreatePatientComponent,
        canActivate: [AuthGuardBpm]
    },
    {
        path: 'startvisit/:id',
        component: StartVisitComponent,
        canActivate: [AuthGuardBpm]
    },
    {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuardBpm]
    },
    { path: 'settings', component: SettingComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
