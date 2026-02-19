import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf, TrendingUp, Gift, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useGreenCreditBalance, useSubmissions } from '@/hooks/useQueries';

const rewards = [
  { id: 1, title: '10% Off Next Purchase', credits: 500, icon: Gift },
  { id: 2, title: 'Free Pickup Service', credits: 1000, icon: TrendingUp },
  { id: 3, title: 'Sustainability Champion Badge', credits: 2500, icon: Award }
];

export default function GreenCreditWallet() {
  const { data: balanceData, isLoading: isLoadingBalance } = useGreenCreditBalance();
  const { data: submissions, isLoading: isLoadingSubmissions } = useSubmissions();

  const totalCredits = balanceData ? Number(balanceData) : 0;
  const nextRewardCredits = 1500;
  const progressToNextReward = Math.min((totalCredits / nextRewardCredits) * 100, 100);

  // Get recent submissions (last 3)
  const recentActivity = submissions
    ?.slice(-3)
    .reverse()
    .map((submission, idx) => {
      const typeLabel = submission.submissionType.charAt(0).toUpperCase() + submission.submissionType.slice(1);
      const clothingLabel = submission.clothingType.charAt(0).toUpperCase() + submission.clothingType.slice(1);
      const quantity = Number(submission.quantity);
      
      return {
        id: idx,
        action: `${typeLabel} ${quantity} ${clothingLabel}${quantity > 1 ? 's' : ''}`,
        credits: Number(submission.creditsEarned),
        date: new Date(Number(submission.timestamp) / 1000000).toLocaleDateString(),
      };
    }) || [];

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    toast.success(`Reward Redeemed!`, {
      description: `You've successfully redeemed: ${reward.title}`,
    });
  };

  const handleViewHistory = () => {
    toast.info('Full History', {
      description: 'This feature will show your complete transaction history.',
    });
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
            Green Credit System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Your Green Credit Wallet
          </h2>
          <p className="text-lg text-muted-foreground">
            Earn credits for every sustainable action. Redeem for rewards and exclusive benefits.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Wallet Card */}
          <Card className="lg:col-span-2 border-2 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-light mb-2">Current Balance</CardTitle>
                  <CardDescription>Your environmental impact in credits</CardDescription>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Balance Display */}
              <div className="space-y-2">
                {isLoadingBalance ? (
                  <Skeleton className="h-20 w-48" />
                ) : (
                  <div className="text-6xl font-light text-primary">{totalCredits.toLocaleString()}</div>
                )}
                <div className="text-sm text-muted-foreground">Green Credits</div>
              </div>

              {/* Progress to Next Reward */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress to next reward</span>
                  <span className="font-medium">
                    {Math.max(0, nextRewardCredits - totalCredits)} credits to go
                  </span>
                </div>
                <Progress value={progressToNextReward} className="h-2" />
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <div className="space-y-3">
                  {isLoadingSubmissions ? (
                    <>
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </>
                  ) : recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                        <div className="text-primary font-medium">+{activity.credits}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No submissions yet. Start earning credits by submitting clothing items!
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full cursor-pointer" 
                size="lg"
                onClick={handleViewHistory}
              >
                View Full History
              </Button>
            </CardContent>
          </Card>

          {/* Rewards Sidebar */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl font-light">Available Rewards</CardTitle>
              <CardDescription>Redeem your credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rewards.map((reward) => {
                const Icon = reward.icon;
                const canRedeem = totalCredits >= reward.credits;
                
                return (
                  <div 
                    key={reward.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      canRedeem 
                        ? 'border-primary/20 bg-primary/5 hover:border-primary/40' 
                        : 'border-border bg-muted/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        canRedeem ? 'bg-primary/10' : 'bg-muted'
                      }`}>
                        <Icon className={`w-5 h-5 ${canRedeem ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium mb-1">{reward.title}</div>
                        <div className="text-xs text-muted-foreground">{reward.credits} credits</div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant={canRedeem ? "default" : "outline"}
                      disabled={!canRedeem}
                      className="w-full cursor-pointer"
                      onClick={() => canRedeem && handleRedeemReward(reward)}
                    >
                      {canRedeem ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
