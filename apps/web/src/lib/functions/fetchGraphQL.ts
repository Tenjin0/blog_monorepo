"use server"

import { BACKEND_URL } from "../constants"
import { getSession } from "../session"

export interface IFetchGraphQL {
  auth: boolean
}
export const fetchGraphQL = async (query: string, variables={} , opt?: IFetchGraphQL) => {

  const accessToken = opt?.auth ? (await getSession())?.accessToken : null
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": opt?.auth ? `Bearer ${accessToken}` : ""
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
