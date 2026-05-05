"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Brain,
  Trophy,
  Search,
  GraduationCap,
  Lightbulb,
  Star,
  Filter,
  TrendingUp,
  Sparkles,
  FileText,
  Award,
  Target,
  Zap,
  Database,
  Cpu,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "收录论文", value: "3,567", unit: "篇", icon: FileText, gradient: "from-blue-500 to-cyan-400" },
  { label: "解题思路", value: "12,890", unit: "条", icon: Lightbulb, gradient: "from-purple-500 to-pink-400" },
  { label: "优秀案例", value: "856", unit: "个", icon: Trophy, gradient: "from-amber-500 to-orange-400" },
];

const awardPapers = [
  {
    title: "2024 MCM A题 特等奖论文框架",
    award: "Outstanding Winner",
    year: "2024",
    tags: ["MCM", "A题", "特等奖"],
    description: "基于深度强化学习的交通信号灯优化方案，论文结构清晰，模型创新性强",
  },
  {
    title: "2023 CUMCM A题 国家一等奖论文结构",
    award: "国家一等奖",
    year: "2023",
    tags: ["CUMCM", "A题", "国一"],
    description: "高温作业专用服装设计优化模型，灵敏度分析详尽，图表精美",
  },
  {
    title: "2024 ICM D题 Outstanding Winner",
    award: "Outstanding Winner",
    year: "2024",
    tags: ["ICM", "D题", "特等奖"],
    description: "可持续水资源管理政策评估，多准则决策分析框架完整",
  },
  {
    title: "2023 MCM B题 Meritorious Winner",
    award: "Meritorious Winner",
    year: "2023",
    tags: ["MCM", "B题", "一等奖"],
    description: "全球海洋塑料污染预测与治理策略，时空数据分析深入",
  },
];

const approaches = [
  {
    title: "SEIR传染病模型优化方法",
    category: "微分方程",
    difficulty: "高级",
    usage: 342,
    description: "改进的SEIR模型，引入时变参数和空间扩散项，适用于COVID-19等传染病建模",
  },
  {
    title: "元胞自动机在交通流中的应用",
    category: "仿真模拟",
    difficulty: "中级",
    usage: 256,
    description: "基于Nagel-Schreckenberg模型的交通流元胞自动机仿真，含多车道扩展",
  },
  {
    title: "图神经网络预测模型",
    category: "机器学习",
    difficulty: "高级",
    usage: 198,
    description: "利用GNN进行社交网络传播预测，含GCN和GAT两种架构对比",
  },
  {
    title: "多目标优化遗传算法",
    category: "优化算法",
    difficulty: "中级",
    usage: 421,
    description: "NSGA-II多目标遗传算法实现，支持Pareto前沿可视化和约束处理",
  },
  {
    title: "时间序列ARIMA预测",
    category: "统计分析",
    difficulty: "初级",
    usage: 567,
    description: "ARIMA/SARIMA时间序列预测完整流程，含ADF检验、模型定阶和残差分析",
  },
];

const cases = [
  {
    team: "清华大学 AlphaStar 队",
    competition: "2024 MCM A题",
    score: "Outstanding Winner",
    members: "张明远、李思涵、王博文",
    highlights: "深度强化学习 + 时空图卷积网络",
    model: "DRL-STGCN 交通优化模型",
  },
  {
    team: "浙江大学 Nova 队",
    competition: "2023 CUMCM A题",
    score: "国家一等奖",
    members: "陈雨桐、赵子轩、刘诗琪",
    highlights: "热传导方程 + 遗传算法优化",
    model: "多层热传导-优化耦合模型",
  },
  {
    team: "上海交通大学 Quantum 队",
    competition: "2024 ICM D题",
    score: "Meritorious Winner",
    members: "周子墨、吴佳琪、孙浩然",
    highlights: "AHP层次分析 + 系统动力学仿真",
    model: "水资源可持续性综合评估SD模型",
  },
];

const aiLearningAreas = [
  { name: "论文结构分析", progress: 92, color: "bg-gradient-to-r from-blue-500 to-cyan-400" },
  { name: "建模方法识别", progress: 87, color: "bg-gradient-to-r from-purple-500 to-pink-400" },
  { name: "代码模式学习", progress: 85, color: "bg-gradient-to-r from-amber-500 to-orange-400" },
  { name: "图表生成优化", progress: 85, color: "bg-gradient-to-r from-green-500 to-emerald-400" },
  { name: "评价标准理解", progress: 82, color: "bg-gradient-to-r from-rose-500 to-red-400" },
];

