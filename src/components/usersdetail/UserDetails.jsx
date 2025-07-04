import { Form, useLoaderData } from "react-router";
import { readDb } from "../../utils/readDb";

export async function Loader({ params }) {
  const user = await readDb(params.contacts);
  console.log(user);
  return { user };
 
  
}


export default function UserDetails() {
  const { users } = useLoaderData();

console.log();

  return (
    <div id="users">
      <div>
        <img
          key={users.id}
          src={
            users.profilePic ||
            `https://robohash.org/${users.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {users.first || users.last ? (
            <>
              {users.first} {users.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite users={users} />
        </h1>

        {users.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${users.twitter}`}
            >
              {users.twitter}
            </a>
          </p>
        )}

        {users.notes && <p>{users.notes}</p>}

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

function Favorite({ users }) {
  const favorite = users.favorite;
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



