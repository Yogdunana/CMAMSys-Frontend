"use client"

import { useState, useEffect } from "react"
import {
  Brain, ChevronDown, ChevronUp, Star, Clock, ExternalLink,
  Trophy, MessageSquare, Sparkles, Send, BookOpen, FileText,
  ArrowRight, CheckCircle2, Zap, History, Globe, Quote,
  Lightbulb, ThumbsUp, Award, Timer, Link2, Download,
  ArrowLeft, Bot, User
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import Link from "next/link"

/* ------------------------------------------------------------------ */
/*  倒计时 Hook                                                        */
/* ------------------------------------------------------------------ */
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return time
}

/* ------------------------------------------------------------------ */
/*  数据                                                               */
/* ------------------------------------------------------------------ */
const agentData = [
  {
    id: "gpt4",
    name: "GPT-4",
    version: "gpt-4-turbo",
    color: "blue",
    borderClass: "border-blue-400 dark:border-blue-500",
    bgClass: "from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40",
    avatarBg: "from-blue-500 to-sky-500",
    avatarRing: "ring-blue-500",
    textClass: "text-blue-700 dark:text-blue-400",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    icon: "G4",
    round1Summary:
      "基于SEIR模型的传染病传播建模方案。将人群划分为易感者(S)、潜伏者(E)、感染者(I)和康复者(R)四个仓室，通过常微分方程组描述各仓室之间的转化关系，并利用最小二乘法与贝叶斯推断进行参数估计。该方案数学基础扎实，适合刻画时间维度的传播动力学特征。",
    round2Summary:
      "融合建模手思路，在SEIR基础上增加空间扩散项。采用自适应步长的四阶Runge-Kutta方法求解各子区域微分方程组，并通过加权平均实现邻域耦合。引入贝叶斯推断进行参数估计，提高模型拟合精度。创新点：将人口流动矩阵作为耦合权重的先验分布。",
    round2Ref: "建模手提出的\"SEIR处理时间维度，CA处理空间维度\"的混合框架",
    round2Innovation: "引入贝叶斯推断 + 人口流动矩阵先验",
  },
  {
    id: "claude",
    name: "Claude",
    version: "claude-3-opus",
    color: "purple",
    borderClass: "border-purple-400 dark:border-purple-500",
    bgClass: "from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40",
    avatarBg: "from-purple-500 to-violet-500",
    avatarRing: "ring-purple-500",
    textClass: "text-purple-700 dark:text-purple-400",
    badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    icon: "CL",
    round1Summary:
      "采用元胞自动机模拟空间传播。将研究区域划分为规则网格，每个元胞代表一个地理单元，根据莫尔邻域(8个邻居)的状态和自定义传播规则模拟疫情扩散。此方法能更好地捕捉空间异质性，适合分析区域传播差异和评估空间干预策略的效果。",
    round2Summary:
      "在建模手思路基础上，提出分层CA模型。底层为SEIR动力学层，上层为空间耦合CA层。引入莫尔邻域定义(8个邻居)，每个子区域根据人口流动矩阵计算耦合强度。加入随机扰动项模拟不确定性，并使用蒙特卡洛模拟评估政策干预效果。创新点：分层架构实现时间-空间解耦建模。",
    round2Ref: "建模手提出的\"用CA处理空间维度\"的核心思想",
    round2Innovation: "分层CA架构 + 蒙特卡洛不确定性量化",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    version: "deepseek-v2",
    color: "cyan",
    borderClass: "border-cyan-400 dark:border-cyan-500",
    bgClass: "from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-teal-950/40",
    avatarBg: "from-cyan-500 to-teal-500",
    avatarRing: "ring-cyan-500",
    textClass: "text-cyan-700 dark:text-cyan-400",
    badgeBg: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    icon: "DS",
    round1Summary:
      "基于图神经网络的关系预测模型。构建人口流动图，利用GNN学习节点间的传播模式。结合时空注意力机制，可以同时捕捉时间演化和空间传播特征，适合大规模数据场景。该方案具有端到端学习能力，但需要大量训练数据支撑。",
    round2Summary:
      "结合GNN和SEIR，构建时空图模型。在混合框架中嵌入轻量级GNN模块，用图卷积层替代简单的加权平均耦合，自动学习最优的空间传播模式。结合Transformer编码时间序列，实现端到端的时空预测。创新点：GNN替代传统耦合方式，实现数据驱动的空间传播建模。",
    round2Ref: "建模手提出的\"混合方法\"整体框架",
    round2Innovation: "GNN替代传统耦合 + Transformer时间编码",
  },
]

