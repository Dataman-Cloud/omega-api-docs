.PHONY: all build publish preview localbuild swagger clean

# Swagger-Codegen tools
# for instructions on how to install swagger codegen tool, pls visit the following links
#
# https://github.com/swagger-api/swagger-codegen#compatibility
#
default: localbuild

DOCKER := docker
SWAGGER_BIN := swagger-codegen
TARGET_LANG := dynamic-html
TARGET_LANG := html
MOCHA := mocha


# DatamanCloud api generation
build:
	${DOCKER} build -t "swaggerbuild" .
	${DOCKER} run --name=swaggerbuild swaggerbuild
	${DOCKER} cp swaggerbuild:/build .
	#${DOCKER} rm -f swaggerbuild

publish: build
	scp -R build account@server.com:~/www/api

preview: build
	cd build &&  npm install . && node main.js
	open http://localhost:8002
	cd -

localbuild: swagger
	mkdir -p ./build
	${SWAGGER_BIN} generate -i api-doc.yaml -l ${TARGET_LANG} -o build/

swagger:
	@if ! command -v ${SWAGGER_BIN} > /dev/null 2>&1; then echo "Swagger not installed, Visit https://github.com/swagger-api/swagger-codegen/blob/master/README.md  to get swagger-codegen"; exit 0; fi

clean:
	-${DOCKER} rm -f swaggerbuild
	-${DOCKER} rmi -f swaggerbuild
	@if [ -e ./build ]; then rm -r ./build; fi

test:
	${MOCHA} api-tester/index.js
