"use client";

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  icon,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="glass-card-strong rounded-2xl px-6 py-5 mb-6">
      {/* 面包屑 */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-3 text-sm">
          <a
            href="/"
            className="flex items-center text-muted-foreground hover:text-indigo-500 transition-colors"
          >
            <Home className="size-3.5" />
          </a>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="size-3 text-muted-foreground/50" />
              {item.href ? (
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-indigo-500 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* 标题区域 */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="gradient-icon size-10 shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
