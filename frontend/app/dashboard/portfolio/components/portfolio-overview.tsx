"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Percent } from "lucide-react"

export function PortfolioOverview() {
  const stats = [
    {
      title: "Total Value",
      value: "$124,567.89",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
    },
    {
      title: "24h Change",
      value: "$2,345.67",
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Total P/L",
      value: "$34,567.89",
      change: "+28.4%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Best Performer",
      value: "TRUMP",
      change: "+156.7%",
      trend: "up",
      icon: Percent,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="neo-brutalism"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="bg-primary p-2 border-2 border-black">
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className={`p-2 border-2 border-black ${stat.trend === "up" ? "bg-green-500" : "bg-red-500"}`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-white" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-white" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-muted-foreground">{stat.title}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-black">{stat.value}</p>
                <span className={`font-bold ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

