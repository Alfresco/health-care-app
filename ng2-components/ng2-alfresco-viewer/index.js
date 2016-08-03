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
System.register(['./src/viewer.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var viewer_component_1;
    var VIEWERCOMPONENT;
    var exportedNames_1 = {
        'VIEWERCOMPONENT': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (viewer_component_1_1) {
                viewer_component_1 = viewer_component_1_1;
                exportStar_1(viewer_component_1_1);
            }],
        execute: function() {
            exports_1("default",{
                components: [viewer_component_1.ViewerComponent]
            });
            exports_1("VIEWERCOMPONENT", VIEWERCOMPONENT = [
                viewer_component_1.ViewerComponent
            ]);
        }
    }
});
//# sourceMappingURL=index.js.map