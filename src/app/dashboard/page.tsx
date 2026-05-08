"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Plus,
  LogIn,
  ArrowRight,
  Trophy,
  Clock,
  Sparkles,
  Target,
  BookOpen,
  FileCode,
  ChevronRight,
  Copy,
  Check,
  Activity,
  Brain,
  Code,
  PenTool,
  Crown,
  HelpCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/contexts/auth-context";
import {
  readTeams,
  joinTeamByCode,
  setCurrentTeamId,
  getCurrentTeamId,
  getTeamMemberByName,
  seedSampleTeam,
  TEAM_ROLE_LABELS,
  Team,
} from "@/lib/teams-storage";
import { readMMPLog } from "@/lib/mmp-logger";
import { cn } from "@/lib/utils";

const TEAM_GRADIENTS: Record<Team["color"], string> = {
  indigo: "from-indigo-500 to-purple-600",
  purple: "from-purple-500 to-pink-600",
  cyan: "from-cyan-500 to-blue-600",
  emerald: "from-emerald-500 to-teal-600",
  amber: "from-amber-500 to-orange-600",
  rose: "from-rose-500 to-red-600",
};

const ROLE_ICON: Record<string, React.ElementType> = {
  modeler: Brain,
  coder: Code,
  writer: PenTool,
  leader: Crown,
  member: Users,
  undecided: HelpCircle,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeamId, setCurrentTeamIdState] = useState<string | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 初始化：种子示例团队 + 读取
  useEffect(() => {
    if (user?.displayName) {
      seedSampleTeam(user.displayName);
    }
    setTeams(readTeams());
    setCurrentTeamIdState(getCurrentTeamId());
  }, [user?.displayName]);

  /* ---------- 统计 ---------- */
  const stats = useMemo(() => {
    const mmpCount = readMMPLog().length;
    const totalMembers = teams.reduce((sum, t) => sum + t.members.length, 0);
    return {
      teamCount: teams.length,
      mmpCount,
      totalMembers,
    };
  }, [teams]);

  const currentUserName = user?.displayName || user?.username || "";
  const currentTeam = useMemo(() => {
    if (!teams.length) return null;
    if (currentTeamId) {
      return teams.find((team) => team.id === currentTeamId) ?? teams[0];
    }
    return teams[0];
  }, [currentTeamId, teams]);
  const currentTeamMember = useMemo(
    () => getTeamMemberByName(currentTeam, currentUserName),
    [currentTeam, currentUserName]
  );
  const currentRoleLabel = currentTeamMember
    ? TEAM_ROLE_LABELS[currentTeamMember.role]
    : "暂未确定";

  /* ---------- 操作 ---------- */
  const handleEnter = (team: Team) => {
    setCurrentTeamId(team.id);
    setCurrentTeamIdState(team.id);
    window.dispatchEvent(new Event("cmam-current-team-change"));
    showToast(`已进入团队「${team.name}」`, "success");
    router.push("/");
  };

  const handleSelectTeam = (team: Team) => {
    setCurrentTeamId(team.id);
    setCurrentTeamIdState(team.id);
    window.dispatchEvent(new Event("cmam-current-team-change"));
    showToast(`当前团队已切换为「${team.name}」`, "success");
  };

  const handleAdjustRoles = (team: Team) => {
    setCurrentTeamId(team.id);
    setCurrentTeamIdState(team.id);
    window.dispatchEvent(new Event("cmam-current-team-change"));
    router.push(`/team?teamId=${team.id}&mode=editRoles`);
  };

  const handleJoin = () => {
    const code = joinCode.trim().toUpperCase();
    if (!code) {
      showToast("请输入邀请码", "warning");
      return;
    }
    const team = joinTeamByCode(code, {
      name: user?.displayName ?? "未知成员",
      role: "member",
    });
    if (!team) {
      showToast("邀请码无效或团队不存在", "warning");
      return;
    }
    setTeams(readTeams());
    setCurrentTeamId(team.id);
    setCurrentTeamIdState(team.id);
    window.dispatchEvent(new Event("cmam-current-team-change"));
    setJoinDialogOpen(false);
    setJoinCode("");
    showToast(`已加入「${team.name}」`, "success");
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast(`邀请码 ${code} 已复制`, "success");
    } catch {
      showToast("复制失败，请手动复制", "warning");
    }
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative min-h-screen gradient-bg-mesh">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 顶部欢迎区 */}
        <div className="glass-card-strong rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/30">
                  {(user?.displayName || "U").slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    你好，{user?.displayName || "队员"} 👋
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    当前团队：
                    <Badge variant="secondary" className="ml-1">
                      {currentTeam?.name || "暂未选择"}
                    </Badge>
                    当前角色：
                    <Badge className="ml-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
                      {currentRoleLabel}
                    </Badge>
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-xl">
                选择一个团队进入协作空间，或创建/加入新团队。你的每一步操作都会被 MMP 系统自动记录。
              </p>
            </div>

            <div className="flex gap-6 md:gap-8">
              <Stat label="我的团队" value={stats.teamCount} icon={Users} color="indigo" />
              <Stat label="协作成员" value={stats.totalMembers} icon={Target} color="purple" />
              <Stat label="MMP 记录" value={stats.mmpCount} icon={Activity} color="cyan" />
            </div>
          </div>
        </div>

        {/* 团队列表 */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                我加入的团队
              </h2>
              <p className="text-sm text-muted-foreground">
                点击卡片切换当前团队，使用按钮进入协作空间或调整角色
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setJoinDialogOpen(true)}
                className="gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                加入团队
              </Button>
              <Button
                onClick={() => router.push("/team")}
                className="gradient-bg text-white shadow-lg shadow-indigo-500/25 gap-1.5"
              >
                <Plus className="w-4 h-4" />
                创建团队
              </Button>
            </div>
          </div>

          {teams.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="py-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
                  <Users className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">还没有加入任何团队</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  创建一个新团队开始参赛，或用邀请码加入已有团队开始协作
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button variant="outline" onClick={() => setJoinDialogOpen(true)}>
                    <LogIn className="w-4 h-4 mr-1.5" />
                    输入邀请码
                  </Button>
                  <Button
                    onClick={() => router.push("/team")}
                    className="gradient-bg text-white"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    创建团队
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teams.map((team) => (
                <Card
                  key={team.id}
                  className={cn(
                    "glass-card group cursor-pointer hover:-translate-y-1 transition-all relative overflow-hidden",
                    currentTeamId === team.id && "ring-2 ring-indigo-400"
                  )}
                  onClick={() => handleSelectTeam(team)}
                >
                  {/* 顶部彩色条 */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
                      TEAM_GRADIENTS[team.color]
                    )}
                  />

                  <CardHeader className="pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="flex items-center gap-2 mb-1">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold shrink-0",
                              TEAM_GRADIENTS[team.color]
                            )}
                          >
                            {team.name.slice(0, 1)}
                          </div>
                          <span className="truncate">{team.name}</span>
                        </CardTitle>
                        <CardDescription className="text-xs">
                          <Trophy className="inline w-3 h-3 mr-1" />
                          {team.competition}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {team.members.length} 人
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* 目标 */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3.5 h-3.5" />
                      {team.goal}
                    </div>

                    {/* 进度条 */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">项目进度</span>
                        <span className="font-semibold">{team.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full bg-gradient-to-r transition-all",
                            TEAM_GRADIENTS[team.color]
                          )}
                          style={{ width: `${team.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* 当前阶段 */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/60 text-xs">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{team.currentStage}</span>
                    </div>

                    {/* 成员头像 */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 4).map((m) => {
                          const Icon = ROLE_ICON[m.role] ?? Users;
                          return (
                            <div
                              key={m.id}
                              title={`${m.name} (${m.role})`}
                              className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white shadow-sm"
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          );
                        })}
                        {team.members.length > 4 && (
                          <div className="w-7 h-7 rounded-full bg-muted border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-medium">
                            +{team.members.length - 4}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode(team.inviteCode);
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted hover:bg-muted/70 text-xs font-mono transition-colors"
                      >
                        {copiedCode === team.inviteCode ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        {team.inviteCode}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnter(team);
                        }}
                      >
                        <span className={cn("flex items-center justify-center gap-1.5 w-full") }>
                          进入协作空间
                          <ArrowRight className="w-4 h-4 transition-transform" />
                        </span>
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdjustRoles(team);
                        }}
                      >
                        调整角色
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* 快捷入口 */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            快捷入口
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLink
              title="协作工作流"
              desc="三手分工协作，全流程自动记录"
              icon={Activity}
              gradient="from-blue-500 to-indigo-600"
              onClick={() => router.push("/workflow")}
            />
            <QuickLink
              title="知识库"
              desc="获奖论文、思路、案例一键检索"
              icon={BookOpen}
              gradient="from-emerald-500 to-teal-600"
              onClick={() => router.push("/knowledge")}
            />
            <QuickLink
              title=".mmp 文件"
              desc="实时操作流 + 区块链存证"
              icon={FileCode}
              gradient="from-purple-500 to-violet-600"
              onClick={() => router.push("/mmp")}
            />
            <QuickLink
              title="产品教程"
              desc="5 分钟了解 CMAMSys 工作机制"
              icon={HelpCircle}
              gradient="from-amber-500 to-orange-600"
              onClick={() => router.push("/guide")}
            />
          </div>
        </div>
      </div>

      {/* 加入团队 Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5 text-indigo-600" />
              通过邀请码加入团队
            </DialogTitle>
            <DialogDescription>
              向队长索取 6 位邀请码，输入后即可加入团队
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="例如：MCM2025"
              maxLength={6}
              className="h-12 text-lg font-mono text-center tracking-[0.4em] uppercase"
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              提示：试试演示码 <code className="px-1 font-mono">MCM2025</code>
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setJoinDialogOpen(false)}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={handleJoin}
              className="flex-1 gradient-bg text-white"
            >
              <ChevronRight className="w-4 h-4 mr-1" />
              加入
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- 子组件 ---------- */
function Stat({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: "indigo" | "purple" | "cyan";
}) {
  const colorMap = {
    indigo: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/40",
    purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/40",
    cyan: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/40",
  };
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          colorMap[color]
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function QuickLink({
  title,
  desc,
  icon: Icon,
  gradient,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ElementType;
  gradient: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left glass-card rounded-2xl p-5 group hover:-translate-y-1 transition-all hover:shadow-xl"
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform",
          gradient
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
    </button>
  );
}
