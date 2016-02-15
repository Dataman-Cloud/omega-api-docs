# Swagger-Codegen tools
# for instructions on how to install swagger codegen tool, pls visit the following links 
#
# https://github.com/swagger-api/swagger-codegen#compatibility
#
default: localbuild

DOCKER := docker
SWAGGER_BIN := swagger-codegen
TARGET_LANG := dynamic-html


# DatamanCloud api generation
build:
	${DOCKER} build -t "swaggerbuild" .
	${DOCKER} run -d --name=swaggerbuild swaggerbuild bash -c /build.sh
	${DOCKER} cp swaggerbuild:/docs/build .
	${DOCKER} rm -f swaggerbuild

publish: build
	scp -R build account@server.com:~/www/api

preview: build
	open ./build/index.html

localbuild: swagger
	mkdir -p ./build
	${SWAGGER_BIN} generate -i api-doc.json -l ${TARGET_LANG} -o build/

swagger:
	@if ! command -v ${SWAGGER_BIN} > /dev/null 2>&1; then echo "Swagger not installed"; exit 0; fi

clean:
	rm -r ./build

