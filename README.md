# Alfresco Healthcare Demo Application

<p align="center">
  <img title="alfresco" alt='alfresco' src='assets/alfresco.png'  width="280px" height="150px"></img>
  <img title="angular2" alt='angular2' src='assets/angular2.png'  width="150px" height="150px"></img>
</p>

This project provides an example vertical-focussed app utilising the
[Alfresco Angular2 components](http://github.com/Alfresco/alfresco-ng2-components). The app includes a
customised theme, customised instances of the out-of-the-box content and process components, some custom
local components and a set of content and process demo data.

## Prerequisites

Before you start using the app, make sure you have installed all required software and done all the
necessary configuration, see this [page](PREREQUISITES.md).

## Quick start

If you have fulfilled the prerequisites then you can install dependencies and start up the app

    npm install
    npm run start

## Add demo data

The project contains a script `bootstrap.sh` that you can use to import all the required data into your
environment automatically.

The script assumes you have Alfresco Content Services running on port 8080 and Alfresco Process Services
on port 9999, on the same host, which you must specify if this is not your local machine

    ./scripts/bootstrap.sh          # will assume http://localhost

Or for a remote environment

    ./scripts/bootstrap.sh https://my.remote.env

*Warning: this script has only been tested on clean environments without any existing data present. Use
this at your own risk in a system with other data already present.*

###Manual set-up

If you prefer you can set up the application data for [content services data](assets/ecm/README.md) and
[process services data](assets/bpm/README.md) manually.

## Usage

The demo data defines two users who are used together to show the basic capabilities of the app

| Username                  | Password    | Description              |
| ------------------------- | ----------- | ------------------------ |
| `admin@app.activiti.com`  | `admin`     | Administrative user used to create patients and schedule appointments |
| `visitor@visitor.com`     | `visitor`   | Health visitor user required to carry out visits/tasks assigned to them |

The basic demo flow as as follows

1. Log in as the `admin@app.activiti.com` user
2. Click *Create Patient* in the top navigation bar. Fill out the required fields and add an avatar image.
3. In the *Patients* list, click the context menu for the new patient and click *Schedule an appointment*
4. Fill out the required details in the form to schedule an appointment with the health visitor and click *Save*
4. Log out of the app and log back in as the `visitor@visitor.com` user
5. Click *Visits* in the top navigation. Select the first task assigned to you in the list and fill out the form before completing it.
6. The next task assigned to you will automatically load. Continue through the process flow until you have no more tasks. The visit is now complete.