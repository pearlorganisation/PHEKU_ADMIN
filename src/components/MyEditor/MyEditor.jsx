import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const MyEditor = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  return (
    <div>
      <Editor
        apiKey="dhm3eu0whan613giuz6tbrnhapiqxbkn4nim37evykzifmar" // Obtain this from https://www.tiny.cloud/
        value={content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
      <div>
        <h3>Editor Content:</h3>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default MyEditor;
