import { ExternalLink } from "lucide-react";

export function PerplexityAttribution() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
      <span>Market intelligence powered by</span>
      <a
        href="https://perplexity.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-primary hover:underline font-medium"
      >
        Perplexity AI
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
