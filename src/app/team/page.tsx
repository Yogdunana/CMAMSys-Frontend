"use client"

import { useState } from "react"
import { Brain, Code, PenTool, Bot, UserPlus, Sparkles, Users, Shield, Zap, Copy, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function TeamPage() {
  const { showToast } = useToast()
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const inviteLink = "https://cmamsys.app/invite/TM-2024-0042"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true)
      showToast("邀请链接已复制到剪贴板！", "success")
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      showToast("邀请链接: " + inviteLink, "info")
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-purple-950 dark:to-violet-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-300/30 dark:bg-fuchsia-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* 团队概览区域 */}
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

        {/* 当前团队卡片 */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/10" />
          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">数模之星队</CardTitle>
                <CardDescription className="text-base">团队ID: TM-2024-0042</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-white shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">活跃团队</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-violet-500 ring-offset-2">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-bold">
                    张
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">张三</div>
                  <div className="text-sm text-muted-foreground">队长</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>创建于 2024-01-15</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 角色分配区域 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            角色分配
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 建模手卡片 */}
            <Card className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-violet-500/30 hover:border-violet-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer" onClick={() => showToast("建模手：张三，负责思路构建、数学模型设计", "info")}>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-xl" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    已分配
                  </Badge>
                </div>
                <CardTitle className="text-lg">建模手</CardTitle>
                <CardDescription>负责思路构建、数学模型设计</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center gap-3 p-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg">
                  <Avatar className="w-10 h-10 ring-2 ring-violet-500">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-violet-600 text-white font-bold">
                      张
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">张三</div>
                    <div className="text-xs text-muted-foreground">当前担任</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 编程手卡片 */}
            <Card className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-fuchsia-500/30 hover:border-fuchsia-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/20 cursor-pointer" onClick={() => showToast("编程手：李四，负责代码实现、数据运算", "info")}>
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-xl" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    已分配
                  </Badge>
                </div>
                <CardTitle className="text-lg">编程手</CardTitle>
                <CardDescription>负责代码实现、数据运算</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center gap-3 p-3 bg-fuchsia-50 dark:bg-fuchsia-950/30 rounded-lg">
                  <Avatar className="w-10 h-10 ring-2 ring-fuchsia-500">
                    <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white font-bold">
                      李
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">李四</div>
                    <div className="text-xs text-muted-foreground">当前担任</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 论文手卡片 */}
            <Card className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer" onClick={() => showToast("论文手：王五，负责论文撰写、成果呈现", "info")}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-xl" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    已分配
                  </Badge>
                </div>
                <CardTitle className="text-lg">论文手</CardTitle>
                <CardDescription>负责论文撰写、成果呈现</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-pink-950/30 rounded-lg">
                  <Avatar className="w-10 h-10 ring-2 ring-pink-500">
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold">
                      王
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">王五</div>
                    <div className="text-xs text-muted-foreground">当前担任</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI智能推荐区域 */}
        <Card className="mb-8 bg-gradient-to-br from-violet-100/80 via-fuchsia-100/80 to-pink-100/80 dark:from-violet-950/80 dark:via-fuchsia-950/80 dark:to-pink-950/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg animate-pulse">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">AI智能推荐</CardTitle>
                <CardDescription>基于群聊讨论分析的智能角色分配建议</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                <div className="text-sm font-medium text-muted-foreground mb-3">分析结果</div>
                <p className="text-base">基于群聊讨论分析，推荐以下角色分配</p>
              </div>

              <div className="space-y-3">
                {/* 推荐项 1 */}
                <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer" onClick={() => showToast("已选择推荐：张三 → 建模手（置信度 95%）", "success")}>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-violet-600 text-white font-bold">
                        张
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">张三</div>
                      <div className="text-sm text-muted-foreground">→ 建模手</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-violet-600">置信度 95%</div>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 推荐项 2 */}
                <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer" onClick={() => showToast("已选择推荐：李四 → 编程手（置信度 88%）", "success")}>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white font-bold">
                        李
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">李四</div>
                      <div className="text-sm text-muted-foreground">→ 编程手</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-fuchsia-600">置信度 88%</div>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 推荐项 3 */}
                <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer" onClick={() => showToast("已选择推荐：王五 → 论文手（置信度 92%）", "success")}>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold">
                        王
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">王五</div>
                      <div className="text-sm text-muted-foreground">→ 论文手</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-pink-600">置信度 92%</div>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-3">
            <Button className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-lg" onClick={() => showToast("已应用AI推荐的角色分配方案！", "success")}>
              <Sparkles className="w-4 h-4 mr-2" />
              应用推荐
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => showToast("手动调整模式已开启", "info")}>
              手动调整
            </Button>
          </CardFooter>
        </Card>

        {/* 成员管理区域 */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">团队成员</CardTitle>
                <CardDescription>管理团队成员及其角色</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600" onClick={() => setInviteDialogOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                邀请成员
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 成员 1 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-transparent dark:from-violet-950/30 dark:to-transparent rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-violet-500">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-violet-600 text-white font-bold text-lg">
                      张
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">张三</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                        队长
                      </Badge>
                      <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300">
                        建模手
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  加入时间: 2024-01-15
                </div>
              </div>

              {/* 成员 2 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-fuchsia-50 to-transparent dark:from-fuchsia-950/30 dark:to-transparent rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-fuchsia-500">
                    <AvatarFallback className="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 text-white font-bold text-lg">
                      李
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">李四</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300">
                        编程手
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  加入时间: 2024-01-16
                </div>
              </div>

              {/* 成员 3 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-950/30 dark:to-transparent rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-2 ring-pink-500">
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-pink-600 text-white font-bold text-lg">
                      王
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">王五</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                        论文手
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  加入时间: 2024-01-17
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 团队配置说明 */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            团队配置说明
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">团队规模</div>
                    <div className="text-sm text-muted-foreground">支持1-4人团队</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">灵活配置</div>
                    <div className="text-sm text-muted-foreground">一人可兼任多角色</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">动态调整</div>
                    <div className="text-sm text-muted-foreground">队长可随时调整成员身份</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 邀请成员对话框 */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-violet-500" />
              邀请成员
            </DialogTitle>
            <DialogDescription>分享以下邀请链接给团队成员，即可加入「数模之星队」</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg border border-violet-200 dark:border-violet-800">
              <span className="text-sm text-violet-700 dark:text-violet-300 flex-1 truncate font-mono">{inviteLink}</span>
              <Button size="sm" variant="outline" onClick={handleCopyLink}>
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              链接有效期为7天，最多可邀请4名成员加入团队。
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
