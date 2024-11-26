declare interface RegisterResponse {
  createdBy: null;
  createdDate: string;
  lastModifiedBy: null;
  lastModifiedDate: string;
  id: number;
  fullName: string;
  email: string;
  password: string;
  enabled: boolean;
  authorities: unknown[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

declare interface RegisterVariables {
  email: string;
  fullName: string;
  password: string;
}

declare interface LoginVariables {
  email: string;
  password: string;
}

//   {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWltYWhlc2gyMzgyQGdtYWlsLmNvbSIsImlhdCI6MTczMjUxNjU4OSwiZXhwIjoxNzMyNTIwMTg5fQ.9pfyEXZtevjqiyyxbQEu3uYqKoX4k6Wo6Dv6Zs_0794","expiresIn":3600000}
declare interface LoginResponse {
  token: string;
  expiresIn: number;
}

// curl -X 'POST' \
//   'https://aurigraphfarmers-api.atparui.com/land-details' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWltYWhlc2gyMzgyQGdtYWlsLmNvbSIsImlhdCI6MTczMjUzNzE2NCwiZXhwIjoxNzMyNTQwNzY0fQ.eibeA-LxcXc9qMyNhEi6b8M7ibl74U_Y9DIKrs9kXZA' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "accountNumber": "192019201920",
//   "accountHolder": "Divya",
//   "dateCreated": "2024-11-25",
//   "ifscCode": "19209testte",
//   "swiftCode": "19029019210",
//   "bank": "Divine",
//   "branch": "Bangalore",
//   "aksmvbsMembershipNumber": "190290192091",
//   "landOwners": [
//     {
//       "landownerName": "Divyasimha",
//       "signature": "signature",
//       "aadhar": "190291091019",
//       "date": "2024-11-25",
//       "email": "divineleo20@gmail.com",
//       "mobile": "9330438158"
// }'] } "date": "2024-11-25"re"
// {"id":2,"accountNumber":"192019201920","accountHolder":"Divya","dateCreated":"2024-11-25","ifscCode":"19209testte","swiftCode":"19029019210","bank":"Divine","branch":"Bangalore","aksmvbsMembershipNumber":"190290192091","landOwners":[{"id":2,"landownerName":"Divyasimha","signature":"signature","aadhar":"190291091019","date":"2024-11-25T00:00:00.000+00:00","email":"divineleo20@gmail.com","mobile":"9330438158"}],"propertyDetails":[{"id":2,"itemName":"test","landDetailsId":2,"cropDetails":"teset","totalArea":104.0,"surveyNumbers":"10","location":"Bangalore"}],"witnesses":[{"id":2,"landDetailsId":2,"name":"testtest","address":"test","note":"test","date":"2024-11-25T00:00:00.000+00:00"}]}


declare interface LandDetailsVariables {

  accountNumber: string;
  accountHolder: string;
  dateCreated: string;
  ifscCode: string;
  swiftCode: string;
  bank: string;
  branch: string;
  aksmvbsMembershipNumber: string;
  landOwners: LandOwner[];
  propertyDetails: Property[];
  witnesses: Witness[];
}

declare interface LandOwner {
  landownerName: string;
  signature: string;
  aadhar: string;
  date: string;
  email: string;
  mobile: string;
}

declare interface Property {
  itemName: string;
  cropDetails: string;
  totalArea: number;
  surveyNumbers: string;
  location: string;
}
declare interface Witness {
  name: string;
  address: string;
  note?: string;
  date: string;
}

declare interface LandDetailsResponse {

  id: number;
  accountNumber: string;
  accountHolder: string;
  dateCreated: string;
  ifscCode: string;
  swiftCode: string;
  bank: string;
  branch: string;
  aksmvbsMembershipNumber: string;
  landOwners: LandOwnerResponse[];
  propertyDetails: PropertyResponse[];
  witnesses: WitnessResponse[];
}
  

declare interface LandOwnerResponse {
  id: number;
  landownerName: string;
  signature: string;
  aadhar: string;
  date: string;
  email: string;
  mobile: string;
  landDetailsId: number;
  address:string;
}
declare interface PropertyResponse {
  id: number;
  itemName: string;
  landDetailsId: number;
  cropDetails: string;
  totalArea: number;
  surveyNumbers: string;
  location: string;
}
declare interface WitnessResponse {
  id: number;
  landDetailsId: number;
  name: string;
  address: string;
  note: string;
  date: string;
}