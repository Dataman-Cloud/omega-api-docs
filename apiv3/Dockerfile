FROM cmingxu/swagger-codegen

COPY ./api-doc.yaml /api-doc.yaml

RUN mkdir -p build

COPY build.sh /build.sh
RUN chmod 755 /build.sh

WORKDIR /
ENTRYPOINT ["/build.sh"]
