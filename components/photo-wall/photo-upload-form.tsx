"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitPhotoWallEntry } from "@/actions/photo-wall";
import { initialPhotoWallActionState } from "@/lib/types/photo-wall";
import { photoWallSectionContent } from "@/data/sections";
import { initialPhotoWallActionState } from "@/types/form-actions";

/**
 * Client Component: needs local form state (useActionState) and to reset
 * itself after a successful submission.
 */
export function PhotoUploadForm() {
  const [state, formAction] = useActionState(submitPhotoWallEntry, initialPhotoWallActionState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(photoWallSectionContent.success);
      formRef.current?.reset();
    } else if (state.status === "error" && !state.fieldErrors) {
      toast.error(state.message);
    }
  }, [state]);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto mt-8 flex max-w-sm flex-col items-center"
      onChange={() => formRef.current?.requestSubmit()}
    >
      <Input
        ref={inputRef}
        id="photo"
        name="photo"
        type="file"
        accept="image/png,image/jpeg,image/webp,image/heic"
        required
        aria-label={photoWallSectionContent.selectPhoto}
        className="hidden"
      />
      <Button type="button" onClick={() => inputRef.current?.click()}>
        <Upload aria-hidden />
        {photoWallSectionContent.upload}
      </Button>
      {fieldErrors?.photo ? <p className="text-destructive mt-2 text-xs">{fieldErrors.photo[0]}</p> : null}
    </form>
  );
}
