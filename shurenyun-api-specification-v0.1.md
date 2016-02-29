![logo.png](https://github.com/Dataman-Cloud/omega-api-docs/blob/master/apiv3/logo-shurenyun.png)

# 数人云RESTful API文档规范(v0.0.1)

## CHANGES
- [x] 文档初次提交（cmxu 2016-2-5)
- [x] 修改了版本约定，HTTP STATUS CODE，返回结果结构（cmxu 2016-2-22)

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

* 数人云API版本信息由产品同事配合决定，重要版本发布应该集体讨论，合适场合发布给客户。

### 3，数人云API响应的 HTTP Method
数人云API响应的HTTP包括 GET,POST,PUT,DELETE 四种，其中

* GET 标识资源获取和列表
* POST 新生成资源
* PUT 对原有资源的整体更新
* PATCH 对原有资源部分修改， 比如状态修改
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
API请求的参数可能有三个来源，Header, Query和Body中。其中GET请求的参数出现再Query中， PUT和POST请求参数出现再BODY当中，HEADER中参数对应AUTH等信息。


## 三，返回结果
数人云返回结果由两部分组成， 第一部分为HTTP STATUS code， 第二部分为response body本身。response body本身为json格式， 具体格式参考如下

### HTTP STATUS CODE

* 200 正常返回，场景例如：GET请求列表正常返回， 正常返回但结果未空，删除资源成功等
* 401 Unauthorized 场景例如： 访问需要授权的资源，比如未登录情况下访问cluster，Token过期，Token不正确
* 原则上数人云不使用标准HTTP STATUS码，把异常情况归类为业务逻辑错误，
  HTTP STATUS返回200，特例为401（兼容nginx auth模块），50x（框架或者Nginx提供）

更详细的HTTP STATUS使用规范请参考 [这个地址](http://kubernetes.io/v1.1/docs/devel/api-conventions.html#http-status-codes)


### RESPONSE BODY

 * 返回结果本身为application/json格式，
 * json reponse的key如果是多个单词组成应该是camelCase，例如
   responseBody而不是response_body。
 * 返回结果的key不应该是单词缩写，应该是完整的清晰的单词。例如
  response而不是resp。
 * 返回结果分code和data两个部分，
   code表明结果是否符合预期，data包含返回数据
 * 所有返回结果中都应该有code表明请求是否成功，code值有0和非0的数字组成
 * data可以为一个object或者数组

成功结果返回

	{
		"code": 0
		"data": ...
	}

失败返回结果

	{
		"code": 10002
		"data": {
			"message": "token not valid",
      ...
		}

	}

## 四，错误码规约
错误码   |  描述
------- | ------
0       |  正常
10000   |  未知错误
10001   |  数据错误
10002   |  token验证失败
10008   |  JSON格式错误
10009   |  资源不存在
10010   |  请求参数page出错
10011   |  请求参数per_page出错
10010   |  没有权限进行此操作
11003   |  用户已存在
11004   |  用户不存在
11005   |  非激活用户
11006   |  密码错误
11007   |  token无效
11009   |  用户已激活
11010   |  激活失败
11011   |  邮箱地址未被注册
11012   |  无效的密码重置链接
11013   |  两次输入密码不一致
12014   |  集群名称已存在
12015   |  无权限更新集群
12016   |  集群不存在
12018   |  主机不存在
12019   |  标签已经存在
12001   |  找不到标签
12002   |  标签被使用
13001   |  Job不存在
13002   |  query_by条件不支持
14001   |  Application不存在
14002   |  application历史版本id不存在
15***   |  Project 相关错误

## 五，SWAGGER使用
![参考](./README.md)

## 六，其他


