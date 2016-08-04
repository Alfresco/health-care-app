# Health Care Model

Import process into Activiti for `Health Care Express Appliction` (Alfresco AppFest)

## Create user 'visitor'

Follow steps below to create 'visitor' user required.

    1. Login as admin
    2. Go to identity management > users > create user 
    3. Create user with details: 
    - Email: 'visitor@visitor.com'
    - Password: 'visitor'
    - First name: 'visitor'
    - Last name: 'visitor'
    4. Go to capabilities, add newly created user to all groups
    5. Login as user created
    6. Go to identity management > personal 
    7. Change email to 'visitor' 

## Import process

Follow steps below to import process.

    1. Login as admin
    2. Go to kickstart app > processes > import process
    3. Import file 'Health Care Express app.bpmn20.xml' ('/health-care-app/assets/bpm/process')
    4. Click 'validate' 
    5. For all users tasks that cannot be validate, select task and choose 'Assignment'
    6. Ensure assignment is set to 'Assigned to single user' and select user creates 'visitor' and save

## Resolve exclusive gateway validation error

    1. Edit process 'Health Care Express app'
    2. Select 'Determine next visit type' user task > referenced form > reselect form 'Determine visit type' > save
    3. Select 'Emergency response' user task > referenced form > reselect form 'Emergency response detail' > save

