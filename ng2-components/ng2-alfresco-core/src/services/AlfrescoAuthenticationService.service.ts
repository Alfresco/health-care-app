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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AlfrescoSettingsService } from './AlfrescoSettingsService.service';
import { AuthenticationFactory } from '../factory/AuthenticationFactory';
import { AbstractAuthentication } from '../interface/authentication.interface';
import { AlfrescoAuthenticationBase } from './AlfrescoAuthenticationBase.service';

declare let AlfrescoApi: any;

/**
 * The AlfrescoAuthenticationService provide the login service and store the ticket in the localStorage
 */
@Injectable()
export class AlfrescoAuthenticationService extends AlfrescoAuthenticationBase {

    private providersInstance: AbstractAuthentication[] = [];

    /**
     * Constructor
     * @param alfrescoSettingsService
     * @param http
     */
    constructor(private alfrescoSettingsService: AlfrescoSettingsService,
                private http: Http) {
        super(alfrescoSettingsService, http);
        this.createProviderInstance(this.alfrescoSettingsService.getProviders());
    }

    /**
     * Method to delegate to POST login
     * @param username
     * @param password
     * @param providers
     * @returns {Observable<R>|Observable<T>}
     */
    login(username: string, password: string, providers: string []): Observable<string> {
        localStorage.clear();
        if (providers.length === 0) {
            return Observable.throw('No providers defined');
        } else {
            return this.performeLogin(username, password, providers);
        }
    }

    /**
     * Perform a login on behalf of the user for the different provider instance
     *
     * @param username
     * @param password
     * @param providers
     * @returns {Observable<R>|Observable<T>}
     */
    private performeLogin(username: string, password: string, providers: string []): Observable<any> {
        let observableBatch = [];
        providers.forEach((provider) => {
            let auth: AbstractAuthentication = this.findProviderInstance(provider);
            if (auth) {
                observableBatch.push(auth.login(username, password));
            } else {
                observableBatch.push(Observable.throw('Wrong provider defined'));
            }
        });
        return Observable.create(observer => {
            Observable.forkJoin(observableBatch).subscribe(
                (response: any[]) => {
                    response.forEach((res) => {
                        this.performeSaveTicket(res.type, res.ticket);
                    });
                    observer.next(response);
                },
                (err: any) => {
                    observer.error(new Error(err));
                });
        });
    }

    /**
     * The method return true if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn(type: string = 'ECM'): boolean {
        let auth: AbstractAuthentication = this.findProviderInstance(type);
        if (auth) {
            return auth.isLoggedIn();
        }
        return false;
    }

    getAlfrescoApi(): any {
        return  this.findProviderInstance('ECM').alfrescoApi;
    }

    /**
     * Return the ticket stored in the localStorage of the specific provider type
     * @param type
     */
    public getTicket(type: string = 'ECM'): string {
        let auth: AbstractAuthentication = this.findProviderInstance(type);
        if (auth) {
            return auth.getTicket();
        }
        return '';
    }

    /**
     * Save the token calling the method of the specific provider type
     * @param type - providerName
     * @param ticket
     */
   private performeSaveTicket(type: string, ticket: string) {
        let auth: AbstractAuthentication = this.findProviderInstance(type);
        if (auth) {
            auth.saveTicket(ticket);
        }
    }

    /**
     * The method remove the ticket from the local storage
     * @returns {Observable<T>}
     */
    public logout(): Observable<string> {
        if (this.providersInstance.length === 0) {
            return Observable.throw('No providers defined');
        } else {
            return this.performLogout();
        }
    }

    /**
     * Perform a logout on behalf of the user for the different provider instance
     *
     * @returns {Observable<R>|Observable<T>}
     */
    private performLogout(): Observable<any> {
        let observableBatch = [];
        this.providersInstance.forEach((authInstance) => {
            if (authInstance.isLoggedIn()) {
                observableBatch.push(authInstance.logout());
            }
        });
        return Observable.create(observer => {
            Observable.forkJoin(observableBatch).subscribe(
                (response: any[]) => {
                    observer.next(response);
                },
                (err: any) => {
                    observer.error(new Error(err));
                });
        });
    }

    /**
     * Create the provider instance using a Factory
     * @param providers - list of the providers like ECM BPM
     */
    public createProviderInstance(providers: string []): void {
        if (this.providersInstance.length === 0) {
            providers.forEach((provider) => {
                let authInstance: AbstractAuthentication = AuthenticationFactory.createAuth(
                    this.alfrescoSettingsService, this.http, provider);
                if (authInstance) {
                    this.providersInstance.push(authInstance);
                }
            });
        }
    }

    /**
     * Find the provider by type and return it
     * @param type
     * @returns {AbstractAuthentication}
     */
    private findProviderInstance(type: string): AbstractAuthentication {
        let auth: AbstractAuthentication = null;
        if (this.providersInstance && this.providersInstance.length !== 0) {
            this.providersInstance.forEach((provider) => {
                if (provider.TYPE === type.toUpperCase()) {
                    auth = provider;
                }
            });
        }
        return auth;
    }

}
