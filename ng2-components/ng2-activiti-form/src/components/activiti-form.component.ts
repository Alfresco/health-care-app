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
    Component,
    OnInit, AfterViewChecked, OnChanges,
    SimpleChange,
    Input, Output, EventEmitter
} from '@angular/core';
import { MATERIAL_DESIGN_DIRECTIVES } from 'ng2-alfresco-core';

import { FormService } from './../services/form.service';
import { FormModel, FormOutcomeModel } from './widgets/widget.model';

import { TabsWidget } from './widgets/tabs/tabs.widget';
import { ContainerWidget } from './widgets/container/container.widget';

declare let __moduleName: string;
declare var componentHandler;

/**
 *
 * ActivitiForm can show form 3 type of form:
 *   1) Form attached to a task passing the {taskId}.
 *   2) Form that are only defined with the {formId},
 *      in this case you can pass also {saveOption} as parameter to tell what is the function
 *      to call on the save action.
 *   3) Form that are only defined with the {formName},
 *      in this case you can pass also {saveOption} as parameter to tell what is the function
 *      to call on the save action.
 * @returns {ActivitiForm} .
 */
@Component({
    moduleId: __moduleName,
    selector: 'activiti-form',
    templateUrl: './activiti-form.component.html',
    styleUrls: ['./activiti-form.component.css'],
    directives: [MATERIAL_DESIGN_DIRECTIVES, ContainerWidget, TabsWidget],
    providers: [FormService]
})
export class ActivitiForm implements OnInit, AfterViewChecked, OnChanges {

    @Input()
    taskId: string;

    @Input()
    formId: string;

    @Input()
    formName: string;

    @Input()
    data: any;

    @Output()
    saveOption = new EventEmitter();


    form: FormModel;
    debugMode: boolean = false;

    hasForm(): boolean {
        return this.form ? true : false;
    }

    constructor(private formService: FormService) {
    }

    ngOnInit() {
        if (this.taskId) {
            this.loadForm(this.taskId);
        }
        if (this.formId) {
            this.getFormDefinitionById();
        }
        if (this.formName) {
            this.getFormDefinitionByName();
        }
    }

    ngAfterViewChecked() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        let taskId = changes['taskId'];
        if (taskId && taskId.currentValue) {
            this.loadForm(taskId.currentValue);
        }

        let formId = changes['formId'];
        if (formId && formId.currentValue) {
            this.getFormDefinitionById();
        }

        let formName = changes['formName'];
        if (formName && formName.currentValue) {
            this.getFormDefinitionByName();
        }
    }


    onOutcomeClicked(outcome: FormOutcomeModel, event?: Event) {
        if (outcome) {
            if (outcome.isSystem) {
                if (outcome.id === '$save') {
                    return this.saveTaskForm();
                }

                if (outcome.id === '$complete') {
                    return this.completeTaskForm();
                }

                if (outcome.id === '$custom') {
                    this.saveOption.emit(this.form.values);
                }
            } else {
                // Note: Activiti is using NAME field rather than ID for outcomes
                if (outcome.name) {
                    return this.completeTaskForm(outcome.name);
                }
            }
        }
    }

    onRefreshClicked() {
        if (this.taskId) {
            this.loadForm(this.taskId);
        }
        if (this.formId) {
            this.getFormDefinitionById();
        }
        if (this.formName) {
            this.getFormDefinitionByName();
        }
    }

    private loadForm(taskId: string) {
        this.formService
            .getTaskForm(taskId)
            .subscribe(
                form => this.form = new FormModel(form),
                err => console.log(err)
            );
    }

    private getFormDefinitionById() {
        this.formService
            .getFormDefinitionById(this.formId)
            .subscribe(
                form => this.form = new FormModel(form, this.data),
                err => console.log(err)
            );
    }

    private getFormDefinitionByName() {
        this.formService
            .getFormDefinitionByName(this.formName)
            .subscribe(
                id => {
                    this.formService.getFormDefinitionById(id).subscribe(
                        form => this.form = new FormModel(form, this.data),
                        err => console.log(err)
                    );
                },
                err => console.log(err)
            );
    }

    private saveTaskForm() {
        this.formService.saveTaskForm(this.form.taskId, this.form.values).subscribe(
            (response) => {
                console.log(response);
                alert('Saved');
            },
            (err) => window.alert(err)
        );
    }

    private completeTaskForm(outcome?: string) {
        this.formService
            .completeTaskForm(this.form.taskId, this.form.values, outcome)
            .subscribe(
                (response) => {
                    console.log(response);
                    alert('Saved');
                },
                (err) => window.alert(err)
            );
    }
}
