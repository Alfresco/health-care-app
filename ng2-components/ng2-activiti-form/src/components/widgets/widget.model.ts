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

export interface FormFieldMetadata {
    [key: string]: any;
}

export interface FormValues extends FormFieldMetadata {
}

export class FormFieldTypes {
    static CONTAINER: string = 'container';
    static GROUP: string = 'group';
    static DROPDOWN: string = 'dropdown';
    static HYPERLINK: string = 'hyperlink';
    static RADIO_BUTTONS: string = 'radio-buttons';
    static DISPLAY_VALUE: string = 'readonly';
}

export class FormWidgetModel {

    private _form: FormModel;
    private _json: any;

    get form(): FormModel {
        return this._form;
    }

    get json(): any {
        return this._json;
    }

    constructor(form: FormModel, json: any) {
        this._form = form;
        this._json = json;
    }
}

export interface FormFieldOption {
    id: string;
    name: string;
}

export class FormFieldModel extends FormWidgetModel {

    private _value: string;

    fieldType: string;
    id: string;
    name: string;
    type: string;
    required: boolean;
    readOnly: boolean;
    overrideId: boolean;
    tab: string;
    colspan: number = 1;
    options: FormFieldOption[] = [];
    restUrl: string;
    restResponsePath: string;
    restIdProperty: string;
    restLabelProperty: string;
    hasEmptyValue: boolean;
    className: string;
    optionType: string;
    params: FormFieldMetadata = {};
    hyperlinkUrl: string;
    displayText: string;

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        this._value = v;
        this.updateForm();
    }

    constructor(form: FormModel, json?: any) {
        super(form, json);

        if (json) {
            this.fieldType = json.fieldType;
            this.id = json.id;
            this.name = json.name;
            this.type = json.type;
            this.required = <boolean> json.required;
            this.readOnly = <boolean> json.readOnly;
            this.overrideId = <boolean> json.overrideId;
            this.tab = json.tab;
            this.restUrl = json.restUrl;
            this.restResponsePath = json.restResponsePath;
            this.restIdProperty = json.restIdProperty;
            this.restLabelProperty = json.restLabelProperty;
            this.colspan = <number> json.colspan;
            this.options = <FormFieldOption[]> json.options || [];
            this.hasEmptyValue = <boolean> json.hasEmptyValue;
            this.className = json.className;
            this.optionType = json.optionType;
            this.params = <FormFieldMetadata> json.params || {};
            this.hyperlinkUrl = json.hyperlinkUrl;
            this.displayText = json.displayText;

            this._value = this.parseValue(json);
            this.updateForm();
        }
    }

    private parseValue(json: any): any {
        let value = json.value;

        /*
         This is needed due to Activiti issue related to reading dropdown values as value string
         but saving back as object: { id: <id>, name: <name> }
         */
        // TODO: needs review
        if (json.type === FormFieldTypes.DROPDOWN) {
           if (value === '') {
               value = 'empty';
           }
        }

        /*
         This is needed due to Activiti issue related to reading radio button values as value string
         but saving back as object: { id: <id>, name: <name> }
         */
        if (json.type === FormFieldTypes.RADIO_BUTTONS) {
            // Activiti has a bug with default radio button value,
            // so try resolving current one with a fallback to first entry
            let entry: FormFieldOption[] = this.options.filter(opt => opt.id === value);
            if (entry.length > 0) {
                value = entry[0].id;
            } else if (this.options.length > 0) {
                value = this.options[0].id;
            }
        }

        return value;
    }

    updateForm() {
        if (this.type === FormFieldTypes.DROPDOWN) {
            /*
             This is needed due to Activiti reading dropdown values as string
             but saving back as object: { id: <id>, name: <name> }
             */
            if (this.value === 'empty' || this.value === '') {
                this.form.values[this.id] = {};
            } else {
                let entry: FormFieldOption[] = this.options.filter(opt => opt.id === this.value);
                if (entry.length > 0) {
                    this.form.values[this.id] = entry[0];
                }
            }
        } else if (this.type === FormFieldTypes.RADIO_BUTTONS) {
            /*
             This is needed due to Activiti issue related to reading radio button values as value string
             but saving back as object: { id: <id>, name: <name> }
             */
            let entry: FormFieldOption[] = this.options.filter(opt => opt.id === this.value);
            if (entry.length > 0) {
                this.form.values[this.id] = entry[0];
            } else if (this.options.length > 0) {
                this.form.values[this.id] = this.options[0].id;
            }
        } else {
            this.form.values[this.id] = this.value;
        }
    }
}

export class ContainerColumnModel {

    size: number = 12;
    fields: FormFieldModel[] = [];

    hasFields(): boolean {
        return this.fields && this.fields.length > 0;
    }
}

// TODO: inherit FormFieldModel
export class ContainerModel extends FormWidgetModel {

