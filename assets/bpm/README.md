# Health Care Model

## Create 'visitor' user

### Follow steps below to create 'visitor' user required.

1. Login as admin
2. Go to *Identity Management* > *Users* and click *Create user*
3. Create user with details:
   - Email: 'visitor@visitor.com'
   - Password: 'visitor'
   - First name: 'visitor'
   - Last name: 'visitor'
4. Go to capabilities, add newly created user to all groups

### Import app

1. Login as admin user and go to *Kickstart* > *Apps*
2. Import app `app/visit.zip` into Activiti (Alfresco AppFest)
3. In the app editor remove and re-add the visitor user
4. *Save* and *Publish* the App
5. Login as visitor user
6. Visit app should be visible on the dashboard
7. Click on the App to allow Activiti to initialise the task filters

### Import form definition

1. Login as admin user
2. Go to *Kickstart* > *Forms*
3. Click import and upload file `forms/Health_User_Form.json`

## Troubleshooting

If no tasks get assigned to the visitor user, then it may be necessary to
edit each task in the process to remove and re-add the visitor user as
the task assignee.