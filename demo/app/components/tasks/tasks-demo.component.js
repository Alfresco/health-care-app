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
System.register(['@angular/core', 'ng2-activiti-tasklist', 'ng2-activiti-form', 'ng2-alfresco-datatable'], function(exports_1, context_1) {
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
    var core_1, ng2_activiti_tasklist_1, ng2_activiti_form_1, ng2_alfresco_datatable_1;
    var TasksDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_activiti_tasklist_1_1) {
                ng2_activiti_tasklist_1 = ng2_activiti_tasklist_1_1;
            },
            function (ng2_activiti_form_1_1) {
                ng2_activiti_form_1 = ng2_activiti_form_1_1;
            },
            function (ng2_alfresco_datatable_1_1) {
                ng2_alfresco_datatable_1 = ng2_alfresco_datatable_1_1;
            }],
        execute: function() {
            TasksDemoComponent = (function () {
                function TasksDemoComponent() {
                    this.currentChoice = 'task-list';
                    this.data = new ng2_alfresco_datatable_1.ObjectDataTableAdapter([], []);
                }
                TasksDemoComponent.prototype.setChoice = function ($event) {
                    this.currentChoice = $event.target.value;
                };
                TasksDemoComponent.prototype.isProcessListSelected = function () {
                    return this.currentChoice === 'process-list';
                };
                TasksDemoComponent.prototype.isTaskListSelected = function () {
                    return this.currentChoice === 'task-list';
                };
                TasksDemoComponent.prototype.ngOnInit = function () {
                    var schema = [
                        { type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true }
                    ];
                    var columns = schema.map(function (col) { return new ng2_alfresco_datatable_1.ObjectDataColumn(col); });
                    this.data.setColumns(columns);
                };
                TasksDemoComponent.prototype.onRowClick = function (taskId) {
                    this.currentTaskId = taskId;
                };
                TasksDemoComponent = __decorate([
                    core_1.Component({
                        selector: 'tasks-demo',
                        template: "\n    <div class=\"mdl-grid\">\n      <div class=\"mdl-cell mdl-cell--2-col\"\n      style=\"background-color:#ececec;\n             padding:10px 10px 10px 10px;\n             border-left:solid 2px rgb(31,188,210);\n             border-right : solid 2px rgb(31,188,210);\">\n        <ul class=\"demo-list-item mdl-list\">\n          <li class=\"mdl-list__item\">\n            <span class=\"mdl-list__item-primary-content\">\n              <label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect\" for=\"option-1\">\n                  <input type=\"radio\" value=\"task-list\"\n                     (change)=\"setChoice($event)\" name=\"options\" id=\"option-1\" checked class=\"mdl-radio__button\">\n                  <span class=\"mdl-radio__label\">Task List</span>\n               </label>\n            </span>\n          </li>\n          <li class=\"mdl-list__item\">\n            <label class=\"mdl-radio mdl-js-radio mdl-js-ripple-effect\" for=\"option-2\">\n              <input type=\"radio\" value=\"process-list\"\n                (change)=\"setChoice($event)\" name=\"options\" id=\"option-2\" class=\"mdl-radio__button\">\n              <span class=\"mdl-radio__label\">Process List</span>\n            </label>\n          </li>\n        </ul>\n      </div>\n      <div class=\"mdl-cell mdl-cell--3-col\"\n            style=\"background-color: #ececec;\n            padding: 10px 10px 10px 10px;\n            border-left: solid 2px rgb(31,188,210);\n            border-right : solid 2px rgb(31,188,210);\">\n            <activiti-tasklist *ngIf=\"isTaskListSelected()\" [data]=\"data\" (rowClick)=\"onRowClick($event)\"></activiti-tasklist>\n      </div>\n      <div class=\"mdl-cell mdl-cell--7-col\"\n            style=\"background-color: #ececec;\n                   padding: 10px 10px 10px 10px;\n                   border-left: solid 2px rgb(31,188,210);\n                   border-right : solid 2px rgb(31,188,210);\">\n        <activiti-task-details [taskId]=\"currentTaskId\"></activiti-task-details>\n      </div>\n    </div>\n    ",
                        directives: [ng2_activiti_tasklist_1.ALFRESCO_TASKLIST_DIRECTIVES, ng2_activiti_form_1.ActivitiForm],
                        styles: [':host > .container { padding: 10px; }']
                    }), 
                    __metadata('design:paramtypes', [])
                ], TasksDemoComponent);
                return TasksDemoComponent;
            }());
            exports_1("TasksDemoComponent", TasksDemoComponent);
        }
    }
});
//# sourceMappingURL=tasks-demo.component.js.map