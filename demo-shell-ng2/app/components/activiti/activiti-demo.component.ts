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
import { NotificationService } from '../../services/notification.service';
import { ALFRESCO_ULPOAD_COMPONENTS } from 'ng2-alfresco-upload';

declare let __moduleName: string;
declare var componentHandler;

@Component({
    moduleId: __moduleName,
    selector: 'activiti-demo',
    templateUrl: './activiti-demo.component.html',
    styleUrls: ['./activiti-demo.component.css'],
    providers: [ProcessService],
    directives: [ALFRESCO_ULPOAD_COMPONENTS, ALFRESCO_TASKLIST_DIRECTIVES, ActivitiForm]
})
export class ActivitiDemoComponent implements OnInit, AfterViewChecked {

    currentPath: string = '/Sites/swsdp/documentLibrary';

    uploadPath: string;

    currentChoice: string = 'task-list';

    @ViewChild('activitidetails')
    activitidetails: any;

    @ViewChild('activititasklist')
    activititasklist: any;

    currentTaskId: string;

    schemaColumn: any [] = [];

    taskFilter: any;

    appId: string;

    taskCompleted: boolean = false;

    folderId: string;

    setChoice($event) {
        this.currentChoice = $event.target.value;
    }

    isProcessListSelected() {
        return this.currentChoice === 'process-list';
    }

    isTaskListSelected() {
        return this.currentChoice === 'task-list';
    }

    showUploader() {
        return !this.isTaskCompleted() && this.currentTaskId;
    }

    constructor(private processService: ProcessService, private http: Http, public alfrescoSettingsService: AlfrescoSettingsService,
                private authService: AlfrescoAuthenticationService,
                private notificationService: NotificationService) {
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
                        this.activititasklist.load(this.taskFilter);
                        this.currentTaskId = null;
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

    saveData(data: any) {
        this.notificationService.sendNotification('Task Saved');
    }

    formLoaded(data: any) {
        console.log('formLoaded', data);

        this.uploadPath = this.currentPath + '/' + data.nodeId + '/visit - ' + this.currentTaskId;

        let body = {
            name: 'visit - ' + this.currentTaskId,
            nodeType: 'vsd:visitdata',
            relativePath: this.currentPath + '/' + data.nodeId
        };

        this.createFolder(body, {});
    }

    saveMetadata(data: any) {

        let body = {
            name: 'visit - ' + this.currentTaskId,
            properties: {},
            relativePath: this.currentPath + '/' + data.nodeId
        };

        for (var key in data) {
            if (data[key]) {
                body.properties['vsd:' + key] = data[key];
            }
        }

        this.authService.getAlfrescoApi().nodes.updateNode(this.folderId, body, {}).then(
            (data) => {
                console.log(data);
                this.taskCompleted = true;
                this.activititasklist.load(this.taskFilter);
                this.notificationService.sendNotification('Task Completed');
            },
            (err) => {
                console.log(err);
            }
        );
    }

    createFolder(body: any, opts: any) {
        var self = this;
        this.authService.getAlfrescoApi().core.searchApi.liveSearchNodes(this.currentTaskId, opts).then(function (data) {
            if (data.list.entries.length === 0) {
                self.authService.getAlfrescoApi().nodes.addNode('-root-', body, opts).then(
                    (data) => {
                        console.log('folderId', data.entry.id);
                        self.folderId = data.entry.id;
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            } else {
                self.folderId = data.list.entries[0].entry.id;
            }
        }, function (error) {
            console.error(error);
        });
    }

    ngOnInit() {

    }

    isTaskCompleted() {
        return this.taskCompleted;
    }

    onRowClick(taskId) {
        if (taskId) {
            this.currentTaskId = taskId;
            this.taskCompleted = false;
            if (this.activitidetails) {
                this.activitidetails.loadDetails(taskId);
            }
        }
    }

    ngAfterViewChecked() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

}
