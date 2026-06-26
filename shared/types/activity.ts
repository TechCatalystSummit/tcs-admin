export interface ActivityItem {
  id: string;
  message: string;
  time: string;
  type: "member" | "event" | "intro" | "payment";
}
