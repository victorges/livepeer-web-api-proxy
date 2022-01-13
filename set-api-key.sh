#!/bin/bash

echo "Insert your Livepeer API Key: "
read API_KEY

flyctl secrets set "LIVEPEER_API_TOKEN=$API_KEY"

echo "You're done!"
