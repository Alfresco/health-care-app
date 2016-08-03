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
import { Http } from '@angular/http';

declare let __moduleName: string;
declare let AlfrescoApi: any;

@Component({
    moduleId: __moduleName,
    selector: 'createuser-component',
    templateUrl: './createuser.component.html',
    styleUrls: ['./createuser.component.css'],
    providers: [FormService],
    directives: [ActivitiForm]
})
export class CreateUser {

    currentPath: string = '/Sites/swsdp/documentLibrary';

    metadata: any;

    constructor(private http: Http, private authService: AlfrescoAuthenticationService) {

        var fileOrFolderId = 'd5250698-0092-4073-a62a-6b4251831e08';
        var self = this;
        this.authService.getAlfrescoApi().nodes.getNodeInfo(fileOrFolderId).then(function (data) {
            console.log(data.properties);
            self.metadata = data.properties;
        }, function (error) {
            console.log('This node does not exist');
        });

    }

    saveMetadata(data: any) {
        console.log(data);
        let body = {
            name: data.firstName,
            nodeType: 'hc:patientFolder',
            properties: {},
            relativePath: this.currentPath
        };

        for (var key in data) {
            console.log(key + ' => ' + data[key]);
            body.properties['hc:' + key] = data[key];
        }

        let opts = {};

        this.authService.getAlfrescoApi().nodes.addNode('-root-', body, opts).then(
            (data) => {
                console.log('The folder is created in root', data);
                console.log(data.entry.id);
                console.log(data.entry.name);
                console.log(data.entry.nodeType);
            },
            (err) => {
                window.alert('See console output for error details');
                console.log(err);
            }
        );
    }
}
