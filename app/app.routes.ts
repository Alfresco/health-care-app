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

import { provideRouter, RouterConfig } from '@angular/router';

import {
    FilesComponent,
    UploadButtonComponent,
    SearchComponent,
    LoginDemoComponent,
    ActivitiDemoComponent
} from './components/index';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientDetailsComponent } from './components/patients/patientdetails.component';
import { CreatePatientComponent } from './components/patients/createpatient.component';
import { StartVisitComponent } from './components/visit/start-visit.component';

export const routes: RouterConfig = [
    { path: 'home', component: PatientsComponent },
    { path: 'files', component: FilesComponent },
    { path: '', component: LoginDemoComponent },
    { path: 'uploader', component: UploadButtonComponent },
    { path: 'login', component: LoginDemoComponent },
    { path: 'search', component: SearchComponent },
    { path: 'visits', component: ActivitiDemoComponent },
    { path: 'patientdetails/:id', component: PatientDetailsComponent },
    { path: 'createpatient', component: CreatePatientComponent },
    { path: 'patientdetails/:id', component: PatientDetailsComponent },
    { path: 'startvisit/:id', component: StartVisitComponent },
    { path: 'patients', component: PatientsComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];
