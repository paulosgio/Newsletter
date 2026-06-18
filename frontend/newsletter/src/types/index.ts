export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
    email: string,
    password: string,
    role: "ADMIN" | "USER"
}

export interface ICampaign {
    title: string,
    subject: string,
    content: string
}

export interface ICampaignUpdate {
    title?: string,
    subject?: string,
    content?: string
}

export interface ICampaignUser {
    id: string,
	title: string,
	subject: string,
	content: string,
	sent: boolean,
	sentAt: string,
	authorId: string
}

export interface IUser {
    id: string,
    email: string,
    role: "ADMIN" | "USER",
    subscribed: boolean,
    campaigns: ICampaignUser[]
}