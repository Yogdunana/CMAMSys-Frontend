"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  FileText,
  Heart,
  User,
  Brain,
  Clock,
  HardDrive,
  FolderOpen,
  Folder,
  File,
  FileCode,
  ChevronRight,
  MessageSquare,
  Star,
  Zap,
  Layers,
  GitBranch,
  Settings,
  Shield,
  Sparkles,
  Activity,
  Calendar,
  Bot,
} from "lucide-react";

const coreFiles = [
  {
    name: "AGENTS.md",
    icon: Shield,
    label: "工作守则",
    description: "定义Agent行为规范与工作准则",
    gradient: "from-blue-500 to-cyan-400",
    preview: "# Agent 工作守则\n\n## 核心原则\n1. 始终以用户需求为导向\n2. 保持专业、严谨的工作态度\n3. 主动发现问题并提出解决方案\n4. 遵循学术诚信原则\n\n## 行为规范\n- 禁止替用户完成核心建模工作\n- 提供思路引导而非直接答案\n- 所有建议需有理论依据\n- 及时反馈进度和风险",
    fullContent: `# Agent 工作守则 v2.1

## 一、核心原则
1. 始终以用户需求为导向，理解用户真实意图
2. 保持专业、严谨的工作态度
3. 主动发现问题并提出解决方案
4. 遵循学术诚信原则，绝不鼓励抄袭

## 二、行为规范
### 2.1 交互规范
- 使用清晰、专业的语言
- 回答要有理有据，引用文献时标注来源
- 不确定的内容要明确说明
- 避免使用过于绝对的表达

### 2.2 建模规范
- 禁止替用户完成核心建模工作
- 提供思路引导而非直接答案
- 所有建议需有理论依据
- 模型选择要考虑可解释性

### 2.3 代码规范
- 代码需有完整注释
- 变量命名遵循PEP8规范
- 关键步骤需有中间结果验证
- 提供完整的依赖说明

## 三、工作流程
1. 需求分析 → 2. 方案设计 → 3. 模型构建 → 4. 代码实现 → 5. 结果验证 → 6. 论文撰写

## 四、禁止事项
- 禁止直接提供竞赛答案
- 禁止生成虚假数据
- 禁止绕过系统安全机制
- 禁止泄露其他用户信息`,
  },
  {
    name: "SOUL.md",
    icon: Heart,
    label: "性格与边界",
    description: "定义Agent的性格特征与能力边界",
    gradient: "from-pink-500 to-rose-400",
    preview: "# Agent 性格与边界\n\n## 性格特征\n- 严谨但不刻板\n- 热情但不越界\n- 专业但不冷漠\n\n## 能力边界\n- 数学建模：精通\n- 编程实现：熟练\n- 论文写作：辅助",
    fullContent: `# Agent 性格与边界 v1.5

## 一、性格特征
### 核心性格
- 严谨但不刻板：追求精确，但理解实际约束
- 热情但不越界：乐于助人，但尊重用户自主权
- 专业但不冷漠：技术过硬，但保持亲和力
- 创新但务实：鼓励创新，但注重可落地性

### 沟通风格
- 使用鼓励性语言，增强用户信心
- 适当使用比喻帮助理解复杂概念
- 在指出问题时提供改进建议
- 保持耐心，允许用户反复提问

## 二、能力边界
### 精通领域
- 数学建模方法论
- 常用模型（优化、预测、评价、仿真）
- 统计分析方法
- LaTeX排版

### 熟练领域
- Python/MATLAB编程
- 数据可视化
- 论文结构设计
- 算法实现

### 辅助领域
- 英文翻译与润色
- 参考文献管理
- 团队协作建议

### 禁止领域
- 直接生成完整论文
- 提供虚假实验数据
- 替代用户做决策
- 绕过学术诚信检查`,
  },
  {
    name: "USER.md",
    icon: User,
    label: "用户信息",
    description: "存储用户个人信息与偏好设置",
    gradient: "from-purple-500 to-violet-400",
    preview: "# 用户信息\n\n## 基本信息\n- 用户名：张明远\n- 学校：清华大学\n- 年级：大三\n- 专业：数学与应用数学\n\n## 竞赛经历\n- 2024 MCM A题 Outstanding Winner",
    fullContent: `# 用户信息

## 一、基本信息
- 用户名：张明远
- 学校：清华大学
- 年级：大三
- 专业：数学与应用数学
- 编程语言：Python, MATLAB, R
- 兴趣方向：运筹优化、机器学习

## 二、竞赛经历
| 时间 | 竞赛 | 题目 | 奖项 | 角色 |
|------|------|------|------|------|
| 2024.02 | MCM | A题 | Outstanding Winner | 建模手 |
| 2023.09 | CUMCM | A题 | 国家一等奖 | 建模手 |
| 2023.05 | 校赛 | B题 | 一等奖 | 编程手 |

## 三、能力评估
- 数学建模：★★★★★
- 编程能力：★★★★☆
- 论文写作：★★★★☆
- 团队协作：★★★★★
- 英语水平：CET-6 580

## 四、偏好设置
- 偏好语言：中文
- 代码风格：Python优先
- 回复详细程度：详细
- 是否接受英文资料：是`,
  },
];

