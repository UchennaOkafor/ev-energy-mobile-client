// Generated using https://transform.tools/json-to-typescript

export interface PointOfInterestItem {
  DataProvider: DataProvider;
  OperatorInfo: OperatorInfo;
  UsageType: UsageType;
  StatusType: StatusType;
  SubmissionStatus: SubmissionStatus;
  UserComments?: UserComment[];
  PercentageSimilarity: any;
  MediaItems?: MediaItem[];
  IsRecentlyVerified: boolean;
  DateLastVerified: string;
  ID: number;
  UUID: string;
  ParentChargePointID?: number;
  DataProviderID: number;
  DataProvidersReference?: string;
  OperatorID: number;
  OperatorsReference?: string;
  UsageTypeID: number;
  UsageCost?: string;
  AddressInfo: AddressInfo2;
  Connections: Connection[];
  NumberOfPoints: number;
  GeneralComments?: string;
  DatePlanned?: string;
  DateLastConfirmed?: string;
  StatusTypeID: number;
  DateLastStatusUpdate: string;
  MetadataValues?: any[];
  DataQualityLevel: number;
  DateCreated: string;
  SubmissionStatusTypeID: number;
}

export interface DataProvider {
  WebsiteURL: string;
  Comments?: string;
  DataProviderStatusType: DataProviderStatusType;
  IsRestrictedEdit: boolean;
  IsOpenDataLicensed: any;
  IsApprovedImport: any;
  License: string;
  DateLastImported?: string;
  ID: number;
  description?: string;
  Title?: string;
}

export interface DataProviderStatusType {
  IsProviderEnabled: boolean;
  ID: any;
  description: any;
}

export interface OperatorInfo {
  WebsiteURL: string;
  Comments: any;
  PhonePrimaryContact: any;
  PhoneSecondaryContact: any;
  IsPrivateIndividual: boolean;
  AddressInfo?: AddressInfo;
  BookingURL?: string;
  ContactEmail?: string;
  FaultReportEmail?: string;
  IsRestrictedEdit: boolean;
  ID: number;
  description?: string;
  Title?: string;
}

export interface AddressInfo {
  ID: number;
  AddressLine1: string;
  AddressLine2: any;
  Town: string;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Country: Country;
  Latitude: number;
  Longitude: number;
  ContactTelephone1: any;
  ContactTelephone2: any;
  ContactEmail: string;
  AccessComments: string;
  RelatedURL: any;
  Distance: any;
  DistanceUnit: number;
  Title: string;
}

export interface Country {
  ID: number;
  ISOCode: string;
  ContinentCode: string;
  Title: string;
}

export interface UsageType {
  IsPayAtLocation: boolean;
  IsMembershipRequired: boolean;
  IsAccessKeyRequired: boolean;
  ID: number;
  description?: string;
  Title?: string;
}

export interface StatusType {
  IsOperational: boolean;
  IsUserSelectable: boolean;
  ID: number;
  description?: string;
  Title?: string;
}

export interface SubmissionStatus {
  IsLive: boolean;
  ID: number;
  description?: string;
  Title?: string;
}

export interface UserComment {
  ID: string;
  ChargePointID: number;
  CommentTypeID: number;
  CommentType: CommentType;
  UserName: string;
  Comment: string;
  RelatedURL: string;
  DateCreated: string;
  User: User;
  CheckinStatusTypeID: number;
  CheckinStatusType: CheckinStatusType;
}

export interface CommentType {
  ID: number;
  Title: string;
}

export interface User {
  ID: number;
  Username: string;
  ReputationPoints: number;
  ProfileImageURL: string;
}

export interface CheckinStatusType {
  ID: number;
  Title: string;
  IsAutomatedCheckin: boolean;
  IsPositive: boolean;
}

export interface MediaItem {
  ID: string;
  ChargePointID: string;
  ItemURL: string;
  ItemThumbnailURL: string;
  Comment: string;
  IsEnabled: boolean;
  IsVideo: boolean;
  IsFeaturedItem: boolean;
  IsExternalResource: boolean;
  User: User2;
  DateCreated: string;
}

export interface User2 {
  ID: number;
  Username: string;
  ReputationPoints: number;
  ProfileImageURL: string;
}

export interface AddressInfo2 {
  ID: number;
  description?: string;
  AddressLine1: string;
  AddressLine2: any;
  Town: string;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Country: Country2;
  Latitude: number;
  Longitude: number;
  ContactTelephone1: any;
  ContactTelephone2: any;
  ContactEmail?: string;
  AccessComments?: string;
  RelatedURL?: string;
  Distance: any;
  DistanceUnit: number;
  Title?: string;
}

export interface Country2 {
  ISOCode: string;
  ContinentCode: string;
  ID: number;
  description?: string;
  Title?: string;
}

export interface Connection {
  ID: number;
  ConnectionTypeID: number;
  ConnectionType: ConnectionType;
  Reference: any;
  StatusTypeID: number;
  StatusType: StatusType2;
  LevelID: number;
  Level: Level;
  Amps?: number;
  Voltage?: number;
  PowerKW: number;
  CurrentTypeID: number;
  CurrentType: CurrentType;
  Quantity: number;
  Comments?: string;
}

export interface ConnectionType {
  FormalName: string;
  IsDiscontinued: boolean;
  IsObsolete: boolean;
  ID: number;
  Title?: string;
  description?: string;
}

export interface StatusType2 {
  IsOperational: boolean;
  IsUserSelectable: boolean;
  ID: number;
  Title?: string;
  description?: string;
}

export interface Level {
  ID: number;
  Title?: string;
  Comments: string;
  IsFastChargeCapable: boolean;
  description?: string;
}

export interface CurrentType {
  ID: number;
  Title?: string;
  Description?: string;
  description?: string;
}
