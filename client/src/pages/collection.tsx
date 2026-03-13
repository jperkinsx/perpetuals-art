import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import { mockData } from "@/lib/mockData";

export default function CollectionPage() {
  const { data: collectionData } = useQuery({
    queryKey: ["/api/collection"],
  });

  const collection = (collectionData as any) || mockData.collection;

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
          <a href="/sentinel" className="text-muted-foreground hover:text-foreground">Sentinel</a>
          <a href="/collection" className="text-foreground font-medium">Collection</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Full Collection</h2>
          <p className="text-muted-foreground mt-1">All Perpetuals epochs, minted on Rare Protocol</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.items?.map((item: any) => (
            <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div className="aspect-square bg-card relative flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{animationDuration: `${8 + item.id}s`}} />
                  <div className="absolute inset-3 rounded-full border-2 border-primary/50 animate-spin" style={{animationDuration: `${5 + item.id}s`, animationDirection: 'reverse'}} />
                  <div className="absolute inset-6 rounded-full border-2 border-primary/70 animate-spin" style={{animationDuration: `${3 + item.id}s`}} />
                  <div className="absolute inset-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">∞</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">#{item.id}</Badge>
                </div>
                {item.status === 'current' && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Live</Badge>
                  </div>
                )}
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-medium">{item.finalBid || item.currentBid} ETH</span>
                  <Badge variant={item.status === 'current' ? 'default' : 'secondary'}>
                    {item.status === 'current' ? 'Active' : 'Sold'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <PerplexityAttribution />
        </div>
      </main>
    </div>
  );
}
