import { BookingPayload } from "@/types";
import { isValidIndianPhone, isValidEmail } from "@/lib/utils";

export interface TimeSlot {
  time: string;
  period: "morning" | "afternoon" | "evening";
  available: boolean;
}

export function getAvailableDates(daysCount = 14): { dateStr: string; displayLabel: string; dayOfWeek: string; isToday: boolean }[] {
  const dates = [];
  const now = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    dates.push({
      dateStr,
      displayLabel: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`,
      dayOfWeek: dayNames[d.getDay()],
      isToday: i === 0,
    });
  }

  return dates;
}

export function getTimeSlotsForDate(dateStr: string): TimeSlot[] {
  // Deterministic realistic slot availability based on date hash
  const hash = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return [
    // Morning
    { time: "09:30 AM", period: "morning", available: (hash % 3) !== 0 },
    { time: "10:30 AM", period: "morning", available: true },
    { time: "11:30 AM", period: "morning", available: (hash % 2) === 0 },
    { time: "12:30 PM", period: "morning", available: true },
    // Afternoon
    { time: "02:00 PM", period: "afternoon", available: true },
    { time: "03:00 PM", period: "afternoon", available: (hash % 4) !== 0 },
    { time: "04:00 PM", period: "afternoon", available: true },
    // Evening
    { time: "05:15 PM", period: "evening", available: true },
    { time: "06:15 PM", period: "evening", available: (hash % 5) !== 0 },
    { time: "07:15 PM", period: "evening", available: true },
  ];
}

export async function submitBooking(payload: BookingPayload): Promise<{ success: boolean; data?: BookingPayload; error?: string }> {
  // 1. Validation
  if (!payload.locationId) return { success: false, error: "Please select a clinic location." };
  if (!payload.treatmentSlug) return { success: false, error: "Please choose a treatment." };
  if (!payload.appointmentDate) return { success: false, error: "Please select a consultation date." };
  if (!payload.timeSlot) return { success: false, error: "Please choose a time slot." };
  if (!payload.patientName || payload.patientName.trim().length < 2) {
    return { success: false, error: "Please enter your full name." };
  }
  if (!isValidIndianPhone(payload.patientPhone)) {
    return { success: false, error: "Please enter a valid 10-digit Indian phone number (e.g. 9880194820)." };
  }
  if (!isValidEmail(payload.patientEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // 2. Simulated Network Delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 3. Generate Booking Reference ID
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `REV-${new Date().getFullYear()}-${randomNum}`;

  const confirmedBooking: BookingPayload = {
    ...payload,
    id: bookingId,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  // 4. Client-side persistence for demo inspection
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("revilen_demo_bookings") || "[]");
      existing.unshift(confirmedBooking);
      localStorage.setItem("revilen_demo_bookings", JSON.stringify(existing.slice(0, 20)));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  return { success: true, data: confirmedBooking };
}
