import { checkmarkCircle, closeCircle, time } from "ionicons/icons";

export const TEAM_ROLES = [
  { value: "WORSHIP_LEADER", label: "Worship Leader" },
  { value: "GUITAR", label: "Guitar" },
  { value: "ELECTRIC_GUITAR", label: "Electric Guitar" },
  { value: "ACOUSTIC_GUITAR", label: "Acoustic Guitar" },
  { value: "BASS", label: "Bass" },
  { value: "PIANO", label: "Piano" },
  { value: "KEYS", label: "Keys" },
  { value: "DRUMS", label: "Drums" },
  { value: "VOCALS", label: "Vocals" },
  { value: "SOUND", label: "Sound" },
  { value: "MEDIA", label: "Media" },
  { value: "OTHER", label: "Other" },
] as const;

export type TeamRoleOption = (typeof TEAM_ROLES)[number];

// ─── Invite / assignment status helpers ───────────────────────────────────────

export function getInviteStatusIcon(status: string): string {
  switch (status?.toLowerCase()) {
    case "accepted": return checkmarkCircle;
    case "declined": return closeCircle;
    default: return time;
  }
}

export function getInviteStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "accepted": return "success";
    case "declined": return "danger";
    case "expired": return "medium";
    default: return "warning";
  }
}

// ─── Service status helper ────────────────────────────────────────────────────
export function getServiceStatusColor(status: string): string {
  switch (status) {
    case "scheduled": return "primary";
    case "completed": return "success";
    case "cancelled": return "danger";
    default: return "medium";
  }
}

// ─── Song library helpers ─────────────────────────────────────────────────────
export function buildMySongTitles(songs: any[], userId: string | undefined): Set<string> {
  return new Set(
    songs
      .filter((s) => s.author?._id === userId)
      .map((s) => s.title.toLowerCase().trim()),
  );
}
