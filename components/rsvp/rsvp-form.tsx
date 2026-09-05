"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Heart, Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitRsvp, initialRsvpActionState } from "@/actions/rsvp";
import type { RsvpDecision } from "./swipe-card";

function SubmitButton({ attending }: { attending: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin" aria-hidden />
          Enviando...
        </>
      ) : attending ? (
        "Confirmar mi match"
      ) : (
        "Enviar respuesta"
      )}
    </Button>
  );
}

interface RsvpFormProps {
  decision: RsvpDecision;
  onBack: () => void;
}

/**
 * Client Component: shown after the swipe card resolves. Re-declares
 * `attending` as a hidden field rather than trusting component state alone
 * — the Server Action re-validates it independently either way.
 */
export function RsvpForm({ decision, onBack }: RsvpFormProps) {
  const attending = decision === "yes";
  const [state, formAction] = useActionState(submitRsvp, initialRsvpActionState);

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state.status === "success") {
      // Let assistive tech announce the outcome without stealing focus.
      document.getElementById("rsvp-result-heading")?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="mx-auto max-w-sm text-center" role="status">
        <span className="bg-accent text-primary mx-auto flex size-16 items-center justify-center rounded-full">
          {attending ? <PartyPopper className="size-7" /> : <Heart className="size-7" />}
        </span>
        <h3
          id="rsvp-result-heading"
          tabIndex={-1}
          className="font-display mt-5 text-2xl text-foreground outline-none"
        >
          {attending ? "¡Es un match!" : "Gracias por avisarnos"}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">
          {attending
            ? "Confirmamos tu asistencia. Nos vemos en la pista de baile."
            : "Lamentamos que no puedas acompañarnos, ¡gracias por contarnos!"}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-4 text-left">
      <input type="hidden" name="attending" value={decision} />

      <div className="text-center">
        <p className="text-primary text-sm font-semibold">
          {attending ? "¡Es un match! Contanos más" : "Antes de irte, contanos quién sos"}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input id="fullName" name="fullName" autoComplete="name" required maxLength={80} />
        {fieldErrors?.fullName ? (
          <p className="text-destructive text-xs">{fieldErrors.fullName[0]}</p>
        ) : null}
      </div>

      {attending ? (
        <div className="space-y-1.5">
          <Label htmlFor="guestCount">Cantidad de personas (incluite vos)</Label>
          <Input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            required
          />
          {fieldErrors?.guestCount ? (
            <p className="text-destructive text-xs">{fieldErrors.guestCount[0]}</p>
          ) : null}
        </div>
      ) : null}

      {attending ? (
        <div className="space-y-1.5">
          <Label htmlFor="dietaryNotes">Restricciones alimenticias (opcional)</Label>
          <Textarea id="dietaryNotes" name="dietaryNotes" maxLength={300} rows={2} />
          {fieldErrors?.dietaryNotes ? (
            <p className="text-destructive text-xs">{fieldErrors.dietaryNotes[0]}</p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-1.5">
        <Label htmlFor="message">Mensaje para los novios (opcional)</Label>
        <Textarea id="message" name="message" maxLength={500} rows={3} />
        {fieldErrors?.message ? (
          <p className="text-destructive text-xs">{fieldErrors.message[0]}</p>
        ) : null}
      </div>

      {state.status === "error" ? (
        <p className="text-destructive text-sm" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="space-y-2 pt-1">
        <SubmitButton attending={attending} />
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground w-full text-center text-sm underline-offset-4 hover:underline"
        >
          Volver
        </button>
      </div>
    </form>
  );
}
