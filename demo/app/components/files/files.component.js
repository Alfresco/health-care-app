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
System.register(['@angular/core', 'ng2-alfresco-documentlist', 'ng2-alfresco-core', 'ng2-alfresco-datatable', 'ng2-alfresco-upload', 'ng2-alfresco-viewer', 'ng2-activiti-form'], function(exports_1, context_1) {
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
    var core_1, ng2_alfresco_documentlist_1, ng2_alfresco_core_1, ng2_alfresco_datatable_1, ng2_alfresco_upload_1, ng2_alfresco_viewer_1, ng2_activiti_form_1;
    var FilesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_alfresco_documentlist_1_1) {
                ng2_alfresco_documentlist_1 = ng2_alfresco_documentlist_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            },
            function (ng2_alfresco_datatable_1_1) {
                ng2_alfresco_datatable_1 = ng2_alfresco_datatable_1_1;
            },
            function (ng2_alfresco_upload_1_1) {
                ng2_alfresco_upload_1 = ng2_alfresco_upload_1_1;
            },
            function (ng2_alfresco_viewer_1_1) {
                ng2_alfresco_viewer_1 = ng2_alfresco_viewer_1_1;
            },
            function (ng2_activiti_form_1_1) {
                ng2_activiti_form_1 = ng2_activiti_form_1_1;
            }],
        execute: function() {
            FilesComponent = (function () {
                function FilesComponent(contentService, documentActions, formService) {
                    this.contentService = contentService;
                    this.documentActions = documentActions;
                    this.formService = formService;
                    this.currentPath = '/Sites/swsdp/documentLibrary';
                    this.fileShowed = false;
                    this.multipleFileUpload = false;
                    this.folderUpload = false;
                    this.acceptedFilesTypeShow = false;
                    this.acceptedFilesType = '.jpg,.pdf,.js';
                    documentActions.setHandler('my-handler', this.myDocumentActionHandler.bind(this));
                }
                FilesComponent.prototype.myDocumentActionHandler = function (obj) {
                    window.alert('my custom action handler');
                };
                FilesComponent.prototype.myCustomAction1 = function (event) {
                    alert('Custom document action for ' + event.value.entry.name);
                };
                FilesComponent.prototype.myFolderAction1 = function (event) {
                    alert('Custom folder action for ' + event.value.entry.name);
                };
                FilesComponent.prototype.showFile = function (event) {
                    if (event.value.entry.isFile) {
                        this.fileName = event.value.entry.name;
                        this.mimeType = event.value.entry.content.mimeType;
                        this.urlFile = this.contentService.getContentUrl(event.value);
                        this.fileShowed = true;
                    }
                    else {
                        this.fileShowed = false;
                    }
                };
                FilesComponent.prototype.onFolderChanged = function (event) {
                    if (event) {
                        this.currentPath = event.path;
                    }
                };
                FilesComponent.prototype.toggleMultipleFileUpload = function () {
                    this.multipleFileUpload = !this.multipleFileUpload;
                    return this.multipleFileUpload;
                };
                FilesComponent.prototype.toggleFolder = function () {
                    this.multipleFileUpload = false;
                    this.folderUpload = !this.folderUpload;
                    return this.folderUpload;
                };
                FilesComponent.prototype.toggleAcceptedFilesType = function () {
                    this.acceptedFilesTypeShow = !this.acceptedFilesTypeShow;
                    return this.acceptedFilesTypeShow;
                };
                FilesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log(this.documentList);
                    this.formService.getProcessDefinitions().subscribe(function (defs) { return _this.setupBpmActions(defs || []); }, function (err) { return console.log(err); });
                };
                FilesComponent.prototype.setupBpmActions = function (actions) {
                    var _this = this;
                    actions.map(function (def) {
                        var action = new ng2_alfresco_documentlist_1.ContentActionModel();
                        action.target = 'document';
                        action.title = 'Activiti: ' + (def.name || 'Unknown process');
                        action.handler = _this.getBpmActionHandler(def);
                        _this.documentList.actions.push(action);
                    });
                    console.log(this.documentList.actions);
                };
                FilesComponent.prototype.getBpmActionHandler = function (processDefinition) {
                    return function (obj, target) {
                        window.alert("Starting BPM process: " + processDefinition.id);
                    }.bind(this);
                };
                __decorate([
                    core_1.ViewChild(ng2_alfresco_documentlist_1.DocumentList), 
                    __metadata('design:type', ng2_alfresco_documentlist_1.DocumentList)
                ], FilesComponent.prototype, "documentList", void 0);
                FilesComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'files-component',
                        templateUrl: './files.component.html',
                        styleUrls: ['./files.component.css'],
                        directives: [
                            ng2_alfresco_documentlist_1.DOCUMENT_LIST_DIRECTIVES,
                            ng2_alfresco_core_1.MDL,
                            ng2_alfresco_upload_1.ALFRESCO_ULPOAD_COMPONENTS,
                            ng2_alfresco_viewer_1.VIEWERCOMPONENT,
                            ng2_alfresco_core_1.CONTEXT_MENU_DIRECTIVES,
                            ng2_alfresco_datatable_1.PaginationComponent
                        ],
                        providers: [ng2_alfresco_documentlist_1.DOCUMENT_LIST_PROVIDERS, ng2_activiti_form_1.FormService],
                        pipes: [ng2_alfresco_core_1.AlfrescoPipeTranslate]
                    }), 
                    __metadata('design:paramtypes', [ng2_alfresco_core_1.AlfrescoContentService, ng2_alfresco_documentlist_1.DocumentActionsService, ng2_activiti_form_1.FormService])
                ], FilesComponent);
                return FilesComponent;
            }());
            exports_1("FilesComponent", FilesComponent);
        }
    }
});
//# sourceMappingURL=files.component.js.map