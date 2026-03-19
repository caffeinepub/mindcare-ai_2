import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChatMessage {
    sender: Sender;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface MoodEntry {
    emotionTags: Array<string>;
    notes?: string;
    timestamp: Time;
    moodScore: number;
}
export enum Sender {
    bot = "bot",
    user = "user"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMoodEntry(moodScore: number, emotionTags: Array<string>, notes: string | null): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllMoodEntries(): Promise<Array<MoodEntry>>;
    getCallerUserRole(): Promise<UserRole>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getConsentTimestamp(): Promise<Time | null>;
    getLatestMoodEntry(): Promise<MoodEntry | null>;
    getRecentMoodEntries(): Promise<Array<MoodEntry>>;
    hasConsented(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveChatMessage(sender: Sender, message: string): Promise<void>;
    saveConsent(consented: boolean): Promise<void>;
}
