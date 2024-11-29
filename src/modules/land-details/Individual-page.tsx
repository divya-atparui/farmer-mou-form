"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useGetIndividualLandDetails } from "@/api/data/use-get-individual-land-details";
import { useLanguage } from "@/contexts/LanguageContext";
import JsonDataView from "../JsonDataView";
import JsonDataKannadaView from "../JsonDataKannadaView";

const IndividualPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetIndividualLandDetails({
    variables: {
      id: id as string,
    },
  });
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
  return (
    <div>
      {messages.lang === "en" ? (
        <JsonDataView data={jsonData} />
      ) : (
        <JsonDataKannadaView data={jsonData} />
      )}
    </div>
  );
};

export default IndividualPage;
