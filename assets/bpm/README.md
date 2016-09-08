# Health Care Model

## Create user 'visitor'

### Follow steps below to create 'visitor' user required.

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

### Import app 
    1. Login as Admin
    2. Import app `visit.zip` into Activit (Alfresco AppFest)
    3. in the app editor remove and readd the visitor user
    4. Save and Publish the App
    5. Login as visitor
    6. Visit app should be visible on the dashboard
    7. Click on the App to allow activiti to initialise the filters
