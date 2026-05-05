"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import {
  PenTool,
  ArrowRight,
  CheckCircle2,
  Circle,
  Edit3,
  FileText,
  BookOpen,
  Sparkles,
  Bot,
  GitBranch,
  Download,
  FileCode,
  Send,
  ChevronRight,
  Quote,
  Eye,
  Table2,
  BarChart3,
  Image,
  Lightbulb,
  Wand2,
  ClipboardCheck,
  Users,
  Workflow,
  History,
  Clock,
  Type,
  Hash,
  Check,
  X,
  Code2,
  Database,
  LineChart,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ============================================================
   Data
   ============================================================ */

interface Chapter {
  id: number;
  title: string;
  status: "completed" | "writing" | "empty";
  words: number;
}

const chapters: Chapter[] = [
  { id: 1, title: "摘要", status: "completed", words: 280 },
  { id: 2, title: "问题重述", status: "completed", words: 520 },
  { id: 3, title: "模型假设", status: "completed", words: 380 },
  { id: 4, title: "符号说明", status: "completed", words: 450 },
  { id: 5, title: "模型建立", status: "writing", words: 1200 },
  { id: 6, title: "模型求解", status: "empty", words: 0 },
  { id: 7, title: "结果分析", status: "empty", words: 0 },
  { id: 8, title: "模型评价与改进", status: "empty", words: 0 },
  { id: 9, title: "参考文献", status: "empty", words: 0 },
];

const aiSuggestions = [
  { id: 1, icon: "pen", text: "第五章逻辑清晰，建议在5.1和5.2之间添加过渡段" },
  { id: 2, icon: "ruler", text: "公式(5.1)-(5.4)建议添加编号和变量说明表" },
  { id: 3, icon: "chart", text: "建议在5.2节添加CA网格示意图" },
  { id: 4, icon: "link", text: "参考文献格式需统一为GB/T 7714标准" },
];

const versions = [
  { version: "V1.0", time: "01-15 14:00", desc: "完成前四章", check: "pass" },
  { version: "V1.5", time: "01-15 16:00", desc: "第五章初稿", check: "pending" },
];

const simulationData = [
  { day: 1, S: 9900, E: 50, I: 30, R: 20 },
  { day: 5, S: 9500, E: 280, I: 150, R: 70 },
  { day: 10, S: 8200, E: 650, I: 480, R: 670 },
  { day: 15, S: 6100, E: 520, I: 780, R: 2500 },
  { day: 20, S: 4500, E: 300, I: 620, R: 4580 },
];

const codeReference = `import numpy as np
from scipy.integrate import odeint

def seir_model(y, t, beta, sigma, gamma, N):
    S, E, I, R = y
    dSdt = -beta * S * I / N
    dEdt = beta * S * I / N - sigma * E
    dIdt = sigma * E - gamma * I
    dRdt = gamma * I
    return [dSdt, dEdt, dIdt, dRdt]

# Parameters
N = 10000
beta = 0.3
sigma = 1/5
gamma = 1/10
I0, E0 = 30, 50

y0 = [N - I0 - E0, E0, I0, 0]
t = np.linspace(0, 100, 1000)

result = odeint(seir_model, y0, t,
                args=(beta, sigma, gamma, N))`;

/* ============================================================
   Component
   ============================================================ */

