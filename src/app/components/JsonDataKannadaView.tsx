import React from "react";

interface JsonDataKannadaViewProps {
  data: LandDetailsResponse | null;
}

const JsonDataKannadaView: React.FC<JsonDataKannadaViewProps> = ({ data }) => {
  if (!data) {
    return <div>No data</div>;
  }
  return <div>JsonDataKannadaView</div>;
};

export default JsonDataKannadaView;