const filterBadges = [
  { label: "2024", active: true },
  { label: "2023", active: false },
  { label: "MCM", active: false },
  { label: "CUMCM", active: false },
  { label: "ICM", active: false },
  { label: "特等奖", active: false },
  { label: "国家一等奖", active: false },
  { label: "微分方程", active: false },
  { label: "优化算法", active: false },
];

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["2024"]);
  const { showToast } = useToast();
  const [detailDialog, setDetailDialog] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      showToast(`正在搜索"${searchQuery}"，找到 ${Math.floor(Math.random() * 50 + 10)} 条相关结果`, "success");
    } else {
      showToast("请输入搜索关键词", "warning");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* 装饰背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-cyan-400/15 to-pink-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">智能知识引擎</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            知识库系统
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            让所有Agent更聪明，持续学习和进化
          </p>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="relative overflow-hidden border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.unit}</span>
                  </div>
                </div>
              </CardContent>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}
              />
            </Card>
          ))}
        </div>

        {/* 搜索区域 */}
        <Card className="mb-10 border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="搜索论文、思路、案例..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-white/80 border-blue-100 focus:border-blue-300 rounded-xl"
                />
              </div>
              <Button className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/25" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-1">筛选：</span>
              {filterBadges.map((badge) => (
                <button
                  key={badge.label}
                  onClick={() => toggleFilter(badge.label)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeFilters.includes(badge.label)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/25"
                      : "bg-white/80 text-muted-foreground hover:bg-blue-50 border border-blue-100"
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 知识分类 Tabs */}
        <Tabs defaultValue="papers">
          <TabsList className="mb-6 bg-white/60 backdrop-blur-xl p-1 rounded-xl border border-blue-100/50 h-auto">
            <TabsTrigger
              value="papers"
              className="px-5 py-2.5 rounded-lg data-[active]:bg-gradient-to-r data-[active]:from-blue-500 data-[active]:to-purple-500 data-[active]:text-white data-[active]:shadow-md data-[active]:shadow-blue-500/25"
            >
              <Award className="w-4 h-4 mr-1.5" />
              获奖论文框架
            </TabsTrigger>
            <TabsTrigger
              value="approaches"
              className="px-5 py-2.5 rounded-lg data-[active]:bg-gradient-to-r data-[active]:from-purple-500 data-[active]:to-pink-500 data-[active]:text-white data-[active]:shadow-md data-[active]:shadow-purple-500/25"
            >
              <Lightbulb className="w-4 h-4 mr-1.5" />
              解题思路库
            </TabsTrigger>
            <TabsTrigger
              value="cases"
              className="px-5 py-2.5 rounded-lg data-[active]:bg-gradient-to-r data-[active]:from-amber-500 data-[active]:to-orange-500 data-[active]:text-white data-[active]:shadow-md data-[active]:shadow-amber-500/25"
            >
              <Trophy className="w-4 h-4 mr-1.5" />
              优秀案例沉淀
            </TabsTrigger>
          </TabsList>

          {/* 获奖论文框架 */}
          <TabsContent value="papers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {awardPapers.map((paper, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setDetailDialog({
                    title: paper.title,
                    content: `奖项：${paper.award}\n年份：${paper.year}\n标签：${paper.tags.join("、")}\n\n${paper.description}\n\n该论文框架结构清晰，模型创新性强，适合作为数学建模竞赛的参考模板。论文包含完整的问题分析、模型建立、求解验证和结果讨论等章节。`,
                  })}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-sm">
                          {paper.award}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground">
                        {paper.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-3 group-hover:text-blue-600 transition-colors">
                      {paper.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {paper.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {paper.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 解题思路库 */}
          <TabsContent value="approaches">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {approaches.map((approach, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setDetailDialog({
                    title: approach.title,
                    content: `分类：${approach.category}\n难度：${approach.difficulty}\n被引用次数：${approach.usage}\n\n${approach.description}\n\n该思路提供了完整的建模方法论，包含数学模型推导、算法实现步骤和参数调优建议。`,
                  })}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                      >
                        {approach.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          approach.difficulty === "高级"
                            ? "border-red-200 text-red-600"
                            : approach.difficulty === "中级"
                            ? "border-amber-200 text-amber-600"
                            : "border-green-200 text-green-600"
                        }
                      >
                        {approach.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-purple-600 transition-colors">
                      {approach.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {approach.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>被引用 {approach.usage} 次</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 优秀案例沉淀 */}
          <TabsContent value="cases">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {cases.map((caseItem, index) => (
                <Card
                  key={index}
                  className="group border-0 bg-white/60 backdrop-blur-xl shadow-lg shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setDetailDialog({
                    title: caseItem.team,
                    content: `竞赛：${caseItem.competition}\n奖项：${caseItem.score}\n成员：${caseItem.members}\n亮点：${caseItem.highlights}\n模型：${caseItem.model}\n\n该团队在竞赛中展现了出色的协作能力和创新思维，其方案具有较高的参考价值。`,
                  })}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-md">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-sm">
                        {caseItem.score}
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-amber-600 transition-colors">
                      {caseItem.team}
                    </CardTitle>
                    <CardDescription>{caseItem.competition}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">成员：</span>
                        <span className="font-medium">{caseItem.members}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-muted-foreground">亮点：</span>
                        <span className="font-medium">{caseItem.highlights}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-muted-foreground">模型：</span>
                        <span className="font-medium">{caseItem.model}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* AI学习能力 */}
        <div className="mt-10">
          <Card className="border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden shadow-2xl shadow-purple-500/25">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <CardContent className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI 智能学习能力</h3>
                  <p className="text-white/70 text-sm">知识库持续为AI Agent提供学习素材</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  {aiLearningAreas.map((area) => (
                    <div key={area.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{area.name}</span>
                        <span className="text-white/80">{area.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className={`h-full ${area.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${area.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-5 h-5 text-cyan-300" />
                      <span className="font-medium">知识更新频率</span>
                    </div>
                    <div className="text-3xl font-bold">实时</div>
                    <p className="text-white/60 text-sm mt-1">每次竞赛结束后自动提取新知识</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <BarChart3 className="w-5 h-5 text-pink-300" />
                      <span className="font-medium">Agent能力提升</span>
                    </div>
                    <div className="text-3xl font-bold">+34.7%</div>
                    <p className="text-white/60 text-sm mt-1">接入知识库后Agent综合能力平均提升</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 详情对话框 */}
      <Dialog open={!!detailDialog} onOpenChange={(open) => !open && setDetailDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detailDialog?.title}</DialogTitle>
            <DialogDescription>详细信息</DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-100">
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {detailDialog?.content}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
