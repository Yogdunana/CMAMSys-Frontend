"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  gradient?: "indigo" | "cyan" | "purple" | "emerald" | "amber" | "rose";
  className?: string;
}

const gradientStyles = {
  indigo: {
    icon: "from-indigo-500 to-indigo-600",
    border: "from-indigo-500/20 via-purple-500/20 to-cyan-500/20",
    glow: "group-hover:shadow-indigo-500/10",
  },
  cyan: {
    icon: "from-cyan-500 to-blue-500",
    border: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    glow: "group-hover:shadow-cyan-500/10",
  },
  purple: {
    icon: "from-purple-500 to-violet-600",
    border: "from-purple-500/20 via-violet-500/20 to-fuchsia-500/20",
    glow: "group-hover:shadow-purple-500/10",
  },
  emerald: {
    icon: "from-emerald-500 to-teal-500",
    border: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    glow: "group-hover:shadow-emerald-500/10",
  },
  amber: {
    icon: "from-amber-500 to-orange-500",
    border: "from-amber-500/20 via-orange-500/20 to-rose-500/20",
    glow: "group-hover:shadow-amber-500/10",
  },
  rose: {
    icon: "from-rose-500 to-pink-500",
    border: "from-rose-500/20 via-pink-500/20 to-purple-500/20",
    glow: "group-hover:shadow-rose-500/10",
  },
};

export function StatCard({
  icon,
  title,
  value,
  change,
  changeLabel,
  gradient = "indigo",
  className,
}: StatCardProps) {
  const style = gradientStyles[gradient];
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 bg-white/70 backdrop-blur-md",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        style.glow,
        className
      )}
    >
      {/* 渐变边框效果 */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]",
          style.border
        )}
      >
        <div className="w-full h-full rounded-2xl bg-white" />
      </div>

      <CardContent className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </span>
            <span className="text-2xl font-bold tabular-nums text-foreground">
              {value}
            </span>
            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                    isPositive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {isPositive ? "+" : ""}
                  {change}%
                </div>
                {changeLabel && (
                  <span className="text-[11px] text-muted-foreground">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
              style.icon
            )}
          >
            <div className="text-white">{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
