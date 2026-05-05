"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useCallback } from "react"

interface TiptapEditorWrapperProps {
  initialContent: string
  onWordCountUpdate?: (count: number) => void
}

export default function TiptapEditorWrapper({
  initialContent,
  onWordCountUpdate,
}: TiptapEditorWrapperProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "开始编写论文...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "tiptap-editor prose prose-sm max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      const count = text.replace(/\s/g, "").length
      onWordCountUpdate?.(count)
    },
  })

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent)
      const text = editor.getText()
      const count = text.replace(/\s/g, "").length
      onWordCountUpdate?.(count)
    }
  }, [editor, initialContent, onWordCountUpdate])

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-full bg-white text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          初始化编辑器...
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="px-8 py-6 min-h-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
