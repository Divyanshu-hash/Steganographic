import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

const ImageToImage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [hiddenImage, setHiddenImage] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState(null);
  const [hiddenPreviewUrl, setHiddenPreviewUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const coverInputRef = useRef(null);
  const hiddenInputRef = useRef(null);

  const { toast } = useToast();

  /* ----------------------------- File Handling ----------------------------- */

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    setDownloadUrl(null);
  };

  const handleHiddenChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHiddenImage(file);
    setDownloadUrl(null);
  };

  /* -------------------------- Preview (Memory Safe) ------------------------- */

  useEffect(() => {
    if (!coverImage) return;

    const url = URL.createObjectURL(coverImage);
    setCoverPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  useEffect(() => {
    if (!hiddenImage) return;

    const url = URL.createObjectURL(hiddenImage);
    setHiddenPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [hiddenImage]);

  /* ------------------------------ Submit ---------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !hiddenImage) {
      toast({
        title: "Missing files",
        description: "Please provide both a cover image and a hidden image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await api.encodeImage(coverImage, hiddenImage);

      if (!result?.success || !result.downloadUrl) {
        throw new Error(
          result?.message || "Encoding failed."
        );
      }

      setDownloadUrl(result.downloadUrl);

      toast({
        title: "Encoding successful!",
        description: "Your image has been hidden successfully.",
      });
    } catch (error) {
      toast({
        title: "Encoding failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 pt-24 pb-12">
        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground 
                     hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <ImageIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display">
                Image to Image
              </h1>
              <p className="text-muted-foreground">
                Hide an image within another image
              </p>
            </div>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image */}
            <div className="space-y-4">
              <Label>Cover Image</Label>
              <div
                onClick={() => coverInputRef.current?.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-6 
                           text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {coverPreviewUrl ? (
                  <div className="space-y-3">
                    <img
                      src={coverPreviewUrl}
                      alt="Cover preview"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {coverImage?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <ImageIcon className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Upload cover image</p>
                      <p className="text-sm text-muted-foreground">
                        The image that will contain the hidden data
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Hidden Image */}
            <div className="space-y-4">
              <Label>Hidden Image</Label>
              <div
                onClick={() => hiddenInputRef.current?.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-6 
                           text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {hiddenPreviewUrl ? (
                  <div className="space-y-3">
                    <img
                      src={hiddenPreviewUrl}
                      alt="Hidden preview"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {hiddenImage?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <ImageIcon className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Upload image to hide</p>
                      <p className="text-sm text-muted-foreground">
                        This image will be embedded in the cover
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={hiddenInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleHiddenChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full glow-primary"
              disabled={isLoading || !coverImage || !hiddenImage}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Encoding...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Encode Image
                </>
              )}
            </Button>
          </form>

          {/* Success */}
          {downloadUrl && (
            <section className="mt-8 p-6 rounded-xl glass border border-primary/50 glow-primary fade-in">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">
                  Encoding Complete!
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Your image has been successfully hidden.
              </p>
              <Button asChild className="w-full">
                <a href={downloadUrl} download>
                  <Download className="w-5 h-5" />
                  Download Encoded Image
                </a>
              </Button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageToImage;
