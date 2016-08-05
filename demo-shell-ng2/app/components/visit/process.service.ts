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

import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlfrescoAuthenticationService,AlfrescoSettingsService } from 'ng2-alfresco-core';
import { FormModel, FormOutcomeModel } from './widgets/widget.model';

import { IProcess } from './process';


@Injectable()
export class ProcessService {

    constructor(private http: Http,
                private authService: AlfrescoAuthenticationService,
                private alfrescoSettingsService: AlfrescoSettingsService) {
    }

    getProcessDefinitions(): Observable<IProcess[]> {
        let url = `${this.alfrescoSettingsService.bpmHost}/activiti-app/api/enterprise/process-definitions`;
        let options = this.getRequestOptions();
        return this.http
            .get(url, options)
            .map((response: Response) => <IProduct[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProcessDefinitionByName(name: string): Observable<IProcess> {
        console.log("NAME :"+name);
        return this.getProcessDefinitions()
            .map( (processes: IProduct[]) => <IProduct> processes.data.find(p => p.name === name))
            .do(response => console.log('PEP: ' +  JSON.stringify(response)));
    }

    getStartFormForProcess(processDefinitionId: string): Observable<any> {
        let url = `${this.alfrescoSettingsService.bpmHost}/activiti-app/api/enterprise/process-definitions/${processDefinitionId}/start-form`;
        let options = this.getRequestOptions();
        return this.http
                    .get(url, options)
                    .map((response: Response) => response.json())
                    .do(data => console.log('FORM: ' +  JSON.stringify(data)))
                    .catch(this.handleError);
    }

    getStartFormForProcessNamed(processName: string): Observable<any>{
        this.getProcessDefinitionByName(processName)
            .map((process: IProcess) => <IProduct> this.getStartFormForProcess(process.id) )
            .do(response => console.log('STPE: ' +  JSON.stringify(response)))
            .catch(this.handleError);
    }

    startProcessByID(processDefinitionId : string): void {
        let url = `${this.alfrescoSettingsService.bpmHost}/activiti-app/api/enterprise/process-instances`;
        let options = this.getRequestOptions();
        let body = JSON.stringify({ processDefinitionId:processDefinitionId, name:'TEST'});
        console.log(body);
        return this.http
                    .post(url, body, options)
                    .map((response: Response) => response.json())
                    .do(data => console.log('START PROCESS: ' +  JSON.stringify(data)))
                    .catch(this.handleError);
    }


    private getHeaders(): Headers {
        return new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.authService.getTicket('BPM')
        });
    }

    private getRequestOptions(): RequestOptions {
        let headers = this.getHeaders();
        return new RequestOptions({headers: headers});
    }

    private getFormId(res: Response) {
        let body = res.json();
        return body.data[0].id || {};
    }

    private toJson(res: Response) {
        let body = res.json();
        return body || {};
    }

    private toJsonArray(res: Response) {
        let body = res.json();
        return body.data || [];
    }

    private handleError(error: any) {
        console.log("ERROR");
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
