FROM cmingxu/swagger-codegen

COPY ./api-doc-v2_1.json /api-doc.json

RUN mkdir -p build

COPY build.sh /build.sh
RUN chmod 755 /build.sh

WORKDIR /
ENTRYPOINT ["/build.sh"]
