import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubmissionResult {
    status: string;
    creditsEarned: bigint;
    remainingBalance: bigint;
}
export type Time = bigint;
export interface Submission {
    creditsEarned: bigint;
    clothingType: ClothingType;
    timestamp: Time;
    quantity: bigint;
    submissionType: SubmissionType;
}
export enum ClothingType {
    accessory = "accessory",
    shirt = "shirt",
    jacket = "jacket",
    pants = "pants",
    dress = "dress"
}
export enum SubmissionType {
    resale = "resale",
    upcycle = "upcycle",
    recycle = "recycle"
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    getGreenCreditBalance(): Promise<bigint>;
    getSubmission(id: bigint): Promise<Submission | null>;
    getSubmissionCount(): Promise<bigint>;
    submitClothing(submissionType: SubmissionType, clothingType: ClothingType, quantity: bigint): Promise<SubmissionResult>;
}
