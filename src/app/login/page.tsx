"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Brain, Code, PenTool, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useAuth, UserRole } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // 登录表单
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // 注册表单
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    role: "undecided" as UserRole,
  });

  // 表单错误
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLoginForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!loginForm.username.trim()) {
      newErrors.username = "请输入用户名";
    }
    if (!loginForm.password.trim()) {
      newErrors.password = "请输入密码";
    } else if (loginForm.password.length < 6) {
      newErrors.password = "密码长度至少6位";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!registerForm.username.trim()) {
      newErrors.username = "请输入用户名";
    }
    if (!registerForm.email.trim()) {
      newErrors.email = "请输入邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = "请输入有效的邮箱地址";
    }
    if (!registerForm.displayName.trim()) {
      newErrors.displayName = "请输入显示名称";
    }
    if (!registerForm.password.trim()) {
      newErrors.password = "请输入密码";
    } else if (registerForm.password.length < 6) {
      newErrors.password = "密码长度至少6位";
    }
    if (!registerForm.confirmPassword.trim()) {
      newErrors.confirmPassword = "请确认密码";
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "两次密码输入不一致";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = await login(loginForm.username, loginForm.password);
    setIsLoading(false);

    if (success) {
      showToast("登录成功，欢迎回来！", "success");
      router.push("/dashboard");
    } else {
      showToast("登录失败，请检查用户名和密码", "warning");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = await register(
      registerForm.username,
      registerForm.email,
      registerForm.password,
      registerForm.displayName,
      registerForm.role
    );
    setIsLoading(false);

    if (success) {
      showToast("注册成功，欢迎加入 CMAMSys！", "success");
      router.push("/dashboard");
    } else {
      showToast("注册失败，请稍后重试", "warning");
    }
  };

  const handleForgotPassword = () => {
    showToast("密码重置邮件已发送", "info");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-mesh p-4">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-scale-in">
        {/* 登录卡片 */}
        <div className="glass-card-strong rounded-3xl shadow-2xl overflow-hidden">
          {/* Logo 区域 */}
          <div className="flex flex-col items-center pt-8 pb-4 px-8">
            <div className="mb-4 animate-float">
              <Image
                src="/logo-withtext.svg"
                alt="CMAMSys"
                width={160}
                height={72}
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">欢迎回来</h1>
            <p className="text-sm text-muted-foreground">登录 CMAMSys 开始数学建模之旅</p>
          </div>

          {/* Tab 切换 */}
          <div className="px-8 mb-6">
            <div className="flex rounded-xl bg-muted/80 p-1">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setErrors({});
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === "login"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                登录
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setErrors({});
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === "register"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                注册
              </button>
            </div>
          </div>

          {/* 登录表单 */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="px-8 pb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  用户名
                </label>
                <Input
                  placeholder="请输入用户名"
                  value={loginForm.username}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
                  className="h-10 rounded-xl"
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  密码
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="h-10 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-muted-foreground">记住我</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  忘记密码？
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    登录中...
                  </>
                ) : (
                  "登录"
                )}
              </Button>
            </form>
          )}

          {/* 注册表单 */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="px-8 pb-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  用户名
                </label>
                <Input
                  placeholder="请输入用户名"
                  value={registerForm.username}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, username: e.target.value })
                  }
                  className="h-10 rounded-xl"
                />
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  邮箱
                </label>
                <Input
                  type="email"
                  placeholder="请输入邮箱"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                  className="h-10 rounded-xl"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  显示名称
                </label>
                <Input
                  placeholder="请输入显示名称"
                  value={registerForm.displayName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      displayName: e.target.value,
                    })
                  }
                  className="h-10 rounded-xl"
                />
                {errors.displayName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.displayName}
                  </p>
                )}
              </div>

              {/* 角色选择 */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  选择你的角色
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: "modeler", label: "建模手", icon: Brain, color: "from-blue-500 to-indigo-600" },
                    { value: "coder", label: "编程手", icon: Code, color: "from-purple-500 to-violet-600" },
                    { value: "writer", label: "论文手", icon: PenTool, color: "from-orange-500 to-amber-600" },
                    { value: "undecided", label: "暂未确定", icon: HelpCircle, color: "from-gray-400 to-slate-500" },
                  ] as { value: UserRole; label: string; icon: React.ElementType; color: string }[]).map((r) => {
                    const Icon = r.icon;
                    const active = registerForm.role === r.value;
                    return (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => setRegisterForm({ ...registerForm, role: r.value })}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-sm",
                          active
                            ? "border-indigo-400 bg-gradient-to-r text-white shadow-md " + r.color
                            : "border-border bg-white/60 hover:border-indigo-200 text-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  密码
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码（至少6位）"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    className="h-10 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  确认密码
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="请再次输入密码"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="h-10 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    注册中...
                  </>
                ) : (
                  "注册"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* 底部信息 */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          CMAMSys - AI驱动的数学建模全流程协作工具
        </p>
      </div>
    </div>
  );
}
