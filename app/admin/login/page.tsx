"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, undefined);

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p className="sub">Sign in to manage news, players, and coaches.</p>
        {state?.error && <p className="admin-error">{state.error}</p>}
        <form action={formAction} className="admin-form">
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="admin-actions">
            <button
              type="submit"
              className="admin-btn admin-btn-solid"
              disabled={pending}
            >
              {pending ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
