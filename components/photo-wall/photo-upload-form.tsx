"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitPhotoWallEntry, initialPhotoWallActionState } from "@/actions/photo-wall";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden />
          Subiendo...
        </>
      ) : (
        "Subir mi foto"
      )}
    </Button>
  );
}

/**
 * Client Component: needs local form state (useActionState) and to reset
 * itself after a successful submission.
 */
export function PhotoUploadForm() {
  const [state, formAction] = useActionState(submitPhotoWallEntry, initialPhotoWallActionState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("¡Gracias por compartir tu foto!");
      formRef.current?.reset();
    } else if (state.status === "error" && !state.fieldErrors) {
      toast.error(state.message);
    }
  }, [state]);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form ref={formRef} action={formAction} className="mx-auto mt-8 max-w-sm space-y-4 text-left">
      <div className="space-y-1.5">
        <Label htmlFor="guestName">Tu nombre</Label>
        <Input id="guestName" name="guestName" autoComplete="name" required maxLength={80} />
        {fieldErrors?.guestName ? (
          <p className="text-destructive text-xs">{fieldErrors.guestName[0]}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="photo">Foto</Label>
        <Input id="photo" name="photo" type="file" accept="image/png,image/jpeg,image/webp,image/heic" required />
        {fieldErrors?.photo ? <p className="text-destructive text-xs">{fieldErrors.photo[0]}</p> : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="caption">Mensaje para los novios (opcional)</Label>
        <Textarea id="caption" name="caption" maxLength={140} rows={3} />
        {fieldErrors?.caption ? <p className="text-destructive text-xs">{fieldErrors.caption[0]}</p> : null}
      </div>

      <div className="pt-1 text-center sm:text-left">
        <SubmitButton />
      </div>
    </form>
  );
}
