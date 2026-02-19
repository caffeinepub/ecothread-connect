import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';
import SubmissionDialog from './SubmissionDialog';

const categories = [
  {
    id: 'resale' as const,
    title: 'Resale',
    description: 'High-quality items ready for a second life',
    icon: ShoppingBag,
    color: 'text-chart-1',
    bgColor: 'bg-chart-1/10',
    criteria: [
      'Gently used condition',
      'No visible damage',
      'Clean and fresh',
      'Current style'
    ],
    examples: 'Designer pieces, vintage finds, barely worn items',
  },
  {
    id: 'upcycle' as const,
    title: 'Upcycle',
    description: 'Transform into something new and creative',
    icon: Sparkles,
    color: 'text-chart-2',
    bgColor: 'bg-chart-2/10',
    criteria: [
      'Moderate wear acceptable',
      'Unique patterns or fabrics',
      'Repairable items',
      'Creative potential'
    ],
    examples: 'Denim for bags, fabric scraps for quilts, buttons and zippers',
  },
  {
    id: 'recycle' as const,
    title: 'Recycle',
    description: 'Break down fibers for new textile production',
    icon: RefreshCw,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    criteria: [
      'Heavily worn or damaged',
      'Stained or torn',
      'Mixed fiber content',
      'End of life textiles'
    ],
    examples: 'Old t-shirts, worn socks, damaged linens, fabric remnants',
  }
];

export default function MaterialGradeDashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'resale' | 'upcycle' | 'recycle'>('resale');

  const handleCategoryClick = (categoryId: 'resale' | 'upcycle' | 'recycle') => {
    setSelectedType(categoryId);
    setDialogOpen(true);
  };

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-sm px-4 py-1">
            Material Grading System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Know Your Material Grade
          </h2>
          <p className="text-lg text-muted-foreground">
            Understanding how to categorize your textiles ensures they get the most sustainable treatment possible.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${category.color}`} strokeWidth={1.5} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-light">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Criteria */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                      Criteria
                    </h4>
                    <ul className="space-y-2">
                      {category.criteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full ${category.bgColor} flex-shrink-0`} />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">
                      Examples
                    </h4>
                    <p className="text-sm text-muted-foreground/80">
                      {category.examples}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Submission Dialog */}
      <SubmissionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        submissionType={selectedType}
      />
    </section>
  );
}
