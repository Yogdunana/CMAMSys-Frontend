"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Workflow,
  BookOpen,
  FolderOpen,
  FileText,
  Award,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Brain,
  Code,
  PenTool,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  emoji: string;
}

const navItems: NavItem[] = [
  { label: "系统概览", href: "/", icon: Home, emoji: "\u{1F3E0}" },
  { label: "团队组建", href: "/team", icon: Users, emoji: "\u{1F465}" },
  { label: "协作工作流", href: "/workflow", icon: Workflow, emoji: "\u{1F504}" },
  { label: "建模手工作台", href: "/modeler", icon: Brain, emoji: "\u{1F9E0}" },
  { label: "编程手工作台", href: "/programmer", icon: Code, emoji: "\u{1F4BB}" },
  { label: "论文手工作台", href: "/writer", icon: PenTool, emoji: "\u{270F}\u{FE0F}" },
  { label: "知识库", href: "/knowledge", icon: BookOpen, emoji: "\u{1F4DA}" },
  { label: "工作空间", href: "/workspace", icon: FolderOpen, emoji: "\u{1F4BC}" },
  { label: "MMP文件", href: "/mmp", icon: FileText, emoji: "\u{1F4C4}" },
  { label: "能力Card", href: "/card", icon: Award, emoji: "\u{1F3C5}" },
];

function NavItemComponent({ item, isActive, isCollapsed }: { item: NavItem; isActive: boolean; isCollapsed: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isCollapsed && "justify-center px-2",
        isActive
          ? "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 text-indigo-600 shadow-sm"
          : "text-muted-foreground hover:bg-gradient-to-r hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-cyan-500/5 hover:text-foreground"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-lg transition-all duration-200",
          isCollapsed ? "size-9" : "size-8",
          isActive
            ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/25"
            : "bg-muted/60 text-muted-foreground group-hover:bg-gradient-to-br group-hover:from-indigo-500/10 group-hover:to-purple-500/10 group-hover:text-indigo-500"
        )}
      >
        <Icon className="size-4" />
      </div>
      {!isCollapsed && (
        <span className="truncate">{item.label}</span>
      )}
      {!isCollapsed && isActive && (
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
      )}
    </Link>
  );
}

function SidebarContent({
  isCollapsed,
  onToggle,
  onClose,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo区域 */}
      <Link href="/" className={cn(
        "flex items-center border-b border-border/50 px-4 py-4 cursor-pointer hover:bg-muted/30 transition-colors",
        isCollapsed ? "justify-center px-2" : "gap-3"
      )}>
        {isCollapsed ? (
          <Image
            src="/logo.svg"
            alt="CMAMSys"
            width={36}
            height={40}
            className="transition-transform hover:scale-105"
            priority
          />
        ) : (
          <Image
            src="/logo-withtext.svg"
            alt="CMAMSys - 数学建模协作系统"
            width={140}
            height={62}
            className="transition-transform hover:scale-[1.02]"
            priority
          />
        )}
      </Link>

      {/* 导航区域 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* 折叠按钮 */}
      <div className="hidden lg:flex border-t border-border/50 px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4 mr-2" />
              <span className="text-xs">收起侧栏</span>
            </>
          )}
        </Button>
      </div>

      {/* 用户信息 */}
      <div className={cn(
        "border-t border-border/50 px-3 py-4",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <div className={cn(
          "flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 p-2.5",
          isCollapsed && "p-2"
        )}>
          <Avatar size={isCollapsed ? "default" : "lg"}>
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-semibold">
              张
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">张三</span>
              <span className="text-[11px] text-muted-foreground truncate">
                团队队长
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-full">
      {/* 桌面端侧边栏 */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border/50 transition-all duration-300 ease-in-out",
          "bg-white/80 backdrop-blur-xl",
          isCollapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </aside>

      {/* 移动端遮罩 */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 移动端侧边栏 */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] border-r border-border/50 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute right-2 top-4 z-10">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMobileOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>
        <SidebarContent
          isCollapsed={false}
          onToggle={() => setIsMobileOpen(false)}
          onClose={() => setIsMobileOpen(false)}
        />
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 min-w-0">
        {/* 移动端顶部栏 */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-white/80 backdrop-blur-xl px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="size-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="CMAMSys"
              width={28}
              height={31}
              priority
            />
            <span className="text-sm font-bold gradient-text">CMAMSys</span>
          </Link>
        </header>

        {/* 页面内容 */}
        <div className="page-transition">
          {children}
        </div>
      </main>
    </div>
  );
}
