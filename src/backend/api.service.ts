import { Ticket,User } from "./models";

const randomizeDelay = () => Math.random() * 4000;
const delayBy = (byMs: any) => new Promise(resolve => setTimeout(() => resolve(), byMs));

const logApiCall = (api: any) => console.log(`API call was made to endpoint: [${api}]`);
const logApiGET = (api: any) => logApiCall(`GET: ${api}`);
const logApiPOST = (api: any, payload?: {
    description?: string ,
    ticketId?: number,
    assigneeId?: number,
    completed?: boolean
}) =>
  logApiCall(`POST: ${api}` + (payload ? `, payload:${JSON.stringify(payload, null, 2)}` : ""));

let usersDB = [
  new User(111, "Julie"),
  new User(222, "Hank"),
  new User(333, "Al")
];

let lastId = 1;
let ticketsDB = [
  new Ticket(0, "Install a monitor arm", false, 111),
  new Ticket(1, "Move the desk to the new location", false, 111)
];

class Api {

  tickets(text?: string): Promise<Ticket[]> {
    return delayBy(randomizeDelay())
      .then(() => {
        logApiGET(`tickets/${text || ""}`);
        let matching;
        if(text) {
          matching = ticketsDB.filter(t => t.description.indexOf(text) !== -1);
        } else {
          matching = ticketsDB;
        }

        if (!matching) {    
          throw new Error(`Cannot find ticket`);      
        } 
        return matching;
      });
  }

  ticket(id: number): Promise<Ticket> {
    return delayBy(randomizeDelay())
      .then(() => {
        logApiGET(`ticket/${id}`);
        const matching = ticketsDB.filter(t => t.id === +id)[0];
        if (!matching) {
          throw new Error(`Cannot find ticket ${+id}`);
        } 
        return matching;
      });
  }

  newTicket(payload: { description: string }): Promise<Ticket> {
    return delayBy(randomizeDelay())
      .then(() => {
        logApiPOST("newTicket", payload);
        if (!payload.description) {
          throw new Error(`Description is a required field`);
        }
        const newTicket = new Ticket(++lastId, payload.description, false, null);
        ticketsDB.push(newTicket);
        return newTicket;
      });
  }


  assign(ticketId: number, assigneeId: number): Promise<Ticket> {
    return delayBy(randomizeDelay())
      .then(() => {    
        logApiPOST("assign", {ticketId, assigneeId});
        const matchingTicket = ticketsDB.filter(t => t.id === ticketId)[0];
        const matchingUser = usersDB.filter(u => u.id === assigneeId)[0];
    
        if (!matchingTicket) {
          throw new Error(`Cannot find ticket ${ticketId}`)
        } else if (!matchingUser) {
          throw new Error(`Cannot find user ${assigneeId}`);
        }

        matchingTicket.assigneeId = assigneeId;
        return matchingTicket;
      });
  }

  complete(ticketId: number, completed: boolean): Promise<Ticket> {
    return delayBy(randomizeDelay())
      .then(() => {    
        logApiPOST("complete", {ticketId, completed});
        const matchingTicket = ticketsDB.filter(t => t.id === ticketId)[0];
    
        if (!matchingTicket) {
          throw new Error(`Cannot find ticket ${ticketId}`);
        } 

        matchingTicket.completed = completed;
        return matchingTicket;
      });
  }


  users(): Promise<User[]> {
    return delayBy(randomizeDelay()).then(() => {
      logApiGET("users");
      return usersDB;
    });
  }

  user(id: number): Promise<User> {
    return delayBy(randomizeDelay())
      .then(() => {
        logApiGET(`users/${id}`);        
        const matching = usersDB.filter(t => t.id === +id)[0];
        if (!matching) {
          throw new Error(`Cannot find user ${+id}`);
        }         
        return matching;
      });
  }

}
export const ApiServer = new Api();
