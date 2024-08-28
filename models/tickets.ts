import {
  AssetInUseListItemModel,
  AssetSubTypeListItemModel,
  AssetInUseCustomerDetailsModel,
} from "./assets";
import { ConfigurationModel } from "./configurations";
import { EmployeeDetailsModel } from "./employees";

export interface TicketListItemModel {
  id?: string;
  description?: string;
  dueBy?: string;
  assetInUseDetails?: AssetInUseListItemModel;
  assetSubTypeDetails?: AssetSubTypeListItemModel;
  statusDetails?: ConfigurationModel;
  priorityDetails?: ConfigurationModel;
  ticketTypeDetails?: ConfigurationModel;
  serviceTypeDetails?: ConfigurationModel;
  warrantyDetails?: ConfigurationModel;
  customerDetails?: AssetInUseCustomerDetailsModel;
  issueTypeDetails?: ConfigurationModel;
  billable?: boolean;
  timerRunning?: boolean;
  createdAt?: string;
  ticketNo?: string;
  assignedToDetails?: EmployeeDetailsModel;
}

export interface RaiseTicketRequestModel {
  assetId?: string;
  issueType?: string;
  description?: string;
  assetImages?: string[];
}
