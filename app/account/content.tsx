"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type UserMetadata = {
  name: string;
  email: string;
  username: string;
  phone: string;
  notifications?: boolean;
  language?: string;
};

export default function Account() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [user, setUser] = useState<UserMetadata>({
    name: "",
    email: "",
    username: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("en");

  function markSuccess(message: string) {
    setError(null);
    setInfo(message);
  }

  function markFailure(message: string) {
    setError(message);
    setInfo(null);
  }

  async function loadUser() {
    try {
      const res = await fetch("/api/account", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not load user data");
      }
      setUser({
        name: data.data?.name || "",
        email: data.data?.email || "",
        username: data.data?.username || "",
        phone: data.data?.phone || "",
      });
      setNotifications(Boolean(data.data?.notifications));
      setLanguage(data.data?.language || "en");
      markSuccess(data.message || "Profile refreshed.");
    } catch (err: any) {
      markFailure(err.message || "Unable to load account details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  function refresh() {
    setLoading(true);
    loadUser();
  }

  async function saveProfile() {
    try {
      const res = await fetch("/api/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          notifications,
          language,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to save profile.");
      }
      setUser({
        name: data.data?.name || user.name,
        email: data.data?.email || user.email,
        username: data.data?.username || user.username,
        phone: data.data?.phone || user.phone,
      });
      markSuccess(data.message || "Profile saved.");
    } catch (err: any) {
      markFailure(err.message || "Unable to save profile.");
    }
  }

  async function updatePassword() {
    try {
      if (!oldPassword || !newPassword || !confirmPassword) {
        markFailure("Please complete all password fields.");
        return;
      }
      if (newPassword !== confirmPassword) {
        markFailure("New password and confirmation do not match.");
        return;
      }

      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to update password.");
      }
      markSuccess(data.message || "Password updated.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      markFailure(err.message || "Unable to update password.");
    }
  }

  async function persistPreferences(update: Partial<{ notifications: boolean; language: string; theme: string }>) {
    try {
      const res = await fetch("/api/account/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notifications: update.notifications ?? notifications,
          language: update.language ?? language,
          theme: update.theme ?? (isDark ? "dark" : "light"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Unable to update preferences.");
      }
      markSuccess(data.message || "Preferences updated.");
    } catch (err: any) {
      markFailure(err.message || "Unable to update preferences.");
    }
  }

  function toggleDarkMode(value: boolean) {
    setTheme(value ? "dark" : "light");
    persistPreferences({ theme: value ? "dark" : "light" });
  }

  function toggleNotifications(value: boolean) {
    setNotifications(value);
    persistPreferences({ notifications: value });
  }

  function changeLanguage(value: string) {
    setLanguage(value);
    persistPreferences({ language: value });
  }

  async function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        const res = await fetch("/api/account", { method: "DELETE" });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Unable to delete account.");
        }
        markSuccess(data.message || "Account deletion requested.");
      } catch (err: any) {
        markFailure(err.message || "Unable to delete account.");
      }
    }
  }

  function logout() {
    window.location.href = "/auth";
  }

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Loading account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl space-y-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">Account</p>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">Manage your personal details and password.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={refresh}
              className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-500/70 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-100">
            {error}
          </div>
        )}

        {info && !error && (
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-500/70 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-100">
            {info}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Profile Information</p>
                <button
                  onClick={saveProfile}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
                >
                  Save
                </button>
              </div>

              <div className="space-y-3">
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Change Password</p>
                <button
                  onClick={updatePassword}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700"
                >
                  Update
                </button>
              </div>

              <div className="space-y-3">
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-6 h-full">
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Account Settings</p>
              <div className="space-y-3">
                <label className="flex items-center justify-between text-sm">
                  <span>Dark mode</span>
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-blue-600"
                    checked={isDark}
                    onChange={(e) => toggleDarkMode(e.target.checked)}
                  />
                </label>
                <label className="flex items-center justify-between text-sm">
                  <span>Notification settings</span>
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-blue-600"
                    checked={notifications}
                    onChange={(e) => toggleNotifications(e.target.checked)}
                  />
                </label>
                <div className="flex flex-col gap-1 text-sm">
                  <span>Language</span>
                  <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="flex-1" />

            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">Danger Zone</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={deleteAccount}
                  className="flex-1 rounded-md bg-red-500 text-white py-2 font-semibold shadow-sm hover:bg-red-600"
                >
                  Delete account
                </button>
                <button
                  onClick={logout}
                  className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 py-2 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
