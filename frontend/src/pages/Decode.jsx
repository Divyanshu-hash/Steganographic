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
  Eye,
  CheckCircle2,
  MessageSquare,
  Music,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const RESULT_ICONS = {
  TEXT: MessageSquare,
  IMAGE: ImageIcon,
  AUDIO: Music,
  DEFAULT: CheckCircle2,
};

/* -------------------------------------------------------------------------- */
/*                                   COMPONENT                                */
/* -------------------------------------------------------------------------- */

const Decode = () => {
  const [encodedImage, setEncodedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  /* ----------------------------- File Handling ----------------------------- */

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEncodedImage(file);
    setResult(null);
  };

  /* Create & cleanup preview URL */
  useEffect(() => {
    if (!encodedImage) return;

    const url = URL.createObjectURL(encodedImage);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [encodedImage]);

  /* ------------------------------ Form Submit ------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!encodedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an encoded image.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.decode(encodedImage);

      if (!response.success) {
        throw new Error(response.message || "Decoding failed");
      }

      setResult({
        type: response.type,
        content: response.content,
        downloadUrl: response.downloadUrl,
      });

      toast({
        title: "Decoding successful",
        description: "Hidden data has been extracted.",
      });
    } catch (error) {
      toast({
        title: "Decoding failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------ Helpers ---------------------------------- */

  const ResultIcon =
    RESULT_ICONS[result?.type] || RESULT_ICONS.DEFAULT;

  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 pt-24 pb-12">
        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display">
                Decode Hidden Data
              </h1>
              <p className="text-muted-foreground">
                Extract hidden content from encoded images
              </p>
            </div>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload */}
            <div className="space-y-4">
              <Label>Encoded Image</Label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-8 
                           text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Encoded preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {encodedImage?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Upload encoded image</p>
                      <p className="text-sm text-muted-foreground">
                        Select an image with hidden data
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

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full glow-primary"
              disabled={isLoading || !encodedImage}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Decoding...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Decode Image
                </>
              )}
            </Button>
          </form>

          {/* Result */}
          {result && (
            <section className="mt-8 p-6 rounded-xl glass border border-primary/50 glow-primary fade-in">
              <div className="flex items-center gap-3 mb-4">
                <ResultIcon className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">
                  {result.type === "TEXT"
                    ? "Hidden Message Found!"
                    : `Hidden ${result.type} Found!`}
                </h3>
              </div>

              {result.type === "TEXT" && result.content && (
                <div className="bg-background/50 rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap">
                  {result.content}
                </div>
              )}

              {(result.type === "IMAGE" || result.type === "AUDIO") &&
                result.downloadUrl && (
                  <>
                    <p className="text-muted-foreground mb-4">
                      A hidden {result.type.toLowerCase()} file was extracted.
                    </p>
                    <Button asChild className="w-full">
                      <a href={result.downloadUrl} download>
                        <Download className="w-5 h-5" />
                        Download{" "}
                        {result.type === "IMAGE" ? "Image" : "Audio"}
                      </a>
                    </Button>
                  </>
                )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Decode;
