"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileCode,
  FileText,
  Shield,
  Brain,
  Code,
  CheckCircle,
  Image,
  Star,
  Archive,
  Fingerprint,
  Lock,
  Unlock,
  Download,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageSquare,
  Terminal,
  ClipboardCheck,
  FileImage,
  Sparkles,
  History,
  Hash,
  Users,
  Calendar,
  Cpu,
  Eye,
  Layers,
  Link,
} from "lucide-react";

const mmpChapters = [
  {
    id: 1,
    icon: Hash,
    title: "文件头部信息",
    description: "记录文件唯一标识、关联竞赛、团队信息和系统版本",
    gradient: "from-blue-500 to-cyan-400",
    fields: [
      { label: "UUID", value: "a3f9d2e8-4b7c-4f1a-9d3e-5c8b2a1f6e4d" },
      { label: "关联竞赛", value: "2024 MCM Problem C" },
      { label: "团队名称", value: "AlphaStar" },
      { label: "系统版本", value: "CMAMSys v2.1.0" },
      { label: "创建时间", value: "2024-02-01 20:00:00 UTC" },
    ],
  },
  {
    id: 2,
    icon: BookOpen,
    title: "题目信息",
    description: "存储题目原文、AI解析结果和修改记录",
    gradient: "from-purple-500 to-violet-400",
    fields: [
      { label: "题目原文", value: "Momentum in Tennis: Simulating the dynamics of a tennis match..." },
      { label: "AI解析", value: "核心问题：网球比赛动量建模。子问题：动量定义、影响因素、预测模型、策略建议" },
      { label: "关键词提取", value: "动量, 网球, 马尔可夫链, 蒙特卡洛模拟, 时间序列" },
      { label: "修改记录", value: "v1: 初始解析 | v2: 补充数据源建议 | v3: 细化子问题" },
    ],
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "思路研讨记录",
    description: "记录研讨时间、AI素材、讨论内容和思路迭代过程",
    gradient: "from-pink-500 to-rose-400",
    fields: [
      { label: "研讨时间", value: "2024-02-01 20:30 - 2024-02-02 02:15 (共5小时45分)" },
      { label: "AI素材引用", value: "知识库条目 #3421, #5678, #9012" },
      { label: "思路迭代", value: "v1: 统计回归 → v2: 马尔可夫链 → v3: 混合模型(马尔可夫+ML)" },
      { label: "讨论摘要", value: "团队讨论了3种建模方案，最终选择混合模型方案，兼顾可解释性和预测精度" },
    ],
  },
  {
    id: 4,
    icon: Code,
    title: "代码记录",
    description: "记录代码版本、AI校验结果和运行日志",
    gradient: "from-green-500 to-emerald-400",
    fields: [
      { label: "代码版本", value: "v1.0 → v1.1 → v2.0 (共3个版本)" },
      { label: "AI校验", value: "v2.0通过：代码规范✓ 算法正确性✓ 边界条件✓ 性能优化✓" },
      { label: "运行日志", value: "v2.0: 运行时间 12.3s, 内存 256MB, 无报错" },
      { label: "依赖清单", value: "numpy, scipy, pandas, matplotlib, scikit-learn" },
    ],
  },
  {
    id: 5,
    icon: ClipboardCheck,
    title: "结果审核记录",
    description: "记录审核人、审核记录和最终结果确认",
    gradient: "from-amber-500 to-orange-400",
    fields: [
      { label: "审核人", value: "AI Reviewer + 人工复核" },
      { label: "审核记录", value: "模型合理性✓ 结果一致性✓ 敏感性分析✓ 图表规范✓" },
      { label: "问题标记", value: "1个警告：图3坐标轴标签需统一格式" },
      { label: "最终结果", value: "审核通过，已修正图3标签" },
    ],
  },
  {
    id: 6,
    icon: FileImage,
    title: "论文与图表记录",
    description: "记录论文版本迭代和所有图表的生成过程",
    gradient: "from-teal-500 to-cyan-400",
    fields: [
      { label: "论文版本", value: "v1.0(初稿) → v2.0(修改) → v3.0(终稿)" },
      { label: "图表数量", value: "共12张图 + 5张表" },
      { label: "图表记录", value: "每张图表含生成代码、数据来源、修改历史" },
      { label: "格式检查", value: "LaTeX编译通过，页数24页，附录6页" },
    ],
  },
  {
    id: 7,
    icon: Star,
    title: "AI实时评价记录",
    description: "记录各AI角色对团队表现的评价和评分",
    gradient: "from-indigo-500 to-blue-400",
    fields: [
      { label: "评价主体", value: "建模导师AI + 编程助手AI + 论文评审AI" },
      { label: "评分标准", value: "建模创新性(30%) + 代码质量(25%) + 论文表达(25%) + 团队协作(20%)" },
      { label: "综合评分", value: "92/100 (优秀)" },
      { label: "各角色评价", value: "建模:95 | 编程:88 | 论文:93 | 协作:91" },
    ],
  },
  {
    id: 8,
    icon: History,
    title: "赛后补充记录",
    description: "记录脱敏处理、解法库录入和区块链存证信息",
    gradient: "from-rose-500 to-red-400",
    fields: [
      { label: "脱敏处理", value: "已移除所有个人信息，团队名替换为Team-2024MC-0142" },
      { label: "解法库录入", value: "已录入知识库，分类：混合模型 > 马尔可夫链 > 体育竞技" },
      { label: "区块链Card", value: "已生成能力Card，存证ID: #A3F9D2" },
      { label: "经验总结", value: "混合模型方案效果好，但需注意模型复杂度控制" },
    ],
  },
];

