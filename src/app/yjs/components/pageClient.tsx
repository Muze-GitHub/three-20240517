'use client'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'

import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'

// Importing the provider
import { TiptapCollabProvider } from '@hocuspocus/provider'

export default function TipTap() {
  const doc = new Y.Doc()

  // Connect to your Collaboration server
  const provider = new TiptapCollabProvider({
    name: 'no', // Unique document identifier for syncing. This is your document name.
    appId: 'xk20odm2', // Your Cloud Dashboard AppID or `baseURL` for on-premises
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTY5NzAzMzIsIm5iZiI6MTcxNjk3MDMzMiwiZXhwIjoxNzE3MDU2NzMyLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJ4azIwb2RtMiJ9.gj0eNBT42pa1dampJC0-gXMpDyNUH_8G3wM_ohoteM8', // Your JWT token
    document: doc
  })

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc
      })
    ],
    content: `
      <p>
        This is a radically reduced version of tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `
  })

  return <EditorContent editor={editor} />
}
