interface ChannelType {
  createdAt: string;
  updatedAt: string;
  createdBy: any;
  updatedBy: any;
  createdSys: any;
  updatedSys: any;
  active: any;
  deleted: any;
  _id: number;
  name: string;
  description: string;
}

interface NotificationTemplateConfig {
  createdAt: string;
  updatedAt: string;
  createdBy: any;
  updatedBy: any;
  createdSys: any;
  updatedSys: any;
  active: boolean;
  deleted: any;
  _id: number;
  name: string;
  sender: string;
  isAWS: boolean;
  smtp_port: string;
  reply_to: string;
  username: string;
  password: string;
  smtp_server: string;
  requireTLS: boolean;
  ignoreTLS: boolean;
  secure: boolean;
  notificationId: any;
}

interface NotificationData {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  createdSys: any;
  updatedSys: any;
  active: boolean;
  deleted: any;
  _id: number;
  name: string;
  title: string;
  subject: string;
  body: string;
  attachments: string;
  notificationConfigId: number;
  pushConfigId: any;
  channelType: ChannelType;
  notificationTemplateConfig: NotificationTemplateConfig;
  pushConfig: any;
}

export class NotificationTemplate {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  createdSys: any;
  updatedSys: any;
  active: boolean;
  deleted: any;
  _id: number;
  name: string;
  title: string;
  subject: string;
  body: string;
  attachments: string;
  notificationConfigId: number;
  pushConfigId: any;
  channelType: ChannelType;
  notificationTemplateConfig: NotificationTemplateConfig;
  pushConfig: any;

}
