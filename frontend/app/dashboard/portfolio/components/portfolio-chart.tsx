"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 120000 },
  { date: "Mar", value: 115000 },
  { date: "Apr", value: 130000 },
  { date: "May", value: 145000 },
  { date: "Jun", value: 140000 },
  { date: "Jul", value: 160000 },
  { date: "Aug", value: 155000 },
  { date: "Sep", value: 170000 },
  { date: "Oct", value: 180000 },
  { date: "Nov", value: 175000 },
  { date: "Dec", value: 190000 },
]

export function PortfolioChart() {
  return (
    <Card className="neo-brutalism">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-black">Portfolio Performance</CardTitle>
            <CardDescription className="font-medium">Track your portfolio value over time</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Tabs defaultValue="value" className="w-[200px]">
              <TabsList className="border-2 border-black p-1">
                <TabsTrigger value="value" className="border-2 border-black data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Value</TabsTrigger>
                <TabsTrigger value="pl" className="border-2 border-black data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">P/L</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select defaultValue="1Y">
              <SelectTrigger className="w-[100px] border-2 border-black">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                <SelectItem value="1D">1D</SelectItem>
                <SelectItem value="1W">1W</SelectItem>
                <SelectItem value="1M">1M</SelectItem>
                <SelectItem value="3M">3M</SelectItem>
                <SelectItem value="1Y">1Y</SelectItem>
                <SelectItem value="ALL">ALL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] p-2 border-2 border-black bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#000" />
              <XAxis dataKey="date" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "2px solid #000",
                  borderRadius: "0",
                  padding: "8px",
                  fontWeight: "bold",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ff0040" 
                strokeWidth={3} 
                dot={{ stroke: '#000', strokeWidth: 2, fill: '#ff0040' }} 
                activeDot={{ r: 8, stroke: '#000', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