const sampleMmpContent = `========================================
  CMAMSys .mmp 文件
  MathModel Project File
========================================

[CHAPTER 1] 文件头部信息
────────────────────────────
UUID:       a3f9d2e8-4b7c-4f1a-9d3e-5c8b2a1f6e4d
竞赛:       2024 MCM Problem C
团队:       AlphaStar (Team-2024MC-0142)
系统版本:   CMAMSys v2.1.0
创建时间:   2024-02-01 20:00:00 UTC
最后更新:   2024-02-05 09:00:00 UTC

[CHAPTER 2] 题目信息
────────────────────────────
题目原文:
  "Momentum in Tennis: Develop a mathematical model that
   simulates the dynamics of a tennis match, incorporating
   the concept of momentum..."

AI解析结果:
  核心问题: 网球比赛动量建模
  子问题1: 动量的数学定义与量化
  子问题2: 影响动量的关键因素识别
  子问题3: 基于动量的比赛结果预测
  子问题4: 教练策略建议系统

关键词: 动量, 网球, 马尔可夫链, 蒙特卡洛模拟

[CHAPTER 3] 思路研讨记录
────────────────────────────
20:30 - 团队阅读题目，初步理解问题
21:00 - AI助手提供相关文献3篇
21:30 - 讨论动量定义方案（3种候选）
22:15 - 确定使用马尔可夫链建模
23:00 - AI助手提供马尔可夫链教程
23:45 - 讨论状态空间设计
00:30 - 确定状态空间：15个状态
01:00 - 引入机器学习增强模型
01:45 - 讨论数据来源（ATP官网）
02:15 - 思路确定：混合模型方案

[CHAPTER 4] 代码记录
────────────────────────────
v1.0 (2024-02-02 10:00)
  - 基础马尔可夫链实现
  - 使用2018-2023 ATP数据
  - 运行时间: 8.2s

v1.1 (2024-02-02 16:00)
  - 添加蒙特卡洛模拟
  - 优化转移矩阵计算
  - 运行时间: 10.1s

v2.0 (2024-02-03 14:00)
  - 集成XGBoost预测模块
  - 添加敏感性分析
  - AI校验通过
  - 运行时间: 12.3s

[CHAPTER 5] 结果审核记录
────────────────────────────
审核人: AI Reviewer (自动) + 人工复核
审核时间: 2024-02-04 10:00
审核结果: 通过 (92/100)

详细审核:
  ✓ 模型合理性: 转移概率矩阵非负且行和为1
  ✓ 结果一致性: 10次蒙特卡洛模拟结果稳定
  ✓ 敏感性分析: 关键参数±10%范围内结果稳健
  ✓ 图表规范: 已修正坐标轴标签
  ⚠ 建议增加模型局限性讨论

[CHAPTER 6-8] 论文/评价/赛后记录
────────────────────────────
论文版本: v3.0 (终稿, 24页+6页附录)
AI综合评价: 92/100 (优秀)
区块链存证: #A3F9D2
`;

