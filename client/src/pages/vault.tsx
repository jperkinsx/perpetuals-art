import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Shield, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { mockData } from "@/lib/mockData";

export default function VaultPage() {
  const { data: vaultData } = useQuery({
    queryKey: ["/api/vault/metrics"],
  });

  const vault = (vaultData as any) || mockData.vault;

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
          <a href="/vault" className="text-foreground font-medium">Vault</a>
          <a href="/sentinel" className="text-muted-foreground hover:text-foreground">Sentinel</a>
          <a href="/collection" className="text-muted-foreground hover:text-foreground">Collection</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">BankerVault</h2>
          <p className="text-muted-foreground mt-1">Treasury managed through Bankr yield strategies</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" /> Total Value Locked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{vault.totalValueLocked}</div>
              <p className="text-sm text-green-500 mt-1">+{vault.tvlGrowth}% this epoch</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Current APY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{vault.apy}%</div>
              <p className="text-sm text-muted-foreground mt-1">Bankr Yield Strategy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Yield Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{vault.totalYieldEarned}</div>
              <p className="text-sm text-muted-foreground mt-1">Since inception</p>
            </CardContent>
          </Card>
        </div>

        {/* Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Allocation Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vault.allocation?.map((item: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.protocol}</span>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.amount}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {vault.transactions?.map((tx: any, i: number) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {tx.type === 'deposit' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-blue-500" />
                    )}
                    <span>{tx.description}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{tx.amount}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
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
