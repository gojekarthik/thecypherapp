"use client";

import { Button } from "@/components/ui/button";
import { useDropzone } from "@uploadthing/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function convertFileToUrl(file: File): string {
    return URL.createObjectURL(file);
  }
  

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const url = convertFileToUrl(acceptedFiles[0]);
      onFieldChange(url);
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center bg-dark-3 h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-5 text-gray-500">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="File upload"
          />
          <h3 className="mb-2 mt-2 text-lg font-semibold">Drag photo here</h3>
          <p className="text-sm mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
}
