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
  phoneNumber: string;
  otp: string;
}

declare interface LoginVariables {
  phoneNumber: string;
  password?: string;
  otp?: string;
}

declare interface LoginResponse {
  token: string;
  expiresIn: number;
}

declare interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
}


declare interface LandDetailsResponse {
  status: number;
  message: string;
  data: LandDetails[];
}
declare interface LandDetails {
  id: number;
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
  
declare interface LandOwner {
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
}
declare interface Property {
  id: number;
  itemName: string;
  landDetailsId: number;
  cropDetails: string;
  totalArea: number;
  surveyNumbers: string;
  location: string;
}
declare interface Witness {
  id: number;
  landDetailsId: number;
  name: string;
  address: string;
  note: string;
  date: string;
}


declare interface DeleteResponse {
  status: number;
  message: string;
  data: null;
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


// declare interface ApiSetuResponse {
//   status: number;
//   message: string;
//   data: ApiSetuData;
// }

// {
//   "issuedDocuments": [
//     {
//       "name": "string",
//       "type": "string",
//       "size": "string",
//       "date": "string",
//       "parent": "string",
//       "mime": "string",
//       "uri": "string",
//       "doctype": "string",
//       "description": "string",
//       "issuer": "string",
//       "issuerid": "string"
//     }
//   ]
// 

declare interface ApiSetuResponse {
  issuedDocuments: IssuedDocument[];
}

declare interface IssuedDocument {
  name: string;
  type: string;
  size: string;
  date: string;
  parent: string;
  mime: string;
  uri: string;
  doctype: string;
  description: string;
  issuer: string;
  issuerid: string;
}

declare interface ApiSetuVariables {
  code: string;
  state: string;
  mobile: string;
  codeVerifier: string;
}



