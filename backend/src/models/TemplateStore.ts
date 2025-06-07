import db from "../db";

/**
 * Inserts or updates template row
 *
 * @param id - Id
 * @param data - data
 * @returns The new/updated row
 */
export async function updateTemplate(
  id: string,
  data: string,
): Promise<any> {
  try {
    const rows = await db("hello_world")
      .insert({ id: id, data: data })
      .onConflict("id")
      .merge()
      .returning("*");
    return rows && rows.length ? rows[0] : { id: rows[0].id, data: rows[0].id };
  } catch (error) {
    console.error("Error inserting/updating template:", error);
    throw error;
  }
}

/**
 * Retrieves template row
 *
 * @param id - the template id
 * @returns The data for the id
 */
export async function getTemplate(id: string): Promise<string | null> {
  try {
    const row = await db("hello_world")
      .select("*")
      .where("hello_world.id", id)
      .first();

    if (row && row.data) {
      console.log("data: ", row.data);
      return row.data;
    } else {
      console.log("No deck found for the user");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving active user deck:", error);
    throw error;
  }
}
