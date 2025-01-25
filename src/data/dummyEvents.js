import moment from "moment";

export const dummyEvents = [
  {
    id: 1,
    title: "Event 1",
    start: moment("2024-12-18T10:10:10").toDate(),
    end: moment("2024-12-18T12:10:10").toDate(),
    type: "Student Event",
    description:
      "This is a detailed description of Event 1. It is a student-focused event aimed at learning and collaboration.",
    location: "Auditorium A, NIT Rourkela",
  },
  {
    id: 2,
    title: "Event 2",
    start: moment("2024-12-19T14:10:10").toDate(),
    end: moment("2024-12-19T16:12:10").toDate(),
    type: "Community Event",
    description:
      "Event 2 is a community-driven initiative designed to foster networking and sharing ideas.",
    location: "Community Hall, Sector 5",
  },
  {
    id: 3,
    title: "Event 3",
    start: moment("2024-12-20T14:10:10").toDate(),
    end: moment("2024-12-20T16:15:10").toDate(),
    type: "Workshop",
    description:
      "This workshop will provide hands-on experience in web development using modern tools and frameworks.",
    location: "Lab 3, CS Department",
  },
];
