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

import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessService } from '../visit/process.service';
import {
    ActivitiApps,
    ActivitiFilters,
    ActivitiTaskList,
    ActivitiTaskListService,
    FilterRepresentationModel,
    TaskDetailsEvent
} from 'ng2-activiti-tasklist';
import {
    ObjectDataTableAdapter
} from 'ng2-alfresco-datatable';
import { AlfrescoApiService } from 'ng2-alfresco-core';
import { FormModel, FormRenderingService } from 'ng2-activiti-form';
import { /*CustomEditorComponent*/ CustomStencil01 } from './custom-editor/custom-editor.component';
import { MinimalNodeEntity } from 'alfresco-js-api';

import { NotificationService } from '../../services/notification.service';
import {NodeMinimalEntry} from "ng2-alfresco-documentlist";

declare let componentHandler;

@Component({
    selector: 'activiti-demo',
    templateUrl: './activiti-demo.component.html',
    styleUrls: ['./activiti-demo.component.css']
})
export class ActivitiDemoComponent implements OnInit, AfterViewChecked {

    initialPath: string = '/Sites/health-visits/documentLibrary';

    currentFolderId: string;

    uploadFolderId: string;

    currentChoice: string = 'task-list';

    taskListSort: string;

    taskListState: string;

    @ViewChild('activitidetails')
    activitidetails: any;

    @ViewChild(ActivitiTaskList)
    activititasklist: ActivitiTaskList;

    currentTaskId: string;

    taskListAdapter: ObjectDataTableAdapter;

    taskFilter: any;

    appId: string;

    taskCompleted: boolean = false;

    folderId: string;

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

    constructor(private processService: ProcessService,
                private notificationService: NotificationService,
                private activitiTaskListService: ActivitiTaskListService,
                private elementRef: ElementRef,
                private apiService: AlfrescoApiService,
                private formRenderingService: FormRenderingService) {
        console.log('Activiti demo component');
        this.taskListAdapter = new ObjectDataTableAdapter([], [
                {type: 'text', key: 'name', title: 'Visit Type', cssClass: 'full-width name-column', sortable: true},
                {type: 'text', key: 'description', title: 'Name', sortable: true}
            ]
        );

        this.processService.getDeployedApplication('Visit').subscribe(
            application => {
                this.appId = application.id;
                this.activitiTaskListService.getTaskListFilters(application.id).subscribe(
                    (response: FilterRepresentationModel) => {
                        this.taskListState = response.filter.state;
                        this.taskListSort = response.filter.sort;
                        this.currentTaskId = null;
                    },
                    error => console.log(error)
                );
            },
            error => console.log(error)
        );
    }

    saveData(data: FormModel) {
        this.notificationService.sendNotification('Task Saved');
    }

    private getPatientFolderPath(patientFolder: any): string {
        return this.initialPath + '/' + patientFolder.nodeId;
    }

    private getVisitFolderPath(patientFolder: any): string {
        return this.getPatientFolderPath(patientFolder) + '/visit - ' + this.currentTaskId;
    }

    private getPatientFolderData(formData: any): any {
        return {
            name: 'visit - ' + this.currentTaskId,
            relativePath: this.getPatientFolderPath(formData)
        };
    }

    formLoaded(formModel: FormModel) {
        let data = formModel.values;
        console.log('formLoaded', data);
        let customerFolderData = this.getPatientFolderData(data);
        customerFolderData.nodeType = 'vsd:visitdata';
        this.getFolderOrCreate(customerFolderData, {}).then((nodeEntry: NodeMinimalEntry) => {
            this.uploadFolderId = nodeEntry.entry.id;
        });
    }

    saveMetadata(formModel: FormModel) {
        let data = formModel.values;
        let customerFolderData = this.getPatientFolderData(data);
        customerFolderData.properties = {};

        for (let key in data) {
            if (data[key]) {
                customerFolderData.properties['vsd:' + key] = data[key];
            }
        }

        this.apiService.getInstance().nodes.updateNode(this.folderId, customerFolderData, {}).then(
            (node) => {
                console.log(node);
                this.updateDescriptionTaskWithNamePatient(formModel);
            },
            (err) => {
                console.log(err);
            }
        );


    }

    getFolderOrCreate(body: any, opts: any): Promise<NodeMinimalEntry> {
        return this.apiService.getInstance().core.nodesApi.getNode('-root-', {
            relativePath: opts.relativePath
        }).then((nodeEntry) => {
            return Promise.resolve(nodeEntry);
        }, () => {
            return this.apiService.getInstance().nodes.addNode('-root-', body, opts);
        });
    }

    ngOnInit() {
        console.log('init');
    }

    isTaskCompleted() {
        return this.taskCompleted;
    }

    onRowClick(taskId: string) {
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

    private updateDescriptionTaskWithNamePatient(formModel: FormModel) {
        this.apiService.getInstance().activiti.taskApi.getTask(this.currentTaskId).then((data) => {
            this.processService.getTaskIdFromProcessID(data.processDefinitionId, this.appId, data.processInstanceId).subscribe(
                response => {
                    this.apiService.getInstance().activiti.taskApi.updateTask(response.data[0].id,
                        {description: formModel.values['firstName'] + ' ' + formModel.values['lastName']}).then(function (res) {
                        this.taskCompleted = true;
                        this.activititasklist.load(this.taskFilter);
                        this.notificationService.sendNotification('Task Completed');
                    });
                },
                error => {
                    console.log(error);
                }
            );
        }, (error) => {
            console.log('Error' + error);
        });
    }

    ngAfterViewInit() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }

        this.loadStencilScriptsInPageFromActiviti();
    }

    loadStencilScriptsInPageFromActiviti() {
        this.apiService.getInstance().activiti.scriptFileApi.getControllers().then(response => {
            if (response) {
                let s = document.createElement('script');
                s.type = 'text/javascript';
                s.text = response;
                this.elementRef.nativeElement.appendChild(s);
            }
        });
    }
}
