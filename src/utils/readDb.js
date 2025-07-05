// Utility to read db.json in Vite/React (dev only)
export async function readDb() {
  const response = await fetch('/src/utils/db.json');
  if (!response.ok) throw new Error('Failed to fetch db.json');
  return response.json();
}

export async function createContact({request, params}){
    
}

export async function updateContact({request, params}){
    
}

export async function deleteContact({params}){
    
}