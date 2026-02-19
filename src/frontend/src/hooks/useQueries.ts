import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Submission, SubmissionType, ClothingType } from '../backend';
import { toast } from 'sonner';

// Query to fetch green credit balance
export function useGreenCreditBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['greenCreditBalance'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getGreenCreditBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

// Query to fetch all submissions
export function useSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<Submission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutation to submit clothing
export function useSubmitClothing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submissionType,
      clothingType,
      quantity,
    }: {
      submissionType: SubmissionType;
      clothingType: ClothingType;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitClothing(submissionType, clothingType, quantity);
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['greenCreditBalance'] });
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      
      toast.success('Submission Successful!', {
        description: `You earned ${data.creditsEarned} credits. New balance: ${data.remainingBalance}`,
      });
    },
    onError: (error) => {
      toast.error('Submission Failed', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    },
  });
}
