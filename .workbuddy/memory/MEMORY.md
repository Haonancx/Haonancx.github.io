# Haonancx.github.io · 项目长期记忆

> **首选入口：用户级 Skill `guanrenchao-blog`**（`~/.workbuddy/skills/guanrenchao-blog/`）。
> 已把本仓库的内容创作契约、张嘉佳笔法、配图与去水印流程、四个校验脚本全部打包进去，
> 以后直接说「给博客写一篇技术文章 / 写篇随笔 / 给文章配图 / 校验文章格式」即可触发。
> 原始提示词 `~/Desktop/博客内容创作_可复用提示词.md` 保留为人类可读版本。
> 本文件是浓缩记忆：只留高频要点、真实环境事实与已踩过的坑。

## 站点事实（2026-10-15 核实）
- Jekyll 静态站，线上 https://guanrenchao.com/（作者：关人潮，站名「如山」）。
- 仓库 github.com/Haonancx/Haonancx.github.io，本地克隆 = 本目录，分支 `master`。
- `_config.yml`：`markdown: redcarpet`、`paginate: 6`、`baseurl: ""`、CNAME 自定义域名；**无 `excerpt_separator`**，首页卡片摘要取正文首个空行之前。
  - 2026-10-15 起新增 `timezone: Asia/Shanghai`（此前未配置，构建机在 UTC 会导致 date 被按 UTC 解释）。
  - **Jekyll 默认 `future: false`：front matter 的 `date` 若晚于构建时刻，该文不参与构建**（首页 / 分页 / feed 都看不到）。写文章时 `date` 必须早于推送时刻，否则线上「文章消失了」。
  - 本仓未配置 `permalink`，文章 URL 形如 `/:categories/:year/:month/:day/:title.html`，分类是中文。
- 文章 `_posts/`，扩展名必须是 **`.markdown`**（不是 `.md`）；图片 `post-images/`，引用 `/post-images/xxx.jpg`。
- `_layouts/post.html` 只渲染标题/日期/正文/tags，**无 TOC、无侧栏**。
- 拉仓库：本机 `git clone` 走代理会 502 → 用 `curl -L https://codeload.github.com/Haonancx/Haonancx.github.io/zip/refs/heads/master` 打包直下。

## 排版契约
### 技术文章
- 文件名 `YYYY-M-D-<English-Slug>.markdown`，月/日多为不补零写法（如 `2026-6-8-…`）。
- front matter **恰好 5 字段、顺序固定**：`layout / title / date / categories / tags`。
- 对齐照抄：`title:` 后 **2 空格**、`date:` 后 **3 空格**；date 格式 `YYYY-M-D HH:MM:SS`，且**日期须与文件名日期一致**。
- **`categories` 与 `tags` 必须完全相同**（空格分隔；全仓 30/32 篇如此）。
- 正文首行必须是 `#### ` 单行导语（≤60 字，决定首页卡片），**后接空行**；层级 `### 一、xxx` + `#### 1.xxx`；结尾统一 `### 总结/结语/结论`（仓库新文实际写成 `### 六、结语` 这类**编号结尾**，校验脚本已兼容）。
- 篇幅主流 1800–3500 字（区间 1200–7500）；忌列表堆砌、空洞小标题、标语式短句连排。
- 引号：2026 这批新文统一用「」，不要同篇混用两种；粗体极罕用，别靠粗体撑结构。
- 选题不得与旧文重复；旧文已覆盖：架构之道、组件化、微前端×2、技术选型、研发规范、团队建设、大数据量渲染、Angular/React/Vue 对比、大前端融合、数据可视化、低代码、创业、医院信息化、项目管理、AI 在前端(2025)、大型项目度量。
- 已写新题（勿重复）：AI 智能体时代的软件工程、LLM 应用架构 RAG→Agent、ADR、单体↔微服务↔模块化单体、DORA 研发效能、技术债务。

