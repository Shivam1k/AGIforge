'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWalletContext } from '@/context/WalletContext';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Model name must be at least 3 characters.",
  }).max(50, {
    message: "Model name must not exceed 50 characters."
  }),
  type: z.enum(["NLP", "Vision", "Other"], {
    required_error: "Please select a model type.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
  file: z.instanceof(File, {
    message: "Please upload a model file.",
  }).refine(file => file.size <= 100 * 1024 * 1024, {
    message: "File size must not exceed 100MB."
  })
});

type FormValues = z.infer<typeof formSchema>;

export default function ModelUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const { isConnected, walletAddress } = useWalletContext();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: undefined,
      description: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to upload a model.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form values:", values);
    
    // In a real implementation, this is where you would:
    // 1. Upload the file to IPFS
    // 2. Save the metadata to a blockchain or database
    
    setIsUploading(false);
    
    toast({
      title: "Model uploaded successfully!",
      description: "Your model has been successfully uploaded to AGIverse.",
    });
    
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter model name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NLP">Natural Language Processing (NLP)</SelectItem>
                  <SelectItem value="Vision">Computer Vision</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your model, including its capabilities, architecture, and any training details..." 
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Model File</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Input
                    type="file"
                    className="hidden"
                    id="fileUpload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...fieldProps}
                  />
                  <label 
                    htmlFor="fileUpload" 
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm font-medium mb-1">
                      {value instanceof File ? value.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Support for model files up to 100MB
                    </p>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            disabled={isUploading || !isConnected}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload Model'
            )}
          </Button>
          
          {!isConnected && (
            <p className="text-sm text-red-500 mt-2 text-center">
              Please connect your wallet to upload a model
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}