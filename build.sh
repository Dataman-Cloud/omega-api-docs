#!/bin/bash

java -jar /opt/swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i /docks/api-doc.json -l dynamic_html -o /docs/build/
