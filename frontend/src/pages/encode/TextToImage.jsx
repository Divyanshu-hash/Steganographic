import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  Image,
  Type,
  CheckCircle2,
} from 'lucide-react';

const TextToImage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setDownloadUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !message.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please provide both a cover image and a message.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const result = await api.encodeText(coverImage, message);

    if (result.success && result.downloadUrl) {
      setDownloadUrl(result.downloadUrl);
      toast({
        title: 'Encoding successful!',
        description: 'Your message has been hidden in the image.',
      });
    } else {
      toast({
        title: 'Encoding failed',
        description: result.message || 'Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container px-4 pt-24 pb-12">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image Upload */}
            <div className="space-y-4">
              <Label>Cover Image</Label>
              <div
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="relative border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {coverPreview ? (
                  <div className="space-y-4">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {coverImage && coverImage.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Image className="w-8 h-8 text-muted-foreground" />
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

            {/* Message Input */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full glow-primary"
              size="lg"
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

          {/* Success State */}
          {downloadUrl && (
            <div className="mt-8 p-6 rounded-xl glass border border-primary/50 glow-primary animate-fade-in">
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TextToImage;
