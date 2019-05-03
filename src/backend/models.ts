export class Ticket {
  constructor(
    public readonly id: number,
    public description: string,
    public completed: boolean,
    public assigneeId: number | null
  ) {}
}

export class User {
  constructor(
    public readonly id:number, 
    public name: string) {
      
    }
}
