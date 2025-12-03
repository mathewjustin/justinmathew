#!/bin/bash
# This script builds the Hugo site or starts the local server

if [[ "$1" == "serve" ]]; then
  echo "Starting Hugo server on http://localhost:1313"
  hugo server
else
  echo "Building Hugo site..."
  hugo --minify
  echo "Hugo site built successfully!"
fi