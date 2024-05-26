import { type SchemaTypeDefinition } from 'sanity'
import { post } from './posts'
import { page } from './pages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, page],
}
