#!/bin/bash
gulp
cd dist
node server.js & cd ..;
ionic emulate ios --target="iPhone-4s";
