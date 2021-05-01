export interface Schema {
	id?: string;
}

export interface SessionSchema extends Schema {
	serverId: string;
	startDate: Date;
	endDate: Date;
	matches?: MatchSchema[];
	users?: UserSchema[];
	messageId: string;
}

export interface SessionTaskSchema extends Schema {
  sessionId: string;
  timeToRun: Date;
}

export interface MatchSchema extends Schema {
  users?: UserSchema[];
  conversations?: string[];
  sessionId: string;
  serverId: string;
}

export interface UserSchema extends Schema {
	handle: string;
	personalityData?: string;
	pastMatches?: string[];
	sessions?: string[];
}



