"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, CheckCircle2, XCircle, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TimeLeft } from "./time-left";
import { cn } from "@/lib/utils";

interface Bet {
  id: number;
  title: string;
  image: string;
  category: string;
  endDate: string;
  totalPool: number;
  yesPool: number;
  noPool: number;
  yesProbability: number;
  noProbability: number;
  isResolved?: boolean;
  result?: "yes" | "no";
}

export function BetCard({ bet }: { bet: Bet }) {
  const formattedDate = new Date(bet.endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate payout multiplier for winning side
  const winningPayout =
    bet.result === "yes"
      ? (bet.totalPool / bet.yesPool).toFixed(2)
      : (bet.totalPool / bet.noPool).toFixed(2);

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      className="group h-full"
    >
      <Card className="neo-brutalism overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative h-48 flex-shrink-0 border-b-2 border-black">
          <Image
            src={
              bet.image && bet.image.startsWith("http")
                ? bet.image
                : "/placeholder.svg"
            }
            alt={bet.title}
            fill
            className="object-cover"
            onError={(e) => {
              console.error(`Error loading image for bet ${bet.id}:`, e);
              // Set fallback image
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge
              className="border-2 border-black font-bold"
            >
              {bet.category}
            </Badge>
          </div>
          {bet.isResolved && (
            <div className="absolute top-4 right-4">
              <Badge
                className={cn(
                  "border-2 border-black font-bold",
                  bet.result === "yes"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                )}
              >
                Resolved
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-4 h-14 line-clamp-2 overflow-hidden">
            {bet.title}
          </h3>

          <div className="space-y-4 flex-grow flex flex-col justify-between">
            {/* Pool Distribution */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span
                  className={cn(
                    "flex items-center gap-1",
                    bet.isResolved
                      ? bet.result === "yes"
                        ? "text-green-600 font-bold"
                        : "text-gray-600"
                      : "text-green-600"
                  )}
                >
                  Yes {(bet.yesProbability * 100).toFixed(0)}%
                  {bet.isResolved && bet.result === "yes" && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1",
                    bet.isResolved
                      ? bet.result === "no"
                        ? "text-red-600 font-bold"
                        : "text-gray-600"
                      : "text-red-600"
                  )}
                >
                  {bet.isResolved && bet.result === "no" && (
                    <XCircle className="h-4 w-4" />
                  )}
                  No {(bet.noProbability * 100).toFixed(0)}%
                </span>
              </div>
              <div className="relative h-4 overflow-hidden border-2 border-black">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0",
                    bet.isResolved
                      ? bet.result === "yes" 
                        ? "bg-green-500" 
                        : "bg-red-500"
                      : "bg-primary"
                  )}
                  style={{ width: `${bet.yesProbability * 100}%` }}
                />
              </div>
            </div>

            {/* Pool Info */}
            <div className="flex items-center justify-between text-sm font-bold border-2 border-black p-2">
              <div>
                <span className="text-gray-600">Total Pool</span>
                <div className="font-black font-mono">
                  ${bet.totalPool.toLocaleString()}
                </div>
              </div>
              {bet.isResolved ? (
                <div className="text-sm">
                  Ended {formattedDate}
                </div>
              ) : (
                <TimeLeft endDate={bet.endDate} />
              )}
            </div>

            {/* Actions or Results */}
            <div className="mt-auto">
              {bet.isResolved ? (
                <div className="space-y-3">
                  {/* Result Banner */}
                  <div
                    className={cn(
                      "flex items-center gap-2 p-3 border-2 border-black",
                      bet.result === "yes"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    )}
                  >
                    <Trophy className="h-5 w-5" />
                    <div className="flex-1">
                      <span className="font-bold">
                        {bet.result === "yes" ? "Yes" : "No"} was correct
                      </span>
                      <div className="text-sm font-medium">
                        {bet.result === "yes"
                          ? `${(bet.yesProbability * 100).toFixed(
                              0
                            )}% predicted correctly`
                          : `${(bet.noProbability * 100).toFixed(
                              0
                            )}% predicted correctly`}
                        {" • "}
                        {Number(winningPayout)}x payout
                      </div>
                    </div>
                  </div>

                  {/* Share Results */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 neo-brutalism-sm"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="neo-brutalism-sm"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    className="flex-1"
                    size="lg"
                    variant="default"
                  >
                    <Link href={`/bets/place-bet/${bet.id}`} className="w-full">
                      Place Bet
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="neo-brutalism-sm"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
