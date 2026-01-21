"use client";

interface SignOutButtonProps {
  onSignOut: () => void;
  isSignedIn: boolean;
}

export function SignOutButton({ onSignOut, isSignedIn }: SignOutButtonProps) {
  if (!isSignedIn) return null;

  return (
    <button
      className="px-4 py-2 rounded bg-white text-secondary border border-gray-200 font-semibold hover:bg-gray-50 hover:text-secondary-hover transition-colors shadow-sm hover:shadow"
      onClick={onSignOut}
    >
      Sign out
    </button>
  );
}
