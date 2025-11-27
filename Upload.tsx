import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload
    setTimeout(() => {
      setUploaded(true);
      toast({
        title: "Upload successful",
        description: `${file.name} has been processed successfully`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Dataset</h1>
          <p className="text-muted-foreground">
            Upload your telecom customer data (CSV format) for churn analysis
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Upload</CardTitle>
              <CardDescription>
                Select and upload your customer dataset. Ensure it contains columns like customer ID,
                demographics, usage patterns, contract details, and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-colors cursor-pointer"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  {!file ? (
                    <>
                      <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">CSV files only (max 50MB)</p>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-accent" />
                      <p className="text-sm font-medium mb-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {file && (
                  <Button onClick={handleUpload} className="w-full gap-2" size="lg">
                    {uploaded ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Uploaded Successfully
                      </>
                    ) : (
                      <>
                        <UploadIcon className="h-5 w-5" />
                        Upload Dataset
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expected Data Format</CardTitle>
              <CardDescription>Your CSV should include the following columns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Customer ID",
                  "Gender",
                  "Age",
                  "Tenure (months)",
                  "Contract Type",
                  "Monthly Charges",
                  "Total Charges",
                  "Internet Service",
                  "Phone Service",
                  "Payment Method",
                  "Churn (Yes/No)",
                ].map((column) => (
                  <div key={column} className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    <span>{column}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
