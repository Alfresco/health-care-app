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

##Configure ECM and BPM

The project contains a script `bootstrap.sh` that you can use to import all the necessary data into your
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
