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

import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { ALFRESCO_TASKLIST_DIRECTIVES } from 'ng2-activiti-tasklist';
import { ActivitiForm } from 'ng2-activiti-form';
import { ProcessService } from '../visit/process.service';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AlfrescoSettingsService, AlfrescoAuthenticationService } from 'ng2-alfresco-core';

declare let __moduleName: string;
declare var componentHandler;

@Component({
    moduleId: __moduleName,
    selector: 'activiti-demo',
    templateUrl: './activiti-demo.component.html',
    styleUrls: ['./activiti-demo.component.css'],
    providers: [ProcessService],
    directives: [ALFRESCO_TASKLIST_DIRECTIVES, ActivitiForm]
})
export class ActivitiDemoComponent implements OnInit, AfterViewChecked {

    currentPath: string = '/Sites/swsdp/documentLibrary';

    currentChoice: string = 'task-list';

    @ViewChild('activitidetails')
    activitidetails: any;

    @ViewChild('activititasklist')
    activititasklist: any;

    currentTaskId: string;

    schemaColumn: any [] = [];

    taskFilter: any;

    appId: string;

    setChoice($event) {
        this.currentChoice = $event.target.value;
    }

    isProcessListSelected() {
        return this.currentChoice === 'process-list';
    }

    isTaskListSelected() {
        return this.currentChoice === 'task-list';
    }

    constructor(private processService: ProcessService, private http: Http, public alfrescoSettingsService: AlfrescoSettingsService,
                private authService: AlfrescoAuthenticationService) {
        console.log('Activiti demo component');
        this.schemaColumn = [
            {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true}
            // {type: 'text', key: 'created', title: 'Created', sortable: true}
        ];


        let self = this;
        this.processService.getDeployedApplications("Visit").subscribe(
            application => {
                self.appId = application.id;
                this.getTaskListFilters(application.id).subscribe(
                    response => {
                        this.taskFilter = response.data[0];
                        this.activititasklist.load(response.data[0]);
                    },
                    error => console.log(error)
                );
            },
            error => this.errorMessage = <any>error
        );
    }

    getTaskListFilters(appId?: string): Observable<any> {
        return Observable.fromPromise(this.callApiTaskFilters(appId))
            .map(res => res.json());
    }

    private callApiTaskFilters(appId?: string) {
        let url = this.alfrescoSettingsService.getBPMApiBaseUrl();
        if (appId) {
            url = url + `/api/enterprise/filters/tasks?appId=${appId}`;
        } else {
            url = url + `/api/enterprise/filters/tasks`;
        }
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        let options = new RequestOptions({headers: headers});

        return this.http
            .get(url, options).toPromise();
    }

    saveMetadata(data: any) {

        let body = {
            name: this.generateUuid(),
            nodeType: 'vs:visit',
            properties: {
                'vs:visittime': 'test'
            },
            relativePath: this.currentPath + '/' + data.nodeId
        };

        for (var key in data) {
            if (data[key]) {
                body.properties['vs:' + key] = data[key];
            }
        }

        let opts = {};

        let self = this;
        this.authService.getAlfrescoApi().nodes.addNode('-root-', body, opts).then(
            (data) => {
                console.log(data);
            },
            (err) => {
                window.alert('See console output for error details');
                console.log(err);
            }
        );
    }

    private generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    ngOnInit() {

    }

    onRowClick(taskId) {
        this.currentTaskId = taskId;
    }

    ngAfterViewChecked() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}