const chatMessages = [
  { role: "user", content: "这道题的约束条件太多了，我该怎么简化处理？", time: "14:32" },
  {
    role: "assistant",
    content: "建议从以下三个角度处理约束：1) 识别硬约束与软约束；2) 对相似约束进行合并；3) 使用惩罚函数法处理软约束。",
    time: "14:33",
  },
  { role: "user", content: "惩罚函数的权重怎么确定比较合理？", time: "14:35" },
  {
    role: "assistant",
    content: "可以先用网格搜索确定权重范围，再用贝叶斯优化精调。我给你写一个参数敏感性分析的代码框架。",
    time: "14:36",
  },
];

const memoryEntries = [
  { key: "擅长领域", value: "运筹优化、深度学习、时间序列分析" },
  { key: "建模偏好", value: "偏好使用启发式算法解决NP-hard问题" },
  { key: "代码风格", value: "Python + Jupyter Notebook，注重可读性" },
  { key: "论文偏好", value: "喜欢用大量图表辅助说明，LaTeX排版" },
  { key: "团队角色", value: "通常担任建模手，偶尔兼任编程手" },
];

const memoryFiles = [
  { name: "2024-01-15-09.md", time: "2024-01-15 09:00", size: "12.3 KB", entries: 8 },
  { name: "2024-01-15-10.md", time: "2024-01-15 10:00", size: "18.7 KB", entries: 15 },
  { name: "2024-01-15-14.md", time: "2024-01-15 14:00", size: "24.1 KB", entries: 22 },
];

interface FileTreeNodeType {
  name: string;
  type: string;
  icon?: React.ElementType;
  children?: FileTreeNodeType[];
}

const fileTree: FileTreeNodeType = {
  name: "workspace",
  type: "folder",
  children: [
    { name: "AGENTS.md", type: "file", icon: FileText },
    { name: "SOUL.md", type: "file", icon: Heart },
    { name: "USER.md", type: "file", icon: User },
    { name: "MEMORY.md", type: "file", icon: Brain },
    {
      name: "memory",
      type: "folder",
      children: [
        { name: "2024-01-15-09.md", type: "file" },
        { name: "2024-01-15-10.md", type: "file" },
        { name: "2024-01-15-14.md", type: "file" },
      ],
    },
    {
      name: "projects",
      type: "folder",
      children: [
        { name: "2024MCM-C", type: "folder", children: [{ name: "model.py", type: "file" }, { name: "data.csv", type: "file" }] },
        { name: "2023CUMCM-A", type: "folder", children: [{ name: "main.m", type: "file" }, { name: "figures/", type: "folder" }] },
      ],
    },
    {
      name: "models",
      type: "folder",
      children: [
        { name: "seir_model.py", type: "file" },
        { name: "ga_optimizer.py", type: "file" },
      ],
    },
  ],
};

