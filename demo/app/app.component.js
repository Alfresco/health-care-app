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
System.register(['@angular/core', '@angular/router-deprecated', './components/files/files.component', 'ng2-alfresco-core', 'ng2-alfresco-upload', './components/datatable/datatable-demo.component', './components/search/search.component', './components/search/search-bar.component', './components/login/login-demo.component', './components/tasks/tasks-demo.component', './components/activiti/activiti-demo.component', './components/webscript/webscript.component', './components/about/about.component'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, files_component_1, ng2_alfresco_core_1, ng2_alfresco_upload_1, datatable_demo_component_1, search_component_1, search_bar_component_1, login_demo_component_1, tasks_demo_component_1, activiti_demo_component_1, webscript_component_1, about_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (files_component_1_1) {
                files_component_1 = files_component_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            },
            function (ng2_alfresco_upload_1_1) {
                ng2_alfresco_upload_1 = ng2_alfresco_upload_1_1;
            },
            function (datatable_demo_component_1_1) {
                datatable_demo_component_1 = datatable_demo_component_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (search_bar_component_1_1) {
                search_bar_component_1 = search_bar_component_1_1;
            },
            function (login_demo_component_1_1) {
                login_demo_component_1 = login_demo_component_1_1;
            },
            function (tasks_demo_component_1_1) {
                tasks_demo_component_1 = tasks_demo_component_1_1;
            },
            function (activiti_demo_component_1_1) {
                activiti_demo_component_1 = activiti_demo_component_1_1;
            },
            function (webscript_component_1_1) {
                webscript_component_1 = webscript_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(auth, router, translate, alfrescoSettingsService) {
                    this.auth = auth;
                    this.router = router;
                    this.alfrescoSettingsService = alfrescoSettingsService;
                    this.searchTerm = '';
                    this.ecmHost = 'http://localhost:8080';
                    this.bpmHost = 'http://localhost:9999';
                    this.setEcmHost();
                    this.setBpmHost();
                    this.translate = translate;
                    this.translate.addTranslationFolder();
                }
                AppComponent.prototype.onChangeECMHost = function (event) {
                    console.log(event.target.value);
                    this.ecmHost = event.target.value;
                    this.alfrescoSettingsService.ecmHost = this.ecmHost;
                    localStorage.setItem("ecmHost", this.ecmHost);
                };
                AppComponent.prototype.onChangeBPMHost = function (event) {
                    console.log(event.target.value);
                    this.bpmHost = event.target.value;
                    this.alfrescoSettingsService.bpmHost = this.bpmHost;
                    localStorage.setItem("bpmHost", this.bpmHost);
                };
                AppComponent.prototype.isActive = function (instruction) {
                    return this.router.isRouteActive(this.router.generate(instruction));
                };
                AppComponent.prototype.isLoggedIn = function () {
                    return this.auth.isLoggedIn();
                };
                AppComponent.prototype.onLogout = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.auth.logout()
                        .subscribe(function () { return _this.router.navigate(['Login']); });
                };
                AppComponent.prototype.onToggleSearch = function (event) {
                    var expandedHeaderClass = 'header-search-expanded', header = document.querySelector('header');
                    if (event.expanded) {
                        header.classList.add(expandedHeaderClass);
                    }
                    else {
                        header.classList.remove(expandedHeaderClass);
                    }
                };
                AppComponent.prototype.changeLanguage = function (lang) {
                    this.translate.use(lang);
                };
                AppComponent.prototype.hideDrawer = function () {
                    // todo: workaround for drawer closing
                    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
                };
                AppComponent.prototype.setEcmHost = function () {
                    if (localStorage.getItem("ecmHost")) {
                        this.alfrescoSettingsService.ecmHost = localStorage.getItem("ecmHost");
                        this.ecmHost = localStorage.getItem("ecmHost");
                    }
                    else {
                        this.alfrescoSettingsService.ecmHost = this.ecmHost;
                    }
                };
                AppComponent.prototype.setBpmHost = function () {
                    if (localStorage.getItem("bpmHost")) {
                        this.alfrescoSettingsService.bpmHost = localStorage.getItem("bpmHost");
                        this.bpmHost = localStorage.getItem("bpmHost");
                    }
                    else {
                        this.alfrescoSettingsService.bpmHost = this.bpmHost;
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'alfresco-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [search_bar_component_1.SearchBarComponent, router_deprecated_1.ROUTER_DIRECTIVES, ng2_alfresco_core_1.MDL],
                        pipes: [ng2_alfresco_core_1.AlfrescoPipeTranslate]
                    }),
                    router_deprecated_1.RouteConfig([
                        { path: '/home', name: 'Home', component: files_component_1.FilesComponent },
                        { path: '/files', name: 'Files', component: files_component_1.FilesComponent },
                        { path: '/datatable', name: 'DataTable', component: datatable_demo_component_1.DataTableDemoComponent },
                        { path: '/', name: 'Login', component: login_demo_component_1.LoginDemoComponent, useAsDefault: true },
                        { path: '/uploader', name: 'Uploader', component: ng2_alfresco_upload_1.UploadButtonComponent },
                        { path: '/login', name: 'Login', component: login_demo_component_1.LoginDemoComponent },
                        { path: '/search', name: 'Search', component: search_component_1.SearchComponent },
                        { path: '/tasks', name: 'Tasks', component: tasks_demo_component_1.TasksDemoComponent },
                        { path: '/activiti', name: 'Activiti', component: activiti_demo_component_1.ActivitiDemoComponent },
                        { path: '/webscript', name: 'Webscript', component: webscript_component_1.WebscriptComponent },
                        { path: '/about', name: 'About', component: about_component_1.AboutComponent }
                    ]), 
                    __metadata('design:paramtypes', [ng2_alfresco_core_1.AlfrescoAuthenticationService, router_deprecated_1.Router, ng2_alfresco_core_1.AlfrescoTranslationService, ng2_alfresco_core_1.AlfrescoSettingsService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map