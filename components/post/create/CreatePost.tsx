"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/SubmitButton";
import { UploadCloudIcon } from "lucide-react";
import axios from "axios";
import Alert from "@/components/ui/Alert";
import TextArea from "@/components/TextArea";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "@/states/atoms/userAtoms";
import { supabase } from "@/app/lib";


function CreatePost() {
  const [file, setFile] = useState<File>();
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState<string>("");

  const router = useRouter();
  const { email } = useRecoilValue(userDetailsAtom);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("email", email);
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        // Upload the video to Supabase Storage
        const { data, error } = await supabase.storage
          .from("cyphersessions") // Your Supabase bucket name
          .upload(fileName, file, {
            contentType: "video/mp4",
          });

        if (error) throw error;
        const { publicUrl } = supabase.storage
          .from("cyphersessions")
          .getPublicUrl(fileName).data;

        console.log(publicUrl)
        formData.append("fileUrl", publicUrl);
      }

      const response = await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("Post created successfully ✅");
    } catch (error) {
      console.error("Failed to create post:", error);
      setStatus("Failed to create post 🚫");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6"
      >
        <div className="h-[400px] bg-gray-100 rounded-3xl overflow-hidden sm:h-[720px] border border-zinc-300">
          {!preview ? (
            <label
              htmlFor="file"
              className="h-full flex flex-col m-8 gap-4 items-center justify-center cursor-pointer"
            >
              <UploadCloudIcon height={28} width={28} />
              Upload your file here
              <input
                hidden
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".mp4"
                required
              />
            </label>
          ) : (
            <video
              className="w-full h-full object-cover"
              src={preview}
              autoPlay
              loop
            />
          )}
        </div>

        <div className="p-8 flex flex-col gap-6">
          <TextArea
            label="Caption"
            placeholder="Write a cool caption for your post."
            maxLength={144}
            onChange={(e) => setCaption(e.target.value)}
          />
          <SubmitButton disabled={loading}>
            {loading ? "Loading" : "Submit"}
          </SubmitButton>
        </div>
      </form>
      {status && <Alert message={status} />}
    </div>
  );
}

export default CreatePost;
