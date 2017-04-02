export interface IFeed {
  action: string,
  project: string,
  timestamp: number,
  type: string,
  user: string,
}

export class Feed implements IFeed {

  action: string;
  project: string;
  timestamp: number;
  type: string;
  user: string;

  constructor(){}

}
