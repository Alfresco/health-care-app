# Activiti Task List Component for Angular 2

## Prerequisites

Before you start using this development framework, make sure you have installed all required software and done all the
necessary configuration, see this [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/PREREQUISITES.md).

## Install

```sh
npm install --save ng2-activiti-tasklist
```

### Dependencies

You must separately install the following libraries for your application:

- [ng2-translate](https://github.com/ocombe/ng2-translate)
- [ng2-alfresco-core](https://www.npmjs.com/package/ng2-alfresco-core)
- [ng2-alfresco-datatable](https://www.npmjs.com/package/ng2-alfresco-datatable)


```sh
npm install --save ng2-translate ng2-alfresco-core ng2-alfresco-datatable
```

#### Material Design Lite

The style of this component is based on [material design](https://getmdl.io/), so if you want to visualize it correctly you have to add the material
design dependency to your project:

```sh
npm install --save material-design-icons material-design-lite
```

Also make sure you include these dependencies in your `index.html` file:

```html
<!-- Google Material Design Lite -->
<link rel="stylesheet" href="node_modules/material-design-lite/material.min.css">
<script src="node_modules/material-design-lite/material.min.js"></script>
<link rel="stylesheet" href="node_modules/material-design-icons/iconfont/material-icons.css">
```

## Basic usage example Activiti Task List
The component shows the list of all the tasks filter by the
FilterModel passed in input.
```html
<activiti-tasklist [taskFilter]="taskFilterModel"></activiti-tasklist>
```

#### Events
**onSuccess**: The event is emitted when the task list is loaded
**rowClick**: The event is emitted when the task in the list is
clicked<br />

#### Options

**taskFilter**: { FilterModel } required) FilterModel object that
is passed to the task list API to filter the task list.
Example:
```json
{
	"id": 4,
	"name": "Involved Tasks",
	"recent": false,
	"icon": "glyphicon-align-left",
	"filter": {
		"sort": "created-desc",
		"name": "",
		"state": "open",
		"assignment": "involved"
	}
}
```
**schemaColumn**: { any[] } optional) JSON object that represent
the number and the type of the columns that you want show
Example:
```json
[
 {type: 'text', key: 'id', title: 'Id'},
 {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true},
 {type: 'text', key: 'formKey', title: 'Form Key', sortable: true},
 {type: 'text', key: 'created', title: 'Created', sortable: true}
]
```

## Basic usage example Activiti Task Details
The component shows the details of the task id passed in input
```html
<activiti-task-details [taskId]="taskId"></activiti-task-details>
```

#### Events
No events

#### Options

**taskId**: { string } required) The id of the task details that we
are asking for.

## Basic usage example Activiti Filter
The component shows all the available filters.

```html
<activiti-filters></activiti-filters>
```

#### Events
**filterClick**: The event is emitted when the filter in the  list is
 clicked

#### Options
No options

## Build from sources

Alternatively you can build component from sources with the following commands:

```sh
npm install
npm run build
```

### Build the files and keep watching for changes

```sh
$ npm run build:w
```

### Running unit tests

```sh
npm test
```

### Running unit tests in browser

```sh
npm test-browser
```

This task rebuilds all the code, runs tslint, license checks and other quality check tools
before performing unit testing.

### Code coverage

```sh
npm run coverage
```
