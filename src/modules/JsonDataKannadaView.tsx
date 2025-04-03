import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JsonDataKannadaViewProps {
  data: LandDetailsResponse | null;
}

const JsonDataKannadaView: React.FC<JsonDataKannadaViewProps> = ({ data }) => {
  const renderValue = (value: unknown) => {
    if (!data || value === null || value === undefined || value === "") {
      return <span className="inline-block w-32 h-0.5 bg-gray-300">_______</span>;
    }
    return typeof value === "string" ? value : JSON.stringify(value);
  };
  const emptyLandOwner = { 
    id: 'empty-landowner', 
    landownerName: null, 
    email: null, 
    mobile: null, 
    aadhaar: null, 
    address: null, 
    date: null 
  };
  
  const emptyProperty = { 
    id: 'empty-property', 
    itemName: null, 
    location: null, 
    cropDetails: null, 
    totalArea: null, 
    surveyNumbers: null 
  };
  
  const emptyWitness = { 
    id: 'empty-witness', 
    name: null, 
    address: null, 
    note: null, 
    date: null 
  };

  const landDetails = data?.data[0] || null
  const landOwners = landDetails?.landOwners || [emptyLandOwner];
  const propertyDetails = landDetails?.propertyDetails || [emptyProperty];
  const witnesses = landDetails?.witnesses || [
    { ...emptyWitness, id: 'empty-witness-ka-1' },
    { ...emptyWitness, id: 'empty-witness-ka-2' }
  ];

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
                ಈ ತಿಳುವಳಿಕೆಯ ಜ್ಞಾಪಕ ಪತ್ರವನ್ನು (&quot;MoU&quot;) is entered into
                as of <span className="font-bold">{landDetails?.dateCreated}</span>{" "}
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
                <span className="font-bold">{landDetails?.accountHolder}</span>,
                bearing{" "}
                <span className="font-bold">
                  Addhar No
                  {landDetails?.landOwners[0].aadhaar}
                </span>{" "}
                as ID{" "}
                <span className="font-bold">
                  {landDetails?.landOwners[0].landownerName}
                </span>
                , residing at{" "}
                <span className="font-bold">{landDetails?.landOwners[0].address}</span>
                ,hereafter referred to as (&quot;Landowner&quot;) is having own
                land/field or farming activities or field in the Aurigraph
                proposed carbon project
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 m-4">1. ಉದ್ದೇಶ</div>

        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />

          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside  space-y-2">
                <li>
                  ಅ. ಕರ್ನಾಟಕದಲ್ಲಿ ಕಾರ್ಬನ್ ಮಾರುಕಟ್ಟೆಗಳ ಮೂಲಕ ಕಾರ್ಬನ್
                  ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಉತ್ಪಾದಿಸುವ ಗುರಿಯನ್ನು ಹೊಂದಿರುವ ಸ್ವಯಂಪ್ರೇರಿತ
                  ಕಾರ್ಬನ್ ಯೋಜನೆಯ ಅನುಷ್ಠಾನಕ್ಕಾಗಿ AKSMVBS ಮತ್ತು ಆರಿಗ್ರಾಫ್ ನಡುವಿನ
                  ಸಹಯೋಗಕ್ಕಾಗಿ ಚೌಕಟ್ಟನ್ನು ಸ್ಥಾಪಿಸುವುದು ಈ ಎಂಒಯು ಉದ್ದೇಶವಾಗಿದೆ.{" "}
                </li>
                <li>
                  ಅ. ಭೂಮಾಲೀಕರು, AKSMVBS, ಆರಿಗ್ರಾಫ್ ಮತ್ತು ಅದರ ನಿಯೋಜಿತರು/ಸಂಯೋಜಿತ
                  ಪಾಲುದಾರರು, ಕಾರ್ಬನ್ ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಖರೀದಿದಾರ ಜಂಟಿಯಾಗಿ
                  ವಹಿವಾಟುಗಳಲ್ಲಿ ಪಾರದರ್ಶಕತೆಗಾಗಿ ಡಿಜಿಟಲ್ &quot;ಸ್ಮಾರ್ಟ್ ಒಪ್ಪಂದ&quot; ಕ್ಕೆ
                  ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡುತ್ತಾರೆ.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 m-4">
          2. ಪರಿಗಣಿಸಲ್ಪಡುವ ಆಸ್ತಿಯ ವಿವರ
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <p className="font-bold">
                ಈ ಎಂಒಯು ಅಡಿಯಲ್ಲಿ ಎಲ್ಲಾ ಆಸ್ತಿಗಳನ್ನು ಆಸ್ತಿ ಮತ್ತು ಮಾಲೀಕತ್ವದ
                ವಿವರಗಳೊಂದಿಗೆ ಅನುಬಂಧದಲ್ಲಿ ಸೇರಿಸಲಾಗುತ್ತದೆ
              </p>
              <div className="text-2xl font-bold py-3 text-center">
                ಸಿಂಧುತ್ವ
              </div>
              <ol className="list-inside space-y-2">
                <li>
                  ಅ. ನೋಂದಣಿಯಾದ ಕ್ಷೇತ್ರ/ಭೂಮಿ/ಮರ/ರೈತರು ಜಾರಿಯಾದ ದಿನಾಂಕದಿಂದ
                  ಆರಿಗ್ರಾಫ್ ನಿರ್ದಿಷ್ಟಪಡಿಸಿದ ಎಲ್ಲಾ ಅಗತ್ಯ ಮತ್ತು ಅರ್ಹತೆಯ
                  ಅವಶ್ಯಕತೆಗಳನ್ನು ಹೊಂದಿದ್ದರೆ ಮಾತ್ರ ಈ ಎಂಒಯು ಮಾನ್ಯವಾಗಿರುತ್ತದೆ. ಈ
                  ಅವಧಿಯಲ್ಲಿ, ಆರಿಗ್ರಾಫ್ ಕಾರ್ಯಸಾಧ್ಯತೆಯ ಅಧ್ಯಯನ, ಮೂಲ ಮೌಲ್ಯಮಾಪನ,
                  ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ, ಕಾರಣ ಶ್ರದ್ಧೆ, ಅಂತಿಮ ಒಪ್ಪಂದವನ್ನು ಅಂತಿಮಗೊಳಿಸಲು
                  ಉದ್ದೇಶಿತ ಕ್ಷೇತ್ರ/ಭೂಮಿ/ಮರದ ಇಂಗಾಲದ ಪೂರ್ಣ ಸಂಭಾವ್ಯತೆಯನ್ನು
                  ಪತ್ತೆಹಚ್ಚುವುದು ಮತ್ತು ಮೌಲ್ಯಮಾಪನ ಮಾಡುವುದು. ಈ ಎಂಒಯು ಮತ್ತು
                  ನಿರ್ಣಾಯಕ ಒಪ್ಪಂದದ ನಡುವಿನ ಅವಧಿಯು ಪರಿಗಣನೆಯಲ್ಲಿರುವ ಭೂಮಿಯ ವಿಸ್ತೀರ್ಣ
                  ಮತ್ತು ಪರಿಸರ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ 1 ವರ್ಷದವರೆಗೆ ಇರುತ್ತದೆ.
                </li>
                <li>
                  ಆ. ಮೊದಲೇ ಮುಕ್ತಾಯಗೊಳಿಸದ ಹೊರತು, ಈ ಒಪ್ಪಂದವು ಯೋಜನೆಯ ಜೀವನ
                  ಚಕ್ರದವರೆಗೆ ಮಾನ್ಯವಾಗಿರುತ್ತದೆ, ಅದು 40 ವರ್ಷಗಳವರೆಗೆ ಇರುತ್ತದೆ ಮತ್ತು
                  ಕ್ರೆಡಿಟ್ ಅವಧಿಯು ಜಾರಿ ದಿನಾಂಕದಿಂದ 40 ವರ್ಷಗಳವರೆಗೆ ಇರುತ್ತದೆ.
                  ಯೋಜನೆಯ ಪೂರ್ಣಾವಧಿ ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್, 40 ವರ್ಷಗಳ ಅವಧಿಗೆ ಲಭ್ಯವಿರುವ
                  ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ನ ಸಾಕ್ಷಾತ್ಕಾರ ಮತ್ತು ನಿರಂತರ ಮೇಲ್ವಿಚಾರಣೆಯ ಮೂಲಕ
                  ನಿರ್ಣಾಯಕ ಒಪ್ಪಂದವನ್ನು ಪ್ರಾರಂಭಿಸುವ ಅವಧಿಯನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.
                </li>
                <li>ಸಿ. ಕನಿಷ್ಠ ಪ್ಲಾಟ್ ಗಾತ್ರ: 1 ಎಕರೆ</li>
              </ol>
              <div />
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 ">
          3. AKSMVBS ಜೊತೆಗಿನ ಸಹಯೋಗದ ನಿಯಮಗಳು
        </div>

        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಎ. AKSMVBS ರೈತರು ಮತ್ತು ಭೂ-ಮಾಲೀಕರ ನಡುವಿನ ಸಂಪರ್ಕ ಮತ್ತು AKSMVBS
                  ಪರಿಚಯಿಸಿದ Aurigraph.
                </li>
                <li>
                  ಬಿ. AKSMVBS ರೈತರು ಮತ್ತು ಅವರ ರುಜುವಾತುಗಳನ್ನು ಅವರ ಆಸ್ತಿ
                  ವಿವರಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸುತ್ತದೆ ಮತ್ತು ನಂತರ ಒಪ್ಪಂದದ ಅವಧಿಗೆ ಯಾವುದೇ
                  ಬದಲಾವಣೆಗಳನ್ನು ಮಾಡುತ್ತದೆ{" "}
                </li>
                <li>
                  ಸಿ. AKSMVBS ರೈತರಿಗೆ ಆರಿಗ್ರಾಫ್ ಕಾರ್ಬನ್ ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಸೈನ್ ಅಪ್
                  ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ{" "}
                </li>{" "}
                <li>
                  ಡಿ. AKSMVBS ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳ ಮಾರುಕಟ್ಟೆ ನಿಯಮಗಳು ಮತ್ತು
                  ಅಭ್ಯಾಸಗಳ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ರೈತರು ಮತ್ತು ಆರಿಗ್ರಾಫ್ ನಡುವೆ ಯಾವುದೇ
                  ವಿವಾದಗಳಿದ್ದಲ್ಲಿ ಮಧ್ಯಸ್ಥಿಕೆ ವಹಿಸುತ್ತದೆ.
                </li>
                <li>
                  ಇ. AKSMVBS ಆರಿಗ್ರಾಫ್‌ನ ಎಲ್ಲಾ ಪ್ರಮುಖ ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್
                  ಉಪಕ್ರಮಗಳಲ್ಲಿ ಆರಿಗ್ರಾಫ್ ಮತ್ತು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ನಡುವೆ ಸಂಪರ್ಕವನ್ನು
                  ಹೊಂದಿದೆ
                </li>
                <li>
                  f. AKSMVBS ರೈತರಿಗೆ ಆರಿಗ್ರಾಫ್ ಕಾರ್ಬನ್ ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಸೈನ್ ಅಪ್
                  ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ{" "}
                </li>{" "}
                <li>
                  ಜಿ. ಎರಡೂ ಪಕ್ಷಗಳು ತಮ್ಮ ಸಂಬಂಧಿತ ನಿಯಂತ್ರಕ ಅನುಸರಣೆಗಳು, ತೆರಿಗೆ
                  ಮತ್ತು ಸಂಬಂಧಿತ ಸಮಸ್ಯೆಗಳಿಗೆ ಜವಾಬ್ದಾರರಾಗಿರುತ್ತಾರೆ.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 ">
          3.1 ಅರಿಗ್ರಾಫ್
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಅ. ಆರಿಗ್ರಾಫ್ ತನ್ನ ವೆಚ್ಚದಲ್ಲಿ ನಿಯಂತ್ರಕ ಏಜೆನ್ಸಿಗಳಿಂದ ಎಲ್ಲಾ
                  ಅನುಸರಣೆ ಮತ್ತು ಅನುಮೋದನೆಯನ್ನು ಪಡೆಯುತ್ತದೆ.
                </li>
                <li>
                  ಆ. ಆರಿಗ್ರಾಫ್ ಸಮೀಕ್ಷೆಗಳು ಮತ್ತು ಮೌಲ್ಯಮಾಪನಗಳ ನಂತರ ಇಳುವರಿಯ
                  ಕಾರ್ಯಸಾಧ್ಯತೆ ಮತ್ತು ಅಂದಾಜುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.
                </li>
                <li>
                  ಇ. ಆರಿಗ್ರಾಫ್ ತಜ್ಞರು ಮತ್ತು 3ನೇ ವ್ಯಕ್ತಿ ಪರಿಶೀಲಕರ ತಂಡದಿಂದ
                  ಇಳುವರಿಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.
                </li>
                <li>
                  ಈ. ಟೋಕನೈಸ್ ಮಾಡಬಹುದಾದ ನೈಸರ್ಗಿಕ ಸ್ವತ್ತುಗಳನ್ನು ನಿರ್ಧರಿಸಲು ಮತ್ತು
                  ಲೆಕ್ಕಾಚಾರ ಮಾಡಲು ಆರಿಗ್ರಾಫ್ ಡ್ರೋನ್ ಆಧಾರಿತ ಸ್ಕ್ಯಾನಿಂಗ್ ಸೇವೆಗಳನ್ನು
                  ನಡೆಸುತ್ತದೆ.
                </li>
                <li>
                  ಉ. ಟೋಕನೈಸ್ ಮಾಡಿದ ಸ್ವತ್ತುಗಳಿಗೆ ಗರಿಷ್ಠ ಮೌಲ್ಯವನ್ನು ಪಡೆಯಲು ಟೋಕನೈಸ್
                  ಮಾಡಿದ ಸ್ವತ್ತುಗಳನ್ನು ವ್ಯಾಪಾರ ಮಾಡಲು ಆರಿಗ್ರಾಫ್ ಜಾಗತಿಕ
                  ಮಾರುಕಟ್ಟೆಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತದೆ.
                </li>
                <li>
                  ಊ. ಆರಿಗ್ರಾಫ್ ಸೂಕ್ತ ಕಾನೂನು ಘಟಕಗಳ ಮೂಲಕ ಡಿಜಿಟಲ್ ಸ್ವತ್ತುಗಳ ಮಾರಾಟ
                  ಮತ್ತು ಮಾರುಕಟ್ಟೆಯನ್ನು ಕೈಗೊಳ್ಳುತ್ತದೆ. ಡಿಜಿಟಲ್ ಸ್ವತ್ತುಗಳು
                  ಪರಿಗಣನೆಯಲ್ಲಿರುವ ಭೂಮಿಯ ಡಿಜಿಟಲ್ ಸಮೀಕ್ಷೆ ಪ್ರದೇಶ, ಟೋಕನ್‌ಗಳು,
                  ಇಂಗಾಲದ ಕೊಯ್ಲು ಡೇಟಾ ಮತ್ತು ಕಾರ್ಯಸಾಧ್ಯತೆಯ ಅಧ್ಯಯನದ ಸಮಯದಲ್ಲಿ
                  ಸಂಗ್ರಹಿಸಲಾದ ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.{" "}
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">4. ಭೂ ಮಾಲೀಕರು</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಎ. ವೈಯಕ್ತಿಕವಾಗಿ ಗುರುತಿಸಬಹುದಾದ ಮಾಹಿತಿ ಮತ್ತು ಆರಿಗ್ರಾಫ್‌ಗೆ ಮತ್ತು
                  ಆರಿಗ್ರಾಫ್‌ಗೆ ಈ ಮಾಹಿತಿಯನ್ನು ಮೂರನೇ ವ್ಯಕ್ತಿಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು
                  ಆರಿಗ್ರಾಫ್‌ಗೆ ಸೇರಿದಂತೆ ಈ ಒಪ್ಪಂದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಒದಗಿಸಿದ
                  ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಭೂಮಾಲೀಕರು ಸ್ಪಷ್ಟವಾಗಿ ಈ ಮೂಲಕ ಅವನ/ಅವಳ
                  ಸಮ್ಮತಿ ಮತ್ತು ಯಾವುದೇ ಆಕ್ಷೇಪಣೆಯನ್ನು ಒದಗಿಸುತ್ತಾರೆ. ಆರಿಗ್ರಾಫ್
                  ತನ್ನಿಂದ ಸಂಗ್ರಹಿಸಲಾದ ಯಾವುದೇ ಮಾಹಿತಿಯನ್ನು ಅನಧಿಕೃತ ಪ್ರವೇಶ ಅಥವಾ
                  ಸೋರಿಕೆಯ ವಿರುದ್ಧ ಕಟ್ಟುನಿಟ್ಟಾದ ಭದ್ರತೆಯೊಂದಿಗೆ ನಿರ್ವಹಿಸುತ್ತದೆ ಎಂದು
                  ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಎಲ್ಲಾ ಸಮಂಜಸವಾದ ಮತ್ತು ವಿವೇಕಯುತ ಕಾಳಜಿಯನ್ನು
                  ಬಳಸುತ್ತದೆ. ವೈಯಕ್ತಿಕ ಗುರುತಿಸಬಹುದಾದ ಮಾಹಿತಿಯು ಭೂಮಿಯ ವಿಶ್ವಾಸಾರ್ಹ
                  ಮಾಲೀಕತ್ವವನ್ನು ಸ್ಥಾಪಿಸಲು ಮತ್ತು ಭೂಮಿ ಯಾವುದೇ ಹೊರೆಗಳಿಂದ
                  ಮುಕ್ತವಾಗಿದೆ ಎಂದು ಸ್ಥಾಪಿಸಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳಿಗೆ
                  ಸೀಮಿತವಾಗಿರುತ್ತದೆ ಆದರೆ ಸೀಮಿತವಾಗಿರುವುದಿಲ್ಲ.
                </li>
                <li>
                  ಬಿ. ನಿರ್ದಿಷ್ಟ ಭೌಗೋಳಿಕ ನ್ಯಾಯವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಪ್ರಸ್ತಾವಿತ ಇಂಗಾಲದ
                  ಯೋಜನೆಗಾಗಿ ಆರಿಗ್ರಾಫ್‌ನೊಂದಿಗಿನ ಈ ಒಪ್ಪಂದಕ್ಕೆ ಪ್ರವೇಶಿಸಲು ಅನುವು
                  ಮಾಡಿಕೊಡುವ, ಸಕ್ಷಮ ಪ್ರಾಧಿಕಾರದಿಂದ ಶಾಸನ, ನಿಯಂತ್ರಣ ಅಥವಾ ತೀರ್ಪಿನ
                  ಅಡಿಯಲ್ಲಿ ಉದ್ಭವಿಸುವ ಅಥವಾ ನೀಡಲಾದ ಭೂಮಿಗೆ ಅಧಿಕಾರದ ಹಕ್ಕುಗಳನ್ನು
                  ಹೊಂದಿರುವುದನ್ನು ಭೂಮಾಲೀಕರು ಈ ಮೂಲಕ ಖಚಿತಪಡಿಸುತ್ತಾರೆ.
                </li>
                <li>
                  ಸಿ. ಭೂಮಾಲೀಕರು ಭೂಮಿಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಸ್ಥಳೀಯ ತೆರಿಗೆಗಳನ್ನು
                  ಕಾಲಕಾಲಕ್ಕೆ ಸಂಪೂರ್ಣವಾಗಿ ಪಾವತಿಸುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಬೇಕು. ಭೂಮಿ
                  ದಾಖಲಾತಿಯು ಅರ್ಹತಾ ಅವಶ್ಯಕತೆಗಳಿಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ, ಅದರ
                  ವಿವೇಚನೆ/ಯೋಜನೆಯ ಅಗತ್ಯತೆಯಲ್ಲಿ ಆರಿಗ್ರಾಫ್ ಸ್ಥಾಪಿಸಬಹುದು. ವಿಭಾಗ 10
                  ರಲ್ಲಿ ಒದಗಿಸಿದಂತೆ ಆರಂಭದಲ್ಲಿ _______ ಹೆಕ್ಟೇರ್/ಎಕರೆ ಭೂಮಿಯನ್ನು
                  ನೋಂದಾಯಿಸಲು ಭೂಮಾಲೀಕರು ಒಪ್ಪುತ್ತಾರೆ. ಭವಿಷ್ಯದ ದಾಖಲಾತಿಗಳು (&quot;ಭೂಮಿ&quot;)
                  ಸೇರಿದಂತೆ ಎಲ್ಲಾ ಅರ್ಹ ಮತ್ತು ದಾಖಲಾದ ಭೂಮಿಗೆ ಈ ಒಪ್ಪಂದವು
                  ಅನ್ವಯಿಸುತ್ತದೆ.
                </li>
                <li>
                  ಡಿ. ಆದರೆ ಭೂಮಾಲೀಕರು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳು ಅಥವಾ ಗ್ರೀನ್
                  ಕ್ರೆಡಿಟ್‌ಗಳು ಅಥವಾ ಸ್ಕೋಪ್ 3 ಎಮಿಷನ್ ರಿಡಕ್ಷನ್ ಸ್ವತ್ತುಗಳು ಅಥವಾ ಇತರ
                  ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ಪ್ರಯೋಜನಗಳನ್ನು ನಿಯೋಜಿಸಲು ಕೊಡುಗೆ ನೀಡುತ್ತಾರೆ,
                  ಇದನ್ನು ಒಟ್ಟಾರೆಯಾಗಿ &quot;ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳು&quot; ಎಂದು
                  ಉಲ್ಲೇಖಿಸಲಾಗುತ್ತದೆ, ಔರಿಗ್ರಾಫ್ ಕಾರ್ಬನ್ ಮಾರ್ಕೆಟ್‌ಗಳನ್ನು
                  ಔರಿಗ್ರಾಫ್‌ಗೆ ಅಳವಡಿಸಿಕೊಳ್ಳುವ ಮೂಲಕ ಅವನು/ಅವಳು ಉತ್ಪಾದಿಸಿದ. ಅಂತಹ
                  ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳಿಗೆ ಎಲ್ಲಾ ಕಾನೂನು ಹಕ್ಕುಗಳನ್ನು ಆರಿಗ್ರಾಫ್‌ಗೆ
                  ಮಾತ್ರ ನಿಯೋಜಿಸಲು ಭೂಮಾಲೀಕರು ಘೋಷಿಸುತ್ತಾರೆ ಮತ್ತು ಒಪ್ಪುತ್ತಾರೆ,
                  ಯಾವುದೇ ಅನ್ವಯವಾಗುವ ಮಾನದಂಡದ ಅಡಿಯಲ್ಲಿ ನೀಡಲಾದ ಘಟಕಗಳಂತೆ ಅಂತಹ
                  ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳ ವಿತರಣೆ, ಫಾರ್ವರ್ಡ್ ಮತ್ತು ಮಾರಾಟದ ಎಲ್ಲಾ
                  ಹಕ್ಕುಗಳನ್ನು ಒಳಗೊಂಡಂತೆ.
                </li>
                <li>
                  ಇ. ಪ್ರಾಜೆಕ್ಟ್ ಅಡಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಲಾದ ಭೂ ಪ್ರದೇಶದೊಳಗೆ ಯೋಜನೆಯ
                  ಚಟುವಟಿಕೆ ಅಥವಾ ಚಟುವಟಿಕೆಗಳನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ
                  ಕಾನೂನು ಹಕ್ಕುಗಳನ್ನು ಹೊಂದಿರುವುದನ್ನು ಭೂಮಾಲೀಕರು ಮತ್ತಷ್ಟು
                  ಖಚಿತಪಡಿಸುತ್ತಾರೆ. ಭೂಮಾಲೀಕನು ಭೂಮಿಯ ನಿಯಂತ್ರಣದಲ್ಲಿ
                  ಬದಲಾವಣೆಗಳನ್ನು ಅಥವಾ ಆಸ್ತಿಯ ಮಾಲೀಕತ್ವದಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಯನ್ನು
                  ಪ್ರದರ್ಶಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ, ಅವನು/ಅವಳ ಭಾಗದ ವಿಫಲತೆ ಎಂದು
                  ಅರ್ಥೈಸಲಾಗುತ್ತದೆ.
                </li>
                <li>
                  ಫಿ. ಈ ಒಪ್ಪಂದದ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು ಭೂಮಿಯ ನಿಯಂತ್ರಣಕ್ಕೆ
                  ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿದುಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ಈ ಒಪ್ಪಂದದ ಅವಧಿಗೆ
                  ಭವಿಷ್ಯದಲ್ಲಿ ಭೂಮಿಯನ್ನು ನಿಯಂತ್ರಿಸುವವರಿಗೆ ಅನ್ವಯಿಸುತ್ತದೆ ಎಂದು
                  ಭೂಮಾಲೀಕರು ಇಲ್ಲಿ ದೃಢೀಕರಿಸುತ್ತಾರೆ. ಭೂಮಾಲೀಕನು ಭೂಮಿಯ ನಿಯಂತ್ರಣದಲ್ಲಿ
                  ಬದಲಾವಣೆಗಳನ್ನು ಅಥವಾ ಆಸ್ತಿಯ ಮಾಲೀಕತ್ವದಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಯನ್ನು
                  ಪ್ರದರ್ಶಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ, ಅವನು/ಅವಳ ಭಾಗದ ವಿಫಲತೆ ಎಂದು
                  ಅರ್ಥೈಸಲಾಗುತ್ತದೆ. ಕನಿಷ್ಠ 30 ದಿನಗಳ ಮುಂಚಿತವಾಗಿ ಸಂವಹನ. ಮುನ್ನಡೆ. ಈ
                  ಷರತ್ತನ್ನು ಅನುಸರಿಸಲು ವಿಫಲವಾದರೆ ನಿರ್ಣಾಯಕ ಒಪ್ಪಂದದಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ
                  ದಂಡ ಮತ್ತು ಪರಿಹಾರವನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ
                </li>
                <li>
                  ಜಿ. ಕಾಲಕಾಲಕ್ಕೆ ಯಾವುದೇ ನೈಸರ್ಗಿಕ ಅಥವಾ ಮಾನವ ನಿರ್ಮಿತ ಕಾರಣಗಳಿಂದ ಮರದ
                  ಹೊದಿಕೆ ಅಥವಾ ಭೂಮಿಯಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆ ಕಂಡುಬಂದಲ್ಲಿ ಭೂಮಾಲೀಕರು
                  ತಕ್ಷಣವೇ ತಿಳಿಸಬೇಕು.
                </li>
                <li>
                  ಕೆ. ಭೂಮಾಲೀಕರು ಮರಗಳನ್ನು ರಕ್ಷಿಸಲು ಎಲ್ಲಾ ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು
                  ತೆಗೆದುಕೊಳ್ಳಬೇಕು ಅಥವಾ ಸುಧಾರಿತ ಭೂ ನಿರ್ವಹಣೆ ಚಟುವಟಿಕೆಗಳನ್ನು
                  ಮುಂದುವರಿಸಬೇಕು. ಯಾವುದೇ ನೈಸರ್ಗಿಕ ವಿಕೋಪದ ಸಂದರ್ಭದಲ್ಲಿ ತಕ್ಷಣವೇ
                  ತಿಳಿಸಲಾಗುವುದು.
                </li>
                <li>
                  ಎಲ್. ಭೂಮಾಲೀಕರು ಒಪ್ಪಂದವನ್ನು ಭಾಗಶಃ ಅಥವಾ ಪೂರ್ಣವಾಗಿ ಹಿಂಪಡೆಯಲು ಅಥವಾ
                  ರದ್ದುಗೊಳಿಸಲು ಬಯಸಿದರೆ, ಭೂಮಾಲೀಕರು ಪರಿಗಣನೆಯಲ್ಲಿರುವ ಆಸ್ತಿಗಾಗಿ
                  ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳಿಗೆ ಮಾಡಿದ ಒಂದು ವರ್ಷದ ಪಾವತಿಯನ್ನು ಮರುಪಾವತಿ
                  ಮಾಡಬೇಕು
                </li>
                <li>
                  ಎಮ್. ಭೂಮಾಲೀಕರು ಆಸ್ತಿ ಮತ್ತು ಫಲಾನುಭವಿಗಳ eKYC ದಾಖಲೆಗಳನ್ನು ಪ್ರತಿ 4
                  (ನಾಲ್ಕು) ವರ್ಷಗಳಿಗೊಮ್ಮೆ eKYC ಮೂಲಕ ಅಥವಾ AKSMVBS ಮೂಲಕ ದಾಖಲೆಗಳನ್ನು
                  ಪ್ರಸ್ತುತವಾಗಿಡಲು ಮರುಪರಿಶೀಲಿಸಬೇಕು
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          5. ಆದಾಯ ಹಂಚಿಕೆ ಮತ್ತು ಪಾವತಿ ನಿಯಮಗಳು
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಎ. ಆರಿಗ್ರಾಫ್ ಆಕ್ಟಿವ್ ಕಾಂಟ್ರಾಕ್ಟ್ಸ್ ಮೂಲಕ ಕಾರ್ಬನ್ ಟೋಕನ್‌ಗಳ
                  ಮಾರಾಟದ ಮೂರನೇ ವರ್ಷದಿಂದ ಮಾರಾಟದ ಸಮಯದಲ್ಲಿ ನೋಂದಾಯಿತ ಭೂಮಾಲೀಕರೊಂದಿಗೆ
                  50% (ಐವತ್ತು ಪ್ರತಿಶತ) ಆದಾಯವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ.
                </li>
                <li>
                  ಬಿ. ಆರಿಗ್ರಾಫ್ ತನ್ನ ಸದಸ್ಯರ ಕಾರ್ಬನ್ ಟೋಕನ್‌ಗಳ ಮಾರಾಟದ ನಾಲ್ಕನೇ
                  ವರ್ಷದಿಂದ AKSMVBS ನೊಂದಿಗೆ 2 % (ಎರಡು ಪ್ರತಿಶತ) ಆದಾಯವನ್ನು
                  ಹಂಚಿಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು Aurigraph ActiveContracts ಮೂಲಕ
                  ಉಲ್ಲೇಖಗಳು.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          6. ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಪರಿಶೀಲನೆ
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಅ. AKSMVBS ಮತ್ತು ಭೂಮಾಲೀಕರು ಯೋಜನೆಯ ಚಟುವಟಿಕೆಗಳ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು
                  ಪರಿಶೀಲನೆಯಲ್ಲಿ ಭಾಗವಹಿಸಬೇಕು.
                </li>
                <li>
                  ಆ. ಆರಿಗ್ರಾಫ್ ಭೂಮಾಲೀಕರ ಆಸ್ತಿಯ ಇಂಗಾಲದ ಕೊಯ್ಲು ಸಾಮರ್ಥ್ಯವನ್ನು
                  ನಿರ್ಧರಿಸಲು ಆರಂಭಿಕ ಮೌಲ್ಯಮಾಪನವನ್ನು ನಡೆಸುತ್ತದೆ.{" "}
                </li>
                <li>
                  ಇ. AKSMVBS ಮತ್ತು ಆರಿಗ್ರಾಫ್ ಆಸ್ತಿಯ ಹಕ್ಕು ಪತ್ರಗಳ ಸರಿಯಾದ
                  ಪರಿಶ್ರಮವನ್ನು ನಡೆಸಬೇಕು. ಭೂಮಾಲೀಕರಿಂದ ಭೂಮಿಯ ಮಾಲೀಕತ್ವವನ್ನು
                  ದೃಢೀಕರಿಸಲು ಕಾರಣವಾದ ಪರಿಶ್ರಮವನ್ನು ನಡೆಸಲಾಗುವುದು. ಭೂಮಾಲೀಕರು ಸರಿಯಾದ
                  ಪರಿಶ್ರಮವನ್ನು ಸೂಕ್ತವಾಗಿ ನಡೆಸಲು ಸಹಕರಿಸಬೇಕು.
                </li>
                <li>
                  ಈ. ಮೌಲ್ಯಮಾಪನ ಪ್ರಕ್ರಿಯೆಯು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಮಾಪನ ಮತ್ತು
                  ಪರಿಶೀಲನೆಗಾಗಿ ಮಾನ್ಯತೆ ಪಡೆದ ವಿಧಾನಗಳು ಮತ್ತು ಮಾನದಂಡಗಳಿಗೆ
                  ಬದ್ಧವಾಗಿರುತ್ತದೆ.
                </li>
                <li>
                  ಉ. ಭೂಮಾಲೀಕರು 24 ಗಂಟೆಗಳ ಸೂಚನೆಯೊಂದಿಗೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಆರಿಗ್ರಾಫ್
                  ಮತ್ತು ಆರಿಗ್ರಾಫ್ ಡ್ರೋನ್‌ಗಳಿಗೆ ಆಡಿಟ್, ಸಮೀಕ್ಷೆ ಮತ್ತು ಯಾವುದೇ ರೀತಿಯ
                  ಪರಿಶೀಲನೆಗಾಗಿ ಭೂಮಿಗೆ ಪ್ರವೇಶವನ್ನು ನೀಡಬೇಕು.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">
          7. ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಸೀಕ್ವೆಸ್ಟ್ರೇಶನ್
        </div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಅ. ಯಶಸ್ವಿ ಮೌಲ್ಯಮಾಪನದ ನಂತರ, ಎರಡೂ ಪಕ್ಷಗಳು ಭೂಮಾಲೀಕರ ಆಸ್ತಿಯಿಂದ
                  ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಸೀಕ್ವೆಟರಿಂಗ್‌ನಲ್ಲಿ ಸಹಕರಿಸಬೇಕು.
                </li>
                <li>
                  ಆ. ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಕೊಯ್ಲು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಮತ್ತು
                  ನಿರ್ವಹಿಸಲು ಆರಿಗ್ರಾಫ್ ಜವಾಬ್ದಾರನಾಗಿರುತ್ತಾನೆ.
                </li>
                <li>
                  ಇ. ಯಾವುದೇ ನವೀಕರಣಗಳು ಅಥವಾ ಸಂವಹನವು ಮುಖ್ಯವಾದಾಗ ಆರಿಗ್ರಾಫ್
                  ಭೂಮಾಲೀಕರನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ ಮತ್ತು ನವೀಕರಿಸುತ್ತದೆ.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <div className="text-4xl font-bold py-3 ">8. ಆಡಳಿತ ಕಾನೂನು</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಈ ತಿಳಿವಳಿಕೆ ಒಪ್ಪಂದವನ್ನು ಭಾರತದ ಬೆಂಗಳೂರಿನ ಕಾನೂನುಗಳಿಗೆ ಅನುಸಾರವಾಗಿ
                  ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಅರ್ಥೈಸಲಾಗುತ್ತದೆ.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
        <div className="text-4xl font-bold py-3 ">9. ತಿದ್ದುಪಡಿಗಳು</div>
        <Card>
          <CardHeader className="hidden" />
          <CardTitle className="hidden" />
          <CardContent>
            <div className="p-4 space-y-4 text-lg">
              <ol className="list-inside space-y-2">
                <li>
                  ಈ ಎಂಒಯುಗೆ ಯಾವುದೇ ತಿದ್ದುಪಡಿಗಳನ್ನು ಲಿಖಿತವಾಗಿ ಮಾಡಬೇಕು ಮತ್ತು ಎರಡೂ
                  ಪಕ್ಷಗಳು ಸಹಿ ಮಾಡಬೇಕು.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              <Badge variant="outline">ID: {landDetails?.id}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Account Holder</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.accountHolder)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Account Number</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.accountNumber)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Bank</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.bank)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Branch</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.branch)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">IFSC Code</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.ifscCode)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Swift Code</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.swiftCode)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Membership Number</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.aksmvbsMembershipNumber)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Date Created</p>
              <p className="text-sm text-muted-foreground">
                {renderValue(landDetails?.dateCreated)}
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
            {landOwners.map((owner, index) => (
              <div key={owner.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Land Owner {index + 1}</h3>
                  <Badge variant="outline">ID: {owner.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(owner.landownerName)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(owner.email)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mobile</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(owner.mobile)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aadhar</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(owner.aadhaar)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(owner.date)}
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
            {propertyDetails.map((property, index) => (
              <div key={property.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Property {index + 1}</h3>
                  <Badge variant="outline">ID: {property.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Item Name</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(property.itemName)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(property.location)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Crop Details</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(property.cropDetails)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Area</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(property.totalArea)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Survey Numbers</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(property.surveyNumbers)}
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
            {witnesses.map((witness, index) => (
              <div key={witness.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Witness {index + 1}</h3>
                  <Badge variant="outline">ID: {witness.id}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(witness.name)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(witness.address)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Note</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(witness.note)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {renderValue(witness.date)}
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
                  {landOwners.map((owner, index) => (
                    <div key={owner.id} className="space-y-4">
                      <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Signature Space</p>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-medium">
                          {renderValue(owner.landownerName)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Landowner {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {renderValue(owner.date)}
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
                  {witnesses.map((witness, index) => (
                    <div key={witness.id} className="space-y-4">
                      <div className="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Signature Space</p>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-medium">
                          {renderValue(witness.name)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Witness {index + 1}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Date: {renderValue(witness.date)}
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
                        Date: {renderValue(landDetails?.dateCreated)}
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
                        Date: {renderValue(landDetails?.dateCreated)}
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

export default JsonDataKannadaView;
