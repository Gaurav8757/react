import { Form, Link, Outlet, useLoaderData } from "react-router";
function Sidebar() {
  const { users } = useLoaderData();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400">
      {/* Sidebar */}
      <aside className="w-72 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-2xl flex flex-col p-6 gap-8 z-20 fixed top-0 left-0 h-full">
        <div className="flex items-center gap-3 mb-6">
          <svg
            width="36"
            height="36"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="12" fill="#6366f1" />
            <path
              d="M16 32L32 16M16 16h16v16"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow">
            React Users
          </h1>
        </div>
        <Form
          id="search-form"
          role="search"
          className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 mb-2"
        >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search..."
            type="search"
            name="q"
            className="flex-1 bg-transparent outline-none text-white placeholder-white/70 text-base"
          />
          <button
            type="submit"
            className="text-white hover:text-blue-300 transition"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </Form>

        {/* new form add page */}
        <Form method="post">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition cursor-pointer"
          >
            {" "}
            + New Contact
          </button>
        </Form>

        <nav
          className="flex-1 pr-1 overflow-y-auto [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-blue-50
  [&::-webkit-scrollbar-thumb]:bg-blue-300
  dark:[&::-webkit-scrollbar-track]:bg-blue-700
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-50"
        >
          {users.length ? (
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user.id}>
                  <Link
                    to={`users/${user.id}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition font-medium"
                  >
                    <img
                      src={
                        user.profilePic ||
                        "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={user.name || "Profile"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/40 shadow"
                    />
                    <span>{user.name || <i>No Name</i>}</span>
                    {user.favorite && (
                      <span className="ml-1 text-yellow-300">★</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        <div className="mt-auto text-xs text-white/60 text-center pt-2">
          &copy; {new Date().getFullYear()} React Users
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 ml-72">
        {/* ALL CHILDS RENDER HERE */}
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;

// export async function Loader() {
//   const db = await readDb();
//   const users = db.contacts || [];
//   return { users };
// }
