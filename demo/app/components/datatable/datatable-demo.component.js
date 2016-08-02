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
System.register(['@angular/core', 'ng2-alfresco-datatable'], function(exports_1, context_1) {
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
    var core_1, ng2_alfresco_datatable_1;
    var DataTableDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_alfresco_datatable_1_1) {
                ng2_alfresco_datatable_1 = ng2_alfresco_datatable_1_1;
            }],
        execute: function() {
            DataTableDemoComponent = (function () {
                function DataTableDemoComponent() {
                    this.multiselect = false;
                    this._imageUrl = 'http://placehold.it/140x100';
                    this._createdBy = {
                        name: 'Denys Vuika',
                        email: 'denys.vuika@alfresco.com'
                    };
                    this.reset();
                }
                DataTableDemoComponent.prototype.reset = function () {
                    this.data = new ng2_alfresco_datatable_1.ObjectDataTableAdapter([
                        {
                            id: 1,
                            name: 'Name 1',
                            createdOn: new Date(2016, 6, 2, 15, 8, 1),
                            createdBy: this._createdBy,
                            icon: 'material-icons://folder_open'
                        },
                        {
                            id: 2,
                            name: 'Name 2',
                            createdOn: new Date(2016, 6, 2, 15, 8, 2),
                            createdBy: this._createdBy,
                            icon: 'material-icons://accessibility'
                        },
                        {
                            id: 3,
                            name: 'Name 3',
                            createdOn: new Date(2016, 6, 2, 15, 8, 3),
                            createdBy: this._createdBy,
                            icon: 'material-icons://alarm'
                        },
                        {
                            id: 4,
                            name: 'Image 1',
                            createdOn: new Date(2016, 6, 2, 15, 8, 4),
                            createdBy: this._createdBy,
                            icon: this._imageUrl
                        }
                    ], [
                        { type: 'image', key: 'icon', title: '', srTitle: 'Thumbnail' },
                        { type: 'text', key: 'id', title: 'Id', sortable: true },
                        { type: 'text', key: 'createdOn', title: 'Created On', sortable: true },
                        { type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true },
                        { type: 'text', key: 'createdBy.name', title: 'Created By', sortable: true }
                    ]);
                    this.data.setSorting(new ng2_alfresco_datatable_1.DataSorting('id', 'asc'));
                };
                DataTableDemoComponent.prototype.addRow = function () {
                    var id = this.data.getRows().length + 1;
                    var row = new ng2_alfresco_datatable_1.ObjectDataRow({
                        id: id,
                        name: 'Name ' + id,
                        createdOn: new Date(),
                        icon: 'material-icons://extension',
                        createdBy: this._createdBy
                    });
                    this.data.getRows().push(row);
                    this.data.sort();
                };
                DataTableDemoComponent.prototype.replaceRows = function () {
                    var objects = [
                        {
                            id: 10,
                            name: 'Name 10',
                            createdBy: this._createdBy,
                            createdOn: new Date(2016, 6, 2, 15, 8, 5),
                            icon: 'material-icons://face'
                        },
                        {
                            id: 11,
                            name: 'Name 11',
                            createdBy: this._createdBy,
                            createdOn: new Date(2016, 6, 2, 15, 8, 6),
                            icon: 'material-icons://language'
                        },
                        {
                            id: 12,
                            name: 'Name 12',
                            createdBy: this._createdBy,
                            createdOn: new Date(2016, 6, 2, 15, 8, 7),
                            icon: 'material-icons://pets'
                        },
                        {
                            id: 13,
                            name: 'Image 13',
                            createdBy: this._createdBy,
                            createdOn: new Date(2016, 6, 2, 15, 8, 8),
                            icon: this._imageUrl
                        }
                    ];
                    var rows = objects.map(function (obj) { return new ng2_alfresco_datatable_1.ObjectDataRow(obj); });
                    this.data.setRows(rows);
                };
                DataTableDemoComponent.prototype.replaceColumns = function () {
                    var schema = [
                        { type: 'text', key: 'id', title: 'Id', sortable: true },
                        { type: 'text', key: 'name', title: 'Name', sortable: true, cssClass: 'full-width name-column' }
                    ];
                    var columns = schema.map(function (col) { return new ng2_alfresco_datatable_1.ObjectDataColumn(col); });
                    this.data.setColumns(columns);
                };
                DataTableDemoComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'datatable-demo',
                        templateUrl: './datatable-demo.component.html',
                        directives: [ng2_alfresco_datatable_1.ALFRESCO_DATATABLE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DataTableDemoComponent);
                return DataTableDemoComponent;
            }());
            exports_1("DataTableDemoComponent", DataTableDemoComponent);
        }
    }
});
//# sourceMappingURL=datatable-demo.component.js.map