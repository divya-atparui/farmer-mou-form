import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JsonDataViewProps {
  data: LandDetailsResponse | null;
}

const JsonDataView: React.FC<JsonDataViewProps> = ({ data }) => {
  if (!data) return null;

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-6 p-4">
        {/* Basic Information */}
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="text-xl p-4 space-y-4">
              <div>
                This Memorandum of Understanding ("MoU") is entered into as of{" "}
                <span className="font-bold">{data.dateCreated}</span>{" "}
                ("Effective Date") by and between{" "}
                <span className="font-bold">
                  **Aurigraph DLT Corporation,**
                </span>
                EIN: 85-2762242 with its registered office at{" "}
                <span className="font-bold">
                  4005, 36th Street, Mount Rainer, MD 20712, USA
                </span>
                , and its Indian representative,{" "}
                <span className="font-bold">
                  Instorein Technologies Pvt Ltd.
                </span>{" "}
                With its registered offices at{" "}
                <span className="font-bold">
                  19, Singapore Gardens, Guballalla Cross, Kanakapura Road,
                  Bangalore, INDIA, 560062
                </span>
              </div>
              <div className="text-center text-2xl font-bold py-3">AND</div>
              <div className="p-2">
                <span className="font-bold">
                  AKHILA KARNATAKA SRIGHANDA MATTU VANAKRUSHI BELEGAARARA
                  SANGHA,
                </span>
                <span className="font-bold">
                  {" "}
                  Registration no # DRB2/SOR/172/2021-2022
                </span>
                with its registered offices at No. 300, 14th Cross, 10th Main
                Road, 2nd Stage, Indiranagar, Bengaluru-560038, India, hereafter
                known as <span className="font-bold">AKSMVBS</span>
              </div>
              <div className="text-center text-2xl font-bold py-3">AND</div>
              <div>
                The Landowner or Grower or farmer is{" "}
                <span className="font-bold">{data.accountHolder}</span>, bearing{" "}
                <span className="font-bold">
                  Addhar No
                  {data.landOwners[0].aadhar}
                </span>{" "}
                as ID{" "}
                <span className="font-bold">
                  {data.landOwners[0].landownerName}
                </span>
                , residing at{" "}
                <span className="font-bold">{data.landOwners[0].address}</span>
                ,hereafter referred to as (&quot;Landowner&quot;) is having own
                land/field or farming activities or field in the Aurigraph
                proposed carbon project
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 m-4">1. Purpose</div>

        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />

          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside  space-y-2">
                <li>
                  a. The purpose of this MoU is to establish the framework for
                  collaboration between AKSMVBS  and Aurigraph for the
                  implementation of a voluntary carbon project aimed at
                  generating carbon credits through Aurigraph Carbon Markets in
                  Karnataka{" "}
                </li>
                <li>
                  b. The Landowner, AKSMVBS, Aurigraph and its
                  assignees/affiliated partners, the Carbon Markets and the
                  Buyer will jointly digitally sign a digital “smart contract”
                  for transparency in transactions.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 m-4">
          2. Properties Under Construction
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <p className="font-bold">
                All properties under this MoU will be included in Appendix with
                the property and ownership details
              </p>
              <div className="text-2xl font-bold py-3 text-center">
                VALIDITY
              </div>
              <ol className="list-inside space-y-2">
                <li>
                  a. This MoU shall be valid only if the enrolled
                  field/land/tree/farmers possess all the necessary and
                  eligibility requirement specified by Aurigraph from the
                  effective date. During this period, Aurigraph shall conduct a
                  feasibility study, baseline assessment, field verification,
                  due diligence, detect and evaluation of the carbon pool
                  potential of proposed field/land/tree to finalize the
                  definitive agreement. The period between this MoU to
                  definitive agreement would be up to 1 year depending upon the
                  extent of land under consideration and environmental
                  conditions.
                </li>
                <li>
                  b. Unless terminated earlier, this agreement is valid until
                  the life cycle of the project which is till 40 years while the
                  crediting period will be till 40 years from the effective
                  date. The life cycle of the project would mean to include the
                  period starting the definitive agreement thru to issuance of
                  the carbon credit, realization and continuous monitoring of
                  the available carbon credit for a period of 40 years.
                </li>
                <li>
                  c. Minimum plot size :
                  <span className="font-bold">1 acre</span>
                </li>
              </ol>
              <div />
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 ">
          3. Terms of Collaboration with AKSMVBS
        </div>

        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a. AKSMVBS will be the liaison between the farmers and
                  landowners and Aurigraph, introduced by AKSMVBS .
                </li>
                <li>
                  b. AKSMVBS will verify farmers and their credentials along
                  with their property details, and any changes, thereafter, for
                  the period of the agreement
                </li>
                <li>
                  c. AKSMVBS will assist farmers to sign up to Aurigraph Carbon
                  Markets
                </li>{" "}
                <li>
                  d. AKSMVBS will be arbitrate any disputes, if any, between
                  farmers and Aurigraph, within the realm of the Carbon Credits
                  market norms and practices.
                </li>{" "}
                <li>
                  e. AKSMVBS will liaison between Aurigraph and Government of
                  Karnataka on all major Carbon credits initiatives of Aurigraph
                </li>
                <li>
                  f. AKSMVBS will partner with Aurigraph for the full period of
                  the engagement with farmers in advising and training farmers
                  in best practices for conservation as per accepted practices
                </li>
                <li>
                  g. Both parties are responsible for their respective
                  regulatory compliances, tax and related issues.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              <Badge variant="outline">ID: {data.id}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Account Holder</p>
              <p className="text-sm text-muted-foreground">
                {data.accountHolder}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Account Number</p>
              <p className="text-sm text-muted-foreground">
                {data.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Bank</p>
              <p className="text-sm text-muted-foreground">{data.bank}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Branch</p>
              <p className="text-sm text-muted-foreground">{data.branch}</p>
            </div>
            <div>
              <p className="text-sm font-medium">IFSC Code</p>
              <p className="text-sm text-muted-foreground">{data.ifscCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Swift Code</p>
              <p className="text-sm text-muted-foreground">{data.swiftCode}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Membership Number</p>
              <p className="text-sm text-muted-foreground">
                {data.aksmvbsMembershipNumber}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Date Created</p>
              <p className="text-sm text-muted-foreground">
                {data.dateCreated}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Land Owners */}
        <Card>
          <CardHeader>
            <CardTitle>Land Owners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.landOwners.map((owner, index) => (
              <div key={owner.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Land Owner {index + 1}</h3>
                  <Badge variant="outline">ID: {owner.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.landownerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mobile</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.mobile}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aadhar</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.aadhar}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.propertyDetails.map((property, index) => (
              <div key={property.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Property {index + 1}</h3>
                  <Badge variant="outline">ID: {property.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Item Name</p>
                    <p className="text-sm text-muted-foreground">
                      {property.itemName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {property.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Crop Details</p>
                    <p className="text-sm text-muted-foreground">
                      {property.cropDetails}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Area</p>
                    <p className="text-sm text-muted-foreground">
                      {property.totalArea}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Survey Numbers</p>
                    <p className="text-sm text-muted-foreground">
                      {property.surveyNumbers}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Witnesses */}
        <Card>
          <CardHeader>
            <CardTitle>Witnesses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.witnesses.map((witness, index) => (
              <div key={witness.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Witness {index + 1}</h3>
                  <Badge variant="outline">ID: {witness.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {witness.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {witness.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Note</p>
                    <p className="text-sm text-muted-foreground">
                      {witness.note}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {witness.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default JsonDataView;
