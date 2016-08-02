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
    DocumentList,
    ContentActionHandler,
    DocumentActionModel,
    FolderActionModel
} from 'ng2-alfresco-documentlist';
import {
    MDL,
    AlfrescoContentService,
    CONTEXT_MENU_DIRECTIVES,
    AlfrescoPipeTranslate
} from 'ng2-alfresco-core';
import { PaginationComponent } from 'ng2-alfresco-datatable';
import { ALFRESCO_ULPOAD_COMPONENTS } from 'ng2-alfresco-upload';
import { VIEWERCOMPONENT } from 'ng2-alfresco-viewer';
import { FormService } from 'ng2-activiti-form';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'files-component',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css'],
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
export class FilesComponent implements OnInit {
    currentPath: string = '/Sites/swsdp/documentLibrary';

    urlFile: string;
    fileName: string;
    mimeType: string;
    fileShowed: boolean = false;
    multipleFileUpload: boolean = false;
    folderUpload: boolean = false;
    acceptedFilesTypeShow: boolean = false;

    acceptedFilesType: string = '.jpg,.pdf,.js';

    @ViewChild(DocumentList)
    documentList: DocumentList;

    constructor(private contentService: AlfrescoContentService,
                private documentActions: DocumentActionsService,
                private formService: FormService,
                private router: Router) {
        documentActions.setHandler('my-handler', this.myDocumentActionHandler.bind(this));
    }

    myDocumentActionHandler(obj: any) {
        window.alert('my custom action handler');
    }

    myCustomAction1(event) {
        alert('Custom document action for ' + event.value.entry.name);
    }

    myFolderAction1(event) {
        alert('Custom folder action for ' + event.value.entry.name);
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

    toggleMultipleFileUpload() {
        this.multipleFileUpload = !this.multipleFileUpload;
        return this.multipleFileUpload;
    }

    toggleFolder() {
        this.multipleFileUpload = false;
        this.folderUpload = !this.folderUpload;
        return this.folderUpload;
    }

    toggleAcceptedFilesType() {
        this.acceptedFilesTypeShow = !this.acceptedFilesTypeShow;
        return this.acceptedFilesTypeShow;
    }

    ngOnInit() {
        this.formService.getProcessDefinitions().subscribe(
            defs => this.setupBpmActions(defs || []),
            err => console.log(err)
        );
    }

    viewActivitiForm(event?: any) {
        this.router.navigate(['/activiti/tasks', '1']);
    }

    private setupBpmActions(actions: any[]) {
        actions.map(def => {
            let documentAction = new DocumentActionModel();
            documentAction.title = 'Activiti: ' + (def.name || 'Unknown process');
            documentAction.handler = this.getBpmActionHandler(def);
            this.documentList.actions.push(documentAction);

            let folderAction = new FolderActionModel();
            folderAction.title = 'Activiti: ' + (def.name || 'Unknown process');
            folderAction.handler = this.getBpmActionHandler(def);
            this.documentList.actions.push(folderAction);
        });
    }

    private getBpmActionHandler(processDefinition: any): ContentActionHandler {
        return function (obj: any, target?: any) {
            window.alert(`Starting BPM process: ${processDefinition.id}`);
        }.bind(this);
    }
}
