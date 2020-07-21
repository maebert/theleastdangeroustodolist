export type Pack = "tutorial" | "basic";
export type Tag =
  | "alreadydone"
  | "outside"
  | "body"
  | "social"
  | "clothes"
  | "hygiene"
  | "adulting"
  | "cleaning"
  | "food"
  | "digital"
  | "selfhelp";

export type Todo = {
  text: string;
  rating?: number;
  tags: Tag[];
};

const data: { [key in Pack]: Todo[] } = {
  tutorial: [
    {
      text: "The satisfaction of checking things off your To Do list...",
      tags: [],
    },
    { text: "Minus the work of actually doing them.", tags: [] },
    { text: "Each day you get six new low-effort tasks.", tags: [] },
    { text: "Swipe to mark them done.\nTry it now", tags: [] },
    { text: "Swipe down for settings", tags: [] },
    { text: "Finish this list to get started", tags: [] },
  ],
  basic: [
    {
      text: "Leave the house",
      tags: ["outside"],
      rating: 2,
    },
    {
      text: "Tell someone a joke",
      tags: ["social"],
      rating: 1,
    },
    {
      text: "Change into something more comfortable",
      tags: ["clothes"],
      rating: 2,
    },
    {
      text:
        "Wash your hands for as long as it takes you to sing 'Happy Birthday'",
      tags: ["hygiene"],
      rating: 1,
    },
    {
      text: "Respond to one email",
      tags: ["adulting"],
      rating: 2,
    },
    {
      text: "Throw away all the mismatched socks in your drawer",
      tags: ["cleaning"],
      rating: 3,
    },
    {
      text: "Eat breakfast",
      tags: ["food"],
      rating: 1,
    },
    {
      text: "Wear your favorite jeans",
      tags: ["clothes"],
      rating: 2,
    },
    {
      text: "Clean up your computer desktop",
      tags: ["digital"],
      rating: 3,
    },
    {
      text: "Clean your laptop screen",
      tags: ["digital", "cleaning"],
      rating: 2,
    },
    {
      text: "Schedule an appointment",
      tags: ["adulting"],
      rating: 3,
    },
    {
      text: "Listen to a Podcast while cleaning",
      tags: ["cleaning"],
      rating: 1,
    },
    {
      text: "Comment something positive on a social media post",
      tags: ["social", "digital"],
      rating: 4,
    },
    {
      text: "Send a selfie to a friend",
      tags: ["social"],
      rating: 3,
    },
    {
      text: "Put on pants",
      tags: ["clothes"],
      rating: 2,
    },
    {
      text: "Check your email",
      tags: ["adulting"],
      rating: 2,
    },
    {
      text: "Get out of bed",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Brush your teeth",
      tags: ["hygiene"],
      rating: 1,
    },
    {
      text: "Check what's in the fridge",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Open The Least Dangerous To Do List app",
      tags: ["alreadydone"],
      rating: 2,
    },
    {
      text: "Find your keys",
      tags: ["cleaning"],
      rating: 1,
    },
    {
      text: "Anwswer a Robo-Call and press '2' to unsubscribe",
      tags: ["adulting"],
      rating: 3,
    },
    {
      text: "Wear matching socks",
      tags: ["clothes"],
      rating: 1,
    },
    {
      text: "Complete all tasks for today",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Check off a task you haven't actually completed",
      tags: ["alreadydone"],
      rating: 3,
    },
    {
      text: "Look into the mirror and compliment yourself",
      tags: ["selfhelp"],
      rating: 1,
    },
    {
      text: "Do a 15 second calf stretch",
      tags: ["body"],
      rating: 3,
    },
    {
      text: "Take one deep breath",
      tags: ["body"],
      rating: 3,
    },
    {
      text: "Ignore someone's advice",
      tags: ["social"],
      rating: 3,
    },
    {
      text: "Sit up straight, right now",
      tags: ["body"],
      rating: 4,
    },
    {
      text: "Clear your browser history",
      tags: ["digital"],
      rating: 3,
    },
    {
      text: "Close all the open tabs of articles you haven't read yet",
      tags: ["digital"],
      rating: 4,
    },
    {
      text: "Throw away something in your fridge",
      tags: ["cleaning"],
      rating: 4,
    },
    {
      text: "Self a selfie to a parent",
      tags: ["social"],
      rating: 4,
    },
    {
      text:
        "Read a random Wikipedia article https://en.wikipedia.org/wiki/Special:Random",
      tags: ["digital"],
      rating: 2,
    },
    {
      text: "Flake out on your plans tonight and do something lazy",
      tags: ["social"],
      rating: 4,
    },
    {
      text: "Clean the lint trap in your dryer",
      tags: ["cleaning"],
      rating: 4,
    },
    {
      text: "Restart your computer",
      tags: ["digital"],
      rating: 2,
    },
    {
      text: "Charge your phone",
      tags: ["digital"],
      rating: 3,
    },
    {
      text: "Give this app a 5 star rating tldtdl://review",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Use an emoji you've never used before",
      tags: ["digital", "social"],
      rating: 2,
    },
    {
      text: "Change your toothbrush head or entire toothbrush",
      tags: ["hygiene"],
      rating: 3,
    },
    {
      text: "Make plans with someone",
      tags: ["social"],
      rating: 2,
    },
    {
      text: "Eat one thing that isn't brown",
      tags: ["food"],
      rating: 3,
    },
    {
      text:
        "Unfollow the first person in your facebook feed who posts something negative",
      tags: ["social"],
      rating: 4,
    },
    {
      text: "Don't check the news today",
      tags: ["selfhelp"],
      rating: 3,
    },
    {
      text: "Don't think about Trump",
      tags: ["selfhelp"],
      rating: 3,
    },
    {
      text: "Clean your ears",
      tags: ["hygiene"],
      rating: 4,
    },
    {
      text: "Clip your nails",
      tags: ["hygiene"],
      rating: 2,
    },
    {
      text: "Feel okay about not flossing",
      tags: ["hygiene"],
      rating: 4,
    },
    {
      text: "Delete an app you haven't used in a month",
      tags: ["digital"],
      rating: 3,
    },
    {
      text: "Make eye contact with someone",
      tags: ["social"],
      rating: 2,
    },
    {
      text: "Ask someone how their weekend was or about their weekend plans",
      tags: ["social"],
      rating: 2,
    },
    {
      text: "Think of someone's family",
      tags: ["selfhelp"],
      rating: 2,
    },
    {
      text: "Pay full price for something",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Tip someone",
      tags: ["social"],
      rating: 2,
    },
    {
      text: "Eat something without looking at a screen",
      tags: ["food", "selfhelp"],
      rating: 3,
    },
    {
      text: "Close all open apps on your phone",
      tags: ["digital"],
      rating: 2,
    },
    {
      text: "Unsubscribe from one email in your inbox",
      tags: ["adulting"],
      rating: 2,
    },
    {
      text: "Take the trash out",
      tags: ["cleaning"],
      rating: 1,
    },
    {
      text: "Do ⬆️ that thing twice",
      tags: ["alreadydone"],
      rating: 4,
    },
    {
      text: "Open a window",
      tags: ["body"],
      rating: 1,
    },
    {
      text: "Drink something without caffeie, sugar, or alcohol",
      tags: ["food"],
      rating: 2,
    },
    {
      text: "Listen to the first song that pops into your head",
      tags: ["selfhelp"],
      rating: 2,
    },
    {
      text: "Send a message to the first person you can think of",
      tags: ["social"],
      rating: 2,
    },
    {
      text: "Think of someone you like",
      tags: ["selfhelp"],
      rating: 2,
    },
    {
      text: "Make your bed",
      tags: ["cleaning"],
      rating: 1,
    },
    {
      text: "Wear your favorite pair of socks",
      tags: ["clothes"],
      rating: 2,
    },
    {
      text: "Make a list",
      tags: ["adulting"],
      rating: 2,
    },
    {
      text: "How many lines can you draw in this box ?",
      tags: ["alreadydone"],
      rating: 1,
    },
    {
      text: "Put on chapstick. You need chapstick.",
      tags: ["hygiene"],
      rating: 1,
    },
    {
      text: "Clean your keyboard",
      tags: ["digital", "cleaning"],
      rating: 2,
    },
    {
      text: "Clean your phone screen",
      tags: ["cleaning", "digital"],
      rating: 2,
    },
    {
      text: "Turn off the lights in the other rooms",
      tags: ["adulting"],
      rating: 3,
    },
    {
      text: "Touch a plant",
      tags: ["selfhelp"],
      rating: 2,
    },
    {
      text: "Look at a (live) animal for a minute",
      tags: ["selfhelp"],
      rating: 3,
    },
    {
      text:
        "Remember something positive about someone you're not on great terms with",
      tags: ["selfhelp"],
      rating: 3,
    },
    {
      text: "Don't post something on social media today",
      tags: ["digital"],
      rating: 3,
    },
    {
      text:
        "Throw away a book on your shelf that you're never going to read anyway",
      tags: ["cleaning"],
      rating: 2,
    },
    {
      text: "",
      tags: [],
      rating: 2,
    },
  ],
};

export default data;
