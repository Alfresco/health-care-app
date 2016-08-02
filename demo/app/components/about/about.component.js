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
System.register(['@angular/core', '@angular/http', 'ng2-alfresco-datatable'], function(exports_1, context_1) {
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
    var core_1, http_1, ng2_alfresco_datatable_1;
    var AboutComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ng2_alfresco_datatable_1_1) {
                ng2_alfresco_datatable_1 = ng2_alfresco_datatable_1_1;
            }],
        execute: function() {
            AboutComponent = (function () {
                function AboutComponent(http) {
                    this.http = http;
                }
                AboutComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // this.data = new ObjectDataTableAdapter();
                    this.http.get('/versions').subscribe(function (response) {
                        var data = response.json() || {};
                        var packages = data.packages || [];
                        _this.data = new ng2_alfresco_datatable_1.ObjectDataTableAdapter(packages, [
                            { type: 'text', key: 'name', title: 'Name', sortable: true },
                            { type: 'text', key: 'version', title: 'Version', sortable: true }
                        ]);
                    });
                };
                AboutComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'about-page',
                        templateUrl: './about.component.html',
                        directives: [ng2_alfresco_datatable_1.ALFRESCO_DATATABLE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AboutComponent);
                return AboutComponent;
            }());
            exports_1("AboutComponent", AboutComponent);
        }
    }
});
//# sourceMappingURL=about.component.js.map