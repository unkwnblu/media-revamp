"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { RiUploadCloud2Line, RiCloseLine, RiImageLine, RiStarLine } from "react-icons/ri";

interface UploadedImage {
  id: string;
  url: string;       // object URL for preview (or existing path)
  file?: File;
  name: string;
  isPrimary?: boolean;
}

interface ImageUploaderProps {
  label?: string;
  hint?: string;
  multiple?: boolean;
  existingImages?: string[]; // existing paths from DB
  primaryImage?: string;     // current thumbnail path
  name?: string;             // hidden input name
}

export default function ImageUploader({
  label = "Images",
  hint,
  multiple = false,
  existingImages = [],
  primaryImage,
  name = "images",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [images, setImages] = useState<UploadedImage[]>(() =>
    existingImages.map((src, i) => ({
      id: `existing-${i}`,
      url: src,
      name: src.split("/").pop() ?? src,
      isPrimary: src === primaryImage || (i === 0 && !primaryImage),
    }))
  );

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const newImages: UploadedImage[] = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .map((file) => ({
          id: `${Date.now()}-${file.name}`,
          url: URL.createObjectURL(file),
          file,
          name: file.name,
          isPrimary: images.length === 0, // first upload becomes primary
        }));

      setImages((prev) => {
        const merged = multiple ? [...prev, ...newImages] : newImages;
        // ensure exactly one primary
        const hasPrimary = merged.some((img) => img.isPrimary);
        if (!hasPrimary && merged.length > 0) merged[0].isPrimary = true;
        return merged;
      });
    },
    [images.length, multiple]
  );

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // if we removed the primary, assign to first remaining
      const stillHasPrimary = filtered.some((img) => img.isPrimary);
      if (!stillHasPrimary && filtered.length > 0) {
        filtered[0] = { ...filtered[0], isPrimary: true };
      }
      return filtered;
    });
  };

  const setPrimary = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, isPrimary: img.id === id }))
    );
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const primaryImg = images.find((img) => img.isPrimary);
  const galleryImgs = images.filter((img) => !img.isPrimary);

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-white/70">
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-purple-400/80 bg-purple-400/10"
            : "border-white/10 hover:border-purple-400/40 hover:bg-white/[0.02]"
        }`}
      >
        <div className={`p-3 rounded-full transition-colors ${isDragging ? "bg-purple-400/20" : "bg-white/[0.04]"}`}>
          <RiUploadCloud2Line size={24} className={isDragging ? "text-purple-300" : "text-white/40"} />
        </div>
        <div className="text-center">
          <p className="text-sm text-white/60">
            <span className="text-purple-400 font-medium">Click to browse</span>
            {" "}or drag & drop
          </p>
          <p className="text-xs text-white/30 mt-1">PNG, JPG, WEBP up to 10MB{multiple ? " · Multiple allowed" : ""}</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {hint && <p className="text-xs text-white/30">{hint}</p>}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          {/* Primary / thumbnail */}
          {primaryImg && (
            <div>
              <p className="text-[10px] tracking-widest text-white/30 uppercase mb-2">
                Thumbnail
              </p>
              <div className="relative group w-full aspect-video rounded-xl overflow-hidden border border-purple-400/30 bg-white/[0.03]">
                <Image
                  src={primaryImg.url}
                  alt={primaryImg.name}
                  fill
                  className="object-cover"
                  unoptimized={!!primaryImg.file}
                />
                {/* Star badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/80 backdrop-blur-sm text-[10px] font-semibold">
                  <RiStarLine size={10} />
                  Primary
                </div>
                {/* Remove */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(primaryImg.id); }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-red-500/80 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <RiCloseLine size={14} />
                </button>
                {/* Filename */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-xs text-white/70 truncate">{primaryImg.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Gallery images */}
          {multiple && galleryImgs.length > 0 && (
            <div>
              <p className="text-[10px] tracking-widest text-white/30 uppercase mb-2">
                Gallery ({galleryImgs.length})
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {galleryImgs.map((img) => (
                  <div
                    key={img.id}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-white/[0.08] bg-white/[0.03]"
                  >
                    <Image
                      src={img.url}
                      alt={img.name}
                      fill
                      className="object-cover"
                      unoptimized={!!img.file}
                    />
                    {/* Set as primary */}
                    <button
                      type="button"
                      onClick={() => setPrimary(img.id)}
                      title="Set as thumbnail"
                      className="absolute top-1 left-1 p-1 rounded-full bg-black/60 hover:bg-purple-500/80 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <RiStarLine size={11} />
                    </button>
                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-red-500/80 text-white/50 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <RiCloseLine size={11} />
                    </button>
                  </div>
                ))}

                {/* Add more tile */}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-white/10 hover:border-purple-400/40 hover:bg-white/[0.02] transition-all flex flex-col items-center justify-center gap-1 text-white/30 hover:text-white/50"
                >
                  <RiImageLine size={18} />
                  <span className="text-[10px]">Add more</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden inputs to carry values on form submit */}
      {images.map((img) => (
        <input key={img.id} type="hidden" name={name} value={img.url} />
      ))}
      {primaryImg && (
        <input type="hidden" name="thumbnail" value={primaryImg.url} />
      )}
    </div>
  );
}
