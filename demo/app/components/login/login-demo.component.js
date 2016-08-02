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
System.register(['@angular/core', 'ng2-alfresco-login', '@angular/router-deprecated'], function(exports_1, context_1) {
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
    var core_1, ng2_alfresco_login_1, router_deprecated_1;
    var LoginDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_alfresco_login_1_1) {
                ng2_alfresco_login_1 = ng2_alfresco_login_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            }],
        execute: function() {
            LoginDemoComponent = (function () {
                function LoginDemoComponent(router) {
                    this.router = router;
                    this.providers = ['ECM'];
                }
                LoginDemoComponent.prototype.onLogin = function ($event) {
                    console.log($event);
                    this.router.navigate(['Home']);
                };
                LoginDemoComponent.prototype.onError = function ($event) {
                    console.log($event);
                };
                LoginDemoComponent.prototype.toggleECM = function (checked) {
                    if (checked) {
                        this.providers.push('ECM');
                    }
                    else {
                        this.removeElement('ECM');
                    }
                };
                LoginDemoComponent.prototype.toggleBPM = function (checked) {
                    if (checked) {
                        this.providers.push('BPM');
                    }
                    else {
                        this.removeElement('BPM');
                    }
                };
                LoginDemoComponent.prototype.removeElement = function (el) {
                    for (var i = 0; i < this.providers.length; i++) {
                        if (this.providers[i] === el) {
                            this.providers.splice(i, 1);
                            return false;
                        }
                    }
                };
                LoginDemoComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'login-demo',
                        templateUrl: './login-demo.component.html',
                        directives: [router_deprecated_1.ROUTER_DIRECTIVES, ng2_alfresco_login_1.AlfrescoLoginComponent],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router])
                ], LoginDemoComponent);
                return LoginDemoComponent;
            }());
            exports_1("LoginDemoComponent", LoginDemoComponent);
        }
    }
});
//# sourceMappingURL=login-demo.component.js.map