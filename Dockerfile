FROM cmingxu/swagger-codegen

COPY ./docs /docs
COPY build.sh /build.sh
COPY ./api-doc.json /docs/api-doc.json

RUN chmod 755 /build.sh

WORKDIR /docs

RUN mkdir -p build

