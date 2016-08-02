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

@Injectable()
export class AlfrescoSettingsService {

    static DEFAULT_HOST_ADDRESS: string = 'http://127.0.0.1:8080';
    static DEFAULT_CONTEXT_PATH: string = '/alfresco';
    static DEFAULT_BASE_API_PATH: string = '/api/-default-/public/alfresco/versions/1';

    private _host: string = AlfrescoSettingsService.DEFAULT_HOST_ADDRESS;
    private _contextPath = AlfrescoSettingsService.DEFAULT_CONTEXT_PATH;
    private _apiBasePath: string = AlfrescoSettingsService.DEFAULT_BASE_API_PATH;

    public get host(): string {
        return this._host;
    }

    public set host(value: string) {
        this._host = value;
    }

    getApiBaseUrl(): string {
        return this._host + this._contextPath + this._apiBasePath;
    }
}
