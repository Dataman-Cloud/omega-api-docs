# 数人云RESTful API文档规范(v0.0.1)

![logo.png](https://github.com/Dataman-Cloud/omega-api-docs/blob/master/logo-shurenyun.png)

## CHANGES
- [x] 文档初次提交（cmxu 2016-2-5)

## 一，文档目的

**为了给数人云客户（开发者）提供简单通俗，容易理解的数人云API文档， 特提出此规范，
目的是约束大家API开发过程中使用统一的命名规范，
命名原则，参数命名规范，HTTP headers使用， 返回结果集，
出错错误码等内容。**

### API样例

	GET api.shurenyun.com/v1/clusters?page=1&per_page=20

	PUT api.shurenyun.com/v1/cluster/:cluster_id

	DELETE api.shurenyun.com/v1/cluster/:cluster_id

## 二，命名规范

### 1，API HOST地址

	api.shurenyun.com/

* 数人云API 使用二级域名访问， 方便后期维护和负载均衡。
* API文档由swagger自动生成和部署，各位开发同事维护自己熟悉部分API， 由运维同事统一生成和部署。
* 数人云schema用https还是http需要商量之后决定。

### 2，版本说明

	api.shurenyun.com/v1/
	api.shurenyun.com/v2/
	api.shurenyun.com/v1_1/

* 数人云API版本信息由产品同事配合决定，重要版本发布应该集体讨论，合适场合发布给客户。
* 主版本号和次版本号之间以 **_** 分隔。

### 3，数人云API响应的 HTTP Method
数人云API响应的HTTP包括 GET,POST,PUT,DELETE 四种，其中

* GET 标识资源获取和列表
* POST 新生成资源
* PUT 对原有资源的修改
* DELETE 删除资源，包括隐藏资源



### 4，URL以及命名

* URL path部分完全符合RESTful原则，资源名称尽量简洁恰当，资源命名前应集体商讨决定，避免出现生僻单词，避免不够native的命名。
* 资源名称应该为一个单词的名词。
* 对资源的操作比如（deactive， activate）应为动词， 如果需要两个单词才能表达的动作应为两个单词以下划线分隔，比如get_status而非getStatus。
* URL的字符集应以小写字母， 数字，?, _, &, /组合而成， 不应出现大写字母以及其他特殊字符，下面列出误例几则：

	- api.shurenyun.com/v1/CLUSTERS     (不能出现大写)
	- api.shurenyun.com/v1/clusters/clusterid/getStatus (用get_status而非getStatus)
	- api.shurenyun.com/v1/clusters?page=1&perPage=20 (per_page而非perPage)
	- api.shurenyun.com/v1/clusters/?page=1&per_page=20 (cluster后面不应出现**/**)

### 5，参数命名
API请求的参数可能有三个来源，Header, Query和Body中。其中GET请求的参数出现再query中， PUT和POST请求参数出现再BODY当中，HEADER中参数对应AUTH等信息。


## 三，返回结果
数人云返回结果由两部分组成， 第一部分为HTTP STATUS code， 第二部分为response body本身。response body本身为json格式， 这部分需要运维同事配合nginx 50x返回body应该设置成json格式， 具体格式参考如下

### HTTP STATUS CODE

* 200 正常返回，场景例如：GET请求列表正常返回， 正常返回但结果未空，删除资源成功等
* 401 Unauthorized 场景例如： 访问需要授权的资源，比如未登录情况下访问cluster
* 403 Forbidden 场景例如：删除不属于本人的node

更详细的http status使用规范请参考 [这个地址](http://kubernetes.io/v1.1/docs/devel/api-conventions.html#http-status-codes)


### RESPONSE BODY

 * 返回结果本身为application/json格式，
   服务器50x的错误应同样返回json格式错误，
   需要运维同学配合。
 * json reponse的key如果是多个单词组成应该是camelCase，例如
   responseBody而不是response_body。
 * 返回结果的key不应该是单词缩写，应该是完整的清晰的单词。例如
  response而不是resp。
 * 所有返回结果中都应该有status表明请求是否成功，status值有ok和fail两种组成。
 * 返回结果正确，status应该是ok， http status code是20x
 * 返回结果错误，status应该是fail， http status code是30x,
   4xx或者50x。result中提供详细的错误code， 错误的message。

成功结果返回

	{
		"status": "ok"，
		“result”: ...
	}

失败返回结果

	{
		"status": "fail"
		"result": {
			"code": 10001,
			"message": "foobar",
			"fields": "fields"
		}

	}

## 四，错误码规约
错误码   |  描述
------- | ------
10001   |  数据错误
10002   |  token验证失败
10003   |  用户已存在
10004   |  用户不存在
10005   |  非激活用户
10006   |  密码错误
10007   |  token无效
10008   |  JSON格式错误
10009   |  用户已激活
10010   |  激活失败
10011   |  邮箱地址未被注册
10012   |  无效的密码重置链接
10013   |  两次输入密码不一致
10014   |  集群名称已存在
10015   |  无权限更新集群
10016   |  无权限更新集群
10017   |  集群不存在
10018   |  主机不存在
10019   |  标签已经存在
10020   |  找不到标签
10021   |  标签被使用
10022   |  Job不存在

## 五，SWAGGER使用
![参考](./README.md)

## 六，其他


