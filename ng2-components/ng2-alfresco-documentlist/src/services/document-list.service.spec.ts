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

import {
    it,
    describe,
    expect,
    beforeEach
} from '@angular/core/testing';
import {
    AlfrescoSettingsService,
    AlfrescoAuthenticationService,
    AlfrescoContentService
} from 'ng2-alfresco-core';
import { FileNode } from '../assets/document-library.model.mock';
import { ReflectiveInjector } from '@angular/core';
import { DocumentListService } from './document-list.service';
import { HTTP_PROVIDERS } from '@angular/http';

describe('DocumentListService', () => {

    let injector;
    let service: DocumentListService;
    let settingsService: AlfrescoSettingsService;
    let authService: AlfrescoAuthenticationService;
    let contentService: AlfrescoContentService;

    beforeEach(() => {
        injector = ReflectiveInjector.resolveAndCreate([
            HTTP_PROVIDERS,
            AlfrescoAuthenticationService,
            AlfrescoSettingsService
        ]);

        settingsService = injector.get(AlfrescoSettingsService);
        authService = injector.get(AlfrescoAuthenticationService);
        contentService = new AlfrescoContentService(authService);
        service = new DocumentListService(authService, contentService);
    });

    it('should require node to get thumbnail url', () => {
        expect(service.getDocumentThumbnailUrl(null)).toBeNull();
    });

    it('should require content service to get thumbnail url', () => {
        service = new DocumentListService(authService, null);
        let file = new FileNode();
        expect(service.getDocumentThumbnailUrl(file)).toBeNull();
    });

    it('should resolve thumbnail url via content service', () => {
        let url = 'http://<address>';
        spyOn(contentService, 'getDocumentThumbnailUrl').and.returnValue(url);

        let file = new FileNode();
        let thumbnailUrl = service.getDocumentThumbnailUrl(file);

        expect(thumbnailUrl).toBe(url);
        expect(contentService.getDocumentThumbnailUrl).toHaveBeenCalledWith(file);
    });

    it('should resolve fallback icon for mime type', () => {
        let icon = service.getMimeTypeIcon('image/png');
        expect(icon).toBe(service.mimeTypeIcons['image/png']);
    });

    it('should resolve default icon for mime type', () => {
        expect(service.getMimeTypeIcon(null)).toBe(DocumentListService.DEFAULT_MIME_TYPE_ICON);
        expect(service.getMimeTypeIcon('')).toBe(DocumentListService.DEFAULT_MIME_TYPE_ICON);
        expect(service.getMimeTypeIcon('missing/type')).toBe(DocumentListService.DEFAULT_MIME_TYPE_ICON);
    });

});
