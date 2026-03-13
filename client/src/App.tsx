import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Auction from "@/pages/auction";
import Vault from "@/pages/vault";
import Sentinel from "@/pages/sentinel";
import Collection from "@/pages/collection";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={Auction} />
          <Route path="/auction" component={Auction} />
          <Route path="/vault" component={Vault} />
          <Route path="/sentinel" component={Sentinel} />
          <Route path="/collection" component={Collection} />
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
