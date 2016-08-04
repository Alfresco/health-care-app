# Health Care Model

Import process into Activiti for `Health Care Express Appliction` (Alfresco AppFest)

## Create user 'visitor':

Follow steps below to create 'visitor' user required

    1. Login as admin
    2. Go to identity management > users > create user 
    3. Create user with details: 
    - Email: 'visitor@visitor.com'
    - Password: 'visitor'
    - First name: 'visitor'
    - Last name: 'visitor'
    4. Go to capabilities, add newly created user to all groups
    4. Login as user created
    5. Go to identity management > personal 
    6. Change email to 'visitor' 

## Import process

_You can use the following steps to deploy and activate the model for demo environment.
Note that it was tested only with internal v.5.2 docker image._

- Compile and run 'Demo App' for ng2-components
- Navigate to `/Data Dictionary/Models` and drop `health-care-model.xml` there to upload it
- Navigate to [Model and Messages Console](http://localhost:8080/alfresco/s/admin/admin-repoconsole)
- Execute `activate model health-care-model.xml` command
- (optional) Ensure the model is loaded via `show models` command, it should have `IsLoaded: Y` in the list
