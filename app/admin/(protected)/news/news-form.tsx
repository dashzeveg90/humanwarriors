"use client";

import { useActionState } from "react";

type FormState = { error: string } | undefined;

export type NewsFormValues = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  img: string;
  featured: boolean;
};

export default function NewsForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initial?: Partial<NewsFormValues>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="admin-form">
      {state?.error && <p className="admin-error">{state.error}</p>}

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="tag">Tag</label>
          <input
            id="tag"
            name="tag"
            defaultValue={initial?.tag}
            placeholder="Season, Players, Community…"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initial?.date}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={initial?.title}
          required
        />
      </div>

      <div className="admin-field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={initial?.excerpt}
          required
        />
      </div>

      <div className="admin-field">
        <label htmlFor="body">Full Article (shown in the detail popup)</label>
        <textarea id="body" name="body" defaultValue={initial?.body} />
      </div>

      <div className="admin-field">
        <label htmlFor="image">Image (optional)</label>
        {initial?.img && (
          <div className="admin-image-preview">
            <img src={initial.img} alt="" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" />
        <input type="hidden" name="current_img" value={initial?.img ?? ""} />
        {initial?.img && (
          <div className="admin-field admin-field-check">
            <input id="remove_image" name="remove_image" type="checkbox" />
            <label htmlFor="remove_image">Remove current image</label>
          </div>
        )}
      </div>

      <div className="admin-field admin-field-check">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={initial?.featured}
        />
        <label htmlFor="featured">Featured (shows as the large story)</label>
      </div>

      <div className="admin-actions">
        <button
          type="submit"
          className="admin-btn admin-btn-solid"
          disabled={pending}
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
