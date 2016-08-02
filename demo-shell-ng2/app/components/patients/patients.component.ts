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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    DOCUMENT_LIST_DIRECTIVES,
    DOCUMENT_LIST_PROVIDERS,
    DocumentActionsService,
    DocumentList
} from 'ng2-alfresco-documentlist';
import {
    MDL,
    AlfrescoContentService,
    CONTEXT_MENU_DIRECTIVES,
    AlfrescoPipeTranslate,
    AlfrescoAuthenticationService
} from 'ng2-alfresco-core';
import { PaginationComponent } from 'ng2-alfresco-datatable';
import { ALFRESCO_ULPOAD_COMPONENTS } from 'ng2-alfresco-upload';
import { VIEWERCOMPONENT } from 'ng2-alfresco-viewer';
import { FormService } from 'ng2-activiti-form';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'patients-component',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css'],
    directives: [
        DOCUMENT_LIST_DIRECTIVES,
        MDL,
        ALFRESCO_ULPOAD_COMPONENTS,
        VIEWERCOMPONENT,
        CONTEXT_MENU_DIRECTIVES,
        PaginationComponent
    ],
    providers: [DOCUMENT_LIST_PROVIDERS, FormService],
    pipes: [AlfrescoPipeTranslate]
})
export class PatientsComponent implements OnInit {
    currentPath: string = '/Sites/swsdp/documentLibrary';

    urlFile: string;
    fileName: string;
    mimeType: string;
    fileShowed: boolean = false;

    acceptedFilesType: string = '.jpg,.pdf,.js';

    @ViewChild(DocumentList)
    documentList: DocumentList;

    constructor(private contentService: AlfrescoContentService,
                private documentActions: DocumentActionsService,
                private formService: FormService,
                private router: Router,
                private authService: AlfrescoAuthenticationService) {
    }

    showFile(event) {
        if (event.value.entry.isFile) {
            this.fileName = event.value.entry.name;
            this.mimeType = event.value.entry.content.mimeType;
            this.urlFile = this.contentService.getContentUrl(event.value);
            this.fileShowed = true;
        } else {
            this.fileShowed = false;
        }
    }

    onFolderChanged(event?: any) {
        if (event) {
            this.currentPath = event.path;
        }
    }

    ngOnInit() {
    }

    onCreateFolderClick(folderName: string) {
        if (folderName) {
            let body = {
                name: folderName,
                nodeType: 'hc:patientFolder',
                properties: {
                    'hc:doctor': 'John Doe'
                },
                relativePath: this.currentPath
            };
            let opts = {};
            this.authService.getAlfrescoApi().nodes.addNode('-root-', body, opts).then(
                (data) => {
                    console.log(data);
                    this.documentList.reload();
                },
                (err) => {
                    window.alert('See console output for error details');
                    console.log(err);
                }
            );
        }
    }
}
