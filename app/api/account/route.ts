import { NextRequest, NextResponse } from "next/server";

type AccountProfile = {
  name: string;
  email: string;
  username: string;
  phone: string;
  notifications: boolean;
  language: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let mockProfile: AccountProfile = {
  name: "",
  email: "",
  username: "",
  phone: "",
  notifications: false,
  language: "en",
};

function invalidProfilePayload(body: Partial<AccountProfile>) {
  if (!body.name || !body.email || !body.username) {
    return "Name, email, and username are required.";
  }
  if (!emailRegex.test(body.email)) {
    return "Please provide a valid email address.";
  }
  return null;
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockProfile,
    message: "Profile loaded successfully.",
  });
}

export async function PUT(request: NextRequest) {
  try {
    const payload = (await request.json()) as Partial<AccountProfile>;
    const validationError = invalidProfilePayload(payload);
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 });
    }

    mockProfile = {
      ...mockProfile,
      ...payload,
      phone: payload.phone ?? "",
      notifications: payload.notifications ?? mockProfile.notifications,
      language: payload.language ?? mockProfile.language,
    };

    return NextResponse.json({
      success: true,
      message: "Profile saved successfully.",
      data: mockProfile,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to save profile. Please check your input and try again.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  mockProfile = {
    ...mockProfile,
    name: "",
    email: "",
    username: "",
    phone: "",
  };

  return NextResponse.json({
    success: true,
    message: "Account deletion requested. Your account will be removed shortly.",
  });
}
