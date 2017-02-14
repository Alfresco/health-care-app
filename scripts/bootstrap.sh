#!/bin/bash

base_url="$1"
test -z "$base_url" && base_url="http://localhost"

ecm_url="$base_url:8080/alfresco"
ecm_user="admin"
ecm_pass="admin"

bpm_url="$base_url:9999/activiti-app"
bpm_user="admin@app.activiti.com"
bpm_pass="admin"

agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0'
csrf_token="5762ca58a7a536f470fe21f79a2eb8b29b"

function extract_id_from_json() {
  [[ "$1" =~ ^\{\"id\":\"?([^\",]+)\"? ]] && echo "${BASH_REMATCH[1]}" || echo ""
}

function bpm_create_user() {
  tenant_id="$5"
  test -z "$5" && tenant_id=1
  local resp=$( curl -s \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{ \"firstName\": \"$1\", \"lastName\": \"$2\", \"email\": \"$3\", \"password\": \"$4\", \"status\": \"active\", \"type\": \"enterprise\", \"tenantId\": \"$tenant_id\" }" \
    "$bpm_url/api/enterprise/admin/users" )
  echo $( extract_id_from_json "$resp" )
}

function bpm_import_app() {
  local resp=$( curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -F file=@$1 \
    "$bpm_url/api/enterprise/app-definitions/import?renewIdmEntries=true" )
  echo $( extract_id_from_json "$resp" )
}

function bpm_publish_app() {
  curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{ \"comment\": \"\", \"force\": false }" \
    "$bpm_url/api/enterprise/app-definitions/$1/publish"
}

function bpm_deploy_app() {
  curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{ \"appDefinitions\": [{\"id\":$1}] }" \
    "$bpm_url/api/enterprise/runtime-app-definitions"
}

function bpm_create_model() {
  local resp=$( curl \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    -d "{\"modelType\": $1, \"name\": \"$2\", \"description\": \"$3\" }" \
    "$bpm_url/api/enterprise/models" )
  echo "$resp" >&2
  echo $( extract_id_from_json "$resp" )
}

function bpm_save_form() {
  curl \
    -X 'PUT' \
    -u "$bpm_user:$bpm_pass" \
    -A "$agent" \
    -H "Cookie: CSRF-TOKEN=$csrf_token" \
    -H "X-CSRF-TOKEN: $csrf_token" \
    -H 'Content-Type: application/json' \
    --data-binary "@$2" \
    "$bpm_url/api/enterprise/editor/form-models/$1"

}

function ecm_create_user() {
  curl \
    -u "$ecm_user:$ecm_pass" \
    -H 'Content-Type: application/json' \
    -d "{ \"id\": \"$4\", \"firstName\": \"$1\", \"lastName\": \"$2\", \"email\": \"$3\", \"enabled\": true, \"password\": \"$5\" }" \
    "$ecm_url/api/-default-/public/alfresco/versions/1/people"
}

function ecm_create_site() {
  curl \
    -u "$ecm_user:$ecm_pass" \
    -H 'Content-Type: application/json' \
    -d "{ \"id\": \"$1\", \"title\": \"$2\", \"description\": \"$3\", \"visibility\": \"$4\" }" \
    "$ecm_url/api/-default-/public/alfresco/versions/1/sites"
}

function ecm_add_site_member() {
  curl \
    -u "$ecm_user:$ecm_pass" \
    -H 'Content-Type: application/json' \
    -d "{ \"id\": \"$2\", \"role\": \"$3\" }" \
    "$ecm_url/api/-default-/public/alfresco/versions/1/sites/$1/members"
}

function ecm_upload_model() {
  curl -s \
    -u "$ecm_user:$ecm_pass" \
    -F file=@$1 \
    "$ecm_url/s/api/cmm/upload"
}

function ecm_update_model_status() {
  model_json=$( curl -s \
    -u "$ecm_user:$ecm_pass" \
    -H 'Content-Type: application/json' \
    "$ecm_url/api/-default-/private/alfresco/versions/1/cmm/$1" )
  echo "$model_json"
  model_json=$( echo "$model_json" | sed -e "s/\"status\":\"[A-Z]*\"/\"status\":\"$2\"/" -e 's/^{"entry"://' -e 's/}}/}/' )
  echo "$model_json"
  curl \
    -u "$ecm_user:$ecm_pass" \
    -X PUT \
    -H 'Content-Type: application/json' \
    -d "$model_json" \
    "$ecm_url/api/-default-/private/alfresco/versions/1/cmm/$1?select=status"
}

bpm_create_user "Visitor" "Visitor" "visitor@visitor.com" "visitor" >/dev/null

app_id=$( bpm_import_app "../assets/bpm/app/visit.zip" )
test -z "$app_id" && echo "Could not find app ID" && exit 1
bpm_publish_app "$app_id"
bpm_deploy_app "$app_id"

form_id=$( bpm_create_model 2 "Health_User_Form" "Patient details form" )
bpm_save_form "$form_id" "../assets/bpm/forms/Health_User_Form.import.json"

ecm_create_user "Activiti" "Admin" "$bpm_user" "$bpm_user" "$bpm_pass"
ecm_create_user "Visitor" "Visitor" "visitor@visitor.com" "visitor@visitor.com" "visitor"

ecm_upload_model "../assets/ecm/healthCareModel.zip"
ecm_update_model_status "healthCareModel" "ACTIVE"
ecm_upload_model "../assets/ecm/VisitData.zip"
ecm_update_model_status "VisitData" "ACTIVE"

# create site and add visitor user as collaborator
ecm_create_site "health-visits" "Healthcare Visits" "Healthcare app patient data" "PUBLIC"
ecm_add_site_member "health-visits" "$bpm_user" "SiteCollaborator"