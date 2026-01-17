import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  Image as ImageIcon,
  Type,
  CheckCircle2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

const TextToImage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  /* ----------------------------- File Handling ----------------------------- */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverImage(file);
    setDownloadUrl(null);
  };

  /* -------------------------- Preview (Memory Safe) ------------------------- */

  useEffect(() => {
    if (!coverImage) return;

    const url = URL.createObjectURL(coverImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  /* ------------------------------ Submit ---------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !message.trim()) {
      toast({
        title: "Missing fields",
        description:
          "Please provide both a cover image and a secret message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await api.encodeText(coverImage, message.trim());

      if (!result?.success || !result.downloadUrl) {
        throw new Error(
          result?.message || "Encoding failed."
        );
      }

      setDownloadUrl(result.downloadUrl);

      toast({
        title: "Encoding successful!",
        description: "Your message has been hidden in the image.",
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
              <Type className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display">
                Text to Image
              </h1>
              <p className="text-muted-foreground">
                Hide secret text within an image
              </p>
            </div>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image */}
            <div className="space-y-4">
              <Label>Cover Image</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-8 
                           text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {coverImage?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Click to upload cover image
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <Label htmlFor="message">Secret Message</Label>
              <Textarea
                id="message"
                placeholder="Enter the message you want to hide..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-background/50 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {message.length} characters
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full glow-primary"
              disabled={isLoading || !coverImage || !message.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Encoding...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Encode Message
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
                Your message has been successfully hidden in the image.
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

export default TextToImage;
