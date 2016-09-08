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
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ProcessService } from './process.service';

import { ATIVITI_FORM_PROVIDERS, ActivitiForm } from 'ng2-activiti-form';
import { NotificationService } from '../../services/notification.service';

declare let __moduleName: string;
declare let AlfrescoApi: any;

@Component({
    moduleId: __moduleName,
    selector: 'start-visit-component',
    templateUrl: './start-visit.component.html',
    styleUrls: ['./start-visit.component.css'],
    providers: [ProcessService, ATIVITI_FORM_PROVIDERS],
    directives: [ActivitiForm]
})

export class StartVisitComponent {

    sub: Subscription;

    currentPath: string = '/Sites/swsdp/documentLibrary';

    metadata: any = {};

    nodeId: string;

    nodeName: string;

    errorMessage: string;

    process: any;

    taskId: string;

    application: any;

    startedProcess: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private processService: ProcessService,
                private authService: AlfrescoAuthenticationService,
                private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.retriveNodeMetadataFromEcm(params['id']);
        });

        this.processService.getDeployedApplication('Visit').subscribe(
            application => {
                this.application = application;
                this.processService.getProcessDefinitionByApplication(application).subscribe(
                    process => {
                        this.process = process;
                        this.processService.startProcessByID(process.id, process.name).subscribe(
                            startedProcess => {
                                console.log(startedProcess);
                                this.startedProcess = startedProcess;
                                this.processService.getTaskIdFromProcessID(process.id, application.id, startedProcess.id).subscribe(
                                    response => {
                                        console.log(response.data[0].id);
                                        this.taskId = response.data[0].id;
                                        this.authService.getAlfrescoApi().activiti.taskApi.updateTask(response.data[0].id, {description: 'test'});

                                    },
                                    error => {
                                        console.log(error);
                                    }
                                );
                            },
                            error => {
                                console.log(error);
                            }
                        );
                    },
                    error => this.errorMessage = <any>error
                );
                console.log(application);
            },
            error => this.errorMessage = <any>error
        );
    }

    public saveData(formModel: any) {
        this.updateDescriptionTaskWithNamePatient(formModel);
        this.router.navigate(['/patients']);
        this.notificationService.sendNotification('New Visit Created');
    }

    public onErrorEmitter(error: any) {
        this.notificationService.sendNotification('Validation Error');
    }

    private retriveNodeMetadataFromEcm(nodeId: string): void {
        let self = this;
        this.nodeId = nodeId;
        this.authService.getAlfrescoApi().nodes.getNodeInfo(this.nodeId).then(function (data) {
            console.log(data.properties);
            self.nodeName = data.name;
            for (let key in data.properties) {
                if (key) {
                    self.metadata [key.replace('hc:', '')] = data.properties[key];
                }
            }
            self.metadata.nodeId = self.nodeName;

        }, function (error) {
            console.log('This node does not exist', error);
        });
    }

    private updateDescriptionTaskWithNamePatient(formModel: any) {
        this.processService.getTaskIdFromProcessID(this.process.id, this.application.id, this.startedProcess.id).subscribe(
            response => {
                this.authService.getAlfrescoApi().activiti.taskApi.updateTask(response.data[0].id,
                    {description: formModel.values.firstName + ' ' + formModel.values.lastName});
            },
            error => {
                console.log(error);
            }
        );
    }
}
