"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Users,
  Workflow,
  BookOpen,
  Award,
  FileText,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Bot,
  Code,
  PenTool,
  Database,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GuideStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  mockGradient: string;
}

const guideSteps: GuideStep[] = [
  {
    id: 1,
    title: "认识 CMAMSys",
    subtitle: "AI驱动的数学建模全流程协作系统",
    icon: <Sparkles className="size-6" />,
    gradient: "from-indigo-500 to-purple-600",
    mockGradient: "from-indigo-400 via-purple-500 to-indigo-600",
    features: [
      {
        icon: <Brain className="size-5" />,
        title: "三层机制",
        description: "建模手、编程手、论文手三层分工协作，各司其职，高效运转",
      },
      {
        icon: <Bot className="size-5" />,
        title: "AI协作",
        description: "集成多个AI模型，通过三轮辩论机制选出最优建模方案",
      },
      {
        icon: <Database className="size-5" />,
        title: "知识沉淀",
        description: "自动沉淀建模经验与知识，形成可复用的团队知识库",
      },
    ],
  },
  {
    id: 2,
    title: "组建你的团队",
    subtitle: "快速创建团队，智能推荐分工",
    icon: <Users className="size-6" />,
    gradient: "from-cyan-500 to-blue-600",
    mockGradient: "from-cyan-400 via-blue-500 to-cyan-600",
    features: [
      {
        icon: <Users className="size-5" />,
        title: "创建团队",
        description: "一键创建建模团队，设置团队名称和目标竞赛",
      },
      {
        icon: <Lightbulb className="size-5" />,
        title: "邀请成员",
        description: "通过链接或用户名邀请队友加入团队",
      },
      {
        icon: <Award className="size-5" />,
        title: "AI推荐分工",
        description: "AI根据成员能力Card智能推荐建模手、编程手、论文手角色",
      },
    ],
  },
  {
    id: 3,
    title: "协作建模流程",
    subtitle: "从思路研讨到代码实现的完整工作流",
    icon: <Workflow className="size-6" />,
    gradient: "from-purple-500 to-violet-600",
    mockGradient: "from-purple-400 via-violet-500 to-purple-600",
    features: [
      {
        icon: <Brain className="size-5" />,
        title: "建模手三轮辩论",
        description: "AI模型独立思考 -> 人机融合 -> 同伴互评，选出最优方案",
      },
      {
        icon: <Code className="size-5" />,
        title: "编程手IDE协作",
        description: "在线IDE环境，AI辅助编程，实时调试模型参数",
      },
      {
        icon: <PenTool className="size-5" />,
        title: "论文手整合输出",
        description: "自动整合建模过程与结果，生成结构化论文初稿",
      },
    ],
  },
  {
    id: 4,
    title: "知识管理与成果",
    subtitle: "知识库、MMP文件、能力Card全记录",
    icon: <BookOpen className="size-6" />,
    gradient: "from-emerald-500 to-teal-600",
    mockGradient: "from-emerald-400 via-teal-500 to-emerald-600",
    features: [
      {
        icon: <BookOpen className="size-5" />,
        title: "知识库",
        description: "论文、代码、模型等知识资产的统一管理与检索",
      },
      {
        icon: <FileText className="size-5" />,
        title: "MMP文件",
        description: "完整记录数学建模全流程，支持回溯与复盘",
      },
      {
        icon: <Award className="size-5" />,
        title: "能力Card",
        description: "量化评估成员建模能力，区块链存证确保可信",
      },
    ],
  },
];

export default function GuidePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const step = guideSteps[currentStep];
  const progress = ((currentStep + 1) / guideSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  const handleStart = () => {
    router.push("/team");
  };

  return (
    <div className="min-h-full bg-gradient-bg-mesh">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 顶部进度条 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-foreground">新手引导</h1>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {guideSteps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
                step.gradient
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* 步骤指示器 */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {guideSteps.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-300",
                  index === currentStep
                    ? "w-8 h-8 bg-gradient-to-br text-white shadow-lg " + s.gradient
                    : index < currentStep
                    ? "w-8 h-8 bg-emerald-500 text-white"
                    : "w-8 h-8 bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <span className="text-xs font-medium">{s.id}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 步骤内容 */}
        <div className="animate-fade-in-up" key={step.id}>
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <div
              className={cn(
                "inline-flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br text-white shadow-xl mb-4",
                step.gradient
              )}
            >
              {step.icon}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {step.title}
            </h2>
            <p className="text-muted-foreground">{step.subtitle}</p>
          </div>

          {/* 功能截图模拟区域 */}
          <div className="mb-8">
            <div
              className={cn(
                "relative rounded-2xl overflow-hidden h-48 sm:h-64 bg-gradient-to-br shadow-lg",
                step.mockGradient
              )}
            >
              {/* 模拟界面元素 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/90">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {step.features.map((f, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        {f.icon}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-white/80">
                    {step.title} - 功能预览
                  </p>
                </div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* 功能列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {step.features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "glass-card-strong rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg mb-3",
                    step.gradient
                  )}
                >
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部操作按钮 */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            {currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="gap-1.5"
              >
                <ArrowLeft className="size-4" />
                上一步
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                跳过引导
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < guideSteps.length - 1 ? (
              <Button onClick={handleNext} className="gap-1.5 gradient-bg text-white hover:opacity-90 shadow-lg shadow-indigo-500/25">
                下一步
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleStart}
                className="gap-1.5 gradient-bg text-white hover:opacity-90 shadow-lg shadow-indigo-500/25"
              >
                <Rocket className="size-4" />
                开始使用
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
