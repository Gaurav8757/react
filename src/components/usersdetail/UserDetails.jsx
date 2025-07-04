
import { Form, useLoaderData } from "react-router";
import { readDb } from "../../utils/readDb";

export async function Loader({ params }) {
  // Fetch all contacts and find the one with the matching id
  const db = await readDb();
  const contact = db.contacts.find(c => String(c.id) === String(params.contactId));
  return { contact };
}



export default function UserDetails() {
  const { contact } = useLoaderData();


  return (
    <div id="contact">
      <div>
        <img
          key={contact.id}
          src={
            contact.profilePic
          }
        />
      </div>

      <div>
        <h1>
          {contact.id ? (
            <>
              {contact.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}



