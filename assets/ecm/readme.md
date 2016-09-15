# Health Care Model


## Configuration for the demo app
Follow the steps below to configure your share app 

1. Login as Admin 
2. Go To Admin Tools and click Model Manager
3. Import VisitData and healthCareModel models
4. Activate the models via Actions menu
5. Navigate to Users and Click New User
6. Create the visitor user :
    - First Name : visitor
    - Email : visitor@visitor.com
    - User Name : visitor
    - Password : visitor
    - Add the groups : ALFRESCO_ADMINISTRATORS, ALFRESCO_MODEL_ADMINISTRATORS, ALFRESCO_SEARCH_ADMINISTRATORS and SITE_ADMINISTRATORS



## Sample ECM model for `Health Care Express Appliction` (Alfresco AppFest)


### Types included:

- Patient Folder (`hc:patientFolder`)

    * First Name (`hc:firstName`)
    * Last Name (`hc:lastName`)
    * DOB (`hc:dateOfBirth`)
    * Address (`hc:address`)
    * Email (`hc:email`)
    * Telephone (`hc:telephone`)
    * Cell Phone (`hc:cellPhone`)
    * Next of Kin (`hc:nextOfKin`)
    * Doctor (`hc:doctor`)

### Deploying

_You can use the following steps to deploy and activate the model for demo environment.
Note that it was tested only with internal v.5.2 docker image._

- Compile and run 'Demo App' for ng2-components
- Navigate to `/Data Dictionary/Models` and drop `health-care-model.xml` there to upload it
- Navigate to [Model and Messages Console](http://localhost:8080/alfresco/s/admin/admin-repoconsole)
- Execute `activate model health-care-model.xml` command
- (optional) Ensure the model is loaded via `show models` command, it should have `IsLoaded: Y` in the list

### Creating Patient folders

#### Using `curl`

```sh
curl -u 'admin:admin' --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "name":"Patient 01",
  "nodeType":"hc:patientFolder",
  "properties": {
     "hc:doctor": "John Doe"
  }
}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children?autoRename=true'
```

#### Using `TypeScript`

_TODO: needs explanation_

```ts
let body = {
    name: 'Patient 02',
    nodeType: 'hc:patientFolder',
    properties: {
        'hc:doctor': 'John Doe'
    }
};

this.authService.getAlfrescoApi().nodes.addNode('-root-', body).then(
    (data) => console.log(data),
    (err) => {
        window.alert('See console output for error details');
        console.log(err);
    }
);
```

### See also

- [Deploying a content model: dynamic approach](http://docs.alfresco.com/5.0/tasks/deploy-dynamic.html)
- [Content metamodel properties](http://docs.alfresco.com/4.0/concepts/metadata-model-props.html)
- [Adding a custom property](http://docs.alfresco.com/5.1/tasks/dev-extensions-content-models-tutorials-add-custom-property.html)
