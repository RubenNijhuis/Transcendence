#!/bin/bash

BASE='localhost:3000/api/'
ARG=''
TOKEN=$1

curl --location --request GET "$BASE" \
--header "Authorization: Bearer $TOKEN"

curl --location --request POST "$BASE" \
--header "Authorization: Bearer $TOKEN" \
--header 'Content-Type: application/json' \
--data-raw "{
    'amount': $ARG
}"