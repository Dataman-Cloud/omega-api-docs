#!/bin/bash

java -jar /opt/swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i /api-doc.yaml -l dynamic-html -o /build/
