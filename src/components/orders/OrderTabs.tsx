import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Clock, History } from "lucide-react";

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ongoingCount: number;
  pastCount: number;
}

const OrderTabs = ({ activeTab, onTabChange, ongoingCount, pastCount }: OrderTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/50 p-1 h-12">
        <TabsTrigger 
          value="ongoing" 
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
        >
          <Clock className="h-4 w-4" />
          <span>Ongoing Orders</span>
          {ongoingCount > 0 && (
            <span className="ml-1 bg-primary-foreground/20 text-xs px-2 py-0.5 rounded-full">
              {ongoingCount}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="past" 
          className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
        >
          <History className="h-4 w-4" />
          <span>Past Orders</span>
          {pastCount > 0 && (
            <span className="ml-1 bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full data-[state=active]:bg-primary-foreground/20">
              {pastCount}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default OrderTabs;
