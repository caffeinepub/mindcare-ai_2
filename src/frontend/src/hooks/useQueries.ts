import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatMessage, MoodEntry } from "../backend.d";
import type { Sender } from "../backend.d";
import { useActor } from "./useActor";

export function useHasConsented() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["hasConsented"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasConsented();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveConsent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (consented: boolean) => {
      if (!actor) throw new Error("No actor");
      return actor.saveConsent(consented);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hasConsented"] }),
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<{ name: string } | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: { name: string }) => {
      if (!actor) throw new Error("No actor");
      return (actor as any).saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["currentUserProfile"] }),
  });
}

export function useGetRecentMoodEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<MoodEntry[]>({
    queryKey: ["recentMoodEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentMoodEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllMoodEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<MoodEntry[]>({
    queryKey: ["allMoodEntries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMoodEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMoodEntry() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      moodScore,
      emotionTags,
      notes,
    }: {
      moodScore: number;
      emotionTags: string[];
      notes: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addMoodEntry(moodScore, emotionTags, notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recentMoodEntries"] });
      qc.invalidateQueries({ queryKey: ["allMoodEntries"] });
    },
  });
}

export function useGetChatHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<ChatMessage[]>({
    queryKey: ["chatHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveChatMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sender,
      message,
    }: {
      sender: Sender;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.saveChatMessage(sender, message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chatHistory"] }),
  });
}