function FileTreeNode({ node, depth = 0, onFileClick }: { node: FileTreeNodeType; depth?: number; onFileClick?: (name: string) => void }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/60 cursor-pointer transition-colors group"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => {
          if (isFolder) {
            setExpanded(!expanded);
          } else {
            onFileClick?.(node.name);
          }
        }}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
            />
            <Folder className="w-4 h-4 text-amber-500" />
          </>
        ) : (
          <>
            <span className="w-4" />
            <File className="w-4 h-4 text-blue-400" />
          </>
        )}
        <span className="text-sm font-medium">{node.name}</span>
        {isFolder && node.children && (
          <span className="text-xs text-muted-foreground ml-auto">{node.children.length} 项</span>
        )}
      </div>
      {isFolder && expanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode key={index} node={child} depth={depth + 1} onFileClick={onFileClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkspacePage() {
  const { showToast } = useToast();
  const [memoryDialog, setMemoryDialog] = useState<{
    name: string;
    time: string;
    entries: number;
  } | null>(null);
  const [coreFileDialog, setCoreFileDialog] = useState<string | null>(null);
  const selectedCoreFile = coreFiles.find((f) => f.name === coreFileDialog) ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      {/* 装饰背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-violet-400/10 to-rose-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 mb-4">
            <Layers className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">个性化空间</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
            用户工作空间
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            每个用户拥有独立workspace，个性化记忆与能力体系
          </p>
        </div>

        {/* 核心文件区域 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-500" />
            核心文件
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreFiles.map((file) => (
              <Card
                key={file.name}
                className="group border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full"
                onClick={() => setCoreFileDialog(file.name)}
              >
                <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${file.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <file.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-purple-600 transition-colors">
                          {file.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-purple-50 text-purple-600">
                          {file.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{file.description}</p>
                    <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100">
                      <pre className="text-xs text-slate-500 whitespace-pre-wrap font-mono line-clamp-4">
                        {file.preview}
                      </pre>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-purple-500">
                      <span>点击查看完整内容</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 三层记忆体系 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Brain className="w-5 h-5 text-pink-500" />
            三层记忆体系
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* 短期记忆 */}
            <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">短期记忆</CardTitle>
                    <CardDescription>Session Context</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">当前会话上下文，实时对话记录</p>
                <div className="space-y-3 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                            : "bg-white border border-slate-200 text-slate-700"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <span
                          className={`text-[10px] mt-1 block ${
                            msg.role === "user" ? "text-blue-100" : "text-slate-400"
                          }`}
                        >
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 长期记忆 */}
            <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-purple-500/5 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-400" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-md">
                    <HardDrive className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">长期记忆</CardTitle>
                    <CardDescription>MEMORY.md</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">精选记忆，长期保存</p>
                <div className="space-y-2.5">
                  {memoryEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-slate-50/80 rounded-lg p-3 border border-slate-100"
                    >
                      <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-purple-600">{entry.key}</span>
                        <p className="text-xs text-slate-600 mt-0.5">{entry.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 每时记忆 */}
            <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-amber-500/5 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">每时记忆</CardTitle>
                    <CardDescription>memory/YYYY-MM-DD-HH.md</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">按小时记录，详细日志</p>
                <div className="space-y-2.5">
                  {memoryFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-slate-50/80 rounded-lg p-3 border border-slate-100 hover:bg-white/80 transition-colors cursor-pointer"
                      onClick={() => setMemoryDialog(file)}
                    >
                      <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-700 truncate">{file.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">{file.time}</span>
                          <span className="text-[10px] text-muted-foreground">{file.size}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-600">
                        {file.entries} 条
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 工作区文件树 */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-500" />
            工作区文件树
          </h2>
          <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5">
            <CardContent className="p-5">
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 font-mono">
                <FileTreeNode node={fileTree} onFileClick={(name) => showToast(`已选择文件: ${name}`, "info")} />
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-amber-500" />
                  <span>文件夹</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <File className="w-4 h-4 text-blue-400" />
                  <span>文件</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span>最后更新：2024-01-15 14:32</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 核心文件对话框 */}
      <Dialog open={!!coreFileDialog} onOpenChange={(open) => !open && setCoreFileDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCoreFile && (
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedCoreFile.gradient} flex items-center justify-center`}
                >
                  <selectedCoreFile.icon className="w-4 h-4 text-white" />
                </div>
              )}
              {selectedCoreFile?.name}
            </DialogTitle>
            <DialogDescription>{selectedCoreFile?.description}</DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
              {selectedCoreFile?.fullContent}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* 记忆文件对话框 */}
      <Dialog open={!!memoryDialog} onOpenChange={(open) => !open && setMemoryDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              {memoryDialog?.name}
            </DialogTitle>
            <DialogDescription>
              记录时间：{memoryDialog?.time} | 共 {memoryDialog?.entries} 条记忆
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-100">
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {`# ${memoryDialog?.name}

## 会话记录摘要

### 用户提问记录
1. 讨论了SEIR模型的参数选择问题
2. 询问了蒙特卡洛模拟的收敛性判断方法
3. 探讨了模型灵敏度分析的最佳实践

### AI建议记录
1. 推荐使用自适应步长的Runge-Kutta方法
2. 建议增加参数边界约束
3. 提供了可视化代码模板

### 关键决策
- 确定使用混合模型方案（SEIR + 元胞自动机）
- 参数拟合采用贝叶斯推断方法
- 模型验证使用交叉验证策略

### 待跟进事项
- 补充模型局限性讨论
- 完善图表标注格式
- 添加代码注释文档`}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
