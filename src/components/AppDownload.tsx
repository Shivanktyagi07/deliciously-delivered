import { Button } from "@/components/ui/button";
import { Apple, Play } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary to-primary-glow">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Get the FoodieGo App
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-lg">
              Download our app and enjoy exclusive deals, faster checkout, and real-time order tracking.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-14 px-6 bg-background hover:bg-background/90 text-foreground"
            >
              <Apple className="h-6 w-6 mr-2" />
              <div className="text-left">
                <p className="text-[10px] leading-none">Download on the</p>
                <p className="text-sm font-bold leading-tight">App Store</p>
              </div>
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-14 px-6 bg-background hover:bg-background/90 text-foreground"
            >
              <Play className="h-6 w-6 mr-2" />
              <div className="text-left">
                <p className="text-[10px] leading-none">GET IT ON</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
