---
title: 图表功能
description: Mizuki 主题中 Mermaid 图表的使用方法，支持流程图、时序图、甘特图等多种图表类型
---

Mizuki 主题内置 [Mermaid](https://mermaid.js.org/) 图表引擎，允许在 Markdown 文章中直接编写和渲染各类图表。

## 基础用法

使用围栏代码块并指定 `mermaid` 语言标识来创建图表：

````markdown
```mermaid
图表定义内容
```
````

## 流程图

流程图用于表示过程或算法步骤。

### 方向语法

| 关键字 | 说明 |
|--------|------|
| `TD` 或 `TB` | 从上到下 |
| `BT` | 从下到上 |
| `LR` | 从左到右 |
| `RL` | 从右到左 |

### 示例

````markdown
```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[处理步骤 1]
    B -->|否| D[处理步骤 2]
    C --> E[结束]
    D --> E
```
````

### 节点形状

```mermaid
graph LR
    A[矩形] --> B(圆角矩形)
    B --> C{菱形}
    C --> D([体育场形])
    D --> E[[子程序]]
    E --> F((圆形))
    F --> G>旗帜形]
    G --> H{{六角形}}
```

## 时序图

时序图展示对象之间随时间的交互。

### 示例

````markdown
```mermaid
sequenceDiagram
    participant 用户
    participant 浏览器
    participant 服务器

    用户->>浏览器: 输入网址
    浏览器->>服务器: 发送请求
    服务器-->>浏览器: 返回页面
    浏览器-->>用户: 显示页面
```
````

### 消息类型

| 语法 | 说明 |
|------|------|
| `->>` | 实线箭头 |
| `-->>` | 虚线箭头 |
| `-x` | 实线交叉箭头 |
| `--x` | 虚线交叉箭头 |

### 条件分支

使用 `alt`、`else`、`opt` 等关键字：

````markdown
```mermaid
sequenceDiagram
    participant 客户端
    participant 服务器

    客户端->>服务器: 登录请求
    服务器-->>客户端: 返回结果

    alt 登录成功
        客户端->>服务器: 请求数据
        服务器-->>客户端: 返回数据
    else 登录失败
        服务器-->>客户端: 错误信息
    end
```
````

## 甘特图

甘特图用于展示项目进度和时间安排。

````markdown
```mermaid
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

    section 设计阶段
    需求分析      :done,    des1, 2024-01-01, 7d
    UI 设计       :done,    des2, after des1, 5d
    技术方案      :active,  des3, after des2, 3d

    section 开发阶段
    前端开发      :         dev1, after des3, 14d
    后端开发      :         dev2, after des3, 14d
    联调测试      :         dev3, after dev1, 5d

    section 上线阶段
    部署上线      :         dep1, after dev3, 2d
    监控观察      :         dep2, after dep1, 3d
```
````

### 任务状态

| 状态 | 语法 | 说明 |
|------|------|------|
| 已完成 | `done` | 灰色显示 |
| 进行中 | `active` | 高亮显示 |
| 待办 | 无标记 | 默认显示 |
| 危急 | `crit` | 红色标记 |

## 类图

类图用于表示类与类之间的关系。

````markdown
```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound() void
    }

    class Dog {
        +fetch() void
        +bark() void
    }

    class Cat {
        +purr() void
        +scratch() void
    }

    Animal <|-- Dog
    Animal <|-- Cat
```
````

### 关系类型

| 语法 | 说明 |
|------|------|
| `<\|--` | 继承 |
| `*--` | 组合 |
| `o--` | 聚合 |
| `-->` | 关联 |
| `--` | 实线连接 |
| `..>` | 依赖 |

## 饼图

饼图用于展示数据的比例关系。

````markdown
```mermaid
pie title 技术栈分布
    "JavaScript" : 40
    "TypeScript" : 30
    "Python" : 15
    "Go" : 10
    "其他" : 5
```
````

## 状态图

状态图用于描述对象的状态变化。

````markdown
```mermaid
stateDiagram-v2
    [*] --> 待处理
    待处理 --> 进行中 : 开始
    进行中 --> 已完成 : 完成
    进行中 --> 待处理 : 退回
    已完成 --> [*]
```
````

## 思维导图

````markdown
```mermaid
mindmap
  root((项目结构))
    前端
      React
      Vue
      Astro
    后端
      Node.js
      Python
      Go
    数据库
      MySQL
      PostgreSQL
      MongoDB
```
````

## 注意事项

1. Mermaid 图表基于 JavaScript 渲染，需要浏览器启用 JavaScript
2. 图表在暗色和亮色主题下会自动适配
3. 复杂图表可能会影响页面加载性能
4. 图表中的中文文字需要使用英文引号包裹
5. 语法错误会导致图表无法渲染，请仔细检查语法
6. 建议在图表定义中保持良好的缩进格式
