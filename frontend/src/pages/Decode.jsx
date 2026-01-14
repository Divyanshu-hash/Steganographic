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
  Eye,
  CheckCircle2,
  MessageSquare,
  Music,
} from 'lucide-react';

const Decode = () => {
  const [encodedImage, setEncodedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setEncodedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!encodedImage) {
      toast({
        title: 'No image selected',
        description: 'Please upload an encoded image.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const apiResult = await api.decode(encodedImage);

    if (apiResult.success) {
      setResult({
        type: apiResult.type,
        content: apiResult.content,
        downloadUrl: apiResult.downloadUrl,
      });
      toast({
        title: 'Decoding successful!',
        description: 'Hidden data has been extracted.',
      });
    } else {
      toast({
        title: 'Decoding failed',
        description: apiResult.message || 'Could not decode the image.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  const getResultIcon = () => {
    switch (result?.type) {
      case 'TEXT':
        return <MessageSquare className="w-6 h-6 text-primary" />;
      case 'IMAGE':
        return <Image className="w-6 h-6 text-primary" />;
      case 'AUDIO':
        return <Music className="w-6 h-6 text-primary" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-primary" />;
    }
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
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Encoded Image Upload */}
            <div className="space-y-4">
              <Label>Encoded Image</Label>
              <div
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="relative border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Encoded preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      {encodedImage && encodedImage.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Image className="w-8 h-8 text-muted-foreground" />
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full glow-primary"
              size="lg"
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

          {/* Result Display */}
          {result && (
            <div className="mt-8 p-6 rounded-xl glass border border-primary/50 glow-primary animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                {getResultIcon()}
                <h3 className="text-lg font-semibold">
                  {result.type === 'TEXT'
                    ? 'Hidden Message Found!'
                    : `Hidden ${result.type} Found!`}
                </h3>
              </div>

              {result.type === 'TEXT' && result.content && (
                <div className="bg-background/50 rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap">
                  {result.content}
                </div>
              )}

              {(result.type === 'IMAGE' || result.type === 'AUDIO') &&
                result.downloadUrl && (
                  <>
                    <p className="text-muted-foreground mb-4">
                      A hidden {result.type.toLowerCase()} file was extracted
                      from the image.
                    </p>
                    <Button asChild className="w-full">
                      <a href={result.downloadUrl} download>
                        <Download className="w-5 h-5" />
                        Download{' '}
                        {result.type === 'IMAGE' ? 'Image' : 'Audio'}
                      </a>
                    </Button>
                  </>
                )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Decode;