export default function WriterPage() {
  const { showToast } = useToast();
  const [activeChapter, setActiveChapter] = useState(5);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);

  const handleChapterClick = (chapter: Chapter) => {
    setActiveChapter(chapter.id);
    if (chapter.status === "completed") {
      showToast(`查看第${chapter.id}章内容`, "info");
    } else if (chapter.status === "empty") {
      showToast("该章节尚未开始编写", "warning");
    }
  };

  const totalWords = chapters.reduce((sum, c) => sum + c.words, 0);
  const targetWords = 25000;
  const progressPercent = Math.round((totalWords / targetWords) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-rose-50/30">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-orange-400/15 to-rose-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ============================================================
            1. Page Header
            ============================================================ */}
        <div className="mb-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <PenTool className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  论文手工作台
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  论文撰写 · 成果呈现 · AI辅助写作
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1 text-sm shadow-md shadow-amber-500/20">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                王五 · 论文手
              </Badge>
              <Link href="/modeler">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-700">
                  前往建模手工作台
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
              <Link href="/programmer">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-700">
                  前往编程手工作台
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================
            2. Current Task Card
            ============================================================ */}
        <Card className="mb-6 border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-medium">
                    当前竞赛
                  </Badge>
                  <span className="text-lg font-semibold text-slate-800">2024MCM-C</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    基于SEIR-CA混合模型的渔业气候影响分析
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="hidden lg:block h-12 bg-amber-200/50" />
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">进度</p>
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-600">论文撰写中 (35%)</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">当前章节</p>
                  <span className="text-sm font-semibold text-slate-700">第五章 模型建立</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">字数统计</p>
                  <div className="flex items-center gap-1">
                    <Type className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {totalWords.toLocaleString()} / {targetWords.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">(约{progressPercent}%)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={progressPercent}>
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs font-medium text-amber-600">论文进度</span>
                  <div className="flex-1">
                    <div className="relative flex h-2 w-full items-center overflow-hidden rounded-full bg-amber-100">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">{progressPercent}%</span>
                </div>
              </Progress>
            </div>
          </CardContent>
        </Card>

        {/* ============================================================
            3. Paper Editing Workspace (Core)
            ============================================================ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-6">
          {/* ---- 3A. Left: Chapter Outline ---- */}
          <Card className="xl:col-span-2 border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                论文大纲
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <ScrollArea className="h-[520px]">
                <div className="space-y-0.5">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterClick(chapter)}
                      className={cn(
                        "w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                        activeChapter === chapter.id
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 shadow-sm"
                          : "hover:bg-amber-50/50 border border-transparent"
                      )}
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        {chapter.status === "completed" && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                        {chapter.status === "writing" && (
                          <Edit3 className="w-4 h-4 text-orange-500 animate-pulse" />
                        )}
                        {chapter.status === "empty" && (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-xs font-medium leading-tight",
                            activeChapter === chapter.id
                              ? "text-amber-800"
                              : chapter.status === "completed"
                              ? "text-slate-600"
                              : chapter.status === "writing"
                              ? "text-orange-700"
                              : "text-slate-400"
                          )}
                        >
                          {chapter.id}. {chapter.title}
                        </p>
                        {chapter.words > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {chapter.status === "completed" ? "已完成" : "编写中"}，{chapter.words.toLocaleString()}字
                          </p>
                        )}
                        {chapter.status === "empty" && (
                          <p className="text-[10px] text-slate-300 mt-0.5">未开始</p>
                        )}
                      </div>
                      {activeChapter === chapter.id && (
                        <ChevronRight className="w-3 h-3 text-amber-500 mt-1 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* ---- 3B. Center: Paper Editor ---- */}
          <Card className="xl:col-span-6 border-0 bg-white/80 backdrop-blur-xl shadow-xl shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2 px-5 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <CardTitle className="text-sm font-bold text-slate-800">
                    第五章 模型建立
                  </CardTitle>
                  <Badge variant="secondary" className="text-[10px] bg-orange-100 text-orange-600">
                    编写中
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Hash className="w-3 h-3" />
                  <span>1,200字</span>
                </div>
              </div>
            </CardHeader>
            <Separator className="bg-amber-100/50" />
            <CardContent className="p-0">
              <div className="bg-white rounded-b-xl">
                <ScrollArea className="h-[480px]">
                  <div className="px-8 py-6 font-serif text-slate-800 leading-relaxed max-w-none">
                    {/* Chapter content */}
                    <h2 className="text-xl font-bold text-slate-900 mb-4">
                      5. 模型建立
                    </h2>

                    <h3 className="text-base font-bold text-slate-800 mt-6 mb-3">
                      5.1 SEIR基础模型
                    </h3>

                    <p className="text-sm text-slate-700 mb-3 indent-8">
                      我们采用SEIR（Susceptible-Exposed-Infectious-Recovered）模型作为传染病传播的基础框架。该模型将人群分为四个仓室：易感者(S)、潜伏者(E)、感染者(I)和康复者(R)，其动力学方程如下：
                    </p>

                    <div className="bg-slate-50 rounded-lg p-4 mb-3 border border-slate-100 font-mono text-sm text-slate-600">
                      <p className="mb-1">dS/dt = -&beta;SI / N</p>
                      <p className="mb-1">dE/dt = &beta;SI / N - &sigma;E</p>
                      <p className="mb-1">dI/dt = &sigma;E - &gamma;I</p>
                      <p>dR/dt = &gamma;I</p>
                    </div>

                    <p className="text-sm text-slate-700 mb-3 indent-8">
                      其中 &beta; 为传染率，&sigma; 为潜伏期转化率，&gamma; 为恢复率，N 为总人口数。模型的基本再生数 R₀ = &beta;/&gamma; 决定了疫情的传播趋势。
                    </p>

                    <h3 className="text-base font-bold text-slate-800 mt-6 mb-3">
                      5.2 元胞自动机空间扩展
                    </h3>

                    <p className="text-sm text-slate-700 mb-3 indent-8">
                      在SEIR模型基础上，我们引入元胞自动机(CA)来处理疾病传播的空间异质性。将研究区域划分为 L&times;L 的网格，每个网格单元代表一个子区域，其状态由该区域内的SEIR各仓室人数决定。
                    </p>

                    <p className="text-sm text-slate-700 mb-3 indent-8">
                      元胞的状态转移规则如下：每个时间步内，中心元胞与Moore邻域（8个相邻元胞）进行人口流动交互，流动概率与相邻元胞间的距离成反比。设 p_ij 为元胞 i 向元胞 j 的流动概率：
                    </p>

                    <div className="bg-slate-50 rounded-lg p-4 mb-3 border border-slate-100 font-mono text-sm text-slate-600">
                      <p>p_ij = k &middot; exp(-d_ij / d₀)</p>
                    </div>

                    <p className="text-sm text-slate-700 mb-3 indent-8">
                      其中 d_ij 为两元胞中心间距离，d₀ 为特征距离参数，k 为归一化系数。通过这种混合建模方式，我们能够同时捕捉疫情传播的时间动态特征和空间扩散模式<span className="inline-block w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-text-bottom" /></p>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <Separator className="bg-amber-100/50" />
            <CardFooter className="px-5 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>本章 1,200字</span>
                <Separator orientation="vertical" className="h-3 bg-slate-200" />
                <span>全文 {totalWords.toLocaleString()}字</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>最后保存 16:42</span>
              </div>
            </CardFooter>
          </Card>

          {/* ---- 3C. Right: Material Panel ---- */}
          <Card className="xl:col-span-4 border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-500" />
                可用素材
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Tabs defaultValue="modeling" orientation="horizontal">
                <TabsList className="w-full mb-3">
                  <TabsTrigger value="modeling" className="text-xs flex-1">建模思路</TabsTrigger>
                  <TabsTrigger value="code" className="text-xs flex-1">代码参考</TabsTrigger>
                  <TabsTrigger value="data" className="text-xs flex-1">运行数据</TabsTrigger>
                  <TabsTrigger value="charts" className="text-xs flex-1">图表素材</TabsTrigger>
                </TabsList>

                {/* Tab: Modeling Ideas */}
                <TabsContent value="modeling">
                  <ScrollArea className="h-[440px]">
                    <div className="space-y-3">
                      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold text-amber-800">建模手最终方案</span>
                            <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-600">V3.0</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          SEIR-CA混合模型，SEIR处理时间维度，CA处理空间维度。模型采用Moore邻域进行空间交互，参数通过贝叶斯推断拟合。建议在论文中重点阐述两个子模型的耦合机制。
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                            onClick={() => showToast("已引用到论文中", "success")}
                          >
                            <Quote className="w-3 h-3 mr-1" />
                            引用
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-amber-200 hover:bg-amber-50 text-amber-700"
                            onClick={() => showToast("查看完整方案", "info")}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            查看详情
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white border border-slate-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">模型假设清单</span>
                          <Badge variant="secondary" className="text-[10px]">V2.0</Badge>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">
                          共8条假设，涵盖人口封闭性、参数时不变性、混合均匀性等。已标注每条假设在论文中的引用位置。
                        </p>
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                          onClick={() => showToast("已引用到论文中", "success")}
                        >
                          <Quote className="w-3 h-3 mr-1" />
                          引用
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Tab: Code Reference */}
                <TabsContent value="code">
                  <ScrollArea className="h-[440px]">
                    <div className="space-y-3">
                      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-blue-500" />
                            <span className="text-xs font-bold text-blue-800">编程手代码</span>
                            <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-600">V2.5</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          SEIR-CA混合模型Python实现，含参数拟合、敏感性分析和可视化模块。使用scipy.integrate.odeint求解ODE系统。
                        </p>
                        <div className="flex gap-2">
                          <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
                            <DialogTrigger
                              render={
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs border-blue-200 hover:bg-blue-50 text-blue-700"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  查看代码
                                </Button>
                              }
                            />
                            <DialogContent className="max-w-2xl max-h-[80vh]">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Code2 className="w-5 h-5 text-blue-500" />
                                  SEIR-CA 混合模型代码
                                </DialogTitle>
                                <DialogDescription>
                                  编程手提供 · V2.5 · Python
                                </DialogDescription>
                              </DialogHeader>
                              <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-[50vh]">
                                <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                                  {codeReference}
                                </pre>
                              </div>
                              <DialogFooter>
                                <Button
                                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                                  onClick={() => {
                                    showToast("已引用到论文中", "success");
                                    setCodeDialogOpen(false);
                                  }}
                                >
                                  <Quote className="w-4 h-4 mr-1" />
                                  引用到论文
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                            onClick={() => showToast("已引用到论文中", "success")}
                          >
                            <Quote className="w-3 h-3 mr-1" />
                            引用
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Tab: Simulation Data */}
                <TabsContent value="data">
                  <ScrollArea className="h-[440px]">
                    <div className="space-y-3">
                      <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <LineChart className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-800">模拟结果数据</span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-center">
                            <p className="text-lg font-bold text-emerald-600">R&sup2;=0.947</p>
                            <p className="text-[10px] text-muted-foreground">拟合优度</p>
                          </div>
                          <Separator orientation="vertical" className="h-8 bg-emerald-200" />
                          <div className="text-center">
                            <p className="text-lg font-bold text-emerald-600">RMSE=0.032</p>
                            <p className="text-[10px] text-muted-foreground">均方根误差</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white border border-slate-100 p-3">
                        <p className="text-xs font-bold text-slate-600 mb-2">数据预览</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead>
                              <tr className="border-b border-slate-100">
                                <th className="py-1.5 px-2 text-left font-semibold text-slate-500">Day</th>
                                <th className="py-1.5 px-2 text-right font-semibold text-slate-500">S</th>
                                <th className="py-1.5 px-2 text-right font-semibold text-slate-500">E</th>
                                <th className="py-1.5 px-2 text-right font-semibold text-slate-500">I</th>
                                <th className="py-1.5 px-2 text-right font-semibold text-slate-500">R</th>
                              </tr>
                            </thead>
                            <tbody>
                              {simulationData.map((row, i) => (
                                <tr key={i} className="border-b border-slate-50 last:border-0">
                                  <td className="py-1 px-2 text-slate-600">{row.day}</td>
                                  <td className="py-1 px-2 text-right text-slate-600 tabular-nums">{row.S.toLocaleString()}</td>
                                  <td className="py-1 px-2 text-right text-slate-600 tabular-nums">{row.E}</td>
                                  <td className="py-1 px-2 text-right text-slate-600 tabular-nums">{row.I}</td>
                                  <td className="py-1 px-2 text-right text-slate-600 tabular-nums">{row.R.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                          onClick={() => showToast("数据表格已插入论文", "success")}
                        >
                          <Table2 className="w-3 h-3 mr-1" />
                          插入表格
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-amber-200 hover:bg-amber-50 text-amber-700"
                          onClick={() => showToast("图表已插入论文", "success")}
                        >
                          <BarChart3 className="w-3 h-3 mr-1" />
                          插入图表
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Tab: Chart Assets */}
                <TabsContent value="charts">
                  <ScrollArea className="h-[440px]">
                    <div className="space-y-3">
                      {[
                        { name: "SEIR传播曲线图", desc: "S/E/I/R随时间变化曲线" },
                        { name: "空间分布热力图", desc: "感染率地理分布可视化" },
                        { name: "参数敏感性分析图", desc: "R0对关键参数的敏感性" },
                      ].map((chart, i) => (
                        <div
                          key={i}
                          className="rounded-xl bg-white border border-slate-100 p-3 flex items-center gap-3 group hover:border-amber-200 hover:bg-amber-50/30 transition-all"
                        >
                          <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0 border border-amber-200/50">
                            <Image className="w-6 h-6 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-700">{chart.name}</p>
                            <p className="text-[10px] text-muted-foreground">{chart.desc}</p>
                          </div>
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20 flex-shrink-0"
                            onClick={() => showToast(`${chart.name}已插入论文`, "success")}
                          >
                            插入
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* ============================================================
            4. AI Writing Assistant
            ============================================================ */}
        <Card className="mb-6 border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-3 px-5 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI写作助手
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                  onClick={() => showToast("AI润色完成，优化了8处表达", "success")}
                >
                  <Wand2 className="w-3 h-3 mr-1" />
                  AI润色全文
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-amber-200 hover:bg-amber-50 text-amber-700"
                  onClick={() => showToast("格式检查完成，发现3处需修改", "info")}
                >
                  <ClipboardCheck className="w-3 h-3 mr-1" />
                  AI检查格式
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-amber-50/50 to-orange-50/30 border border-amber-100/60 p-3 group hover:border-amber-200/80 hover:shadow-sm transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-relaxed">{suggestion.text}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => showToast("已采纳建议", "success")}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                      onClick={() => showToast("已跳过", "info")}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============================================================
            5. Version Management
            ============================================================ */}
        <Card className="mb-6 border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <CardHeader className="pb-3 px-5 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-500" />
                论文版本管理
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-amber-200 hover:bg-amber-50 text-amber-700"
                  onClick={() => showToast("版本对比功能开发中", "info")}
                >
                  <GitBranch className="w-3 h-3 mr-1" />
                  对比版本
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs border-amber-200 hover:bg-amber-50 text-amber-700"
                  onClick={() => showToast("PDF导出功能开发中", "info")}
                >
                  <Download className="w-3 h-3 mr-1" />
                  导出PDF
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20"
                  onClick={() => showToast("LaTeX源码已导出", "success")}
                >
                  <FileCode className="w-3 h-3 mr-1" />
                  导出LaTeX
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <div className="space-y-2">
              {versions.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-amber-50/30 to-orange-50/20 border border-amber-100/40 p-3 hover:border-amber-200/60 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-sm flex-shrink-0">
                    <History className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800">{v.version}</span>
                      <span className="text-xs text-muted-foreground">{v.time}</span>
                    </div>
                    <p className="text-xs text-slate-600">{v.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {v.check === "pass" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 text-[10px] border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        AI校验: 通过
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 text-[10px] border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        AI校验: 进行中
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============================================================
            6. Quick Actions
            ============================================================ */}
        <Card className="border-0 bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-500/5 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="pb-3 px-5 pt-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              快捷操作
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/modeler">
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 flex flex-col items-center gap-2 border-amber-200/60 hover:bg-amber-50 hover:border-amber-300 text-amber-700 transition-all group"
                  onClick={() => showToast("已向建模手发送材料补充请求", "success")}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <Lightbulb className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">请求建模手补充材料</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">跳转建模手工作台</p>
                  </div>
                </Button>
              </Link>

              <Link href="/programmer">
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 flex flex-col items-center gap-2 border-amber-200/60 hover:bg-amber-50 hover:border-amber-300 text-amber-700 transition-all group"
                  onClick={() => showToast("已向编程手发送图表更新请求", "success")}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <BarChart3 className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">请求编程手更新图表</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">跳转编程手工作台</p>
                  </div>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full h-auto py-3 flex flex-col items-center gap-2 border-amber-200/60 hover:bg-amber-50 hover:border-amber-300 text-amber-700 transition-all group"
                onClick={() => showToast("论文已提交审阅", "success")}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                  <Send className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold">提交论文审阅</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">发送给导师审阅</p>
                </div>
              </Button>

              <Link href="/workflow">
                <Button
                  variant="outline"
                  className="w-full h-auto py-3 flex flex-col items-center gap-2 border-amber-200/60 hover:bg-amber-50 hover:border-amber-300 text-amber-700 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                    <Workflow className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">返回工作流总览</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">查看整体进度</p>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
