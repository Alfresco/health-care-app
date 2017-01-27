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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AlfrescoApiService, AlfrescoAuthenticationService } from 'ng2-alfresco-core';

@Component({
    selector: 'patient-details',
    templateUrl: './patientdetails.component.html',
    styleUrls: ['./patientdetails.component.css']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {

    sub: Subscription;

    metadata: any = {};

    nodeId: string;

    photoNodeId: string;

    constructor(private route: ActivatedRoute,
                private authService: AlfrescoAuthenticationService,
                private apiService: AlfrescoApiService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.retriveNodeMetadataFromEcm(params['id']);
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private retriveNodeMetadataFromEcm(nodeId: string): void {
        let self = this;
        this.nodeId = nodeId;
        this.apiService.getInstance().nodes.getNodeInfo(this.nodeId, {}).then(function (data) {
                console.log(data.properties);
                self.photoNodeId = data.name;
                for (let key in data.properties) {
                    if (key) {
                        console.log(key + ' => ' + data[key]);
                        self.metadata [key.replace('hc:', '')] = data.properties[key];
                    }
                }

            });
    }
}
