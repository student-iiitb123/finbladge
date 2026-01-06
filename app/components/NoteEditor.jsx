"use client";

import React, { useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Table as TableIcon,
  Columns,
  Rows,
  Trash2,
} from "lucide-react";

import { Button } from "../components/Button";
import { cn } from "../_lib/utils";

/* ---------------- Toolbar ---------------- */

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  const colorInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const ToggleButton = ({
    icon: Icon,
    onClick,
    isActive,
    label,
    disabled = false,
  }) => (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn(
        "h-8 w-8 p-2",
        isActive && "bg-primary/10 text-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "");
    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [editor]
  );

  return (
    <div className="flex flex-wrap gap-1 rounded-t-md border border-b-0 bg-gray-50 p-2">
      <ToggleButton label="Bold" icon={Bold} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} />
      <ToggleButton label="Italic" icon={Italic} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} />
      <ToggleButton label="Underline" icon={UnderlineIcon} onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} />

      <ToggleButton label="H1" icon={Heading1} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} />
      <ToggleButton label="H2" icon={Heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} />
      <ToggleButton label="H3" icon={Heading3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} />

      <ToggleButton label="Bullet List" icon={List} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} />
      <ToggleButton label="Ordered List" icon={ListOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} />

      <ToggleButton label="Align Left" icon={AlignLeft} onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} />
      <ToggleButton label="Align Center" icon={AlignCenter} onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} />
      <ToggleButton label="Align Right" icon={AlignRight} onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} />

      <ToggleButton label="Link" icon={LinkIcon} onClick={addLink} isActive={editor.isActive("link")} />

      <Button variant="ghost" size="icon" onClick={() => colorInputRef.current.click()}>
        <Palette className="h-4 w-4" />
        <input
          ref={colorInputRef}
          type="color"
          className="hidden"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        />
      </Button>

      <Button variant="ghost" size="icon" onClick={() => fileInputRef.current.click()}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

      <ToggleButton label="Table" icon={TableIcon} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} isActive={editor.isActive("table")} />
      <ToggleButton label="Add Column" icon={Columns} onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()} />
      <ToggleButton label="Add Row" icon={Rows} onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()} />
      <ToggleButton label="Delete Table" icon={Trash2} onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()} />
    </div>
  );
};

/* ---------------- Editor ---------------- */

const NoteEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  return (
    <div className="rounded-md border">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="p-4 min-h-[250px]" />
    </div>
  );
};

export default NoteEditor;
