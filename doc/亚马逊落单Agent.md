亚马逊落单分析Agent
基于N8N（或类似的自动化工作流平台）来构建这个系统，我们可以将其设计成一个由4个核心Agent（智能代理）协同工作的流水线。每个Agent本质上是一个独立的N8N工作流，负责特定的任务，并将处理结果传递给下一个Agent。

这种模块化的设计有几个好处：

清晰性与可维护性：每个Agent的职责单一，方便修改和排错。

可扩展性：未来可以轻松地为某个环节增加或替换新的功能（比如增加一个分析竞争对手的Agent）。

复用性：某些Agent（如数据采集）可以被其他分析任务复用。

以下是这4个Agent的详细设计、工作职责和标准作业流程（SOP）。

 

Agent系统概览
 

Agent 1: Amazon Data Acquisition Agent (亚马逊数据采集专员)

职责: 从亚马逊前台抓取指定ASIN的所有原始数据。

Agent 2: Data Analysis & Insight Extraction Agent (数据分析与洞察提炼专员)

职责: 清洗和处理原始数据，利用AI提炼出差评核心点、产品痛点和结构性问题。

Agent 3: Risk Assessment & Strategy Agent (综合风险评估与决策专员)

职责: 基于所有分析数据，运行风险评估模型，计算出“落单风险分数”，并给出明确的决策建议。

Agent 4: Reporting & Alerting Agent (报告生成与通知专员)

职责: 将分析结果和决策建议整合成一份易于阅读的报告，并通过指定渠道发送给决策者。

 

Agent 1: Amazon Data Acquisition Agent (亚马逊数据采集专员)
 

这个Agent是整个流程的起点，负责获取最原始、最全面的数据。

核心工作 (Job):

接收一个或多个产品ASIN作为输入。

访问亚马逊前台，抓取该ASIN的产品页面数据。

抓取该ASIN的近期（如最近3-6个月）的1-3星差评。

抓取该ASIN的Q&A区域的问题和答案。

将所有抓取到的原始数据整合成一个结构化的JSON对象，传递给下一个Agent。

标准作业流程 (SOP):

触发 (Trigger):

手动触发: 在N8N中手动执行，并输入ASIN。

Webhook触发: 从一个Google Sheet或Airtable触发表单，当运营人员在新的一行中填入需要分析的ASIN时，自动触发此工作流。

执行步骤 (N8N Nodes):

Start Node: 接收输入的ASIN。

HTTP Request Node(s):

[重要提示]: 直接抓取亚马逊非常容易被屏蔽。强烈建议使用专业的第三方抓取服务API，如 Apify, Bright Data, 或 ScraperAPI。这些服务处理了代理IP、验证码和浏览器指纹等问题，成功率更高。

调用1: 发送请求到抓取API，获取产品主页的完整HTML或结构化数据，包括：价格、BSR（Best Seller Rank）、总评论数、星级、FBA/FBM状态、标题、五点描述等。

调用2: 发送请求到抓取API，专门获取指定时间范围内的负面评论（通常API允许按星级和日期筛选）。获取评论的标题、全文、日期和评分。

调用3: 发送请求到抓取API，获取Q&A数据。

Set / Item Lists Node: 将三次API调用的结果（产品信息、差评列表、Q&A列表）合并成一个统一的、结构化的JSON数据包。

Execute Workflow / Webhook Node: 将这个包含所有原始数据的JSON包，通过Webhook发送给Agent 2，以触发下一步的分析流程。

 

Agent 2: Data Analysis & Insight Extraction Agent (数据分析与洞察提炼专员)
 

这个Agent是大脑，负责从杂乱的信息中提炼出有价值的洞察。

核心工作 (Job):

接收Agent 1传来的原始数据JSON。

对所有差评文本进行处理，利用大语言模型（如OpenAI的GPT或Google的Gemini）进行分析。

归纳差评核心点: 总结出反复出现的负面反馈，如“电池续航差”、“尺寸不符”、“材质廉价”、“容易损坏”等。

识别结构性问题和痛点: 从差评描述中判断问题是属于设计缺陷、材料问题、功能故障还是运输损坏，并识别出客户使用的核心痛点。

分析Q&A，寻找潜在的客户疑虑和信息盲点。

将提炼出的洞察（如问题分类、关键词、痛点总结）附加到数据JSON中，传递给下一个Agent。

标准作业流程 (SOP):

触发 (Trigger):

Webhook Node: 接收来自Agent 1的数据。

执行步骤 (N8N Nodes):

Item Lists / Loop Over Items Node: 遍历差评列表中的每一条评论。

AI Agent / LLM Node (e.g., OpenAI, Google AI):

Prompt设计是关键:

