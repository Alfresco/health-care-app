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
import { Router } from '@angular/router';
import { LogService } from 'ng2-alfresco-core';

@Component({
    selector: 'login-demo',
    templateUrl: './login-demo.component.html'
})
export class LoginDemoComponent {

    providers: string = 'ALL';

    constructor(public router: Router,
                private logService: LogService) {
    }

    onLogin($event) {
        localStorage.setItem('username', $event.username);
        this.router.navigate(['/home']);
    }

    onError($event) {
        this.logService.error($event);
    }
}
