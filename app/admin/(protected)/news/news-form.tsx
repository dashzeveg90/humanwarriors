"use client";

import { useActionState, useState } from "react";

type FormState = { error: string } | undefined;

const MAX_IMAGES = 10;

export type NewsFormValues = {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
  images: string[];
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
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const currentImages = initial?.images ?? [];

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
        <label htmlFor="images">
          Images (optional, up to {MAX_IMAGES}) — Instagram size, 1080×1350
          (4:5). The first image is the cover.
        </label>

        {currentImages.length > 0 && (
          <div className="admin-image-grid">
            {currentImages.map((src, i) => (
              <div className="admin-image-tile" key={src}>
                <img src={src} alt="" />
                {i === 0 && <span className="admin-image-badge">Cover</span>}
                <input type="hidden" name="current_images" value={src} />
                <label className="admin-image-remove">
                  <input type="checkbox" name="remove_images" value={src} />
                  Remove
                </label>
              </div>
            ))}
          </div>
        )}

        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setNewPreviews((prev) => {
              prev.forEach((url) => URL.revokeObjectURL(url));
              return files.map((file) => URL.createObjectURL(file));
            });
          }}
        />

        {newPreviews.length > 0 && (
          <>
            <p className="admin-hint">
              New images to upload ({newPreviews.length}) — added after the
              current ones:
            </p>
            <div className="admin-image-grid">
              {newPreviews.map((src) => (
                <div className="admin-image-tile" key={src}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </>
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