### 散文 / 随笔
- `categories` / `tags` 为 `随笔` 或「随笔 + 二级词」（`随笔 思乡` / `随笔 架构` / `随笔 产品`），**仍须同值**。
- **无 `###` 小标题、无列表、无粗体、无引用块**；短句成段，段与段之间一个空行。
- 既有散文仅 97–445 字；写 1000+ 字属该仓库新长度，正常。
- 参照样本：`2015-12-28-Childhood-Memories.markdown`、`2016-6-22-written-at-the-age-of-21.markdown`、`2021-2-4-city-memory.markdown`。
- 张嘉佳笔风要点：短句短段留呼吸、第二人称「你」对不在场的人说话、用具体细节承载情绪（不写情绪本身）、用贯穿全篇的复调小动作替代直抒、按「第一年/第二年/后来」分层推进、结尾安静不升华。

## 配图
- 引用格式：图片行前后各一个空行，且**紧邻章节标题之前**；alt = `<slug>-<N>`（N 按文章内出现顺序递增，与文件名主干逐字符一致）。
- 数量方案：每篇 3 张（推荐，1 开篇 + 2 内文）/ 1 张（最省）/ 5 张（对齐参考文）。
- 生成：`ImageGen`（ToolSearch → DeferExecuteTool），1536x1024、`quality: high`；prompt 必须含 `absolutely no text, no letters, no words, no numbers, no labels, no captions`。
- 统一视觉语言：`soft 3D render, subtle isometric depth, muted slate-gray and off-white palette, a single deep indigo accent color, generous negative space, abstract conceptual composition`。
- 落盘：转 **JPEG q92** 存 `post-images/<slug>-<N>.jpg`（18 张约 4.0 MB）。
- **本机 imgur 完全不可达**（api 超时、i.imgur 连接重置）→ 默认落本地 `/post-images/`；仓库 39/40 处引用是 imgur。
- **生图成本约 5–10 积分/张**，动手前必须把总量算给用户看。

## 去水印（必须按此法）
- 水印固定位置 @1536×1024：`x ∈ [1405,1532]`、`y ∈ [950,1022]`（代码里用相对比例换算，适配任意尺寸）。
- 正确做法：**拉普拉斯（调和）方程修补 + 逐行 SOR 线松弛**，Dirichlet 边界取矩形四周真实像素 → 无接缝；约 130 次扫描收敛，单张几秒。
- ✗ 错误做法（已踩坑）：从四边逐层用「非掩码邻居均值」填充 → 蝴蝶结伪影 + 竖条纹；用 `np.roll` 取邻居 → 跨图回绕污染。
  - 追加踩坑：三对角 RHS 里已知邻居项**符号必须取负**（`rhs[0] -= u[y, c0-1]`），写成 `+=` 会保留条纹、梯度只从 139 降到 79。
- 残留判定：框内局部梯度 max < 6 视为干净。
  - **实测校正**：该阈值**会误报**——框内本身含有真实画面（渲染图柔边、阴影）时梯度也偏高。实测 `Software-engineering-in-the-age-of-AI-agents-1.jpg` 为 17.0，放大后确认是软阴影边缘、**不是水印**。凡 ≥ 6 必须先导出放大图目视确认。
  - 本批 18 张实测：17 张 < 6（干净），1 张 17.0（真实画面）。

## 环境 / 工具
- ImageGen 会强制在右下角打 **"AI生成 / WORKBUDDY" 半透明水印**，`footnote` 参数**去不掉**，必须后期修补。
- **并行调用生图时 `output_dir` 失效**，所有图落到同一目录 → 靠返回的**描述性文件名**（prompt 前几个词）做映射，别依赖目录分组。
- PIL 中文渲染须显式指定字体 `/System/Library/Fonts/Hiragino Sans GB.ttc`（默认字体渲染中文为方块）。
- Pillow 12.2.0 + numpy 已装在隔离 venv `/Users/guanrenchao/.workbuddy/binaries/python/envs/default`；**无 scipy**（故去水印用逐行 SOR）；解释器 `/Users/guanrenchao/.workbuddy/binaries/python/versions/3.13.12/bin/python3`。
- Jekyll 未安装（有 ruby/bundle）→ 用「文件名正则 + front matter 字段比对」做校验；要真机 build 须先征得同意。

