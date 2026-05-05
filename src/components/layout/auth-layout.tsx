"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { SidebarLayout } from "@/components/layout/sidebar";
import { Loader2 } from "lucide-react";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg-mesh">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    </div>
  );
}

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // 加载中
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 未登录且不在登录页 -> 重定向到登录页
  if (!user && pathname !== "/login") {
    router.push("/login");
    return <LoadingScreen />;
  }

  // 已登录且在登录页 -> 重定向到首页
  if (user && pathname === "/login") {
    router.push("/");
    return <LoadingScreen />;
  }

  // 登录页使用独立布局（不包含侧边栏）
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // 已登录的其他页面使用侧边栏布局
  return <SidebarLayout>{children}</SidebarLayout>;
}