    fieldType: string;
    id: string;
    name: string;
    type: string;
    tab: string;
    numberOfColumns: number = 1;
    params: FormFieldMetadata = {};

    columns: ContainerColumnModel[] = [];
    isExpanded: boolean = true;

    isGroup(): boolean {
        return this.type === FormFieldTypes.GROUP;
    }

    isCollapsible(): boolean {
        let allowCollapse = false;

        if (this.isGroup() && this.params['allowCollapse']) {
            allowCollapse = <boolean> this.params['allowCollapse'];
        }

        return allowCollapse;
    }

    isCollapsedByDefault(): boolean {
        let collapseByDefault = false;

        if (this.isCollapsible() && this.params['collapseByDefault']) {
            collapseByDefault = <boolean> this.params['collapseByDefault'];
        }

        return collapseByDefault;
    }

    constructor(form: FormModel, json?: any) {
        super(form, json);

        if (json) {
            this.fieldType = json.fieldType;
            this.id = json.id;
            this.name = json.name;
            this.type = json.type;
            this.tab = json.tab;
            this.numberOfColumns = <number> json.numberOfColumns;
            this.params = <FormFieldMetadata> json.params || {};

            let columnSize: number = 12;
            if (this.numberOfColumns > 1) {
                columnSize = 12 / this.numberOfColumns;
            }

            for (let i = 0; i < this.numberOfColumns; i++) {
                let col = new ContainerColumnModel();
                col.size = columnSize;
                this.columns.push(col);
            }

            Object.keys(json.fields).map(key => {
                let fields = (json.fields[key] || []).map(f => new FormFieldModel(form, f));
                let col = this.columns[parseInt(key, 10) - 1];
                col.fields = fields;
            });

            this.isExpanded = !this.isCollapsedByDefault();
        }
    }
}

export class TabModel extends FormWidgetModel {

    id: string;
    title: string;
    visibilityCondition: any;

    fields: ContainerModel[] = [];

    hasContent(): boolean {
        return this.fields && this.fields.length > 0;
    }

    constructor(form: FormModel, json?: any) {
        super(form, json);

        if (json) {
            this.id = json.id;
            this.title = json.title;
            this.visibilityCondition = json.visibilityCondition;
        }
    }
}

export interface WidgetModelCache<T extends FormWidgetModel> {
    [key: string]: T;
}

export class FormOutcomeModel extends FormWidgetModel {

    private _id: string;
    private _name: string;

    isSystem: boolean = false;

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    constructor(form: FormModel, json?: any) {
        super(form, json);

        if (json) {
            this._id = json.id;
            this._name = json.name;
        }
    }
}

export class FormModel {

    private UNSET_TASK_NAME: string = 'Nameless task';

    private _id: string;
    private _name: string;
    private _taskId: string;
    private _taskName: string = this.UNSET_TASK_NAME;

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get taskId(): string {
        return this._taskId;
    }

    get taskName(): string{
        return this._taskName;
    }

    tabs: TabModel[] = [];
    fields: ContainerModel[] = [];
    outcomes: FormOutcomeModel[] = [];

    values: FormValues = {};

    private _json: any;

    get json() {
        return this._json;
    }

    hasTabs(): boolean {
        return this.tabs && this.tabs.length > 0;
    }

    hasFields(): boolean {
        return this.fields && this.fields.length > 0;
    }

    hasOutcomes(): boolean {
        return this.outcomes && this.outcomes.length > 0;
    }

    constructor(json?: any) {
        if (json) {
            this._json = json;

            this._id = json.id;
            this._name = json.name;
            this._taskId = json.taskId;
            this._taskName = json.taskName || this.UNSET_TASK_NAME;

            let tabCache: WidgetModelCache<TabModel> = {};

            // this.tabs = (json.tabs || []).map(t => new TabModel(this, t));
            this.tabs = (json.tabs || []).map(t => {
                let model = new TabModel(this, t);
                tabCache[model.id] = model;
                return model;
            });

            this.fields = (json.fields || []).map(obj => new ContainerModel(this, obj));
            for (let i = 0; i < this.fields.length; i++) {
                let field = this.fields[i];
                if (field.tab) {
                    let tab = tabCache[field.tab];
                    if (tab) {
                        tab.fields.push(new ContainerModel(this, field.json));
                    }
                }
            }

            let saveOutcome = new FormOutcomeModel(this, { id: '$save', name: 'Save' });
            saveOutcome.isSystem = true;

            let completeOutcome = new FormOutcomeModel(this, { id: '$complete', name: 'Complete' });
            completeOutcome.isSystem = true;

            let customOutcomes = (json.outcomes || []).map(obj => new FormOutcomeModel(this, obj));

            this.outcomes = [saveOutcome].concat(
                customOutcomes.length > 0 ? customOutcomes : [completeOutcome]
            );
        }
    }
}
