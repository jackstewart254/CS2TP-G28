import { NextRequest, NextResponse } from "next/server";

const MIN_PASSWORD_LENGTH = 8;
const VALID_OLD_PASSWORD = "correct-password";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oldPassword, newPassword, confirmPassword } = body as {
      oldPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    };

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Please fill in all password fields." },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Passwords do not match." }, { status: 400 });
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { success: false, message: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
        { status: 400 },
      );
    }

    if (oldPassword !== VALID_OLD_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect. Use 'correct-password' for this demo." },
        { status: 403 },
      );
    }

    if (oldPassword === newPassword) {
      return NextResponse.json(
        { success: false, message: "New password must be different from the old password." },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unable to update password right now." },
      { status: 400 },
    );
  }
}
