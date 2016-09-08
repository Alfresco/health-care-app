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
import { Http } from '@angular/http';
import { AlfrescoSettingsService, AlfrescoAuthenticationService } from 'ng2-alfresco-core';
import { ActivitiTaskListService } from 'ng2-activiti-tasklist';
import { NotificationService } from '../../services/notification.service';
import { ALFRESCO_ULPOAD_COMPONENTS } from 'ng2-alfresco-upload';

declare let __moduleName: string;
declare let componentHandler;

@Component({
    moduleId: __moduleName,
    selector: 'activiti-demo',
    templateUrl: './activiti-demo.component.html',
    styleUrls: ['./activiti-demo.component.css'],
    providers: [ProcessService, ActivitiTaskListService],
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

    alfrescoApi: any = this.authService.getAlfrescoApi();

    processInstanceId: string;

    processDefinitionId: string;

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
                private notificationService: NotificationService,
                private activitiTaskListService: ActivitiTaskListService) {
        console.log('Activiti demo component');
        this.schemaColumn = [
            {type: 'text', key: 'name', title: 'Visit Type', cssClass: 'full-width name-column', sortable: true},
            {type: 'text', key: 'description', title: 'Name', sortable: true}
        ];


        this.processService.getDeployedApplication('Visit').subscribe(
            application => {
                this.appId = application.id;
                this.activitiTaskListService.getTaskListFilters(application.id).subscribe(
                    response => {
                        this.taskFilter = response[0];
                        this.activititasklist.load(this.taskFilter);
                        this.currentTaskId = null;
                    },
                    error => console.log(error)
                );
            },
            error => console.log(error)
        );
    }

    saveData(data: any) {
        this.notificationService.sendNotification('Task Saved');
    }

    formLoaded(formModel: any) {
        let data = formModel.values;
        console.log('formLoaded', data);

        this.uploadPath = this.currentPath + '/' + data.nodeId + '/visit - ' + this.currentTaskId;

        let body = {
            name: 'visit - ' + this.currentTaskId,
            nodeType: 'vsd:visitdata',
            relativePath: this.currentPath + '/' + data.nodeId
        };

        this.createFolder(body, {});
    }

    saveMetadata(formModel: any) {
        let data = formModel.values;
        let body = {
            name: 'visit - ' + this.currentTaskId,
            properties: {},
            relativePath: this.currentPath + '/' + data.nodeId
        };

        for (let key in data) {
            if (data[key]) {
                body.properties['vsd:' + key] = data[key];
            }
        }

        this.alfrescoApi.nodes.updateNode(this.folderId, body, {}).then(
            (node) => {
                console.log(node);
                this.updateDescriptionTaskWithNamePatient(formModel);
            },
            (err) => {
                console.log(err);
            }
        );


    }

    createFolder(body: any, opts: any) {
        let self = this;
        this.alfrescoApi.core.searchApi.liveSearchNodes(this.currentTaskId, opts).then(function (data) {
            if (data.list.entries.length === 0) {
                self.alfrescoApi.nodes.addNode('-root-', body, opts).then(
                    (node) => {
                        console.log('folderId', node.entry.id);
                        self.folderId = node.entry.id;
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
        console.log('init');
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

    private updateDescriptionTaskWithNamePatient(formModel: any) {
        let self = this;
        this.alfrescoApi.activiti.taskApi.getTask(this.currentTaskId).then(function (data) {
            self.processService.getTaskIdFromProcessID(data.processDefinitionId, self.appId, data.processInstanceId).subscribe(
                response => {
                    self.alfrescoApi.activiti.taskApi.updateTask(response.data[0].id,
                        {description: formModel.values.firstName + ' ' + formModel.values.lastName}).then(function (data) {
                        self.taskCompleted = true;
                        self.activititasklist.load(self.taskFilter);
                        self.notificationService.sendNotification('Task Completed');
                    });
                },
                error => {
                    console.log(error);
                }
            );
        }, function (error) {
            console.log('Error' + error);
        });
    }
}