const votingData = [
  { judge: "GPT-4", first: "Claude结合版", second: "DeepSeek结合版", third: "GPT-4结合版" },
  { judge: "Claude", first: "GPT-4结合版", second: "Claude结合版", third: "DeepSeek结合版" },
  { judge: "DeepSeek", first: "GPT-4结合版", second: "Claude结合版", third: "DeepSeek结合版" },
]

const scoreData = [
  { name: "GPT-4结合版", score: 6, rank: 1, color: "blue" },
  { name: "Claude结合版", score: 5, rank: 2, color: "purple" },
  { name: "DeepSeek结合版", score: 1, rank: 3, color: "cyan" },
]

const crawlRecords = [
  {
    time: "01-15 08:30",
    source: "IEEE",
    title: "Spatial-Temporal Epidemic Modeling Using Hybrid SEIR-CA Framework",
    summary: "提出了一种结合SEIR与元胞自动机的混合传染病时空传播模型，在多个城市数据集上验证了方法的有效性。",
    link: "#",
  },
  {
    time: "01-15 09:15",
    source: "Google Scholar",
    title: "Bayesian Inference for SEIR Model Parameters with Spatial Coupling",
    summary: "研究了基于贝叶斯推断的SEIR模型参数估计方法，特别考虑了空间耦合效应对参数不确定性的影响。",
    link: "#",
  },
  {
    time: "01-15 10:00",
    source: "arXiv",
    title: "Graph Neural Networks for Epidemic Spread Prediction: A Survey",
    summary: "综述了图神经网络在传染病传播预测中的应用，对比了GCN、GAT、GraphSAGE等模型在时空预测任务上的表现。",
    link: "#",
  },
  {
    time: "01-15 11:20",
    source: "arXiv",
    title: "Monte Carlo Simulation for Policy Intervention Assessment in Epidemic Models",
    summary: "介绍了蒙特卡洛模拟在传染病模型中评估政策干预效果的方法，包括隔离、疫苗接种等多种策略的量化分析。",
    link: "#",
  },
]

const iterationRecords = [
  { version: "V1.0", time: "01-15 09:00", content: "初步确定SEIR方向", author: "张三", authorType: "human" },
  { version: "V1.5", time: "01-15 11:30", content: "引入空间维度", author: "AI建议", authorType: "ai" },
  { version: "V2.0", time: "01-15 14:00", content: "确定混合模型方案", author: "团队讨论", authorType: "team" },
  { version: "V2.5", time: "01-15 16:00", content: "优化参数拟合方法", author: "GPT-4建议", authorType: "ai" },
  { version: "V3.0", time: "01-15 18:00", content: "最终方案确定", author: "待确认", authorType: "pending" },
]

