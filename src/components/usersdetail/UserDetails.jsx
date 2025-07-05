import { Form, redirect, useFetcher, useLoaderData } from "react-router";
import { deleteContact, readDb, updateContact } from "../../utils/readDb";

export async function Loader({ params }) {
  // Validate contactId to prevent path-injection or invalid access
  const contactId = String(params.contactId);
  console.log(params);

  // Only allow numeric IDs (adjust regex if your IDs are not numeric)
  if (!/^[0-9]+$/.test(contactId)) {
    throw new Response("Invalid contact ID", { status: 400 });
  }
  const db = await readDb();
  const contact = db.contacts.find((c) => String(c.id) === contactId);
  return { contact };
}

// Update Code
export async function ActionUpdate({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/users/${params.contactId}`);
}

// Favorite 
export async function ActionFavourites({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// Delete code action
export async function ActionDelete({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}

import { useState } from "react";

export default function UserDetails() {
  const { contact } = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: contact.name || "",
    phone: contact.phone || "",
    email: contact.email || "",
    profilePic: contact.profilePic || "",
  });

  const handleChange = (e) => {
    // For file input, update profilePic with the file's URL for preview
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: url });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send formData to your backend or update state
    setEditMode(false);
    // Optionally show a success message
  };

  return (
    <div
      id="contact"
      className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/10 rounded-2xl shadow-lg max-w-2xl mx-auto mt-10"
    >
      <div className="flex-shrink-0">
        {!editMode ? (
          <img
            key={contact.id}
            src={contact.profilePic}
            alt={contact.name || "Profile"}
            className="w-[200px] h-[200px] object-cover rounded-2xl border-4 border-blue-200 shadow-xl"
          />
        ) : (
          <>
            <img
              src={formData.profilePic}
              alt={formData.name || "Profile"}
              className="w-[200px] h-[200px] object-cover rounded-2xl border-4 border-slate-200 shadow-xl mb-2 p-2"
            />
          </>
        )}
      </div>
      <div className="flex flex-col justify-between h-full w-full max-w-md">
        <div className="mb-6">
          <div className="flex items-center gap-4">
            {editMode ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full"
              >
                <input
                  className="text-2xl font-bold text-blue-900 bg-white/80 rounded px-2 py-1 mb-2"
                  name="name"
                  type="text"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <input
                  className="text-lg text-blue-900 bg-white/80 rounded px-2 py-1 mb-2"
                  name="phone"
                  type="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                <input
                  className="text-lg text-blue-900 bg-white/80 rounded px-2 py-1 mb-2"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className="text-lg text-blue-900 bg-white/80 rounded px-2 py-1 mb-2"
                  type="file"
                  accept="image/png, image/jpeg"
                  name="profilePic"
                  onChange={handleChange}
                  placeholder={
                    formData.profilePic
                      ? formData.profilePic
                      : "Profile Pic File"
                  }
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="py-1 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="py-1 px-4 rounded bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-blue-100">
                  {contact?.id ? contact?.name : <i>No Name</i>}
                </h1>
                <Favorite contact={contact} />
              </>
            )}
          </div>
          {!editMode && (
            <>
              <div className="mb-2 text-lg text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm-4 4v4m0 4h.01" />
                </svg>
                {contact.phone || (
                  <span className="italic text-gray-400">No phone</span>
                )}
              </div>
              <div className="mb-2 text-lg text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" />
                </svg>
                {contact.email || (
                  <span className="italic text-gray-400">No email</span>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-auto">
          {!editMode && (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="w-full cursor-pointer py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
              >
                Edit
              </button>
              <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                  if (
                    !confirm("Please confirm you want to delete this record.")
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  className="w-full cursor-pointer py-2 px-4 rounded-lg bg-red-700  hover:bg-red-600 text-white font-semibold shadow transition"
                >
                  Delete
                </button>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


// existing code

function Favorite({ contact }) {
  const fetcher = useFetcher();

  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
         className="text-yellow-400 text-4xl"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
