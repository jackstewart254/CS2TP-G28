import { NextRequest, NextResponse } from "next/server";

const supportedLanguages = ["en", "es", "fr", "de"];
const allowedThemes = ["light", "dark"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { notifications, language, theme } = body as {
      notifications?: boolean;
      language?: string;
      theme?: string;
    };

    if (typeof notifications !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Notification preference must be true or false." },
        { status: 400 },
      );
    }

    if (language && !supportedLanguages.includes(language)) {
      return NextResponse.json(
        { success: false, message: "Language not supported. Choose English, Spanish, French, or German." },
        { status: 400 },
      );
    }

    if (theme && !allowedThemes.includes(theme)) {
      return NextResponse.json(
        { success: false, message: "Theme must be either light or dark." },
        { status: 400 },
      );
    }

    const summary = `Preferences updated. Notifications ${notifications ? "enabled" : "disabled"}, language ${
      language ?? "unchanged"
    }${theme ? `, theme ${theme}` : ""}.`;

    return NextResponse.json({
      success: true,
      message: summary,
      data: { notifications, language, theme },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unable to save preferences right now." },
      { status: 400 },
    );
  }
}
