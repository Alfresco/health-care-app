#!/bin/bash

ecm_url='http://localhost:8080/alfresco'
ecm_user='admin'
ecm_pass='admin'

bpm_url='http://localhost:9999/activiti-app'
bpm_user='admin@app.activiti.com'
bpm_pass='admin'

function bpm_create_user() {
  curl \
    -u "$ecm_user:$bpm_pass" \
    -d "{\"firstName\": \"$1\", \"lastName\": \"$2\", \"email\": \"$3\", \"password\": \"$4\", \"status\": \"active\", \"type\": \"enterprise\"}" \
    "$bpm_url/api/enterprise/admin/users"
}

function bpm_import_app() {
  curl \
    -u "$ecm_user:$bpm_pass" \
    -F file=$1 \
    "$bpm_url/api/enterprise/app-definitions/import"
}

function bpm_publish_app() {
  curl \
    -u "$ecm_user:$bpm_pass" \
    -F file=$1 \
    "$bpm_url/api/enterprise/app-definitions/import"
}

function bpm_create_model() {
  curl \
    -u "$ecm_user:$bpm_pass" \
    -d "{\"modelType\": $1, \"name\": \"$2\", \"description\": \"$3\" }" \
    "$bpm_url/api/enterprise/models"
}

function ecm_create_user() {
  curl \
    -u "$ecm_user:$ecm_pass" \
    -d "{\"personBodyCreate\": { \"id\": \"$4\", \"firstName\": \"$1\", \"lastName\": \"$2\", \"email\": \"$3\", \"enabled\": true, \"password\": \"$5\" } }" \ \
    "$ecm_url/api/-default-/public/alfresco/versions/1/people"
}

function ecm_upload_model() {
  curl \
    -u "$ecm_user:$ecm_pass" \
    -F file=$1 \
    "$ecm_url/s/api/cmm/upload"
}

#TODO check if user present first
bpm_create_user "Visitor" "Visitor" "visitor@visitor.com" "visitor"
#TODO check if app present first and update if found
#TODO need to renew the user and group identifiers like option in Kickstart?
bpm_import_app "../assets/bpm/app/visit.zip"
#TODO deal with app not having ID 1
bpm_publish_app 1
#bpm_create_model 2 "Health_User_Form" "Patient details form"
#TODO add actual form content from assets/bpm/forms/Health_User_Form.json

ecm_create_user "Activiti" "Admin" "$bpm_user" "$bpm_user" "$bpm_pass"
ecm_create_user "Visitor" "Visitor" "visitor@visitor.com" "visitor@visitor.com" "visitor"

#TODO ECM models need activating
ecm_upload_model "../assets/ecm/healthCareModel.zip"
ecm_upload_model "../assets/ecm/VisitData.zip"