输入: 将一条或多条差评文本作为上下文输入。

指令: "你是一位专业的亚马逊产品分析师。请阅读以下差评，总结出其中提到的具体产品问题。将问题归类到以下类别：[设计缺陷, 材料质量, 功能故障, 电池问题, 软件问题, 包装运输, 描述不符]。以JSON格式输出每个问题点及其类别和出现频率。例如：{'problem': '电池无法充电', 'category': '电池问题'}"

Code Node: 汇总所有AI分析结果，统计出各类问题的出现频率和最核心的几个问题关键词。

Set Node: 将分析结果（例如 {"main_issues": ["电池续航短", "接口松动"], "problem_categories": {"材料质量": 5, "电池问题": 8}}）合并到主数据JSON中。

Execute Workflow / Webhook Node: 将这个富含洞察的数据包发送给Agent 3。

 

Agent 3: Risk Assessment & Strategy Agent (综合风险评估与决策专员)
 

这个Agent是决策者，它基于数据和预设的商业逻辑，给出一个明确的行动建议。

核心工作 (Job):

接收Agent 2传来的包含原始数据和分析洞察的JSON。

应用一个可定制的风险评分模型。

综合评估各项指标，计算出最终的“落单风险分数”（例如0-100分）。

根据分数，生成明确的决策建议：“建议落单”、“谨慎落单”或“高风险，不建议落单”。

提供支持该决策的核心理由。

标准作业流程 (SOP):

触发 (Trigger):

Webhook Node: 接收来自Agent 2的数据。

执行步骤 (N8N Nodes):

Function / Code Node: 这是实现风险评分模型的核心。模型逻辑可以这样设计（示例）：

基础分: 100分

BSR趋势: 如果BSR在下降（需要历史数据对比，简化版可只看当前值），分数 -= 10

近期差评率: 如果最近一个月差评（1-3星）占比超过15%，分数 -= 20

核心问题严重性:

如果问题涉及安全隐患（如“发烫”、“漏电”），分数 -= 50 (一票否决)

如果问题是核心功能故障（如“无法开机”），分数 -= 30

如果问题是设计/结构缺陷（如“接口容易断裂”），分数 -= 25

如果问题是质量/材质问题（如“塑料感强”），分数 -= 15

如果问题是描述不符或配件缺失，分数 -= 10

价格稳定性: 如果价格近期频繁波动或下降，分数 -= 5

IF Node: 根据最终的风险分数进行分支判断。

分数 > 75: 低风险 -> {"recommendation": "建议落单", "risk_level": "Low"}

40 <= 分数 <= 75: 中等风险 -> {"recommendation": "谨慎落单，建议小批量或与供应商沟通改进方案", "risk_level": "Medium"}

分数 < 40: 高风险 -> {"recommendation": "高风险，不建议落单，需立即审查产品问题", "risk_level": "High"}

Set Node: 将风险分数、风险等级、决策建议和核心理由（例如，从Agent 2提取的Top 3问题）整合成最终的报告JSON。

Execute Workflow / Webhook Node: 将最终报告发送给Agent 4。

 

Agent 4: Reporting & Alerting Agent (报告生成与通知专员)
 

这个Agent是喉舌，确保分析结果能以及时、清晰的方式送达。

核心工作 (Job):

接收Agent 3的最终报告JSON。

将结构化的报告数据格式化成人类易读的文本或卡片。

通过一个或多个渠道（Email, Slack, Lark, DingTalk, Google Sheets）发送报告。

标准作业流程 (SOP):

触发 (Trigger):

Webhook Node: 接收来自Agent 3的最终报告。

执行步骤 (N8N Nodes):

Set Node: 使用Markdown语法，将报告内容格式化。

例如，创建一个包含标题、ASIN、风险分数、决策建议和问题摘要的Markdown文本。

输出节点 (Output Nodes):

Slack / Discord / Telegram Node: 发送一条简洁的通知卡片到指定的团队频道。

标题: 产品落单风险分析报告: [ASIN]

内容: 风险等级: 高 | 决策: 暂停落单 | 核心问题: 电池过热

Email Node: 发送一封详细的HTML邮件给产品经理或采购负责人。

Google Sheets / Airtable Node: 将本次分析的关键结果（ASIN, 分析日期, 风险分数, 决策, 核心问题）追加到记录表中，方便长期追踪和复盘。

End Node: 工作流结束。

通过这四个Agent的协同工作，你就可以搭建一个强大、自动化的亚马逊产品落单风险分析系统。整个流程从数据采集到最终决策通知完全自动化，将团队从繁琐的数据搜集和初步分析中解放出来，专注于更高价值的战略决策。

目录

字符 4395 单词 2861 段落 24
