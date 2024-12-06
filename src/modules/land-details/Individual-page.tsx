"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useGetIndividualLandDetails } from "@/api/data/use-get-individual-land-details";
import { useLanguage } from "@/contexts/LanguageContext";
import JsonDataView from "../JsonDataView";
import JsonDataKannadaView from "../JsonDataKannadaView";
import { Button } from "@/components/ui/button";
import { useCreateLandProduct } from "@/api/ofbiz/use-create-land-product";

const IndividualPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetIndividualLandDetails({
    variables: {
      id: id as string,
    },
  });
  const { mutate: createLandProduct, isPending: landProductPending } =
    useCreateLandProduct();

  const { messages } = useLanguage();
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }
  if (!data) {
    return <div>User data not found</div>;
  }
  const jsonData = JSON.parse(JSON.stringify(data));

  const LandDataPayload = {
    productId: data.id + data.landOwners[0].landownerName + "Test",

    internalName: data.landOwners
      .map((owner) => owner.landownerName)
      .join(", "),
    longDescription: data.landOwners
      .map((owner) => owner.landownerName)
      .join(", "),
  
  };

  const handleCreateLandProduct = () => {
    createLandProduct(LandDataPayload);
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleCreateLandProduct();
        }}
        disabled={landProductPending}
      >
        Trigger Land Submission to Product Listing
      </Button>
      {messages.lang === "en" ? (
        <JsonDataView data={jsonData} />
      ) : (
        <JsonDataKannadaView data={jsonData} />
      )}
    </div>
  );
};

export default IndividualPage;
