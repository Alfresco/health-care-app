'use strict';

var AlfrescoCoreRestApi = require('./alfresco-core-rest-api/src/index.js');
var AlfrescoAuthRestApi = require('./alfresco-auth-rest-api/src/index');
var AlfrescoActivitiApi = require('./alfresco-activiti-rest-api/src/index');
var AlfrescoMock = require('../test/mockObjects/mockAlfrescoApi.js');
var AlfrescoContent = require('./alfrescoContent');
var AlfrescoNode = require('./alfrescoNode');
var AlfrescoSearch = require('./alfrescoSearch');
var AlfrescoUpload = require('./alfrescoUpload');
var AlfrescoWebScriptApi = require('./alfrescoWebScript');
var Emitter = require('event-emitter');
var EcmAuth = require('./ecmAuth');
var BpmAuth = require('./bpmAuth');
var _ = require('lodash');

class AlfrescoApi {
    /**
     * @param {Object} config
     *
     *      config = {
     *        host:       // alfrescoHost Your share server IP or DNS name
     *        hostActiviti: // hostActiviti Your activiti server IP or DNS name
     *        contextRoot: // contextRoot default value alfresco
     *        username:   // Username to login
     *        password:   // Password to login
     *        provider:   // ECM BPM ALL
     *        ticket:     // Ticket if you already have a ticket you can pass only the ticket and skip the login, in this case you don't need username and password
     *    };
     */
    constructor(config) {
        this.changeConfig(config);
        Emitter.call(this);
    }

    /**
     * @param {Object} config
     */
    changeConfig(config) {
        this.config = {
            host: config.host || 'http://127.0.0.1:8080',
            hostActiviti: config.hostActiviti || 'http://127.0.0.1:9999',
            contextRoot: config.contextRoot || 'alfresco',
            username: config.username,
            password: config.password,
            provider: config.provider || 'ECM',
            ticket: config.ticket
        };

        if (this.config.provider === 'BPM' || this.config.provider === 'ALL') {
            this.bpmAuth = new BpmAuth(this.config);
            AlfrescoActivitiApi.ApiClient.instance = this.bpmAuth.getClient();
            this.activiti = AlfrescoActivitiApi;
            this._instantiateObjects(this.activiti);
        }

        if (this.config.provider === 'ECM' || this.config.provider === 'ALL') {
            this.ecmAuth = new EcmAuth(this.config);
            AlfrescoCoreRestApi.ApiClient.instance = this.ecmAuth.getClient();
            this.core = AlfrescoCoreRestApi;
            if (this.isLoggedIn()) {
                this._instantiateObjects(AlfrescoCoreRestApi);
            }
        }

        this.nodes = this.node = new AlfrescoNode();
        this.search = new AlfrescoSearch();
        this.content = new AlfrescoContent(this.ecmAuth);
        this.upload = new AlfrescoUpload();
        this.webScript = new AlfrescoWebScriptApi();
    }

    _instantiateObjects(module, client) {
        var classArray = Object.keys(module);

        classArray.forEach((currentClass)=> {
            var obj = this._stringToObject(currentClass, module, client);
            var nameObj = _.lowerFirst(currentClass);
            if (!module[nameObj]) {
                module[nameObj] = obj;
            }
        });
    }

    _stringToObject(nameClass, module, client) {
        try {
            if (typeof module[nameClass] === 'function') {
                return new module[nameClass](client);
            }
        } catch (error) {
            console.log(nameClass + '  ' + error);
        }
    }

    /**
     * return an Alfresco API Client
     *
     * @returns {ApiClient} Alfresco API Client
     * */
    getClient() {
        return this.ecmAuth.getClient();
    }

    /**
     * login Alfresco API
     *
     * @returns {Promise} A promise that returns {new authentication ticket} if resolved and {error} if rejected.
     * */
    login() {
        if (this.config.provider && this.config.provider.toUpperCase() === 'BPM') {
            return this.bpmAuth.login();
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ECM') {
            var promise = this.ecmAuth.login();
            promise.then((data) => {
                this._instantiateObjects(AlfrescoCoreRestApi, this.ecmAuth.getClient());
            });
            return promise;
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ALL') {
            return this._loginBPMECM();
        }
    }

    _loginBPMECM() {
        var ecmPromise = this.ecmAuth.login();
        var bpmPromise = this.bpmAuth.login();

        this.promise = new Promise((resolve, reject) => {
            Promise.all([ecmPromise, bpmPromise]).then(
                (data) => {
                    this.promise.emit('success');
                    resolve(data);
                },
                (error) => {
                    if (error.status === 401) {
                        this.promise.emit('unauthorized');
                    }
                    this.promise.emit('error');
                    reject(error);
                });
        });

        Emitter(this.promise); // jshint ignore:line

        return this.promise;
    }

    /**
     * logout Alfresco API
     *
     * @returns {Promise} A promise that returns {new authentication ticket} if resolved and {error} if rejected.
     * */
    logout() {
        if (this.config.provider && this.config.provider.toUpperCase() === 'BPM') {
            return this.bpmAuth.logout();
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ECM') {
            return this.ecmAuth.logout();
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ALL') {
            return this._logoutBPMECM();
        }
    }

    _logoutBPMECM() {
        var ecmPromise = this.ecmAuth.logout();
        var bpmPromise = this.bpmAuth.logout();

        this.promise = new Promise((resolve, reject) => {
            Promise.all([ecmPromise, bpmPromise]).then(
                (data) => {
                    this.promise.emit('logout');
                    resolve('logout');
                },
                (error) => {
                    if (error.status === 401) {
                        this.promise.emit('unauthorized');
                    }
                    this.promise.emit('error');
                    reject(error);
                });
        });

        Emitter(this.promise); // jshint ignore:line

        return this.promise;
    }

    /**
     * If the client is logged in retun true
     *
     * @returns {Boolean} is logged in
     */
    isLoggedIn() {
        if (this.config.provider && this.config.provider.toUpperCase() === 'BPM') {
            return this.bpmAuth.isLoggedIn();
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ECM') {
            return this.ecmAuth.isLoggedIn();
        } else if (this.config.provider && this.config.provider.toUpperCase() === 'ALL') {
            return this.ecmAuth.isLoggedIn() && this.bpmAuth.isLoggedIn();
        }
    }

    /**
     * Set the current Ticket
     *
     * @param {String} Ticket
     * */
    setTicket(ticket) {
        return this.ecmAuth.setTicket(ticket);
    }

    /**
     * Get the current Ticket
     *
     * @returns {String} Ticket
     * */
    getTicket() {
        return this.ecmAuth.getTicket();
    }
}

Emitter(AlfrescoApi.prototype); // jshint ignore:line
module.exports = AlfrescoApi;

module.exports.Activiti = AlfrescoActivitiApi;
module.exports.Core = AlfrescoCoreRestApi;
module.exports.Auth = AlfrescoAuthRestApi;
module.exports.Mock = AlfrescoMock;
