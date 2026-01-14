import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Upload,
  Download,
  Loader2,
  Image,
  Music,
  CheckCircle2,
} from 'lucide-react';

const AudioToImage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const coverInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const { toast } = useToast();

  const handleCoverChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setDownloadUrl(null);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAudioFile(file);
      setDownloadUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage || !audioFile) {
      toast({
        title: 'Missing files',
        description: 'Please provide both files.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const result = await api.encodeAudio(coverImage, audioFile);

    if (result.success && result.downloadUrl) {
      setDownloadUrl(result.downloadUrl);
      toast({
        title: 'Encoding successful!',
        description: 'Your audio has been hidden.',
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
              <Music className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display">
                Audio to Image
              </h1>
              <p className="text-muted-foreground">
                Embed audio files within an image
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image Upload */}
            <div className="space-y-4">
              <Label>Cover Image</Label>
              <div
                onClick={() => coverInputRef.current && coverInputRef.current.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {coverPreview ? (
                  <div className="space-y-3">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="max-h-40 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {coverImage && coverImage.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Image className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Upload cover image</p>
                      <p className="text-sm text-muted-foreground">
                        The image that will contain the audio
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

            {/* Audio Upload */}
            <div className="space-y-4">
              <Label>Audio File</Label>
              <div
                onClick={() => audioInputRef.current && audioInputRef.current.click()}
                className="relative border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {audioFile ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <Music className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {audioFile.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Music className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Upload audio file</p>
                      <p className="text-sm text-muted-foreground">
                        MP3, WAV, or other audio formats
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={audioInputRef}
                  type="file"
                  accept=".mp3,.wav,.mpeg,.ogg,audio/*"
                  onChange={handleAudioChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full glow-primary"
              size="lg"
              disabled={isLoading || !coverImage || !audioFile}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Encoding...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Encode Audio
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
                Your audio has been successfully hidden.
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

export default AudioToImage;
