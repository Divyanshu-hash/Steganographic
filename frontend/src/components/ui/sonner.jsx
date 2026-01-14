import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-background text-foreground border",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
