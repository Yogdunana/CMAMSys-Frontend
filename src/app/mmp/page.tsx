"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
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
  Pause,
  Play,
  Trash2,
  FileDown,
  Activity,
  Bot,
  User,
  AlertCircle,
  CircleDot,
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

// ============ 实时操作日志 ============

type LogType = "info" | "complete" | "warning" | "ai" | "important";

interface LogEntry {
  id: number;
  time: string;
  type: LogType;
  operator: string;
  message: string;
}

const logPool: Omit<LogEntry, "id" | "time">[] = [
  { type: "info", operator: "系统", message: "MMP文件初始化完成，文件ID: MMP-2024-C-0042" },
  { type: "ai", operator: "AI-建模手", message: "开始分析2024 MCM-C题目要求..." },
  { type: "info", operator: "系统", message: "第1章 文件头部信息 已自动生成" },
  { type: "ai", operator: "AI-建模手", message: "题目关键词提取完成: 渔业, 气候变化, SEIR模型" },
  { type: "complete", operator: "AI-建模手", message: "第2章 题目信息 已更新 - AI解析结果已写入" },
  { type: "info", operator: "张三", message: "创建了新的思路笔记: SEIR-CA混合建模方案" },
  { type: "ai", operator: "AI-建模手", message: "正在检索知识库中的相关模型..." },
  { type: "complete", operator: "AI-建模手", message: "找到3篇高相关度参考文献" },
  { type: "info", operator: "系统", message: "第3章 思路研讨记录 已更新 - 新增1条思路" },
  { type: "warning", operator: "AI-编程手", message: "检测到代码中存在潜在的性能问题" },
  { type: "info", operator: "李四", message: "提交了 seir_model.py v2.3" },
  { type: "complete", operator: "AI-编程手", message: "代码审查完成 - 发现2处优化建议" },
  { type: "info", operator: "系统", message: "第4章 代码记录 已更新 - 版本v2.3已归档" },
  { type: "ai", operator: "AI-编程手", message: "正在运行模型验证..." },
  { type: "complete", operator: "AI-编程手", message: "模型验证通过 - R²=0.947, RMSE=0.023" },
  { type: "info", operator: "王五", message: "完成了论文第5章初稿" },
  { type: "ai", operator: "AI-论文手", message: "正在检查论文格式规范..." },
  { type: "warning", operator: "AI-论文手", message: "参考文献格式不统一，建议统一为GB/T 7714" },
  { type: "complete", operator: "AI-论文手", message: "格式检查完成 - 已自动修正3处格式问题" },
  { type: "info", operator: "系统", message: "第6章 论文与图表记录 已更新" },
  { type: "ai", operator: "AI-评价系统", message: "正在生成本轮评价报告..." },
  { type: "complete", operator: "AI-评价系统", message: "团队协作指数: 87/100 (较上轮+5)" },
  { type: "info", operator: "系统", message: "第7章 AI实时评价记录 已更新" },
  { type: "important", operator: "系统", message: "检测到模型参数漂移，建议重新校准" },
  { type: "ai", operator: "AI-建模手", message: "正在执行参数重新校准..." },
  { type: "complete", operator: "AI-建模手", message: "参数校准完成 - 拟合度提升至R²=0.953" },
  { type: "info", operator: "张三", message: "确认了最终建模方案" },
  { type: "complete", operator: "系统", message: "MMP文件完整性校验通过" },
  { type: "ai", operator: "AI-系统", message: "知识库自动更新 - 新增2条模型经验" },
  { type: "info", operator: "系统", message: "区块链存证已提交 - 交易哈希: 0x7a3f...b2c1" },
  { type: "complete", operator: "系统", message: "第8章 赛后补充记录 已更新" },
  { type: "important", operator: "系统", message: "MMP文件已归档 - 团队: 数模之星队" },
];

const typeStyles: Record<LogType, string> = {
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  complete: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  ai: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  important: "bg-red-500/10 text-red-400 border-red-500/20",
};

const typeIconStyles: Record<LogType, string> = {
  info: "text-blue-400",
  complete: "text-emerald-400",
  warning: "text-amber-400",
  ai: "text-purple-400",
  important: "text-red-400",
};

function TypeIcon({ type }: { type: LogType }) {
  const cls = typeIconStyles[type];
  switch (type) {
    case "info":
      return <Info className={cn("w-4 h-4", cls)} />;
    case "complete":
      return <CheckCircle2 className={cn("w-4 h-4", cls)} />;
    case "warning":
      return <AlertTriangle className={cn("w-4 h-4", cls)} />;
    case "ai":
      return <Bot className={cn("w-4 h-4", cls)} />;
    case "important":
      return <AlertCircle className={cn("w-4 h-4", cls)} />;
  }
}

