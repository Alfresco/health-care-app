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
System.register(['@angular/core', 'ng2-alfresco-core', 'ng2-alfresco-search', 'ng2-alfresco-viewer'], function(exports_1, context_1) {
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
    var core_1, ng2_alfresco_core_1, ng2_alfresco_search_1, ng2_alfresco_viewer_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            },
            function (ng2_alfresco_search_1_1) {
                ng2_alfresco_search_1 = ng2_alfresco_search_1_1;
            },
            function (ng2_alfresco_viewer_1_1) {
                ng2_alfresco_viewer_1 = ng2_alfresco_viewer_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(contentService) {
                    this.contentService = contentService;
                    this.previewActive = false;
                }
                SearchComponent.prototype.onFileClicked = function (event) {
                    if (event.value.entry.isFile) {
                        this.previewName = event.value.entry.name;
                        this.previewMimeType = event.value.entry.content.mimeType;
                        this.previewContentUrl = this.contentService.getContentUrl(event.value);
                        this.previewActive = true;
                    }
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'search-component',
                        templateUrl: './search.component.html',
                        styles: ["\n        :host div.search-results-container {\n            padding: 0 20px 20px 20px;\n        }\n        :host h1 {\n            font-size: 22px;\n        }\n        :host tbody tr {\n            cursor: pointer;\n        }\n        @media screen and (max-width: 600px) {\n            :host .col-display-name {\n                min-width: 100px;\n            }\n            :host .col-modified-at, :host .col-modified-by {\n                display: none;\n            }\n            :host div.search-results-container table {\n                width: 100%;\n            }\n        }\n    "],
                        directives: [ng2_alfresco_search_1.ALFRESCO_SEARCH_DIRECTIVES, ng2_alfresco_viewer_1.VIEWERCOMPONENT]
                    }), 
                    __metadata('design:paramtypes', [ng2_alfresco_core_1.AlfrescoContentService])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search.component.js.map