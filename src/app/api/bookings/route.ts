import { NextRequest, NextResponse } from "next/server";
import { submitBooking } from "@/lib/services/bookingService";
import { BookingPayload } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: BookingPayload = await req.json();
    const result = await submitBooking(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      booking: result.data,
      message: "Appointment confirmed successfully.",
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while scheduling your appointment." },
      { status: 500 }
    );
  }
}
