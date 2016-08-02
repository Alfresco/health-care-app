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

import { Component} from '@angular/core';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';
import { FormService, ActivitiForm } from 'ng2-activiti-form';
import { Response, Http, Headers, RequestOptions } from '@angular/http';

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

    constructor(private http: Http, private authService: AlfrescoAuthenticationService) {

    }

    createFolder(folderName:string){
        this.authService.getAlfrescoApi().nodes.createFolderAutoRename(folderName).then(function (data) {
            console.log('The folder is created in root', data);
            console.log(data.entry.id);
            console.log(data.entry.name);
            console.log(data.entry.nodeType);
        }, function (error) {
            console.log('Error in creation of this folder or folder already exist' + error);
        });
    }

    custom(data: any){
        console.log(data);
        let body = JSON.stringify(data);

        return this.http
            .post('http://supermario.com', body);

        this.createFolder(data.value.name);
    }
}
