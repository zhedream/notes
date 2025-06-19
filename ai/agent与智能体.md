# agent 与 智能体、function call、MCP 

首先，agent 只是一个想对的概念，agent 代理。中间人/代理人/传话人的意思，通过它代替帮你做事的的这么个概念。

agent、function call，MCP 都是本质都是代码函数。只是的做了一层抽象、区分。  有的时候 agent 与 function call 的界限会有些模糊。

## 代理人在现实中的场景：

你是李四（user），李家小公子一直在外少回家，带着你的管家（agent），要回家进小区。
保安(沟通对象)问：你谁呀，不是小区的不让进。
你还没说话，你的管家就替你回答了：我们李家小公子，李四你都不知道，快开门。

在这里 管家就充当了agent 角色，自动帮你报了家门。

## agent 在AI应用的场景：

这里的 agent 肯定是一段代码程序。 agent，字面意思就是代理，是 大模型与人之间的中间程序。作用是自动帮助人，做一些事情。

### 简单的机械的 agent / function call

User: 帮我总结 a.txt 文件。（你没有给文件）

AI: 好的，你没有给我文件，我需要 `(read)[a.txt]` 文件

Agent: 好的，我帮你读取 a.txt 文件。 (简单 agent： 触发了(read)关键字，调用function call 读取文件的函数，并发送给AI, 完成任务)

这里本来需要人，手动给 AI 发送文件的，这里就自动实现了。不需要人参与。

扩展1： 

agent 本身也是程序，读文件的函数，也是程序，所以，这里存在 agent 与 function 的界限模糊。

我们把识别关键字，调用 function 这部分程序，就可以被抽象为 Agent 了。

把 function call 被抽象成一个工具。

### 智能体

写一个 agent 程序，不用 AI 能力也可以，会显得很机械， 但接入AI能力后，这个 agent 程序就更智能了。

现在说的 agent 一般都是带AI能力的 agent。

扩展2：

任何工具有了AI能力，就有了灵魂。工具也可以被定义成智能体。

比如：一把剑，有剑灵。那就不是普通的工具了，是具有灵识的物体，那么这个工具就高级了，可能可以自动跟随，自动攻击。自动数据分析。


## function call 与 MCP

function call vs MCP !

https://www.reddit.com/r/ClaudeAI/comments/1h0w1z6/model_context_protocol_vs_function_calling_whats/

In short, think about it as "Open Tool Use" vs OpenAI's "Closed Tool Use"

function call 和 mcp 都可以作为模型的工具，是不同的实现方式

function call 更多是内部的、硬编码在代码里的，是耦合的，

MCP 是外部的插件形式的。解耦的。

## MCP 与 agent

因为 MCP 工具是开放的多种多样的。 准确的说 MCP 是一个工具集合，每个工具的说明书也是不一样的。

所以用 MCP 工具，都需要由 `AI能力的 agent` 阅读 MCP 说明书，来调用工具。

扩展3：

cursor 或者 windsurf。 调用工具都需要 AI 能力。 所以调用工具都需要AI能力。所以可能需要更多的积分或者次数。

## 总结


AI 是神。

cursor 本质只一个全局的 agent boss。

像是一个管家， 可以使用工具， 也可以使用 agent。

## 模式

这些模式本质都是聊天。 无非自动帮你处理一些事情罢了。
`ask` 纯聊天。什么都要自己来。
`edit`  一定程度能帮你创建修改文件，不用自己手动来了
`agent` 一定程度代替你回一些消息。

就和手动挡自动挡类似。

自动的后果就是可能出错。乱删文件， 乱传文件。特别是上下文复杂的时候