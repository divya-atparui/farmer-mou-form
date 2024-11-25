"use client";
import { FormData } from "./LandDetailsForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import html2pdf from 'html2pdf.js';
import { Button } from "@/components/ui/button";
import React from 'react';

interface MOUPreviewProps {
  data: Partial<FormData>;

}

export function MOUPreview({ data }: MOUPreviewProps) {
  const { messages } = useLanguage();
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  const handleDownloadPDF = () => {
    if (contentRef.current) {
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'MOU_Document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 1.5,
          letterRendering: true,
          useCORS: true,
          logging: true,
          scrollY: -window.scrollY
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };
      
      html2pdf().set(opt).from(contentRef.current).save();
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <Button 
          onClick={handleDownloadPDF}
          className="mb-4"
        >
          Download PDF
        </Button>
        <div ref={contentRef} className="prose max-w-none dark:prose-invert bg-white p-6 rounded-lg print:p-0 print:shadow-none" style={{ maxWidth: '210mm' }}>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This Memorandum of Understanding (&quot;MoU&quot;) is entered into as of {currentDate} (&quot;Effective Date&quot;) by and between
            </p>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p>
                  <strong>Aurigraph DLT Corporation,</strong> EIN: 85-2762242
                  <br />
                  Registered Office: 4005, 36th Street, Mount Rainer, MD 20712, USA
                  <br />
                  Indian Representative: Instorein Technologies Pvt Ltd.
                  <br />
                  Indian Office: 19, Singapore Gardens, Guballalla Cross, Kanakapura Road, Bangalore, INDIA, 560062
                </p>
              </CardContent>
            </Card>

            <Separator />

            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <p>
                  <strong>AKHILA KARNATAKA SRIGHANDA MATTU VANAKRUSHI BELEGAARARA SANGHA</strong>
                  <br />
                  Registration No: DRB2/SOR/172/2021-2022
                  <br />
                  Address: No. 300, 14th Cross, 10th Main Road, 2nd Stage, Indiranagar, Bengaluru-560038, India
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Landowners Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{messages.preview.landowners.title}</h2>
              {!data.landOwners || data.landOwners.length === 0 ? (
                <Card className="bg-muted/50">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">{messages.preview.landowners.noLandowners}</p>
                    <p className="text-sm">{messages.preview.landowners.addLandowners}</p>
                  </CardContent>
                </Card>
              ) : (
                data.landOwners.map((owner, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline">{messages.preview.landowners.badge} {index + 1}</Badge>
                        {owner.landownerName && <Badge>{owner.landownerName}</Badge>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.landowners.date}</p>
                          <p>{owner.date || '_____________'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.landowners.email}</p>
                          <p>{owner.email || '_____________'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.landowners.mobile}</p>
                          <p>{owner.mobile || '_____________'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.landowners.aadhar}</p>
                          <p>{owner.aadhar || '_____________'}</p>
                        </div>
                       
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">{messages.preview.landowners.signature}</p>
                          <p className="font-medium">{owner.signature || '_____________'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Property Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{messages.preview.propertyDetails.title}</h2>
              {!data.propertyDetails || data.propertyDetails.length === 0 ? (
                <Card className="bg-muted/50">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">{messages.preview.propertyDetails.noProperties}</p>
                    <p className="text-sm">{messages.preview.propertyDetails.addPropertyDetails}</p>
                  </CardContent>
                </Card>
              ) : (
                data.propertyDetails.map((property, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{messages.preview.propertyDetails.badge} {index + 1}</Badge>
                        {property.itemName && <Badge>{property.itemName}</Badge>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.propertyDetails.cropDetails}</p>
                          <p>{property.cropDetails || '_____________'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.propertyDetails.totalArea}</p>
                          <p>{property.totalArea} acres</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.propertyDetails.surveyNumbers}</p>
                          <p>{property.surveyNumbers || '_____________'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{messages.preview.propertyDetails.location}</p>
                          <p>{property.location || '_____________'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Bank Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{messages.preview.bankDetails.title}</h2>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.accountHolder}</p>
                      <p>{data.accountHolder || '_____________'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.accountNumber}</p>
                      <p>{data.accountNumber || '_____________'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.bank}</p>
                      <p>{data.bank || '_____________'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.branch}</p>
                      <p>{data.branch || '_____________'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.ifscCode}</p>
                      <p>{data.ifscCode || '_____________'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{messages.preview.bankDetails.swiftCode}</p>
                      <p>{data.swiftCode || '_____________'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Signatures Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{messages.preview.signatures.title}</h2>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {(!data.landOwners || data.landOwners.length === 0) && (!data.witnesses || data.witnesses.length === 0) ? (
                      <div className="col-span-3 text-center p-8">
                        <p className="text-muted-foreground">{messages.preview.signatures.noSignatures}</p>
                        <p className="text-sm">{messages.preview.signatures.addLandownersAndWitnesses}</p>
                      </div>
                    ) : (
                      <>
                        {data.landOwners?.map((owner, index) => (
                          <div key={index} className="text-center p-4 border rounded">
                            <Badge variant="outline" className="mb-2">{messages.preview.signatures.landownerBadge} {index + 1}</Badge>
                            <p className="font-medium">{owner.landownerName || '_____________'}</p>
                            <p className="text-sm text-muted-foreground">{owner.signature || '_____________'}</p>
                          </div>
                        ))}
                        {data.witnesses?.map((witness, index) => (
                          <div key={index} className="text-center p-4 border rounded">
                            <Badge variant="outline" className="mb-2">{messages.preview.signatures.witnessBadge} {index + 1}</Badge>
                            <p className="font-medium">{witness.name || '_____________'}</p>
                            <p className="text-sm text-muted-foreground">{witness.date || '_____________'}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Badge variant="outline" className="text-lg">
                {messages.preview.aksmvbsMembershipNumber}: {data.aksmvbsMembershipNumber || '_____________'}
              </Badge>
            </div>
          </CardContent>
        </div>
      </div>
    </ScrollArea>
  );
}