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
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ProcessService } from './process.service';
import { IProcess } from './process';

import { FormService, ActivitiForm } from 'ng2-activiti-form';

declare let __moduleName: string;
declare let AlfrescoApi: any;

@Component({
    moduleId: __moduleName,
    selector: 'startVisit-component',
    templateUrl: './startVisit.component.html',
    providers: [ProcessService, FormService],
    directives: [ActivitiForm]
})

export class StartVisitComponent {

    private sub: Subscription;

    currentPath: string = '/Sites/swsdp/documentLibrary';

    metadata: any = {};

    nodeId: string;

    errorMessage: string;

    processName: string = "TEST";

    process: IProcess;

    taskId: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private processService: ProcessService,
                private authService: AlfrescoAuthenticationService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.retriveNodeMetadataFromEcm(params['id']);
        });


        this.processService.startProcessByID("health_care_express_process:3:10004", "Health Care Express process");
        let self = this;
        this.processService.getDeployedApplications("Visit").subscribe(
            application => {
                console.log("I'm the application hello", application);
                this.processService.getProcessDefinitionByApplication(application).subscribe(
                    process => {
                        console.log("this is the process", process);
                        self.processService.startProcessByID(process.id, process.name).subscribe(
                            startedProcess => {
                                console.log(startedProcess);
                                this.processService.getTaskIdFromProcessID(process.id, application.id, startedProcess.id).subscribe(
                                    response => {
                                        console.log(response.data[0].id);
                                        self.taskId = response.data[0].id;
                                    },
                                    error => {
                                        console.log(error)
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

    private retriveNodeMetadataFromEcm(nodeId: string): void {
        var self = this;
        this.nodeId = nodeId;
        this.authService.getAlfrescoApi().nodes.getNodeInfo(this.nodeId).then(function (data) {
            console.log(data.properties);

            for (var key in data.properties) {
                console.log(key + ' => ' + data[key]);
                self.metadata [key.replace('hc:', '')] = data.properties[key];
            }

        }, function (error) {
            console.log('This node does not exist');
        });
    }


}