/* ------------------------------------------------------------------ */
/*  页面组件                                                            */
/* ------------------------------------------------------------------ */
export default function ModelerPage() {
  const { showToast } = useToast()
  const [expandedRound1, setExpandedRound1] = useState<string[]>([])
  const [expandedRound2, setExpandedRound2] = useState<string[]>([])

  // 模拟截止日期：当前时间 + 2天14小时
  const deadline = new Date(Date.now() + 2 * 86400000 + 14 * 3600000 + 27 * 60000)
  const countdown = useCountdown(deadline)

  const toggleRound1 = (id: string) => {
    setExpandedRound1((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleRound2 = (id: string) => {
    setExpandedRound2((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleConfirmPlan = () => {
    showToast("已确认采用 GPT-4结合版 方案！", "success")
  }

  const handleSendToProgrammer = () => {
    showToast("方案已发送给编程手李四！", "success")
  }

  const handleExportReport = () => {
    showToast("思路报告已生成", "success")
  }

  const sourceColorMap: Record<string, string> = {
    IEEE: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    "Google Scholar": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    arXiv: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  }

  const authorTypeMap: Record<string, { label: string; className: string }> = {
    human: { label: "建模手", className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
    ai: { label: "AI", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
    team: { label: "团队", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
    pending: { label: "待确认", className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-slate-950 dark:to-indigo-950">
      {/* ========== 背景装饰渐变 blob ========== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-300/25 dark:bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-indigo-300/25 dark:bg-indigo-600/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-fuchsia-200/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* ============================================================ */}
        {/* 1. 页面头部                                                    */}
        {/* ============================================================ */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/30">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  建模手工作台
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  思路构建 · 数学模型设计 · AI三轮辩论
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 text-sm shadow-md">
                <User className="w-3.5 h-3.5 mr-1.5" />
                张三 · 建模手
              </Badge>
              <Link href="/programmer">
                <Button variant="outline" className="gap-1.5 text-sm group">
                  前往编程手工作台
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. 当前任务卡片                                                 */}
        {/* ============================================================ */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-purple-500/10 overflow-hidden">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* 左侧信息 */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">2024MCM-C</Badge>
                  <span className="text-sm text-muted-foreground">当前竞赛</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Climate Change&apos;s Impact on Fisheries
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  研究气候变化对全球渔业资源的影响，建立预测模型评估未来50年不同排放情景下渔获量的变化趋势，并提出可持续管理策略建议。
                </p>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    <Zap className="w-3 h-3 mr-1" />
                    思路研讨中
                  </Badge>
                  <div className="flex items-center gap-2 flex-1 max-w-xs">
                    <Progress value={65}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                        style={{ width: "65%" }}
                      />
                    </Progress>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">65%</span>
                  </div>
                </div>
              </div>

              {/* 右侧倒计时 */}
              <div className="shrink-0 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/20 min-w-[220px]">
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="w-4 h-4" />
                  <span className="text-sm font-medium text-white/80">提交截止倒计时</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { value: countdown.days, label: "天" },
                    { value: countdown.hours, label: "时" },
                    { value: countdown.minutes, label: "分" },
                    { value: countdown.seconds, label: "秒" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-2xl font-bold tabular-nums bg-white/15 rounded-lg py-1.5 mb-0.5">
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] text-white/60">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ============================================================ */}
        {/* 3. 三轮AI辩论区域                                               */}
        {/* ============================================================ */}
        <Tabs defaultValue="round1" className="mb-8">
          <TabsList className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-1 h-auto">
            <TabsTrigger
              value="round1"
              className="flex items-center gap-2 px-5 py-2.5 data-active:bg-gradient-to-r data-active:from-purple-500 data-active:to-indigo-500 data-active:text-white rounded-lg"
            >
              <MessageSquare className="w-4 h-4" />
              第一轮 · 独立思考
            </TabsTrigger>
            <TabsTrigger
              value="round2"
              className="flex items-center gap-2 px-5 py-2.5 data-active:bg-gradient-to-r data-active:from-blue-500 data-active:to-indigo-500 data-active:text-white rounded-lg"
            >
              <Sparkles className="w-4 h-4" />
              第二轮 · 人机融合
            </TabsTrigger>
            <TabsTrigger
              value="round3"
              className="flex items-center gap-2 px-5 py-2.5 data-active:bg-gradient-to-r data-active:from-emerald-500 data-active:to-teal-500 data-active:text-white rounded-lg"
            >
              <Trophy className="w-4 h-4" />
              第三轮 · 同伴互评
            </TabsTrigger>
          </TabsList>

          {/* -------------------- 第一轮: 独立思考 -------------------- */}
          <TabsContent value="round1">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-purple-500/10 overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">第一轮: 独立思考</CardTitle>
                    <CardDescription>三个AI模型分别独立提出解决方案，点击展开查看完整思路</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 题目展示区 */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl border border-purple-200/60 dark:border-purple-800/60">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">竞赛题目摘要</span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                    <p>
                      <strong>Problem C:</strong> Climate Change&apos;s Impact on Fisheries
                    </p>
                    <p>
                      随着全球气候变化加剧，海洋温度升高、酸化程度加剧、洋流模式改变等因素正在深刻影响全球渔业资源的分布和产量。
                      请团队建立数学模型，分析气候变化对渔业的影响机制，预测未来不同情景下的渔获量变化趋势，并为渔业管理提出科学建议。
                    </p>
                  </div>
                </div>

                {/* 3个Agent独立方案卡片 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {agentData.map((agent) => {
                    const isExpanded = expandedRound1.includes(agent.id)
                    return (
                      <Card
                        key={agent.id}
                        className={cn(
                          "bg-gradient-to-br border-2 transition-all duration-300 hover:shadow-lg",
                          agent.bgClass,
                          agent.borderClass
                        )}
                      >
                        <CardContent className="pt-5 pb-5">
                          {/* Agent 头部 */}
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className={cn("w-11 h-11 ring-2", agent.avatarRing)}>
                              <AvatarFallback
                                className={cn(
                                  "bg-gradient-to-br text-white font-bold text-xs",
                                  agent.avatarBg
                                )}
                              >
                                {agent.icon}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className={cn("font-semibold", agent.textClass)}>{agent.name}</div>
                              <Badge variant="secondary" className={cn("text-[10px]", agent.badgeBg)}>
                                {agent.version}
                              </Badge>
                            </div>
                          </div>

                          {/* 方案摘要 */}
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            {agent.round1Summary.slice(0, 50)}...
                          </p>

                          {/* 展开内容 */}
                          {isExpanded && (
                            <div className="mt-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200/60 dark:border-gray-700/60 animate-in fade-in slide-in-from-top-2 duration-300">
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {agent.round1Summary}
                              </p>
                            </div>
                          )}

                          {/* 操作按钮 */}
                          <div className="flex items-center gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs gap-1"
                              onClick={() => toggleRound1(agent.id)}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3.5 h-3.5" />
                                  收起
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3.5 h-3.5" />
                                  展开详情
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs gap-1"
                              onClick={() => showToast(`已为 ${agent.name} 方案评分`, "success")}
                            >
                              <Star className="w-3.5 h-3.5" />
                              评分
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------------------- 第二轮: 人机融合 -------------------- */}
          <TabsContent value="round2">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-blue-500/10 overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">第二轮: 人机融合</CardTitle>
                    <CardDescription>建模手思路与AI方案深度融合，产生优化方案</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 建模手思路输入区 */}
                  <div className="p-5 bg-gradient-to-r from-violet-100/80 to-indigo-100/80 dark:from-violet-950/40 dark:to-indigo-950/40 rounded-2xl border-2 border-violet-300/60 dark:border-violet-700/60 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10 ring-2 ring-violet-500">
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white font-bold">
                          张
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-violet-700 dark:text-violet-400">建模手思路</div>
                        <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 text-xs">
                          张三 · 核心思路
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-violet-200/40 dark:border-violet-800/40">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        我倾向于结合SEIR模型和元胞自动机的混合方法，用SEIR处理时间维度，用CA处理空间维度。具体来说，将研究区域划分为网格，每个网格单元独立运行SEIR模型，通过邻域耦合实现空间传播效应。这样既保留了微分方程的数学严谨性，又增加了空间维度的表达能力。在参数估计方面，可以考虑使用贝叶斯方法结合真实数据进行拟合。
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>01-15 13:00 输入</span>
                      <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        已确认
                      </Badge>
                    </div>
                  </div>

                  {/* 3个Agent的人机结合方案 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {agentData.map((agent) => {
                      const isExpanded = expandedRound2.includes(agent.id)
                      return (
                        <Card
                          key={agent.id}
                          className={cn(
                            "bg-gradient-to-br border-2 transition-all duration-300 hover:shadow-lg",
                            agent.bgClass,
                            agent.borderClass
                          )}
                        >
                          <CardContent className="pt-5 pb-5">
                            {/* Agent 头部 */}
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className={cn("w-9 h-9 ring-2", agent.avatarRing)}>
                                <AvatarFallback
                                  className={cn(
                                    "bg-gradient-to-br text-white font-bold text-[10px]",
                                    agent.avatarBg
                                  )}
                                >
                                  {agent.icon}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                                {agent.name}结合版
                              </div>
                            </div>

                            {/* 原始思路引用 */}
                            <div className="flex items-start gap-2 mb-3 p-2.5 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/40 dark:border-gray-700/40">
                              <Quote className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {agent.round2Ref}
                              </p>
                            </div>

                            {/* 结合说明摘要 */}
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                              {agent.round2Summary.slice(0, 60)}...
                            </p>

                            {/* 展开内容 */}
                            {isExpanded && (
                              <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200/60 dark:border-gray-700/60">
                                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                                    完整结合说明
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {agent.round2Summary}
                                  </p>
                                </div>
                                <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200/60 dark:border-amber-800/60">
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">创新点</span>
                                  </div>
                                  <p className="text-xs text-gray-700 dark:text-gray-300">
                                    {agent.round2Innovation}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* 操作按钮 */}
                            <div className="flex items-center gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs gap-1"
                                onClick={() => toggleRound2(agent.id)}
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                    收起
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                    查看详情
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* -------------------- 第三轮: 同伴互评 -------------------- */}
          <TabsContent value="round3">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-emerald-500/10 overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">第三轮: 同伴互评</CardTitle>
                    <CardDescription>AI模型互相评分投票，选出最优方案</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 投票结果表格 */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">
                            评委
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">
                            <div className="flex items-center justify-center gap-1.5">
                              <Award className="w-4 h-4" />
                              第1名
                            </div>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-500 dark:text-gray-400">
                            <div className="flex items-center justify-center gap-1.5">
                              <ThumbsUp className="w-4 h-4" />
                              第2名
                            </div>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-gray-400 dark:text-gray-500">
                            第3名
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {votingData.map((row, idx) => (
                          <tr
                            key={row.judge}
                            className={cn(
                              "border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30",
                              idx % 2 === 0 && "bg-white/40 dark:bg-gray-900/20"
                            )}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {row.judge}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                                {row.first}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="secondary">{row.second}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="text-muted-foreground">
                                {row.third}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Separator />

                  {/* 得分汇总 */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                      <BarChart3Icon className="w-4 h-4 text-emerald-500" />
                      得分汇总
                    </h3>
                    <div className="space-y-3">
                      {scoreData.map((item) => {
                        const isWinner = item.rank === 1
                        return (
                          <div
                            key={item.name}
                            className={cn(
                              "relative p-4 rounded-xl border-2 transition-all duration-300",
                              isWinner
                                ? "bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-emerald-950/40 border-emerald-400 dark:border-emerald-600 shadow-lg shadow-emerald-500/15"
                                : "bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                            )}
                          >
                            {isWinner && (
                              <div className="absolute -top-3 left-4">
                                <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg px-3 py-1 text-xs">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  最终采用
                                </Badge>
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white",
                                    item.color === "blue" && "bg-gradient-to-br from-blue-500 to-sky-500",
                                    item.color === "purple" && "bg-gradient-to-br from-purple-500 to-violet-500",
                                    item.color === "cyan" && "bg-gradient-to-br from-cyan-500 to-teal-500"
                                  )}
                                >
                                  {item.rank}
                                </div>
                                <div>
                                  <div className={cn("font-semibold", isWinner ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300")}>
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    第{item.rank}名
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div
                                    className={cn(
                                      "text-2xl font-bold tabular-nums",
                                      isWinner
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                                        : "text-gray-600 dark:text-gray-400"
                                    )}
                                  >
                                    {item.score}分
                                  </div>
                                </div>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-3.5 h-3.5",
                                        i <= item.score
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-gray-300 dark:text-gray-600"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 确认按钮 */}
                  <div className="flex justify-center pt-2">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 gap-2 px-8"
                      onClick={handleConfirmPlan}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      确认采用此方案
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ============================================================ */}
        {/* 4. AI素材爬取记录                                              */}
        {/* ============================================================ */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-purple-500/10 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI素材爬取记录</CardTitle>
                  <CardDescription>AI自动爬取的相关论文与参考资料</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                <Bot className="w-3 h-3 mr-1" />
                已爬取 4 条
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crawlRecords.map((record, idx) => (
                <div
                  key={idx}
                  className="group p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-md transition-all duration-200 hover:border-purple-300/60 dark:hover:border-purple-700/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <Badge variant="secondary" className={cn("text-[10px]", sourceColorMap[record.source])}>
                          {record.source}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{record.time}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {record.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {record.summary}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
                      onClick={() => showToast(`正在打开: ${record.title}`, "info")}
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                className="gap-1.5 text-sm"
                onClick={() => showToast("正在加载更多素材...", "info")}
              >
                查看更多素材
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ============================================================ */}
        {/* 5. 思路迭代记录                                                */}
        {/* ============================================================ */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-purple-500/10 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-md">
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">思路迭代记录</CardTitle>
                <CardDescription>从初步想法到最终方案的完整演进过程</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* 时间线竖线 */}
              <div className="absolute left-[18px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-400 via-violet-400 to-indigo-400" />

              <div className="space-y-0">
                {iterationRecords.map((record, idx) => {
                  const isLast = idx === iterationRecords.length - 1
                  const authorInfo = authorTypeMap[record.authorType]
                  return (
                    <div key={record.version} className="relative flex gap-4 pb-6 last:pb-0">
                      {/* 时间线节点 */}
                      <div className="relative z-10 shrink-0">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md",
                            isLast
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 animate-pulse"
                              : "bg-gradient-to-br from-purple-500 to-indigo-500"
                          )}
                        >
                          {isLast ? (
                            <Clock className="w-4 h-4 text-white" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      {/* 内容卡片 */}
                      <div
                        className={cn(
                          "flex-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
                          isLast
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300/60 dark:border-amber-700/60"
                            : "bg-white/60 dark:bg-gray-800/60 border-gray-200/60 dark:border-gray-700/60 hover:border-purple-300/60 dark:hover:border-purple-700/60"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-xs font-mono bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                              )}
                            >
                              {record.version}
                            </Badge>
                            <Badge variant="secondary" className={cn("text-[10px]", authorInfo.className)}>
                              {record.author}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{record.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{record.content}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ============================================================ */}
        {/* 6. 快捷操作                                                    */}
        {/* ============================================================ */}
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl shadow-purple-500/10 overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">快捷操作</CardTitle>
                <CardDescription>常用功能快速入口</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/programmer" onClick={handleSendToProgrammer}>
                <div className="group p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 hover:shadow-lg hover:border-emerald-400/80 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                      发送方案给编程手
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    将最终确定的建模方案发送给编程手李四进行代码实现
                  </p>
                </div>
              </Link>

              <Link href="/knowledge">
                <div className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/60 dark:border-blue-800/60 hover:shadow-lg hover:border-blue-400/80 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                      查看知识库
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    浏览团队共享的知识库，查看历史模型和参考资料
                  </p>
                </div>
              </Link>

              <div onClick={handleExportReport} className="cursor-pointer">
                <div className="group p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200/60 dark:border-purple-800/60 hover:shadow-lg hover:border-purple-400/80 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-purple-700 dark:text-purple-400">
                      导出思路报告
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    生成包含三轮辩论结果和最终方案的完整思路报告
                  </p>
                </div>
              </div>

              <Link href="/workflow">
                <div className="group p-4 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg hover:border-gray-400/80 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                      <ArrowLeft className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-400">
                      返回工作流总览
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    返回协作工作流页面，查看建模手、编程手、论文手整体进度
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 底部间距 */}
        <div className="h-8" />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  辅助图标组件 (避免额外导入)                                          */
/* ------------------------------------------------------------------ */
function BarChart3Icon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}
