#!/bin/bash

# Clear screen based on OS
if [ "$OS" = "Windows_NT" ]; then
  cls
else
  clear
fi

# Run the npm lint task
npm run lint
