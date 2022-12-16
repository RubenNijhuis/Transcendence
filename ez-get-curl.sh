#!/bin/bash

BASE='localhost:3000/api/group/chats'
ARG='c6d5c2e2-d76b-4719-ab05-2d3d72189eee'
TOKEN=$1

curl --location --request GET "$BASE/$ARG" \
--header "Authorization: Bearer $TOKEN"