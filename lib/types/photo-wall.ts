export type PhotoWallActionState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const initialPhotoWallActionState: PhotoWallActionState = { status: "idle" };