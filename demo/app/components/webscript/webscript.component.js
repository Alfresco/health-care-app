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
System.register(['@angular/core', 'ng2-alfresco-core', 'ng2-alfresco-webscript'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ng2_alfresco_core_1, ng2_alfresco_webscript_1;
    var WebscriptComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            },
            function (ng2_alfresco_webscript_1_1) {
                ng2_alfresco_webscript_1 = ng2_alfresco_webscript_1_1;
            }],
        execute: function() {
            WebscriptComponent = (function () {
                function WebscriptComponent() {
                    this.currentPath = '/';
                    this.host = 'http://127.0.0.1:8080';
                    this.scriptPath = 'sample/folder/Company%20Home';
                    this.contextRoot = 'alfresco';
                    this.servicePath = 'service';
                    this.scriptArgs = '';
                }
                WebscriptComponent.prototype.logData = function (data) {
                    console.log(data);
                };
                WebscriptComponent = __decorate([
                    core_1.Component({
                        selector: 'alfresco-webscript-demo',
                        template: "\n                <label for=\"token\"><b>Insert a scriptPath</b></label><br>\n                <input id=\"token\" type=\"text\" size=\"48\"  [(ngModel)]=\"scriptPath\"><br>\n                <label for=\"token\"><b>Insert a contextRoot</b></label><br>\n                <input id=\"token\" type=\"text\" size=\"48\"  [(ngModel)]=\"contextRoot\"><br>\n                <label for=\"token\"><b>Insert a servicePath</b></label><br>\n                <input id=\"token\" type=\"text\" size=\"48\"  [(ngModel)]=\"servicePath\"><br>\n            <alfresco-webscript-get [scriptPath]=\"scriptPath\"\n                           [scriptArgs]=\"scriptArgs\"\n                           [contextRoot]=\"contextRoot\"\n                           [servicePath]=\"servicePath\"\n                           [contentType]=\"'HTML'\"\n                           (onSuccess)= \"logData($event)\"></alfresco-webscript-get>\n    ",
                        directives: [ng2_alfresco_webscript_1.WEBSCRIPTCOMPONENT, ng2_alfresco_core_1.CONTEXT_MENU_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], WebscriptComponent);
                return WebscriptComponent;
            }());
            exports_1("WebscriptComponent", WebscriptComponent);
        }
    }
});
//# sourceMappingURL=webscript.component.js.map