const operationRules = [
  {
    icon: CheckCircle2,
    type: "success",
    text: "系统自动生成，实时更新",
    detail: "所有操作自动记录，无需手动维护",
  },
  {
    icon: AlertTriangle,
    type: "warning",
    text: "禁止手动修改核心内容",
    detail: "核心章节由系统保护，确保数据完整性",
  },
  {
    icon: Download,
    type: "success",
    text: "可导出PDF/文本文件",
    detail: "支持PDF、Markdown、JSON三种导出格式",
  },
  {
    icon: Lock,
    type: "success",
    text: "竞赛提交时需一并提交",
    detail: ".mmp文件作为竞赛成果的重要组成部分",
  },
];

export default function MmpPage() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [showFullFile, setShowFullFile] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/30">
      {/* 装饰背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-green-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-200/50 mb-4">
            <FileCode className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">全流程记录</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            .mmp 文件系统
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            MathModel Project - 记录数模竞赛全流程操作与交互
          </p>
        </div>

        {/* 文件说明卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              icon: FileCode,
              title: "文本+二进制混合格式",
              desc: "支持结构化文本与二进制数据混合存储",
              gradient: "from-blue-500 to-cyan-400",
            },
            {
              icon: Layers,
              title: "记录全流程操作",
              desc: "从选题到提交，每一步操作均有记录",
              gradient: "from-purple-500 to-violet-400",
            },
            {
              icon: Eye,
              title: "可追溯、可审计",
              desc: "所有记录带时间戳，支持完整审计追踪",
              gradient: "from-amber-500 to-orange-400",
            },
            {
              icon: Shield,
              title: "解决AI黑盒问题",
              desc: "AI操作全程透明，消除使用疑虑",
              gradient: "from-green-500 to-emerald-400",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="border-0 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-5 text-center">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg mx-auto mb-3`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MMP文件结构展示 - 8 chapters */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" />
            文件结构 - 8大核心章节
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mmpChapters.map((chapter) => {
              const isExpanded = expandedChapter === chapter.id;
              return (
                <Card
                  key={chapter.id}
                  className="border-0 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chapter.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        <chapter.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs bg-slate-100">
                              第{chapter.id}章
                            </Badge>
                            <h3 className="font-semibold text-sm">{chapter.title}</h3>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{chapter.description}</p>
                        {isExpanded && (
                          <div className="mt-3 space-y-2 bg-slate-50/80 rounded-lg p-3 border border-slate-100">
                            {chapter.fields.map((field, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <span className="text-xs font-semibold text-emerald-600 min-w-[80px]">
                                  {field.label}:
                                </span>
                                <span className="text-xs text-slate-600">{field.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 示例MMP文件 */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-500" />
              示例 .mmp 文件预览
            </h2>
            <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
              2024 MCM Problem C
            </Badge>
          </div>
          <Card className="border-0 bg-white/60 backdrop-blur-xl shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-slate-900 rounded-t-xl p-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-slate-400 text-xs ml-2 font-mono">
                  team-2024mc-0142.mmp
                </span>
                <Badge variant="outline" className="ml-auto text-slate-400 border-slate-700 text-xs">
                  UTF-8 | 48.2 KB
                </Badge>
              </div>
              <ScrollArea className="h-[400px]">
                <pre className="p-5 text-xs font-mono leading-relaxed text-slate-700 whitespace-pre-wrap bg-slate-50/50">
                  {sampleMmpContent}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* 操作规范 */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            操作规范
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {operationRules.map((rule, index) => (
              <Card
                key={index}
                className="border-0 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <rule.icon
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        rule.type === "success" ? "text-green-500" : "text-amber-500"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{rule.text}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{rule.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
