import { readDb, createContact } from '../../utils/readDb';

async function Loader() {
  // Read data here
  const db = await readDb();
  const users = db.contacts || [];
  return { users };
}
export default Loader;

export async function Action() {
  const contact = await createContact();
  return { contact };
}