"use client"

import { useState } from "react"
import {
  Brain, Code, PenTool, Bot, MessageSquare, Lightbulb,
  Trophy, ChevronRight, Star, FileCode, FileText, BarChart3,
  Image, Terminal, FolderOpen, Settings, Play, Check,
  ArrowUpRight, Sparkles, BookOpen, Quote, Send
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/toast"

export default function WorkflowPage() {
  const [activeTab, setActiveTab] = useState("modeler")
  const { showToast } = useToast()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-950 dark:to-indigo-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                协作工作流
              </h1>
              <p className="text-sm text-muted-foreground">AI驱动的三轮辩论、IDE协作与论文整合</p>
            </div>
          </div>
        </div>

        {/* 主标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-1 h-auto">
            <TabsTrigger
              value="modeler"
              className="flex items-center gap-2 px-4 py-2.5 data-active:bg-gradient-to-r data-active:from-blue-500 data-active:to-indigo-500 data-active:text-white rounded-lg"
            >
              <Brain className="w-4 h-4" />
              建模手 - 三轮AI辩论
            </TabsTrigger>
            <TabsTrigger
              value="coder"
              className="flex items-center gap-2 px-4 py-2.5 data-active:bg-gradient-to-r data-active:from-emerald-500 data-active:to-teal-500 data-active:text-white rounded-lg"
            >
              <Code className="w-4 h-4" />
              编程手 - IDE协作
            </TabsTrigger>
            <TabsTrigger
              value="writer"
              className="flex items-center gap-2 px-4 py-2.5 data-active:bg-gradient-to-r data-active:from-amber-500 data-active:to-orange-500 data-active:text-white rounded-lg"
            >
              <PenTool className="w-4 h-4" />
              论文手 - 整合输出
            </TabsTrigger>
          </TabsList>

          {/* ==================== Tab 1: 建模手 - 三轮AI辩论 ==================== */}
          <TabsContent value="modeler">
            <div className="space-y-6">
              {/* 时间线指示器 */}
              <div className="flex items-center justify-center gap-0 mb-8">
                {/* 第一轮 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-100 dark:ring-blue-900">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-blue-600">第一轮</span>
                  <span className="text-xs text-muted-foreground">独立思考</span>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-2" />
                {/* 第二轮 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-indigo-100 dark:ring-indigo-900">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-indigo-600">第二轮</span>
                  <span className="text-xs text-muted-foreground">人机融合</span>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full mx-2" />
                {/* 第三轮 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-violet-100 dark:ring-violet-900">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-violet-600">第三轮</span>
                  <span className="text-xs text-muted-foreground">同伴互评</span>
                </div>
              </div>

              {/* 第一轮: 独立思考 */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">第一轮: 独立思考</CardTitle>
                      <CardDescription>三个AI模型分别独立提出解决方案</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* GPT-4 */}
                    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 ring-2 ring-emerald-500">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-xs">
                              G4
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-emerald-700 dark:text-emerald-400">GPT-4</div>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 text-xs">
                              独立方案
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          建议使用SEIR模型进行传染病建模。该模型将人群分为易感者(S)、潜伏者(E)、感染者(I)和康复者(R)四个仓室，通过微分方程组描述各仓室之间的转化关系。参数可通过最小二乘法拟合真实数据获得。
                        </p>
                      </CardContent>
                    </Card>

                    {/* Claude */}
                    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 border border-orange-200 dark:border-orange-800">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 ring-2 ring-orange-500">
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-xs">
                              CL
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-orange-700 dark:text-orange-400">Claude</div>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                              独立方案
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          推荐采用元胞自动机方法。将研究区域划分为网格，每个元胞代表一个地理单元，根据邻居状态和传播规则模拟疫情扩散。此方法能更好地捕捉空间异质性，适合分析区域传播差异。
                        </p>
                      </CardContent>
                    </Card>

                    {/* DeepSeek */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 ring-2 ring-blue-500">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-xs">
                              DS
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-blue-700 dark:text-blue-400">DeepSeek</div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                              独立方案
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          提出基于图神经网络的方法。构建人口流动图，利用GNN学习节点间的传播模式。结合时空注意力机制，可以同时捕捉时间演化和空间传播特征，适合大规模数据场景。
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* 第二轮: 人机融合 */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">第二轮: 人机融合</CardTitle>
                      <CardDescription>建模手思路与AI方案融合，产生优化方案</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* 建模手思路 */}
                    <Card className="bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-950/50 dark:to-indigo-950/50 border border-violet-200 dark:border-violet-800">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 ring-2 ring-violet-500">
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-violet-600 text-white font-bold">
                              张
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-violet-700 dark:text-violet-400">建模手思路</div>
                            <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 text-xs">
                              张三
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          结合SEIR和元胞自动机的混合方法。以SEIR模型为基础框架描述传播动力学，同时引入元胞自动机的空间离散化思想，将区域划分为子区域，每个子区域独立运行SEIR模型并通过邻域耦合实现空间传播。这样既保留了微分方程的数学严谨性，又增加了空间维度的表达能力。
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* GPT-4结合版 */}
                      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-8 h-8 ring-2 ring-emerald-500">
                              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-[10px]">
                                G4
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">GPT-4结合版</div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            融合建模手思路，优化SEIR参数。在混合框架下，采用自适应步长的四阶Runge-Kutta方法求解各子区域微分方程组，并通过加权平均实现邻域耦合。引入贝叶斯推断进行参数估计，提高模型拟合精度。
                          </p>
                        </CardContent>
                      </Card>

                      {/* Claude结合版 */}
                      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 border border-orange-200 dark:border-orange-800">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-8 h-8 ring-2 ring-orange-500">
                              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-[10px]">
                                CL
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-semibold text-orange-700 dark:text-orange-400 text-sm">Claude结合版</div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            在建模手基础上增加空间维度。引入莫尔邻域定义(8个邻居)，每个子区域根据人口流动矩阵计算耦合强度。加入随机扰动项模拟不确定性，并使用蒙特卡洛模拟评估政策干预效果。
                          </p>
                        </CardContent>
                      </Card>

                      {/* DeepSeek结合版 */}
                      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="w-8 h-8 ring-2 ring-blue-500">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-[10px]">
                                DS
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-semibold text-blue-700 dark:text-blue-400 text-sm">DeepSeek结合版</div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            在混合框架中嵌入轻量级GNN模块。用图卷积层替代简单的加权平均耦合，自动学习最优的空间传播模式。结合Transformer编码时间序列，实现端到端的时空预测。
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 第三轮: 同伴互评 */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">第三轮: 同伴互评</CardTitle>
                      <CardDescription>AI模型互相评分投票，选出最优方案</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* GPT-4结合版 - 获胜 */}
                    <div className="relative p-5 bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-emerald-950/60 rounded-2xl border-2 border-emerald-400 dark:border-emerald-600 shadow-xl shadow-emerald-500/20">
                      <div className="absolute -top-3 left-4">
                        <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg px-3 py-1">
                          <Trophy className="w-3 h-3 mr-1" />
                          最终胜出
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-emerald-500">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-xs">
                              G4
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-emerald-700 dark:text-emerald-400">GPT-4结合版</div>
                            <div className="text-sm text-muted-foreground">第1名</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">8分</div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+3分</div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5,6,7,8].map(i => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Claude结合版 */}
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/40 rounded-xl border border-orange-200 dark:border-orange-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-orange-500">
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold text-xs">
                              CL
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-orange-700 dark:text-orange-400">Claude结合版</div>
                            <div className="text-sm text-muted-foreground">第2名</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">6分</div>
                            <div className="text-xs text-orange-500 font-medium">+2分</div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5,6].map(i => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                            {[7,8].map(i => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DeepSeek结合版 */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-blue-500">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-xs">
                              DS
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-blue-700 dark:text-blue-400">DeepSeek结合版</div>
                            <div className="text-sm text-muted-foreground">第3名</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">4分</div>
                            <div className="text-xs text-blue-500 font-medium">+0分</div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1,2,3,4].map(i => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                            {[5,6,7,8].map(i => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==================== Tab 2: 编程手 - IDE协作 ==================== */}
          <TabsContent value="coder">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
              {/* IDE 顶部工具栏 */}
              <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-gray-300 ml-2">SEIR模型 - CMAMSys IDE</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI辅助: 开启</span>
                  <span className="mx-1">|</span>
                  <span>模型: GPT-4</span>
                </div>
              </div>

              <div className="flex">
                {/* 文件树 */}
                <div className="w-56 bg-slate-900 text-gray-300 border-r border-slate-700 p-3 shrink-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase mb-3">
                    <FolderOpen className="w-4 h-4" />
                    项目结构
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-800 text-emerald-400">
                      <FileCode className="w-4 h-4" />
                      <span>seir_model.py</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-800 text-gray-400 cursor-pointer">
                      <FileCode className="w-4 h-4" />
                      <span>data_loader.py</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-800 text-gray-400 cursor-pointer">
                      <FileCode className="w-4 h-4" />
                      <span>visualization.py</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-800 text-gray-400 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      <span>requirements.txt</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-800 text-gray-400 cursor-pointer">
                      <FileText className="w-4 h-4" />
                      <span>README.md</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 px-2 py-1.5 text-gray-500">
                      <FolderOpen className="w-4 h-4" />
                      <span>data/</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-500 pl-6">
                      <FileText className="w-4 h-4" />
                      <span>epidemic_data.csv</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-gray-500 pl-6">
                      <FileText className="w-4 h-4" />
                      <span>population.csv</span>
                    </div>
                  </div>
                </div>

                {/* 代码编辑区 */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-850 border-b border-slate-700 bg-slate-800/50">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-gray-300">seir_model.py</span>
                  </div>
                  <div className="flex-1 bg-slate-900 p-4 overflow-auto font-mono text-sm leading-6">
                    <pre className="text-gray-300">
                      <code>
{`import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# SEIR模型参数定义
# N: 总人口, beta: 传播率, sigma: 潜伏转化率, gamma: 康复率
N = 1000000
beta = 0.3       # 日传播率
sigma = 1/5      # 潜伏期5天
gamma = 1/14     # 感染期14天

# SEIR微分方程组
def seir_model(y, t, N, beta, sigma, gamma):
    S, E, I, R = y
    dS = -beta * S * I / N
    dE = beta * S * I / N - sigma * E
    dI = sigma * E - gamma * I
    dR = gamma * I
    return [dS, dE, dI, dR]

# 初始条件: 1个感染者, 其余为易感者
S0, E0, I0, R0 = N-1, 0, 1, 0
y0 = [S0, E0, I0, R0]

# 时间跨度: 180天
t = np.linspace(0, 180, 180)

# 求解微分方程
result = odeint(seir_model, y0, t, args=(N, beta, sigma, gamma))
S, E, I, R = result.T

# 绘制结果曲线
plt.figure(figsize=(12, 6))
plt.plot(t, S, label='易感者(S)', color='#3B82F6')
plt.plot(t, E, label='潜伏者(E)', color='#F59E0B')
plt.plot(t, I, label='感染者(I)', color='#EF4444')
plt.plot(t, R, label='康复者(R)', color='#10B981')
plt.xlabel('天数')
plt.ylabel('人数')
plt.title('SEIR传染病模型模拟结果')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('seir_result.png', dpi=300)
plt.show()`}
                      </code>
                    </pre>
                  </div>

                  {/* 控制台输出 */}
                  <div className="border-t border-slate-700 bg-slate-950">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-800/80 border-b border-slate-700">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">控制台输出</span>
                    </div>
                    <div className="p-4 font-mono text-xs text-gray-400 space-y-1">
                      <div className="text-emerald-400">$ python seir_model.py</div>
                      <div className="text-gray-500">[INFO] SEIR模型参数: N=1000000, beta=0.3, sigma=0.2, gamma=0.071</div>
                      <div className="text-gray-500">[INFO] 开始求解微分方程组...</div>
                      <div className="text-gray-500">[INFO] 求解完成，共180个时间步</div>
                      <div className="text-gray-500">[INFO] 峰值感染人数: 285,432 (第45天)</div>
                      <div className="text-gray-500">[INFO] 基本再生数 R0 = 4.20</div>
                      <div className="text-emerald-400">[SUCCESS] 结果图表已保存至 seir_result.png</div>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-emerald-400">$</span>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI助手面板 */}
                <div className="w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-l border-slate-700 p-4 shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">AI编程助手</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="text-xs text-emerald-400 font-medium mb-1">代码优化建议</div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        建议在第15行添加参数边界检查，确保beta、sigma、gamma的值在合理范围内，避免数值溢出。
                      </p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="text-xs text-blue-400 font-medium mb-1">性能优化</div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        可以使用numba.jit加速odeint的求解过程，预计可提升3-5倍计算速度。
                      </p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="text-xs text-amber-400 font-medium mb-1">模型改进</div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        考虑添加死亡率仓室(SEIRD)或疫苗接种模块，使模型更贴合实际场景。
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg border border-emerald-700/50">
                      <div className="text-xs text-emerald-400 font-medium mb-1">自动补全</div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        检测到你可能需要添加敏感性分析代码，是否自动生成？
                      </p>
                      <Button size="sm" className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-xs h-7" onClick={() => showToast("敏感性分析代码已生成并插入编辑器！", "success")}>
                        <Sparkles className="w-3 h-3 mr-1" />
                        自动生成
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* ==================== Tab 3: 论文手 - 整合输出 ==================== */}
          <TabsContent value="writer">
            <div className="flex gap-4">
              {/* 论文大纲 */}
              <Card className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl shrink-0 self-start">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <CardTitle className="text-sm">论文结构</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    {[
                      { num: 1, title: "摘要", active: false },
                      { num: 2, title: "问题重述", active: false },
                      { num: 3, title: "模型假设", active: false },
                      { num: 4, title: "符号说明", active: false },
                      { num: 5, title: "模型建立", active: true },
                      { num: 6, title: "模型求解", active: false },
                      { num: 7, title: "结果分析", active: false },
                      { num: 8, title: "模型评价", active: false },
                      { num: 9, title: "参考文献", active: false },
                    ].map(item => (
                      <div
                        key={item.num}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                          item.active
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                            : "hover:bg-amber-50 dark:hover:bg-amber-950/30 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        <span className={`font-mono text-xs ${item.active ? "text-white/80" : "text-muted-foreground"}`}>
                          {item.num}.
                        </span>
                        <span className="font-medium">{item.title}</span>
                        {item.active && <Check className="w-3 h-3 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 主编辑区 */}
              <Card className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-amber-500" />
                      <CardTitle className="text-sm">论文编辑</CardTitle>
                      <Badge variant="secondary" className="text-xs">第五章: 模型建立</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-xs" onClick={() => showToast("AI润色完成，已优化3处表达", "success")}>
                        <Bot className="w-3 h-3 mr-1" />
                        AI润色
                      </Button>
                      <Button size="sm" variant="ghost" className="text-xs" onClick={() => showToast("论文已保存", "success")}>
                        保存
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 font-serif text-sm leading-7 text-gray-800 dark:text-gray-200 min-h-[500px]">
                    <h3 className="text-lg font-bold mb-4 text-center">五、模型建立</h3>

                    <h4 className="font-bold mb-2">5.1 模型概述</h4>
                    <p className="mb-4 indent-8">
                      {"本文建立了一种基于SEIR框架与元胞自动机相结合的混合传染病传播模型。该模型将研究区域划分为 N x M 个子区域网格，每个子区域内部采用SEIR微分方程描述传播动力学过程，子区域之间通过邻域耦合实现空间传播效应。"}
                    </p>

                    <h4 className="font-bold mb-2">5.2 SEIR基础模型</h4>
                    <p className="mb-2 indent-8">
                      {"将每个子区域的人口划分为四个仓室：易感者 S、潜伏者 E、感染者 I 和康复者 R。各仓室之间的转化关系由以下微分方程组描述："}
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 font-mono text-center text-base">
                      <div>{"dS/dt = -beta * S * I / N"}</div>
                      <div>{"dE/dt = beta * S * I / N - sigma * E"}</div>
                      <div>{"dI/dt = sigma * E - gamma * I"}</div>
                      <div>{"dR/dt = gamma * I"}</div>
                    </div>

                    <h4 className="font-bold mb-2">5.3 空间耦合机制</h4>
                    <p className="mb-4 indent-8">
                      {"引入邻域耦合项 C_ij 描述子区域 (i,j) 与其莫尔邻域(8个邻居)之间的传播耦合。耦合强度由人口流动矩阵 W 加权确定："}
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 font-mono text-center text-base">
                      {"C_ij = sum_{(m,n) in Omega} w_{(i,j),(m,n)} * beta * I_mn / N_mn"}
                    </div>
                    <p className="indent-8">
                      {"其中 Omega 为子区域 (i,j) 的莫尔邻域集合，w_{(i,j),(m,n)} 为归一化的人口流动权重。该耦合机制使得模型能够捕捉疫情在空间上的扩散特征。"}
                    </p>
                  </div>

                  {/* AI写作助手 */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">AI写作助手</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">建议在5.3节后增加"参数估计方法"小节，说明如何利用真实数据拟合模型参数。</span>
                      </div>
                      <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded-lg text-sm">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">5.2节的公式建议添加参数说明表，提高可读性。</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 可用素材面板 */}
              <Card className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl shrink-0 self-start">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <CardTitle className="text-sm">可用素材</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="p-3 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-lg border border-violet-200 dark:border-violet-800 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-3.5 h-3.5 text-violet-500" />
                        <span className="text-xs font-semibold text-violet-700 dark:text-violet-400">建模手最终思路</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">可引用</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Quote className="w-3 h-3" />
                        <span>插入引用</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2 mb-1">
                        <Code className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">编程手代码</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">可引用</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Quote className="w-3 h-3" />
                        <span>插入引用</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">运行结果数据</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">可引用</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Quote className="w-3 h-3" />
                        <span>插入引用</span>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="text-xs font-semibold text-muted-foreground mb-2">图表素材</div>

                    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2">
                        <Image className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">SEIR传播曲线图</span>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2">
                        <Image className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">参数敏感性分析图</span>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2">
                        <Image className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">空间传播热力图</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
