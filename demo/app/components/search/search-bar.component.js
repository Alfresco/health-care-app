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
System.register(['@angular/core', '@angular/router-deprecated', 'ng2-alfresco-search', 'ng2-alfresco-viewer', 'ng2-alfresco-core'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, ng2_alfresco_search_1, ng2_alfresco_viewer_1, ng2_alfresco_core_1;
    var SearchBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (ng2_alfresco_search_1_1) {
                ng2_alfresco_search_1 = ng2_alfresco_search_1_1;
            },
            function (ng2_alfresco_viewer_1_1) {
                ng2_alfresco_viewer_1 = ng2_alfresco_viewer_1_1;
            },
            function (ng2_alfresco_core_1_1) {
                ng2_alfresco_core_1 = ng2_alfresco_core_1_1;
            }],
        execute: function() {
            SearchBarComponent = (function () {
                function SearchBarComponent(router, auth, contentService) {
                    this.router = router;
                    this.auth = auth;
                    this.contentService = contentService;
                    this.fileShowed = false;
                    this.expand = new core_1.EventEmitter();
                }
                SearchBarComponent.prototype.isLoggedIn = function () {
                    return this.auth.isLoggedIn();
                };
                /**
                 * Called when a new search term is submitted
                 *
                 * @param params Parameters relating to the search
                 */
                SearchBarComponent.prototype.searchTermChange = function (params) {
                    this.router.navigate(['Search', {
                            q: params.value
                        }]);
                };
                SearchBarComponent.prototype.onFileClicked = function (event) {
                    if (event.value.entry.isFile) {
                        this.fileName = event.value.entry.name;
                        this.mimeType = event.value.entry.content.mimeType;
                        this.urlFile = this.contentService.getContentUrl(event.value);
                        this.fileShowed = true;
                    }
                };
                SearchBarComponent.prototype.onExpandToggle = function (event) {
                    this.expand.emit(event);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], SearchBarComponent.prototype, "expand", void 0);
                SearchBarComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'search-bar',
                        templateUrl: './search-bar.component.html',
                        styles: ["\n    "],
                        directives: [ng2_alfresco_search_1.ALFRESCO_SEARCH_DIRECTIVES, ng2_alfresco_viewer_1.VIEWERCOMPONENT]
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, ng2_alfresco_core_1.AlfrescoAuthenticationService, ng2_alfresco_core_1.AlfrescoContentService])
                ], SearchBarComponent);
                return SearchBarComponent;
            }());
            exports_1("SearchBarComponent", SearchBarComponent);
        }
    }
});
//# sourceMappingURL=search-bar.component.js.map