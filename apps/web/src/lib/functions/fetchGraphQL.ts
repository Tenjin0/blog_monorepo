import { inspect } from "util"
import { BACKEND_URL } from "../constants"

export const fetchGraphQL = async (query: string, variables={} ) => {
  console.log("fetchGraphQL", variables)
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const result = await response.json()

  if (result.errors) {
    return { errors: result.errors}
    // throw new Error('Failed to fetch the data from Graphql')
  }
  return result.data

}
