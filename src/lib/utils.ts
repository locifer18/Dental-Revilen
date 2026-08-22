import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return /^[6-9]\d{9}$/.test(cleaned);
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return /^91[6-9]\d{9}$/.test(cleaned);
  }
  return false;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function calculateEMIMonthly(principal: number, months: number = 12): number {
  if (months <= 0) return principal;
  return Math.round(principal / months);
}

export function getWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function getGoogleCalendarUrl({
  title,
  description,
  location,
  startDate,
  timeSlot,
}: {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  timeSlot: string;
}): string {
  // Convert time slot like "10:30 AM" to approximate ISO time
  const [time, period] = timeSlot.split(" ");
  const [hoursStr, minsStr] = (time || "10:00").split(":");
  let hours = parseInt(hoursStr || "10", 10);
  const mins = parseInt(minsStr || "00", 10);
  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const startIso = `${startDate.replace(/-/g, "")}T${String(hours).padStart(2, "0")}${String(mins).padStart(2, "0")}00`;
  const endHours = hours + 1;
  const endIso = `${startDate.replace(/-/g, "")}T${String(endHours).padStart(2, "0")}${String(mins).padStart(2, "0")}00`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
}