## 校验铁律
- 交付前跑 `verify_posts.py`（skill 内），失败不算完成。
- **格式合规 ≠ 内容完整**：曾有散文被截掉结尾 3 段（约 31 字）而格式项**全部通过** → 「完整性体检」（末段以句末标点收尾、语义完整、段数与预期一致）必须与格式校验**分开各做一次**。
- 必须用 `Read` 回读全文一遍，不要只信脚本。
- 校验宽严口径：只对 **2026 年及以后**的文章判 FAIL；更早旧文格式自成一套，差异降级为警告。实测基线：全仓 32 篇 **FAIL 0 / 警告 24**；7 篇 2026 新文零警告通过。
- 历史遗留豁免（**不要去修**）：`2016-4-28-Software-architecture-approach.markdown`（categories 末尾多空格）、`2021-2-4-city-memory.markdown`（tags 多一个「旅行」）。

## 协作铁律
- **绝不擅自 `git add` / `commit` / `push`**，除非用户明确要求。
- 中间产物（预览图、临时导出、脚本输出、总览拼接图）放工作区 `genimg/`、`tools/`、`preview/`，**不得落进仓库目录**。
- 成本 / 风险先行：生图前报积分总量；上传、覆盖、重建等操作前说明后果并等确认。
- 不确定就问：路径方案 / 配图数量 / 是否本地 build / 是否提交 → 用 `AskUserQuestion` 一次问清，不要猜。
- 交付用 `present_files`（多文件放同一次调用，按查看优先级排序）；收尾明确告知：改了哪些文件、有什么偏差、尚未提交、可选下一步。
- 用户要求「复制到桌面」时：收进一个同名文件夹再拷，并用 `md5` 逐文件比对确认一致。

## 故乡素材（写地域 / 思乡题材直接取用）
海南省乐东黎族自治县利国镇。望楼河：发源尖峰岭南麓，流经利国镇，于望楼港入南海，河滩有白鹭。镇名沿革：原名**冲坡镇**，2002 年撤乡并镇因镇政府驻**利国墟**而得名（可写「镇上老人改不过口，还说自己冲坡人」）。地标：冲坡中学（1956）、糖厂菜市场、集贸市场、街上「风采车」。吃：利国凉粉（蹲小桌吃）、芒果蘸辣椒盐。物产：芒果/香蕉/龙眼/槟榔/大棚哈密瓜/冬季瓜菜/百香果/木瓜。气候：年均 24℃、年降雨 1600mm，方言海南话。周边：黄流镇（西）、九所镇（东）、千家镇（东北）、尖峰镇（北）；225 国道、环岛高速西线、西环高铁（乐东站/黄流站），距三亚凤凰机场 73km。乐罗村（河东社区）：西汉元封元年琼崖十六县治所之一，物理学家颜任光故里，有「博士村」之称。民俗：黎锦、斗笠、崖州民歌。
家庭细节：奶奶「好好读书，读书使人明智」（反复叮咛、语气随意）；外婆耳背、常戴助听器，每次回去「我」塞钱，离家时她把钱**原原本本**装进一只**用旧的小红包**塞回来，她听不清，只是一味往口袋里按。

## 已交付（2026-10-15，均已提交进 master）
技术文 6 篇（`_posts/`）：
1. `2026-6-8-Software-engineering-in-the-age-of-AI-agents.markdown`
2. `2026-7-12-Architecture-practice-of-LLM-applications-from-RAG-to-Agent-orchestration.markdown`
3. `2026-8-6-Architecture-Decision-Records-traceable-technology-selection.markdown`
4. `2026-9-10-From-monolith-to-microservices-and-back-to-modular-monolith.markdown`
5. `2026-10-6-Research-and-development-efficiency-measurement-from-DORA-metrics-to-engineering-effectiveness-system.markdown`
6. `2026-10-13-Technical-debt-how-to-identify-measure-and-repay.markdown`

散文 1 篇：
7. `2026-10-15-Beyond-the-Wanglou-River.markdown` —— 《望楼河以南》，`随笔 思乡`，1104 汉字 / 25–26 段，**未配图**。

配图 18 张（`post-images/`）：上述 6 篇技术文各 3 张，JPEG q92，合计约 4.0 MB。
