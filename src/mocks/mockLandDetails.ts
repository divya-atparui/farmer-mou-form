

export const mockLandDetailsResponse: LandDetailsResponse = {
  id: 1,
  accountNumber: "1234567890",
  accountHolder: "John Doe",
  dateCreated: "2024-03-15",
  ifscCode: "ABCD0001234",
  swiftCode: "ABCDUS33XXX",
  bank: "Global Bank",
  branch: "Main Branch",
  aksmvbsMembershipNumber: "AKSM123456",
  landOwners: [
    {
      id: 1,
      landownerName: "John Doe",
      signature: "JD_Sign",
      aadhar: "1234-5678-9012",
      date: "2024-03-15",
      email: "john.doe@example.com",
      mobile: "9876543210",
      landDetailsId: 1,
      address: "Bangalore"
    },
    {
      id: 2,
      landownerName: "Jane Smith",
      signature: "JS_Sign",
      aadhar: "9876-5432-1098",
      date: "2024-03-15",
      email: "jane.smith@example.com",
      mobile: "8765432109",
      landDetailsId: 1,
      address: "Chennai"
    }
  ],
  propertyDetails: [
    {
      id: 1,
      itemName: "Agricultural Land",
      landDetailsId: 1,
      cropDetails: "Rice, Wheat",
      totalArea: 100.5,
      surveyNumbers: "123/A, 124/B",
      location: "Rural District"
    },
    {
      id: 2,
      itemName: "Orchard",
      landDetailsId: 1,
      cropDetails: "Mango, Coconut",
      totalArea: 50.75,
      surveyNumbers: "125/C",
      location: "Coastal Region"
    }
  ],
  witnesses: [
    {
      id: 1,
      landDetailsId: 1,
      name: "Robert Wilson",
      address: "123 Main St, City",
      note: "Family Friend",
      date: "2024-03-15"
    },
    {
      id: 2,
      landDetailsId: 1,
      name: "Sarah Johnson",
      address: "456 Oak Ave, Town",
      note: "Local Representative",
      date: "2024-03-15"
    }
  ]
};
