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

export class ProcessInstance {

    public businessKey: string;
    public ended: any;
    public graphicalNotationDefined: boolean;
    public id: string;
    public name: string;
    public processDefinitionCategory: string;
    public processDefinitionDeploymentId: string;
    public processDefinitionDescription: string;
    public processDefinitionId: string;
    public processDefinitionKey: string;
    public processDefinitionName: string;
    public processDefinitionVersion: number;
    public startFormDefined: boolean;
    public started: string;
    public startedBy: any;
    public suspended: boolean;
    public tenantId: string;
    public variables: any;

}
