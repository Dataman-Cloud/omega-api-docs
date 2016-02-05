default: localbuild

DOCKER := docker
SWAGGER_BIN := swagger-codegen 
TARGET_LANG := dynamic-html


build:
	${DOCKER} build -t "swaggerbuild" -f ./Dockerfile
	${DOCKER} run -d --name=swaggerbuild swagger /build.sh
	${DOCKER} cp --name=swagger swaggerbuild:/build .
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

