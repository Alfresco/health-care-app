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
System.register(['@angular/core', 'ng2-activiti-form'], function(exports_1, context_1) {
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
    var core_1, ng2_activiti_form_1;
    var ActivitiDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_activiti_form_1_1) {
                ng2_activiti_form_1 = ng2_activiti_form_1_1;
            }],
        execute: function() {
            ActivitiDemoComponent = (function () {
                function ActivitiDemoComponent(formService) {
                    this.formService = formService;
                    this.tasks = [];
                }
                ActivitiDemoComponent.prototype.hasTasks = function () {
                    return this.tasks && this.tasks.length > 0;
                };
                ActivitiDemoComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.formService.getTasks().subscribe(function (val) { return _this.tasks = val || []; });
                };
                ActivitiDemoComponent.prototype.ngAfterViewChecked = function () {
                    // workaround for MDL issues with dynamic components
                    if (componentHandler) {
                        componentHandler.upgradeAllRegistered();
                    }
                };
                ActivitiDemoComponent.prototype.onTaskClicked = function (task, e) {
                    this.selectedTask = task;
                };
                ActivitiDemoComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'activiti-demo',
                        templateUrl: './activiti-demo.component.html',
                        styleUrls: ['./activiti-demo.component.css'],
                        directives: [ng2_activiti_form_1.ActivitiForm],
                        providers: [ng2_activiti_form_1.FormService]
                    }), 
                    __metadata('design:paramtypes', [ng2_activiti_form_1.FormService])
                ], ActivitiDemoComponent);
                return ActivitiDemoComponent;
            }());
            exports_1("ActivitiDemoComponent", ActivitiDemoComponent);
        }
    }
});
//# sourceMappingURL=activiti-demo.component.js.map