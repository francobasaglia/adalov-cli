#!/bin/bash

# Get `-sc` or `--skipClean` flag
skip_clean=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --skipClean | -sc )
      skip_clean=true
      ;;
  esac
  shift
done

# Clean project dependencies & builds outputs
if [ "$skip_clean" = false ]; then
  yarn clean
fi

# Install dependencies
yarn install

# Run linter
yarn lint

# Run tests
yarn test

# Build project
yarn build
