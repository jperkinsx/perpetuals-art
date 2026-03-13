import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Zap, Clock, TrendingUp, Shield } from "lucide-react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { mockData } from "@/lib/mockData";

export default function AuctionPage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [progress, setProgress] = useState(0);

  const { data: epochData } = useQuery({
    queryKey: ["/api/epoch/current"],
  });

  const { data: auctionData } = useQuery({
    queryKey: ["/api/auction/status"],
  });

  const epoch = (epochData as any) || mockData.epoch;
  const auction = (auctionData as any) || mockData.auction;

  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const endTime = new Date(auction.endTime).getTime();
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Auction Ended");
        setProgress(100);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      const startTime = new Date(auction.startTime).getTime();
      const totalDuration = endTime - startTime;
      const elapsed = now - startTime;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [auction]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PERPETUALS</h1>
            <p className="text-xs text-muted-foreground">Autonomous Generative Art</p>
          </div>
        </div>
        <nav className="flex gap-4 text-sm">
          <a href="/" className="text-foreground font-medium">Auction</a>
          <a href="/vault" className="text-muted-foreground hover:text-foreground">Vault</a>
          <a href="/sentinel" className="text-muted-foreground hover:text-foreground">Sentinel</a>
          <a href="/collection" className="text-muted-foreground hover:text-foreground">Collection</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Artwork */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg border border-border overflow-hidden relative">
              {/* Generative art placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  {/* Animated generative art */}
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{animationDuration: '8s'}} />
                  <div className="absolute inset-4 rounded-full border-2 border-primary/50 animate-spin" style={{animationDuration: '5s', animationDirection: 'reverse'}} />
                  <div className="absolute inset-8 rounded-full border-2 border-primary/70 animate-spin" style={{animationDuration: '3s'}} />
                  <div className="absolute inset-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">∞</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary">Epoch {epoch.number}</Badge>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{epoch.title}</h2>
              <p className="text-muted-foreground mt-1">{epoch.description}</p>
            </div>
          </div>

          {/* Right: Auction Info */}
          <div className="space-y-4">
            {/* Current Bid */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{auction.currentBid} ETH</div>
                <p className="text-sm text-muted-foreground mt-1">by {auction.currentBidder}</p>
              </CardContent>
            </Card>

            {/* Timer */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold">{timeLeft}</div>
                <Progress value={progress} className="mt-2" />
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Bid History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {auction.bids?.map((bid: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-mono">{bid.bidder.slice(0, 8)}...</span>
                    <span className="font-medium">{bid.amount} ETH</span>
                    <span className="text-muted-foreground">{bid.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Place Bid */}
            <Card className="border-primary/50">
              <CardContent className="pt-4">
                <Button className="w-full" size="lg">
                  Place Bid on SuperRare
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Powered by Rare Protocol
                </p>
              </CardContent>
            </Card>

            {/* Epoch Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    Total Raised
                  </div>
                  <div className="text-xl font-bold mt-1">{epoch.totalRaised} ETH</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    Vault Balance
                  </div>
                  <div className="text-xl font-bold mt-1">{epoch.vaultBalance} ETH</div>
                </CardContent>
              </Card>
            </div>

            <PerplexityAttribution />
          </div>
        </div>
      </main>
    </div>
  );
}
