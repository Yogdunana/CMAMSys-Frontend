"use client"

import { useState, useEffect, useRef } from "react"
import {
  Users, Sparkles, MessageSquare, Bot, Shield, Check,
  Copy, Send, ChevronLeft, ChevronRight, ArrowRight,
  UserPlus, Link2, Brain, Code, PenTool, BarChart3,
  Loader2, PartyPopper
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  步骤定义                                                            */
/* ------------------------------------------------------------------ */
const STEPS = [
  { id: 1, title: "创建团队", desc: "填写团队基本信息" },
  { id: 2, title: "邀请成员", desc: "邀请队友加入团队" },
  { id: 3, title: "团队讨论", desc: "讨论分工与策略" },
  { id: 4, title: "AI 智能分析", desc: "AI推荐最佳角色分配" },
  { id: 5, title: "确认角色", desc: "确认各成员角色" },
  { id: 6, title: "进入工作流", desc: "开始协作工作" },
]

/* ------------------------------------------------------------------ */
/*  预填数据                                                            */
/* ------------------------------------------------------------------ */
const MOCK_MEMBERS = [
  { name: "李四", role: "编程手", avatar: "李", color: "from-fuchsia-500 to-fuchsia-600", ring: "ring-fuchsia-500" },
  { name: "王五", role: "论文手", avatar: "王", color: "from-pink-500 to-pink-600", ring: "ring-pink-500" },
  { name: "赵六", role: "数据分析师", avatar: "赵", color: "from-blue-500 to-blue-600", ring: "ring-blue-500" },
]

const MOCK_CHAT = [
  { sender: "张三", avatar: "张", color: "from-violet-500 to-violet-600", ring: "ring-violet-500", text: "大家好，我们这次选MCM-C题，关于气候对渔业的影响", isAI: false },
  { sender: "李四", avatar: "李", color: "from-fuchsia-500 to-fuchsia-600", ring: "ring-fuchsia-500", text: "我可以负责编程实现，Python和MATLAB都行", isAI: false },
  { sender: "王五", avatar: "王", color: "from-pink-500 to-pink-600", ring: "ring-pink-500", text: "我来写论文，之前有经验", isAI: false },
  { sender: "赵六", avatar: "赵", color: "from-blue-500 to-blue-600", ring: "ring-blue-500", text: "数据清洗和预处理交给我", isAI: false },
  { sender: "AI助手", avatar: "AI", color: "from-emerald-500 to-teal-500", ring: "ring-emerald-500", text: "建议团队分工：张三-建模手、李四-编程手、王五-论文手", isAI: true },
  { sender: "张三", avatar: "张", color: "from-violet-500 to-violet-600", ring: "ring-violet-500", text: "同意AI的建议，大家觉得呢？", isAI: false },
  { sender: "李四", avatar: "李", color: "from-fuchsia-500 to-fuchsia-600", ring: "ring-fuchsia-500", text: "没问题，我擅长SEIR模型和优化算法", isAI: false },
  { sender: "王五", avatar: "王", color: "from-pink-500 to-pink-600", ring: "ring-pink-500", text: "好的，我先看看往年的优秀论文", isAI: false },
  { sender: "赵六", avatar: "赵", color: "from-blue-500 to-blue-600", ring: "ring-blue-500", text: "我去找一些渔业相关的数据集", isAI: false },
  { sender: "AI助手", avatar: "AI", color: "from-emerald-500 to-teal-500", ring: "ring-emerald-500", text: "已为团队推荐3篇相关参考文献，可在知识库中查看", isAI: true },
]

const AI_RECOMMENDATIONS = [
  { role: "建模手", name: "张三", confidence: 95, color: "from-violet-500 to-fuchsia-500", textColor: "text-violet-600", avatar: "张", avatarColor: "from-violet-500 to-violet-600", ring: "ring-violet-500" },
  { role: "编程手", name: "李四", confidence: 92, color: "from-fuchsia-500 to-pink-500", textColor: "text-fuchsia-600", avatar: "李", avatarColor: "from-fuchsia-500 to-fuchsia-600", ring: "ring-fuchsia-500" },
  { role: "论文手", name: "王五", confidence: 88, color: "from-pink-500 to-rose-500", textColor: "text-pink-600", avatar: "王", avatarColor: "from-pink-500 to-pink-600", ring: "ring-pink-500" },
  { role: "数据分析师", name: "赵六", confidence: 85, color: "from-blue-500 to-cyan-500", textColor: "text-blue-600", avatar: "赵", avatarColor: "from-blue-500 to-blue-600", ring: "ring-blue-500" },
]

/* ------------------------------------------------------------------ */
/*  页面组件                                                            */
/* ------------------------------------------------------------------ */
export default function TeamPage() {
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  // Step 1 state
  const [teamName, setTeamName] = useState("")
  const [competition, setCompetition] = useState("")
  const [teamDesc, setTeamDesc] = useState("")

  // Step 2 state
  const [inviteCode] = useState(() => String(Math.floor(100000 + Math.random() * 900000)))
  const [copied, setCopied] = useState(false)

  // Step 3 state
  const [chatInput, setChatInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Step 4 state
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)

  // Step 5 state
  const [confirmedRoles, setConfirmedRoles] = useState<Record<string, boolean>>({})

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const goToStep = (step: number) => {
    if (step === currentStep || animating) return
    setDirection(step > currentStep ? "forward" : "backward")
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(step)
      setAnimating(false)
    }, 200)
  }

  const handleNext = () => {
    if (currentStep < 6) goToStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) goToStep(currentStep - 1)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode).then(() => {
      setCopied(true)
      showToast("邀请码已复制到剪贴板！", "success")
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      showToast("邀请码: " + inviteCode, "info")
    })
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    showToast("消息已发送", "success")
    setChatInput("")
  }

  const handleStartAnalysis = () => {
    setAnalyzing(true)
    setAnalysisDone(false)
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisDone(true)
      showToast("AI分析完成，已生成推荐方案", "success")
    }, 3000)
  }

  const handleConfirmRole = (role: string) => {
    setConfirmedRoles(prev => ({ ...prev, [role]: true }))
    showToast(`已确认 ${role} 角色`, "success")
  }

  const allConfirmed = AI_RECOMMENDATIONS.every(r => confirmedRoles[r.role])

  /* ---------------------------------------------------------------- */
  /*  Stepper 顶部步骤条                                                 */
  /* ---------------------------------------------------------------- */
  const renderStepper = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {STEPS.map((step, idx) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const isFuture = currentStep < step.id

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* 步骤圆圈 */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-md",
                    isCompleted && "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-900",
                    isCurrent && "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white ring-4 ring-violet-200 dark:ring-violet-800 animate-pulse",
                    isFuture && "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={cn(
                  "mt-2 text-xs font-semibold text-center max-w-[72px]",
                  isCompleted && "text-emerald-600 dark:text-emerald-400",
                  isCurrent && "text-violet-600 dark:text-violet-400",
                  isFuture && "text-muted-foreground"
                )}>
                  {step.title}
                </span>
                <span className="text-[10px] text-muted-foreground text-center max-w-[72px]">
                  {step.desc}
                </span>
              </div>
              {/* 连接线 */}
              {idx < STEPS.length - 1 && (
                <div className="flex-1 mx-2 mt-[-24px]">
                  <div className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    currentStep > step.id
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  )} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤1: 创建团队                                                    */
  /* ---------------------------------------------------------------- */
  const renderStep1 = () => (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">创建团队</CardTitle>
            <CardDescription>填写团队基本信息，开始组建你的数模战队</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">团队名称</label>
          <Input
            placeholder="输入团队名称，例如：数模之星队"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">选择竞赛</label>
          <Select value={competition} onValueChange={(value) => setCompetition(value ?? "")}>
            <SelectTrigger className="w-full min-w-[200px]">
              <SelectValue placeholder="选择竞赛类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mcm">MCM (美国大学生数学建模竞赛)</SelectItem>
              <SelectItem value="icm">ICM (交叉学科建模竞赛)</SelectItem>
              <SelectItem value="cumcm">CUMCM (全国大学生数学建模竞赛)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">团队描述</label>
          <Textarea
            placeholder="简单描述团队目标和期望..."
            value={teamDesc}
            onChange={e => setTeamDesc(e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤2: 邀请成员                                                    */
  /* ---------------------------------------------------------------- */
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* 邀请码卡片 */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl shadow-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">邀请成员</CardTitle>
              <CardDescription>通过邀请码或链接邀请队友加入团队</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 邀请码 */}
          <div className="p-5 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 rounded-xl border border-violet-200/60 dark:border-violet-800/60">
            <div className="text-sm font-medium text-muted-foreground mb-3">邀请码</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center py-3 bg-white dark:bg-gray-800 rounded-lg border border-violet-200 dark:border-violet-700">
                <span className="text-3xl font-bold font-mono tracking-[0.3em] bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {inviteCode}
                </span>
              </div>
              <Button variant="outline" size="lg" onClick={handleCopyCode} className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">分享此6位数字邀请码给队友</p>
          </div>

          {/* 邀请链接 */}
          <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
            <div className="text-sm font-medium text-muted-foreground mb-2">邀请链接</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground truncate font-mono">
                  https://cmamsys.app/invite/{inviteCode}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast("邀请链接已复制！", "success")}
              >
                <Copy className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 已邀请成员列表 */}
      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">已邀请成员</CardTitle>
              <CardDescription>已加入团队的成员</CardDescription>
            </div>
            <Badge variant="secondary">{MOCK_MEMBERS.length} 人</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <Avatar className={cn("w-10 h-10 ring-2", member.ring)}>
                    <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold", member.color)}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <Badge variant="secondary" className="text-xs mt-0.5">
                      {member.role}
                    </Badge>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  已加入
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤3: 团队讨论                                                    */
  /* ---------------------------------------------------------------- */
  const renderStep3 = () => (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">团队讨论</CardTitle>
            <CardDescription>讨论分工策略，确定团队协作方案</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 聊天区域 */}
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 mb-4">
          {MOCK_CHAT.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-3", msg.isAI && "flex-row-reverse")}>
              <Avatar className={cn("w-9 h-9 ring-2 shrink-0", msg.ring)}>
                <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold text-xs", msg.color)}>
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "max-w-[70%] p-3 rounded-xl text-sm leading-relaxed",
                msg.isAI
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/60 dark:border-emerald-800/60"
                  : "bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60"
              )}>
                <div className={cn(
                  "text-xs font-semibold mb-1",
                  msg.isAI ? "text-emerald-600 dark:text-emerald-400" : "text-gray-600 dark:text-gray-400"
                )}>
                  {msg.sender}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* 输入框 */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
          <Input
            placeholder="输入消息..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSendChat()}
            className="flex-1"
          />
          <Button
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
            onClick={handleSendChat}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤4: AI 智能分析                                                 */
  /* ---------------------------------------------------------------- */
  const renderStep4 = () => (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">AI 智能分析</CardTitle>
            <CardDescription>基于讨论内容，AI推荐最佳角色分配方案</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!analysisDone && !analyzing && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl flex items-center justify-center">
              <Bot className="w-10 h-10 text-emerald-500" />
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              准备好进行AI智能分析
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              AI将分析团队讨论内容，为每位成员推荐最合适的角色
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 gap-2 px-8"
              onClick={handleStartAnalysis}
            >
              <Sparkles className="w-4 h-4" />
              开始分析
            </Button>
          </div>
        )}

        {analyzing && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              AI 正在分析中...
            </p>
            <p className="text-sm text-muted-foreground">
              正在分析团队讨论内容，评估每位成员的能力匹配度
            </p>
            <div className="mt-6 max-w-xs mx-auto">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          </div>
        )}

        {analysisDone && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 mb-4">
              <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                分析完成！基于团队讨论内容，AI推荐以下角色分配方案：
              </p>
            </div>
            {AI_RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.role}
                className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/60 dark:border-gray-700/60 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <Avatar className={cn("w-10 h-10 ring-2", rec.ring)}>
                    <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold", rec.avatarColor)}>
                      {rec.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{rec.name}</div>
                    <div className="text-sm text-muted-foreground">{rec.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={cn("text-sm font-semibold", rec.textColor)}>
                      置信度 {rec.confidence}%
                    </div>
                    <div className="w-28 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                      <div
                        className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-1000", rec.color)}
                        style={{ width: `${rec.confidence}%` }}
                      />
                    </div>
                  </div>
                  {/* 简易雷达图 - 用多个进度条模拟 */}
                  <div className="hidden md:flex items-end gap-0.5 h-8">
                    {[85, 92, 78, 95, 88, 70].map((v, i) => (
                      <div
                        key={i}
                        className={cn("w-1.5 rounded-full bg-gradient-to-t transition-all duration-700", rec.color)}
                        style={{ height: `${v * 0.08}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤5: 确认角色                                                    */
  /* ---------------------------------------------------------------- */
  const renderStep5 = () => (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">确认角色分配</CardTitle>
            <CardDescription>确认或调整AI推荐的角色分配方案</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {AI_RECOMMENDATIONS.map((rec) => {
            const isConfirmed = confirmedRoles[rec.role]
            return (
              <div
                key={rec.role}
                className={cn(
                  "flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-300",
                  isConfirmed
                    ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-400 dark:border-emerald-600 shadow-lg shadow-emerald-500/10"
                    : "bg-white/60 dark:bg-gray-800/60 border-gray-200/60 dark:border-gray-700/60"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    isConfirmed
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg"
                      : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
                  )}>
                    {isConfirmed ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Avatar className={cn("w-10 h-10 ring-2", rec.ring)}>
                        <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold", rec.avatarColor)}>
                          {rec.avatar}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{rec.name}</span>
                      {isConfirmed && (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          已确认
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{rec.role} - 置信度 {rec.confidence}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!isConfirmed && (
                    <>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                        onClick={() => handleConfirmRole(rec.role)}
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        确认
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => showToast("已进入调整模式", "info")}
                      >
                        调整
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /*  步骤6: 进入工作流                                                  */
  /* ---------------------------------------------------------------- */
  const renderStep6 = () => (
    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardContent className="pt-8 pb-8">
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <PartyPopper className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">团队组建完成！</h2>
          <p className="text-muted-foreground mb-8">所有角色已确认，可以开始协作工作了</p>

          {/* 团队信息摘要 */}
          <div className="max-w-lg mx-auto space-y-3 mb-8">
            <div className="p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 rounded-xl border border-violet-200/60 dark:border-violet-800/60">
              <div className="text-sm font-medium text-violet-700 dark:text-violet-400 mb-2">团队信息</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-left text-muted-foreground">团队名称</div>
                <div className="text-right font-medium">{teamName || "数模之星队"}</div>
                <div className="text-left text-muted-foreground">竞赛类型</div>
                <div className="text-right font-medium">
                  {competition === "mcm" ? "MCM" : competition === "icm" ? "ICM" : competition === "cumcm" ? "CUMCM" : "MCM"}
                </div>
                <div className="text-left text-muted-foreground">团队人数</div>
                <div className="text-right font-medium">4 人</div>
              </div>
            </div>

            <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">角色分配</div>
              <div className="grid grid-cols-2 gap-2">
                {AI_RECOMMENDATIONS.map((rec) => (
                  <div key={rec.role} className="flex items-center gap-2 text-sm">
                    <div className={cn("w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold", rec.avatarColor)}>
                      {rec.avatar}
                    </div>
                    <span className="text-muted-foreground">{rec.role}</span>
                    <span className="font-medium">{rec.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="/workflow">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg shadow-violet-500/25 gap-2 px-10"
            >
              <ArrowRight className="w-4 h-4" />
              进入协作工作流
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /*  底部导航按钮                                                        */
  /* ---------------------------------------------------------------- */
  const renderNavigation = () => (
    <div className="flex items-center justify-between mt-8">
      {currentStep > 1 ? (
        <Button variant="outline" onClick={handlePrev} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          上一步
        </Button>
      ) : (
        <div />
      )}
      {currentStep < 6 ? (
        <Button
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 gap-2"
          onClick={handleNext}
        >
          下一步
          <ChevronRight className="w-4 h-4" />
        </Button>
      ) : null}
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  主渲染                                                             */
  /* ---------------------------------------------------------------- */
  const stepRenderers: Record<number, () => React.ReactNode> = {
    1: renderStep1,
    2: renderStep2,
    3: renderStep3,
    4: renderStep4,
    5: renderStep5,
    6: renderStep6,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-300/30 dark:bg-fuchsia-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                团队组建
              </h1>
              <p className="text-sm text-muted-foreground">智能角色分配，AI辅助推荐最佳团队配置</p>
            </div>
          </div>
        </div>

        {/* 步骤条 */}
        {renderStepper()}

        {/* 步骤内容 - 带过渡动画 */}
        <div
          className={cn(
            "transition-all duration-300",
            animating && direction === "forward" && "opacity-0 translate-x-4",
            animating && direction === "backward" && "opacity-0 -translate-x-4",
            !animating && "opacity-100 translate-x-0"
          )}
        >
          {stepRenderers[currentStep]?.()}
        </div>

        {/* 底部导航 */}
        {renderNavigation()}
      </div>
    </div>
  )
}
