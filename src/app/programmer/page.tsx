"use client"

import { useState } from "react"
import {
  Code, Play, Bug, Bot, Lightbulb, Zap, Wrench, BarChart3,
  ChevronRight, CheckCircle2, Clock, Send, GitBranch,
  FolderOpen, FileCode, FileText, FileSpreadsheet, Image as ImageIcon,
  Terminal, ArrowRight, Sparkles, Download, TestTube,
  Eye, GitCompare, CircleCheck, Circle,
  Brain, PenTool, Workflow, LayoutDashboard
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

/* ============================================================
   编程手工作台 - Programmer Workspace
   渐变活力风: cyan/blue/green gradients, glassmorphism
   ============================================================ */

// 文件树数据
const fileTree = [
  { name: "2024MCM-C/", type: "folder" as const, depth: 0 },
  { name: "main.py", type: "file" as const, depth: 1, active: false },
  { name: "seir_model.py", type: "file" as const, depth: 1, active: false },
  { name: "data_processor.py", type: "file" as const, depth: 1, active: false },
  { name: "utils.py", type: "file" as const, depth: 1, active: false },
  { name: "data/", type: "folder" as const, depth: 1 },
  { name: "population.csv", type: "file" as const, depth: 2, fileType: "csv" },
  { name: "parameters.json", type: "file" as const, depth: 2, fileType: "json" },
  { name: "output/", type: "folder" as const, depth: 1 },
  { name: "results.csv", type: "file" as const, depth: 2, fileType: "csv" },
  { name: "chart.png", type: "file" as const, depth: 2, fileType: "image" },
]

// AI建议数据
const aiSuggestions = [
  {
    id: 1,
    icon: Lightbulb,
    iconColor: "text-yellow-400",
    category: "参数优化",
    text: "建议使用scipy.optimize进行参数拟合，可提高拟合精度15%",
  },
  {
    id: 2,
    icon: Zap,
    iconColor: "text-orange-400",
    category: "性能优化",
    text: "检测到性能瓶颈：循环可用numpy向量化替代",
  },
  {
    id: 3,
    icon: Wrench,
    iconColor: "text-blue-400",
    category: "代码质量",
    text: "建议添加数据验证模块，防止异常输入",
  },
  {
    id: 4,
    icon: BarChart3,
    iconColor: "text-green-400",
    category: "可视化",
    text: "可视化部分建议使用plotly替代matplotlib，支持交互",
  },
]

// 版本历史数据
const versionHistory = [
  { version: "V1.0", time: "01-15 10:00", desc: "初始SEIR模型", status: "pass" as const },
  { version: "V1.5", time: "01-15 12:00", desc: "添加CA空间模块", status: "pass" as const },
  { version: "V2.0", time: "01-15 15:00", desc: "参数拟合优化", status: "pass" as const },
  { version: "V2.5", time: "01-15 17:00", desc: "添加数据可视化", status: "pending" as const },
]

// 代码行数据 - 带语法高亮信息
const codeLines = [
  { text: '"""', cls: "text-gray-500" },
  { text: "SEIR-CA混合传染病传播模型", cls: "text-gray-500" },
  { text: "建模手: 张三 | 编程手: 李四 | 竞赛: 2024MCM-C", cls: "text-gray-500" },
  { text: '"""', cls: "text-gray-500" },
  { text: "", cls: "" },
  { text: "import numpy as np", cls: "" },
  { text: "import pandas as pd", cls: "" },
  { text: "from scipy.integrate import odeint", cls: "" },
  { text: "from scipy.optimize import minimize", cls: "" },
  { text: "import matplotlib.pyplot as plt", cls: "" },
  { text: "import json", cls: "" },
  { text: "", cls: "" },
  { text: "# ===================== 模型参数 =====================", cls: "text-gray-500" },
  { text: "class SEIRCA:", cls: "text-blue-400 font-semibold" },
  { text: '    """SEIR-CA混合模型核心类"""', cls: "text-gray-500" },
  { text: "", cls: "" },
  { text: "    def __init__(self, N, beta, sigma, gamma, grid_size):", cls: "" },
  { text: "        self.N = N              # 总人口数", cls: "text-gray-500" },
  { text: "        self.beta = beta        # 传播率", cls: "text-gray-500" },
  { text: "        self.sigma = sigma      # 潜伏转化率 (1/潜伏期)", cls: "text-gray-500" },
  { text: "        self.gamma = gamma      # 康复率 (1/感染期)", cls: "text-gray-500" },
  { text: "        self.grid = grid_size   # CA网格尺寸", cls: "text-gray-500" },
  { text: "        self.population = np.random.rand(grid_size, grid_size) * N", cls: "" },
  { text: "", cls: "" },
  { text: "    def seir_equations(self, y, t):", cls: "" },
  { text: "        # SEIR微分方程组", cls: "text-gray-500" },
  { text: "        S, E, I, R = y", cls: "" },
  { text: "        dS = -self.beta * S * I / self.N", cls: "" },
  { text: "        dE = self.beta * S * I / self.N - self.sigma * E", cls: "" },
  { text: "        dI = self.sigma * E - self.gamma * I", cls: "" },
  { text: "        dR = self.gamma * I", cls: "" },
  { text: "        return [dS, dE, dI, dR]", cls: "" },
  { text: "", cls: "" },
  { text: "    def ca_step(self, grid_state):", cls: "" },
  { text: "        # 元胞自动机空间传播步骤", cls: "text-gray-500" },
  { text: "        new_state = np.copy(grid_state)", cls: "" },
  { text: "        for i in range(self.grid):", cls: "" },
  { text: "            for j in range(self.grid):", cls: "" },
  { text: "                neighbors = self._get_neighbors(i, j, grid_state)", cls: "" },
  { text: "                coupling = np.sum(neighbors) * self.beta / 8", cls: "" },
  { text: "                new_state[i, j] += coupling * 0.1", cls: "" },
  { text: "        return new_state", cls: "" },
  { text: "", cls: "" },
  { text: "    def simulate(self, days=365):", cls: "" },
  { text: "        # 主模拟循环", cls: "text-gray-500" },
  { text: "        t = np.linspace(0, days, days)", cls: "" },
  { text: "        S0, E0, I0, R0 = self.N - 1, 0, 1, 0", cls: "" },
  { text: "        result = odeint(self.seir_equations, [S0, E0, I0, R0], t)", cls: "" },
  { text: "        return t, result.T", cls: "" },
  { text: "", cls: "" },
  { text: "# ===================== 主程序 =====================", cls: "text-gray-500" },
  { text: "if __name__ == '__main__':", cls: "text-blue-400 font-semibold" },
  { text: "    # 加载参数配置", cls: "text-gray-500" },
  { text: "    with open('data/parameters.json', 'r') as f:", cls: "" },
  { text: "        params = json.load(f)", cls: "" },
  { text: "", cls: "" },
  { text: "    model = SEIRCA(N=10000, beta=0.3, sigma=0.2, gamma=0.1, grid_size=50)", cls: "" },
  { text: "    t, (S, E, I, R) = model.simulate(days=365)", cls: "" },
  { text: "", cls: "" },
  { text: "    # 保存结果", cls: "text-gray-500" },
  { text: "    df = pd.DataFrame({'S': S, 'E': E, 'I': I, 'R': R}, index=t)", cls: "" },
  { text: "    df.to_csv('output/results.csv')", cls: "" },
  { text: "", cls: "" },
  { text: "    # 可视化", cls: "text-gray-500" },
  { text: "    plt.figure(figsize=(12, 6))", cls: "" },
  { text: "    plt.plot(t, S, label='易感者', color='#06b6d4')", cls: "" },
  { text: "    plt.plot(t, E, label='潜伏者', color='#f59e0b')", cls: "" },
  { text: "    plt.plot(t, I, label='感染者', color='#ef4444')", cls: "" },
  { text: "    plt.plot(t, R, label='康复者', color='#22c55e')", cls: "" },
  { text: "    plt.savefig('output/chart.png', dpi=300)", cls: "" },
  { text: "    print('[SUCCESS] 模拟完成!')", cls: "" },
]

// 终端输出行
const terminalLines = [
  { text: "[INFO] 开始运行SEIR-CA混合模型...", cls: "text-cyan-400" },
  { text: "[INFO] 加载人口数据: population.csv (10,000条记录)", cls: "text-gray-400" },
  { text: "[INFO] 初始化参数: \u03B2=0.3, \u03B3=0.1, \u03C3=0.2", cls: "text-gray-400" },
  { text: "[INFO] 开始模拟: 365天, 网格50\u00D750", cls: "text-gray-400" },
  { text: "[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100% 完成", cls: "text-green-400" },
  { text: "[INFO] 模拟完成，耗时: 12.3秒", cls: "text-gray-400" },
  { text: "[INFO] 结果已保存: output/results.csv", cls: "text-gray-400" },
  { text: "[INFO] 图表已生成: output/chart.png", cls: "text-gray-400" },
  { text: "[SUCCESS] 运行成功！R\u00B2=0.947, RMSE=0.032", cls: "text-emerald-400 font-semibold" },
]

// 文件图标映射
function getFileIcon(name: string, depth: number) {
  if (name.endsWith("/")) return <FolderOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
  if (name.endsWith(".py")) return <FileCode className="w-3.5 h-3.5 text-green-400 shrink-0" />
  if (name.endsWith(".csv")) return <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400 shrink-0" />
  if (name.endsWith(".json")) return <FileText className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
  if (name.endsWith(".png")) return <ImageIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
  return <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
}

export default function ProgrammerPage() {
  const { showToast } = useToast()
  const [activeFile, setActiveFile] = useState("main.py")
  const [aiStatus, setAiStatus] = useState(true)
  const [suggestions, setSuggestions] = useState(aiSuggestions)

  const handleApplySuggestion = (id: number) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
    showToast("建议已应用到代码中", "success")
  }

  const handleIgnoreSuggestion = (id: number) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
    showToast("已忽略此建议", "info")
  }

  const handleViewDiff = (version: string) => {
    showToast(`正在查看 ${version} 代码差异...`, "info")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-slate-950 dark:to-cyan-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-300/30 dark:bg-cyan-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-600/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl page-transition">
        {/* ==================== 1. 页面头部 ==================== */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/25 animate-pulse-glow">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  编程手工作台
                </h1>
                <p className="text-sm text-muted-foreground mt-1">代码实现 · 数据运算 · AI辅助编程</p>
              </div>
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md ml-2">
                李四 · 编程手
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <a href="/modeler">
                <Button variant="outline" size="sm" className="gap-1.5 border-cyan-200 hover:bg-cyan-50 dark:border-cyan-800 dark:hover:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400">
                  <Brain className="w-3.5 h-3.5" />
                  前往建模手工作台
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </a>
              <a href="/writer">
                <Button variant="outline" size="sm" className="gap-1.5 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                  <PenTool className="w-3.5 h-3.5" />
                  前往论文手工作台
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* ==================== 2. 当前任务卡片 ==================== */}
        <Card className="mb-6 glass-card-strong border-0 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">当前竞赛: 2024MCM-C</span>
                </div>
                <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30">
                  进行中
                </Badge>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">接收方案</span>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white text-[10px]">张</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold">SEIR-CA混合模型</span>
                  </div>
                  <span className="text-xs text-muted-foreground">来自建模手张三</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">当前进度</span>
                  <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">代码编写中</span>
                  <div className="mt-1">
                    <Progress value={45}>
                      <ProgressTrack className="h-2 bg-cyan-100 dark:bg-cyan-900/30">
                        <ProgressIndicator className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                      </ProgressTrack>
                    </Progress>
                    <span className="text-xs text-muted-foreground">45%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">AI辅助状态</span>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      aiStatus ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                    )} />
                    <span className={cn(
                      "text-sm font-semibold",
                      aiStatus ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500"
                    )}>
                      {aiStatus ? "已开启" : "已关闭"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    GPT-4
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">预计完成</span>
                  <span className="text-sm font-semibold">01-15 20:00</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>剩余约3小时</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ==================== 3. IDE工作区 (核心功能区) ==================== */}
        <Card className="mb-6 glass-card-strong border-0 shadow-2xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* IDE 顶部工具栏 */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b border-gray-700">
            {/* 文件标签 */}
            <div className="flex items-center gap-1">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              {["main.py", "seir_model.py", "data_processor.py", "utils.py"].map((file) => (
                <button
                  key={file}
                  onClick={() => setActiveFile(file)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-t-lg transition-all",
                    activeFile === file
                      ? "bg-gray-900 text-cyan-400 border-t-2 border-cyan-400 font-medium"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                  )}
                >
                  <FileCode className="w-3 h-3" />
                  {file}
                </button>
              ))}
            </div>
            {/* 操作按钮 */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-3 gap-1"
                onClick={() => showToast("正在运行代码...", "info")}
              >
                <Play className="w-3 h-3" />
                运行
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-yellow-400 hover:bg-gray-800 text-xs h-7 px-3 gap-1"
                onClick={() => showToast("调试模式已启动", "info")}
              >
                <Bug className="w-3 h-3" />
                调试
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "text-xs h-7 px-3 gap-1",
                  aiStatus
                    ? "text-cyan-400 bg-cyan-900/30 hover:bg-cyan-900/50"
                    : "text-gray-400 hover:text-cyan-400 hover:bg-gray-800"
                )}
                onClick={() => {
                  setAiStatus(!aiStatus)
                  showToast(aiStatus ? "AI辅助已关闭" : "AI辅助已开启 (GPT-4)", aiStatus ? "warning" : "success")
                }}
              >
                <Bot className="w-3 h-3" />
                AI助手
              </Button>
            </div>
          </div>

          {/* 状态栏 */}
          <div className="flex items-center justify-between px-4 py-1 bg-gray-800/80 border-b border-gray-700/50 text-[10px]">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="flex items-center gap-1">
                <div className={cn("w-1.5 h-1.5 rounded-full", aiStatus ? "bg-emerald-400" : "bg-gray-500")} />
                AI辅助: {aiStatus ? "开启" : "关闭"}
              </span>
              <span>|</span>
              <span>模型: GPT-4</span>
              <span>|</span>
              <span>Python 3.11</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <span>UTF-8</span>
              <span>|</span>
              <span>LF</span>
              <span>|</span>
              <span>行 {codeLines.length}, 列 1</span>
            </div>
          </div>

          {/* IDE 主体: 文件树 + 编辑器 + AI面板 */}
          <div className="flex min-h-[520px]">
            {/* 左侧文件树 */}
            <div className="w-56 bg-gray-900 text-gray-300 border-r border-gray-700/50 shrink-0 overflow-y-auto">
              <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 border-b border-gray-800">
                <FolderOpen className="w-3.5 h-3.5" />
                资源管理器
              </div>
              <div className="p-2">
                {fileTree.map((item, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 text-xs rounded cursor-pointer transition-colors",
                      item.type === "folder"
                        ? "text-gray-400 font-medium hover:bg-gray-800/70"
                        : item.name === activeFile
                          ? "bg-cyan-900/30 text-cyan-400"
                          : "text-gray-500 hover:bg-gray-800/70 hover:text-gray-300"
                    )}
                    style={{ paddingLeft: `${item.depth * 12 + 8}px` }}
                    onClick={() => item.type === "file" && setActiveFile(item.name)}
                  >
                    {getFileIcon(item.name, item.depth)}
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 中间代码编辑区 + 底部终端 */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* 代码编辑区 */}
              <div className="flex-1 bg-gray-950 overflow-auto">
                <div className="flex min-h-full">
                  {/* 行号 */}
                  <div className="py-4 px-3 text-right select-none border-r border-gray-800/50 shrink-0">
                    {codeLines.map((_, idx) => (
                      <div key={idx} className="text-xs leading-6 text-gray-600 font-mono">
                        {idx + 1}
                      </div>
                    ))}
                  </div>
                  {/* 代码内容 */}
                  <div className="py-4 px-4 flex-1 min-w-0">
                    {codeLines.map((line, idx) => (
                      <div key={idx} className="text-sm leading-6 font-mono whitespace-pre">
                        <span className={line.cls}>{line.text || " "}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 底部控制台/终端 */}
              <div className="border-t border-gray-700 bg-gray-950 shrink-0">
                <div className="flex items-center justify-between px-4 py-1.5 bg-gray-800/80 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[11px] text-gray-400 font-medium">终端输出</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] bg-emerald-900/50 text-emerald-400 border-emerald-700/50 h-4">
                    <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                    运行成功
                  </Badge>
                </div>
                <div className="p-3 font-mono text-xs space-y-0.5 max-h-[160px] overflow-y-auto">
                  <div className="text-cyan-400 mb-1">$ python main.py</div>
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className={line.cls}>
                      {line.text}
                    </div>
                  ))}
                  <div className="flex items-center gap-1 mt-2 text-gray-500">
                    <span className="text-cyan-400">$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧AI助手面板 */}
            <div className="w-72 bg-gradient-to-b from-gray-800 to-gray-900 border-l border-gray-700/50 shrink-0 overflow-y-auto">
              <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm px-4 py-3 border-b border-gray-700/50 z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">AI编程助手</span>
                  <Badge className="text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ml-auto">
                    GPT-4
                  </Badge>
                </div>
              </div>
              <div className="p-3 space-y-2.5">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => {
                    const IconComp = suggestion.icon
                    return (
                      <div
                        key={suggestion.id}
                        className="p-3 bg-gray-700/40 rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <IconComp className={cn("w-3.5 h-3.5 shrink-0", suggestion.iconColor)} />
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                            {suggestion.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
                          {suggestion.text}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            className="h-6 text-[10px] px-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                            onClick={() => handleApplySuggestion(suggestion.id)}
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                            应用
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 text-[10px] px-2.5 text-gray-400 hover:text-gray-200 hover:bg-gray-600/50"
                            onClick={() => handleIgnoreSuggestion(suggestion.id)}
                          >
                            忽略
                          </Button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">所有建议已处理</p>
                  </div>
                )}

                <Separator className="my-3 bg-gray-700/50" />

                {/* AI快捷操作 */}
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-xs text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 h-8"
                    onClick={() => showToast("AI正在分析代码质量...", "info")}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    代码审查
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-xs text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 h-8"
                    onClick={() => showToast("AI正在生成单元测试...", "info")}
                  >
                    <TestTube className="w-3.5 h-3.5" />
                    生成测试
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-xs text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 h-8"
                    onClick={() => showToast("AI正在优化代码性能...", "info")}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    性能优化
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ==================== 4. 代码版本管理 + 5. 运行结果分发 ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 代码版本管理 */}
          <Card className="glass-card border-0 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/20">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">代码版本管理</CardTitle>
                  <CardDescription>AI自动校验每次提交的代码质量</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versionHistory.map((v, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md",
                      v.status === "pass"
                        ? "bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-950/20 dark:to-cyan-950/20 border-emerald-200/50 dark:border-emerald-800/30"
                        : "bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200/50 dark:border-amber-800/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold",
                        v.status === "pass"
                          ? "bg-gradient-to-br from-emerald-500 to-cyan-500 text-white"
                          : "bg-gradient-to-br from-amber-500 to-yellow-500 text-white"
                      )}>
                        {v.version}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{v.desc}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {v.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {v.status === "pass" ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 text-xs gap-1">
                          <CircleCheck className="w-3 h-3" />
                          通过
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 text-xs gap-1">
                          <Circle className="w-3 h-3" />
                          进行中
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-gray-400 hover:text-cyan-600"
                        onClick={() => handleViewDiff(v.version)}
                      >
                        <GitCompare className="w-3 h-3 mr-1" />
                        查看差异
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 运行结果分发 */}
          <Card className="glass-card border-0 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg shadow-emerald-500/20">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">运行结果分发</CardTitle>
                  <CardDescription>结果预览与团队分发状态</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 结果指标 */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    0.947
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">R² (优秀)</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200/50 dark:border-blue-800/30 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    0.032
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">RMSE</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 rounded-xl border border-cyan-200/50 dark:border-cyan-800/30 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    12.3s
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">模拟耗时</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl border border-violet-200/50 dark:border-violet-800/30 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    10,000
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">数据点</div>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* 分发状态 */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">分发状态</div>
                <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">已发送给建模手</span>
                    <span className="text-xs text-muted-foreground">(数据评价)</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                    已完成
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">已发送给论文手</span>
                    <span className="text-xs text-muted-foreground">(论文参考)</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                    已完成
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">等待建模手反馈</span>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    等待中
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ==================== 6. 快捷操作 ==================== */}
        <Card className="glass-card border-0 shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-semibold">快捷操作</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/modeler">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20 gap-2"
                  onClick={() => showToast("结果已发送给建模手", "success")}
                >
                  <Send className="w-4 h-4" />
                  发送结果给建模手
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
              <a href="/writer">
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/20 gap-2"
                  onClick={() => showToast("代码已发送给论文手", "success")}
                >
                  <Send className="w-4 h-4" />
                  发送代码给论文手
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
              <Button
                variant="outline"
                className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-400 gap-2"
                onClick={() => showToast("正在运行测试...", "info")}
              >
                <TestTube className="w-4 h-4" />
                运行测试
              </Button>
              <Button
                variant="outline"
                className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950/30 text-violet-700 dark:text-violet-400 gap-2"
                onClick={() => showToast("代码已导出", "success")}
              >
                <Download className="w-4 h-4" />
                导出代码
              </Button>
              <a href="/workflow">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground gap-2"
                >
                  <Workflow className="w-4 h-4" />
                  返回工作流总览
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
