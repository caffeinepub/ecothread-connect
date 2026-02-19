import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSubmitClothing } from '@/hooks/useQueries';
import { SubmissionType, ClothingType } from '../backend';
import { Loader2 } from 'lucide-react';

interface SubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submissionType: 'resale' | 'upcycle' | 'recycle';
}

const CREDIT_RATES = {
  resale: 2,
  upcycle: 3,
  recycle: 1,
};

const CLOTHING_TYPES = [
  { value: ClothingType.shirt, label: 'Shirt' },
  { value: ClothingType.pants, label: 'Pants' },
  { value: ClothingType.dress, label: 'Dress' },
  { value: ClothingType.jacket, label: 'Jacket' },
  { value: ClothingType.accessory, label: 'Accessory' },
];

export default function SubmissionDialog({
  open,
  onOpenChange,
  submissionType,
}: SubmissionDialogProps) {
  const [clothingType, setClothingType] = useState<ClothingType | ''>('');
  const [quantity, setQuantity] = useState<string>('1');
  const submitMutation = useSubmitClothing();

  const creditsPerItem = CREDIT_RATES[submissionType];
  const totalCredits = parseInt(quantity || '0') * creditsPerItem;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clothingType || !quantity || parseInt(quantity) <= 0) {
      return;
    }

    const submissionTypeEnum = SubmissionType[submissionType];
    
    await submitMutation.mutateAsync({
      submissionType: submissionTypeEnum,
      clothingType: clothingType as ClothingType,
      quantity: BigInt(parseInt(quantity)),
    });

    // Reset form and close dialog
    setClothingType('');
    setQuantity('1');
    onOpenChange(false);
  };

  const handleClose = () => {
    setClothingType('');
    setQuantity('1');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light capitalize">
            {submissionType} Submission
          </DialogTitle>
          <DialogDescription>
            Submit your clothing items and earn green credits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Clothing Type Select */}
          <div className="space-y-2">
            <Label htmlFor="clothing-type">Clothing Type</Label>
            <Select
              value={clothingType}
              onValueChange={(value) => setClothingType(value as ClothingType)}
            >
              <SelectTrigger id="clothing-type">
                <SelectValue placeholder="Select clothing type" />
              </SelectTrigger>
              <SelectContent>
                {CLOTHING_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Number of Pieces</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          {/* Credits Display */}
          <div className="rounded-lg bg-primary/5 border-2 border-primary/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Credits Earned
                </div>
                <div className="text-xs text-muted-foreground">
                  {creditsPerItem} credits per item
                </div>
              </div>
              <div className="text-3xl font-light text-primary">
                {totalCredits}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={submitMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !clothingType ||
                !quantity ||
                parseInt(quantity) <= 0 ||
                submitMutation.isPending
              }
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
