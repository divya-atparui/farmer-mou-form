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
                This Memorandum of Understanding (&quot;MoU&quot;) is entered
                into as of <span className="font-bold">{data.dateCreated}</span>{" "}
                (&quot;Effective Date&quot;) by and between{" "}
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
                  <span className="font-bold">a. Validity Period:</span> This
                  MoU shall be valid only if the enrolled
                  field/land/tree/farmers possess all the necessary and
                  eligibility requirement specified by Aurigraph from the
                  effective date. During this period, Aurigraph shall conduct a
                  feasibility study, baseline assessment, field verification,
                  due diligence, detect and evaluation of the carbon pool
                  potential of proposed field/land/tree to finalize the
                  definitive agreement. The period between this MoU to
                  definitive agreement would be up to
                  <span className="font-bold">1 year</span> depending upon the
                  extent of land under consideration and environmental
                  conditions.
                </li>
                <li>
                  <span className="font-bold">b. Termination:</span> Unless
                  terminated earlier, this agreement is valid until the life
                  cycle of the project which is till
                  <span className="font-bold">40 years</span> while the
                  crediting period will be till
                  <span className="font-bold">40 years</span> from the effective
                  date. The life cycle of the project would mean to include the
                  period starting the definitive agreement thru to issuance of
                  the carbon credit, realization and continuous monitoring of
                  the available carbon credit for a period of
                  <span className="font-bold">40 years</span>.
                </li>
                <li>
                  <span className="font-bold">c. Minimum plot size:</span>
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

        <div className="text-4xl font-bold py-3 ">3.1. Aurigraph</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a. Aurigraph will obtain all compliances and approvals from
                  regulatory agencies at its cost.
                </li>
                <li>
                  b. Aurigraph will provide feasibility and estimates of yield
                  after surveys and assessments.
                </li>
                <li>
                  c. Aurigraph will have the yield assessed by a team of experts
                  and 3rd party verifiers.
                </li>
                <li>
                  d.Aurigraph will conduct drone-based scanning services to
                  determine and compute natural assets that may be tokenized
                </li>
                <li>
                  e. Aurigraph will integrate with global markets to trade
                  tokenized assets to derive maximum value for the tokenized
                  assets.
                </li>
                <li>
                  f. Aurigraph will undertake the sales and marketing of the
                  digital assets through appropriate legal entities. Digital
                  Assets would include the digital survey area of the land under
                  consideration, tokens generated, carbon harvest data, and all
                  such data collected during the feasibility study.{" "}
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">4. Landowner</div>

        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a. Landowner expressly hereby provides his/her consent and
                  no-objection to share the information provided pursuant to
                  this agreement, including personally identifiable information
                  and personal sensitive information to Aurigraph and for
                  Aurigraph to share this information with the third parties.
                  Aurigraph shall use all reasonable and prudent care to ensure
                  that any such information collected by it shall be maintained
                  with the strictest security against unauthorized access or
                  leak. The personal identifiable information would limit to but
                  not restricted to all the details required to establish the
                  bonafide ownership of the land and to establish that the land
                  is free from any encumbrances.
                </li>
                <li>
                  b. Landowner hereby confirms possessing the rights of
                  authorization to the land, either arising or granted under
                  statute, regulation, or decree by a competent authority,
                  enabling the entry into this agreement with Aurigraph for the
                  proposed carbon project within a specific geographic
                  jurisdiction.
                </li>
                <li>
                  c. Landowners shall ensure that the local taxes with respect
                  to the land are fully paid up from time to time. Copy of the
                  tax paid receipts shall be shared while submitted the
                  documents for verification of the title of the land.
                </li>
                <li>
                  d.Whereas landowner offers to assign Carbon Credits or Green
                  Credits or Scope 3 emission reduction assets or other
                  ecosystem benefits, collectively referred to as &quot;Carbon
                  Credits&quot;, produced by him/her through adoption of
                  Aurigraph Carbon Markets to Aurigraph. Landowner declares and
                  agrees to assign all legal rights to such Carbon Credits to
                  Aurigraph only, including all the rights to issuances,
                  forwarding, and sale of such Carbon Credits as issued units
                  under any applicable standard.
                </li>
                <li>
                  e. Landowner attests that he/she has not participated in the
                  any greenhouse gases (GHG) reduction projects, or not sold,
                  and will not sell, any Carbon Credits arising from project
                  activity(s) to any party other than Aurigraph during the
                  project life cycle.
                </li>
                <li>
                  f. The participation of landowner in this project is Free,
                  prior, informed consent, and at his/her sole discretion. The
                  landowner is solely responsible for enrolling his/her specific
                  fields of the Land in the Aurigraph carbon project. Land
                  enrolment is subject to eligibility requirements as may be
                  established by Aurigraph at its discretion/ Project
                  requirement. The landowner agrees to initially enrol ________
                  hectares/acres of Land as provided in the section 10. This
                  agreement applies to all eligible and enrolled Land including
                  future enrolments (&quot;Land&quot;).
                </li>
                <li>
                  g. Landowner further confirms possessing all legal rights
                  necessary to execute the project activity or activities within
                  the Land area registered under the Project, in accordance with
                  the terms and conditions outlined within this agreement.
                  Landowner shall provide verifiable documents of properties
                  listed in Section 10. Failure to establish the title of the
                  land would be construed as the failure on part of the
                  landowner.{" "}
                </li>
                <li>
                  h. The Landowner confirms herein that terms and conditions of
                  this agreement shall survive changes to control of the Land
                  and will be applicable to those who control the Land in future
                  for the duration of the term of this agreement. If the
                  landowner is unable to demonstrate changes in control of the
                  Land or any change in property ownership, whether in full or
                  part, he/she shall promptly provide written notice of any loss
                  of control over the Land to Aurigraph, ensuring that such
                  changes are communicated at least 30 days in advance. advance.
                  Failure to comply to this clause would attract a Penalty and
                  compensation to be mentioned in the definitive agreement
                </li>
                <li>
                  i. Landowners shall promptly notify if there is any change in
                  the tree cover or land by any natural or man-made causes from
                  time to time.
                </li>
                <li>
                  j. Landowners shall take all preventive measures to protect
                  the trees or and continue the improved land management
                  activities. In the event of any natural calamity will be
                  notified promptly.
                </li>
                <li>
                  k. In case the landowner wishes to withdraw or cancel the
                  agreement in part or in full, the landowner must refund one
                  year’s payment made toward carbon credits for the property
                  under consideration
                </li>
                <li>
                  l. Landowners must reverify property and beneficiary eKYC
                  records every 4 (four) years, either through eKYC or through
                  AKSMVBS , to keep the records current
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          5. Revenue Sharing and Payment Terms
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a. Aurigraph will share 50 % (Fifty percent) of the revenues
                  with registered Landowner(s) at the time of the sale from the
                  third year of the sale of carbon tokens through Aurigraph
                  ActiveContracts
                </li>
                <li>
                  b. Aurigraph will share 2 % (two percent) of the revenues with
                  AKSMVBS from the third year of sale of carbon tokens of its
                  members and references through Aurigraph ActiveContracts.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          6. Monitoring and Verification
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a.AKSMVBS and Landowner shall participate in monitoring and
                  verification of the Project activities.
                </li>
                <li>
                  b. Aurigraph shall conduct an initial assessment to determine
                  the carbon harvest potential of the Landowner&apos;s property.
                </li>
                <li>
                  c. AKSMVBS and Aurigraph shall conduct a due diligence of the
                  title deeds of the property. The due diligence would be
                  conducted to confirm the ownership of the land by the
                  landowner. The landowner shall cooperate to suitably conduct
                  the due diligence.
                </li>
                <li>
                  d. The assessment process will adhere to recognized
                  methodologies and standards for carbon credit measurement and
                  verification.
                </li>
                <li>
                  e. Landowners shall give access to the land for Audit, survey,
                  and any kind of verification to Aurigraph and Aurigraph Drones
                  at any time with 24 hours’ notice.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          7. Carbon Credit Sequestration
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  a. Upon successful assessment, both parties agree to
                  collaborate in the sequestering carbon credits from the
                  Landowner&apos;s property.
                </li>
                <li>
                  b. Aurigraph shall be responsible for implementing and
                  managing the carbon credit harvesting process.
                </li>
                <li>
                  c. Aurigraph will communicate and update landowner as and when
                  if any updates or communication is important.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 ">8. Governing Law</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  This MoU shall be governed by and construed in accordance with
                  the laws of Bangalore, India.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">9. Amendments</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  Any amendments to this MoU must be made in writing and signed
                  by both parties.
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

        {/* Signatures Section */}
        <div className="text-4xl font-bold py-3">10. Signatures</div>
        <Card>
          <CardContent>
            <div className="p-8 space-y-12">
              {/* Landowner Signatures */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold">Landowner Signatures</h3>
                <div className="grid grid-cols-2 gap-8">
                  {data.landOwners.map((owner, index) => (
                    <div key={owner.id} className="space-y-4">
                      <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Signature Space</p>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-medium">{owner.landownerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Landowner {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {owner.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Witness Signatures */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold">Witness Signatures</h3>
                <div className="grid grid-cols-2 gap-8">
                  {data.witnesses.map((witness, index) => (
                    <div key={witness.id} className="space-y-4">
                      <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Signature Space</p>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-medium">{witness.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Witness {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {witness.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Signatures */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold">
                  Organization Signatures
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  {/* Aurigraph Signature */}
                  <div className="space-y-4">
                    <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Signature Space</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-medium">
                        For Aurigraph DLT Corporation
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Authorized Signatory
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: {data.dateCreated}
                      </p>
                    </div>
                  </div>
                  {/* AKSMVBS Signature */}
                  <div className="space-y-4">
                    <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Signature Space</p>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-medium">For AKSMVBS</p>
                      <p className="text-sm text-muted-foreground">
                        Authorized Signatory
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Date: {data.dateCreated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default JsonDataView;
