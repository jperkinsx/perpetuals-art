import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Shield, Eye, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { mockData } from "@/lib/mockData";

export default function SentinelPage() {
  const { data: sentinelData } = useQuery({
    queryKey: ["/api/sentinel/data"],
  });

  const sentinel = (sentinelData as any) || mockData.sentinel;

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
          <a href="/" className="text-muted-foreground hover:text-foreground">Auction</a>
          <a href="/vault" className="text-muted-foreground hover:text-foreground">Vault</a>
          <a href="/sentinel" className="text-foreground font-medium">Sentinel</a>
          <a href="/collection" className="text-muted-foreground hover:text-foreground">Collection</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Sentinel AI</h2>
          <p className="text-muted-foreground mt-1">Sycophancy-resistant engagement scoring via Perplexity AI</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" /> Authenticity Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{sentinel.authenticityScore}%</div>
              <p className="text-sm text-muted-foreground mt-1">Current epoch</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" /> Signals Analyzed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sentinel.signalsAnalyzed}</div>
              <p className="text-sm text-muted-foreground mt-1">Last 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" /> Flagged Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{sentinel.flaggedSignals}</div>
              <p className="text-sm text-muted-foreground mt-1">Potential sycophancy</p>
            </CardContent>
          </Card>
        </div>

        {/* Signal Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Signal Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentinel.categories?.map((cat: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{cat.score}%</span>
                      {cat.score >= 70 ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <Progress value={cat.score} className="h-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sentinel.recentAnalysis?.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    item.status === 'authentic' ? 'bg-green-500' :
                    item.status === 'suspicious' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <PerplexityAttribution />
      </main>
    </div>
  );
}
