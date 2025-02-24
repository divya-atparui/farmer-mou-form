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

declare interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
}

declare interface LandDetailsVariables {
  accountNumber: string;
  accountHolder: string;
  dateCreated: string;
  ifscCode: string;
  swiftCode: string;
  bank: string;
  branch: string;

  landOwners: LandOwner[];
  propertyDetails: Property[];
  witnesses: Witness[];
  geoCoordinates: string | "";
}

declare interface LandOwner {
  landownerName: string;
  signature: string;
  aadhar: string;
  address:string;
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

// [
//   {
//     "id": 0,
//     "accountNumber": "string",
//     "accountHolder": "string",
//     "dateCreated": "2024-12-06",
//     "ifscCode": "string",
//     "swiftCode": "string",
//     "bank": "string",
//     "branch": "string",
//     "aksmvbsMembershipNumber": "string",
//     
//     "userId": 0,
//     "createdBy": "string",
//     "approved": true,
//     "approverName": "string",
//     "createdDate": "2024-12-06T07:39:09.184Z",
//     "lastModifiedBy": "string",
//     "lastModifiedDate": "2024-12-06T07:39:09.184Z",
//     "geoCoordinates": "string",
//     "latitude": "string",
//     "longitude": "string"
//   }
// ]
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
  userId: number;
  createdBy: string;
  approved: boolean;
  approverName: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  geoCoordinates: string;
  bankDetailsPath: string;
}
  
declare interface LandOwnerResponse {
  id: number;
  landownerName: string;
  signature: string;
  aadhaar: string;
  aadhaarUploadPath: string;
  landDeedPath: string;
  address: string;
  date: string;
  email: string;
  mobile: string;
  landDetailsId?: number;
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

declare interface UserLandDetailsResponse {
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
  geoCoordinates: string | "";
  latitude?: number;
  longitude?: number;
}

declare interface UserDetailsResponse {
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

declare interface UserLandDetailsDataTable {
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
  userId: number;
  createdBy: string;
  approved: boolean;
  approverName: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  geoCoordinates: string | "";
  latitude?: number;
  longitude?: number;
}