#!/bin/bash
echo "What is your module called?";
read module
echo "$module...nice choice!"
mkdir "www/$module"
cd "www/$module"
touch "$module.ctrl.js"
touch "$module.module.js"
touch "$module.services.js"
touch "$module.jade.js"
cd ../..