function getNowTime(): string {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export default function MmpPage() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [showFullFile, setShowFullFile] = useState(false);
  const { showToast } = useToast();

  // ---- 实时操作日志状态 ----
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);

  // 统计
  const totalOps = logs.length;
  const aiOps = logs.filter((l) => l.type === "ai").length;
  const fileUpdates = logs.filter(
    (l) => l.type === "complete" && l.operator === "系统"
  ).length;

  // 自动生成日志
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const entry = logPool[logIndex % logPool.length];
      setLogs((prev) => [
        ...prev,
        { ...entry, id: ++logIdRef.current, time: getNowTime() },
      ]);
      setLogIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, logIndex]);

  // 自动滚动到底部
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
    setLogIndex(0);
    logIdRef.current = 0;
    showToast("日志已清空", "info");
  }, [showToast]);

  const handleExportLogs = useCallback(() => {
    showToast("日志已导出为 mmp-log-2024.txt", "success");
  }, [showToast]);

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
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedChapter(isExpanded ? null : chapter.id);
                    }
                  }}
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
            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white" onClick={() => showToast("PDF导出成功！文件已保存", "success")}>
              <Download className="w-4 h-4 mr-1.5" />
              导出PDF
            </Button>
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

        {/* 实时操作日志 */}
        <div className="mb-10">
          {/* 标题区 */}
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              实时操作日志
            </h2>
            {/* 在线状态指示灯 */}
            <span className="relative flex h-3 w-3">
              <span className="animate-pulse-online absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            系统自动记录所有操作，确保全流程可追溯
          </p>

          {/* 统计栏 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200/60 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground mb-0.5">总操作数</p>
              <p className="text-lg font-bold text-slate-800">{totalOps} <span className="text-xs font-normal text-muted-foreground">条</span></p>
            </div>
            <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200/60 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground mb-0.5">AI操作</p>
              <p className="text-lg font-bold text-purple-600">{aiOps} <span className="text-xs font-normal text-muted-foreground">条</span></p>
            </div>
            <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200/60 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground mb-0.5">文件更新</p>
              <p className="text-lg font-bold text-emerald-600">{fileUpdates} <span className="text-xs font-normal text-muted-foreground">次</span></p>
            </div>
            <div className="rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200/60 px-4 py-3 shadow-sm">
              <p className="text-xs text-muted-foreground mb-0.5">最新状态</p>
              <p className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-online absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                {isPaused ? "已暂停" : "记录中..."}
              </p>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center gap-2 mb-3">
            <Button
              size="sm"
              variant={isPaused ? "default" : "outline"}
              onClick={() => setIsPaused(!isPaused)}
              className={cn(
                isPaused
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              )}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  继续
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 mr-1.5" />
                  暂停
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-100"
              onClick={handleClearLogs}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              清空日志
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-100"
              onClick={handleExportLogs}
            >
              <FileDown className="w-3.5 h-3.5 mr-1.5" />
              导出日志
            </Button>
          </div>

          {/* 日志容器 */}
          <Card className="border-0 bg-slate-900 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {/* 终端顶栏 */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="text-slate-500 text-xs ml-2 font-mono">mmp-operation-log</span>
                <Badge variant="outline" className="ml-auto text-slate-500 border-slate-700 text-[10px] px-1.5 py-0">
                  LIVE
                </Badge>
              </div>

              {/* 日志列表 */}
              <div className="h-[350px] overflow-y-auto scroll-smooth" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-600">
                    <Terminal className="w-8 h-8 mb-2 opacity-40" />
                    <p className="text-sm">等待操作日志...</p>
                    <p className="text-xs mt-1 text-slate-700">系统将自动记录所有操作</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-2.5 border-l-2 rounded-r-lg transition-all duration-300 animate-log-fade-in",
                          typeStyles[log.type]
                        )}
                      >
                        {/* 时间戳 */}
                        <span className="text-xs font-mono text-gray-500 shrink-0 w-16 pt-0.5">
                          {log.time}
                        </span>

                        {/* 图标 */}
                        <div className="shrink-0 mt-0.5">
                          <TypeIcon type={log.type} />
                        </div>

                        {/* 内容 */}
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-gray-400">{log.operator}</span>
                          <p className="text-sm text-gray-300">{log.message}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={logEndRef} />
                  </div>
                )}
              </div>
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
