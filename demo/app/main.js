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
System.register(['@angular/platform-browser-dynamic', '@angular/router-deprecated', '@angular/http', 'ng2-alfresco-search', 'ng2-alfresco-core', 'ng2-alfresco-upload', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, router_deprecated_1, http_1, ng2_alfresco_search_1, ng2_alfresco_core_1, ng2_alfresco_upload_1, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_alfresco_search_1_1) {
                ng2_alfresco_search_1 = ng2_alfresco_search_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            },
            function (ng2_alfresco_upload_1_1) {
                ng2_alfresco_upload_1 = ng2_alfresco_upload_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                router_deprecated_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                ng2_alfresco_core_1.ALFRESCO_CORE_PROVIDERS,
                ng2_alfresco_search_1.ALFRESCO_SEARCH_PROVIDERS,
                ng2_alfresco_upload_1.UploadService
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map