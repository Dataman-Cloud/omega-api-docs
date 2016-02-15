# omega-api-docs

## edit your api doc quickly

1. 访问 http://editor.swagger.io/
2. 用 [master 分支文档](https://raw.githubusercontent.com/Dataman-Cloud/omega-api-docs/master/api-doc.yaml) 里面的内容替换掉 editor.swagger.io 的右侧内容。
3. 开始编辑, 下面参考文档有语法及相应的例子。
4. 由于是线上编辑器，建议更改完内容后尽快保存，以免内容丢失。
5. 文档编写请参考 [数人云RESTful API 文档规范(v0.0.0.1)](https://github.com/Dataman-Cloud/omega-api-docs/blob/master/shurenyun-doc-specification-v0.1.md)

## 本地初始化一个文档编辑环境，如果你不想在远程编辑

如果你想在本地起一套编辑环境，及展示站点，你可以

执行下述 bash 命令

```bash
dao pull mydock/swagger-editor
dao pull schickling/swagger-ui
docker run -p 8081:8080 --name=apieditor -d mydock/swagger-editor
docker run -p 80:80 --name=apidoc -e API_URL=https://raw.githubusercontent.com/Dataman-Cloud/omega-api-docs/master/api-doc.json  -d schickling/swagger-ui
```

访问 http://$DOCKER_HOST:8081 就会来到编辑页面。
访问 http://$DOCKER_HOST:80 就会看到当前主分支上的doc。

## references

1. 语法及可用的数据类型: https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
2. 一个例子: http://petstore.swagger.io/
