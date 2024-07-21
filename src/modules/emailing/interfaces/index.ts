



export interface EmailConfig_I {
    host?: string;
    port?: number;
    service?: string;
    secure?: boolean;
    auth: {
        user: string;
        pass: string;
    }
}

