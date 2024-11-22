// RealTime seat update
class RealTimeSeatUpdate {
   updateSeat() {
     console.log("update the seat");
   }
 }
 
 
 // To do all events related task
 class Events {
   availableEvents() {
     console.log("return all events");
   }
   bookAEvents(id) {
     return "Booked events id and seat id";
   }
   availableSeatDependsOnEvents(eventName) {
     return "available seat number on specific events";
   }
   cancelEvenets(id) {
     return "Evenst cancel or not";
   }
 }
 
 // for Payment
 class Payment {
   payment(amount) {}
   refund(amount) {}
 }
 
 class Notification {
   sendNotification() {}
 }
 
 
 // To do all events related task
 class EventManagement {
   constructor(
     event,
     realTimeSeatUpdate,
     payment,
  
     notification
   ) {
     this.event = event;
     this.realTimeSeatUpdate = realTimeSeatUpdate;
     this.payment = payment;
   
     this.notification = notification;
   }
   availableEvents() {
     const events = this.event.availableEvents();
     console.log("available events");
     return events;
   }
   reservation(id) {
     const reservedSeatId = this.bookASeat.bookASeat(id);
     const updateSeat = this.realTimeSeatUpdate.updateSeat();
     const sendNotifications = this.notification.sendNotification(userId);
     return {
       reservedSeatId: reservedSeatId,
       sendNotifications: sendNotifications,
     };
   }
   payForTickets(amount) {
     return "payment succesfull";
   }
   cancelEvent(id) {
     console.log("cancel events id");
   }
   notification(userId) {
     return "notifications received";
   }
 }
 
 
 // Craete the Evenst instance and inject all needed dependencies
 function eventFactory() {
   const event = new Events();
   const realTimeSeatUpdate = new RealTimeSeatUpdate();
   const payment = new Payment();
   const notification = new Notification();
   return new EventManagement(
     event,
     realTimeSeatUpdate,
     payment,
     notification
   );
 }
 
 const eventMangement = eventFactory();
