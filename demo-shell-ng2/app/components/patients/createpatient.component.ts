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

import { Component } from '@angular/core';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';
import { FormService, ActivitiForm } from 'ng2-activiti-form';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ALFRESCO_ULPOAD_COMPONENTS } from 'ng2-alfresco-upload';

declare let __moduleName: string;
declare let AlfrescoApi: any;

@Component({
    moduleId: __moduleName,
    selector: 'createpatient-component',
    templateUrl: './createpatient.component.html',
    styleUrls: ['./createpatient.component.css'],
    providers: [FormService],
    directives: [ALFRESCO_ULPOAD_COMPONENTS, ActivitiForm]
})
export class CreatePatientComponent {

    currentPath: string = '/Sites/swsdp/documentLibrary';

    metadata: any = {};

    photoNode: string = "";

    constructor(private authService: AlfrescoAuthenticationService, private router: Router,
                private notificationService: NotificationService) {
    }

    public fileUploaded(data){
        this.photoNode = data.value.entry.id;
        console.log(this.photoNode);
    }

    saveMetadata(data: any) {
        let body = {
            name: this.photoNode,
            nodeType: 'hc:patientFolder',
            properties: {},
            relativePath: this.currentPath
        };

        for (var key in data) {
            if(data[key]){
                body.properties['hc:' + key] = data[key];
            }
        }
        let opts = {};

        let self = this;
        this.authService.getAlfrescoApi().nodes.addNode('-root-', body, opts).then(
            (data) => {
                console.log('The folder created', data);
                self.router.navigate(['/patients']);
                this.notificationService.sendNotification('User Created');
            },
            (err) => {
                window.alert('See console output for error details');
                console.log(err);
            }
        );
    }
}
