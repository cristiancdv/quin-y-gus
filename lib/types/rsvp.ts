export type RsvpActionState =
    | { status: "idle" }
    | { status: "success"; attending: boolean }
    | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const initialRsvpActionState: RsvpActionState = { status: "idle" };