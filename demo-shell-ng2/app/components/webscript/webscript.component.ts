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
import {
    CONTEXT_MENU_DIRECTIVES
} from 'ng2-alfresco-core';

import { WEBSCRIPTCOMPONENT } from 'ng2-alfresco-webscript';

@Component({
    selector: 'alfresco-webscript-demo',
    template: `
                <label for="token"><b>Insert a scriptPath</b></label><br>
                <input id="token" type="text" size="48"  [(ngModel)]="scriptPath"><br>
                <label for="token"><b>Insert a contextRoot</b></label><br>
                <input id="token" type="text" size="48"  [(ngModel)]="contextRoot"><br>
                <label for="token"><b>Insert a servicePath</b></label><br>
                <input id="token" type="text" size="48"  [(ngModel)]="servicePath"><br>
            <alfresco-webscript-get [scriptPath]="scriptPath"
                           [scriptArgs]="scriptArgs"
                           [contextRoot]="contextRoot"
                           [servicePath]="servicePath"
                           [contentType]="'HTML'"
                           (onSuccess)= "logData($event)"></alfresco-webscript-get>
    `,
    directives: [WEBSCRIPTCOMPONENT, CONTEXT_MENU_DIRECTIVES]
})
export class WebscriptComponent {

    currentPath: string = '/';

    authenticated: boolean;

    host: string = 'http://127.0.0.1:8080';

    scriptPath: string = 'sample/folder/Company%20Home';

    contextRoot: string = 'alfresco';

    servicePath: string = 'service';

    scriptArgs: string = '';

    logData(data) {
        console.log(data);
    }
}
