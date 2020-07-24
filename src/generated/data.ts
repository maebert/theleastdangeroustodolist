export type Tag = "Social" | "Already Done" | "Digital" | "Adulting" | "Selfhelp" | "Hygiene" | "Clothes" | "Cleaning" | "Body" | "Food" | "Outside";
export type Pack = "Basic" | "Tutorial";
export type Todo = {
    id: string;
    text: string;
    pack: Pack;
    tags: Tag[];
    rating?: number;
    exclude: string[]
    group?: string
};

const data: Todo[] = [
  {
    "id": "rec1VbM0EwfItP24H",
    "text": "Make plans with someone",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rec1jnsnjuSSFBJl3",
    "text": "Get out of bed",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rec1wkzcNeWnvaanZ",
    "text": "Don't post something on social media today",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "rec2DiBGCbTjaicS9",
    "text": "Self a selfie to a parent",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "rec3lLiZWkhJtmk1V",
    "text": "Flake out on your plans tonight and do something lazy",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "rec4J3vrR6QldfwPb",
    "text": "Check what's in the fridge",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rec4t9vBQmX4Zo5z2",
    "text": "Use an emoji you've never used before",
    "tags": [
      "Digital",
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rec5FzhZu0NSeQDra",
    "text": "Respond to one email",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rec5RluUoBU5L21AU",
    "text": "Put someone else's phone on the charger",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "rec7WvxkP2mpGE0X9",
    "text": "Don't check the news today",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "rec90rp6ByaRmoLzr",
    "text": "How many lines can you draw in this box?",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recAEwVsayBWg3UmH",
    "text": "Think of someone you like",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recAPUxQ5C34AZdYr",
    "text": "Schedule an appointment",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recBOGkSWyB9uLDR9",
    "text": "Clean your ears",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recC6c3zqqbqR1ePe",
    "text": "Wear your favorite pair of socks",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recCn5U7agYcUPBGr",
    "text": "Change your toothbrush head or entire toothbrush",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recDMOoROvYUeSPml",
    "text": "Don't think about Trump",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recDVJQYplDmtK8om",
    "text": "Put on pants",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recDaatWFgB8tyHFu",
    "text": "4 Swipe to mark them done.\nTry it now",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recFZ5X2XSqGABeNI",
    "text": "Tell someone a joke",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recFZUdfsXDJfSGhf",
    "text": "Clean your keyboard",
    "tags": [
      "Digital",
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recGmnicG7uYGQcK1",
    "text": "Check off a task you haven't actually completed",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recHeqYtiCQKD8fJi",
    "text": "Change into something more comfortable",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recIb1RdbPA2YEEDp",
    "text": "2 Minus the work of actually doing them",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recJ1SddZun0jbkaK",
    "text": "Delete an app you haven't used in a month",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recJpXAkKBGcMcJYF",
    "text": "Clip your nails",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recKzm5KfjVf86IHq",
    "text": "Throw away a book on your shelf that you're never going to read anyway",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recLvCfL3dvhhHdkQ",
    "text": "Look at a (live) animal for a minute",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recNMrZmtYam8Rg8D",
    "text": "Tip someone",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recOARE1hRmhgWt60",
    "text": "Touch a plant",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recOnnUmusXiPVAak",
    "text": "Send a message to the first person you can think of",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recPfOzRGy9gY4qOj",
    "text": "Anwswer a Robo-Call and press '2' to unsubscribe",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recPoBQUXSHntErqc",
    "text": "Throw away all the mismatched socks in your drawer",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recPuOPt60bdnnKoF",
    "text": "Read a random Wikipedia article https://en.wikipedia.org/wiki/Special:Random",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recPuSI4b33MPtSci",
    "text": "6 Finish this list to get started",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recQ3oDc6uvlHCb50",
    "text": "Unfollow the first person in your facebook feed who posts something negative",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recQ6TJOWiXMPAQmb",
    "text": "Clear your browser history",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recQa8bj0XzAyxshl",
    "text": "Sit up straight, right now",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recQsZr0vvcTSHO7W",
    "text": "Wash your hands. Really, really long.",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recSbyblhKiuc1CQT",
    "text": "3 Each day you get six new low-effort tasks",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recShvaYkPRI2GZKm",
    "text": "Drink something without caffeine",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "drink something"
  },
  {
    "id": "recT7b4Rw0nugrj4u",
    "text": "Clean your laptop screen",
    "tags": [
      "Cleaning",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recTMfOQRFCfrNEhf",
    "text": "Take one deep breath",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recTyxtCQAgy26Tv5",
    "text": "Charge your phone",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recUqCGy3pxTeBI8U",
    "text": "Listen to a Podcast while cleaning",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recXhlnsdjXLftMib",
    "text": "Do a 15 second calf stretch",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recXkWP95qFimLW2m",
    "text": "Remember something positive about someone you're not on great terms with",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recY7uCTRgoYPZMgh",
    "text": "Ignore someone's advice",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "reca9US0sYTP9bCmx",
    "text": "Find your keys",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recagnPnn2ygiRmhA",
    "text": "Take the trash out",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recbP0L5jQwSXv2m2",
    "text": "Listen to the first song that pops into your head",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recbqaLte8Iz5VTm0",
    "text": "1 The satisfaction of checking things off your To Do list...",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "reccdlg7Yjv2mxe4i",
    "text": "Ask someone how their weekend was or about their weekend plans",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "reccoINlbfHAV9MuE",
    "text": "Clean up your computer desktop",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recdm4Cl2CCHIthXR",
    "text": "Close all the open tabs of articles you haven't read yet",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "rece1Sc4erbIPlDDB",
    "text": "Make a list",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rechSkxZDGXvNPDYf",
    "text": "Drink something without sugar",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "drink something"
  },
  {
    "id": "rechU4rz9gZlhHpUy",
    "text": "Eat one thing that isn't brown",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "rechhPbpAx4m8uIkE",
    "text": "Wear matching socks",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rechtfLUPvcQwpkBZ",
    "text": "Throw away something in your fridge",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recisER2bi02iUHwX",
    "text": "Put on chapstick. You need chapstick.",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recjYkFjmYUZMseuZ",
    "text": "Send a selfie to a friend",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recjo8E79zaRdECce",
    "text": "Eat breakfast",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recjzJUBA5RSKwR7r",
    "text": "Check your email",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "reckE6DpgWgZGPWbA",
    "text": "Make your bed",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "reckartzt2qNCh4GO",
    "text": "Open a window",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "reckcLijDpdUyvxcO",
    "text": "Restart your computer",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recl4uDrl9dMLqGTQ",
    "text": "5 Swipe down for settings",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recmV96J1xqxd3qfS",
    "text": "Leave the house",
    "tags": [
      "Outside"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recmXOiNdLfmTJs7s",
    "text": "Unsubscribe from one email in your inbox",
    "tags": [
      "Adulting",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recmfQhcHbrzRGddN",
    "text": "Give this app a 5 star rating tldtdl://review",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recoB9NMlsZzNwTpv",
    "text": "Drink something without alcohol",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "drink something"
  },
  {
    "id": "recosuxTxeoev1VI5",
    "text": "Clean the lint trap in your dryer",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recoxtg1aSaohiKAb",
    "text": "Think of someone's family",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recpAr3uSeeQuZHub",
    "text": "Make eye contact with someone",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recpm6GCl7ro2iMcL",
    "text": "Open The Least Dangerous To Do List app",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recqXnNZG1fFug4fW",
    "text": "Pay full price for something",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recsFDL0LZ3tC7ceW",
    "text": "Eat something without looking at a screen",
    "tags": [
      "Food",
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recsUNVzbq8sCw9yI",
    "text": "Complete all tasks for today",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rectXeqmZINhUnyXD",
    "text": "Clean your phone screen",
    "tags": [
      "Cleaning",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rectioqVhT3UqPH8U",
    "text": "Brush your teeth",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recuxdRNRLdrb2lFm",
    "text": "Do ⬆️ that thing twice",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [
      "recagnPnn2ygiRmhA"
    ]
  },
  {
    "id": "recvir1DcXywnt97Z",
    "text": "Feel okay about not flossing",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recvoT3nJQwsENuyR",
    "text": "Close all open apps on your phone",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recwRy0UOOmy5FCWz",
    "text": "Wear your favorite jeans",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recwaBFdTg565jCu6",
    "text": "Turn off the lights in the other rooms",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recxTw4E3dMAyrMf8",
    "text": "Look into the mirror and compliment yourself",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "reczSOAn6FQnowvS3",
    "text": "Comment something positive on a social media post",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  }
];

export default data;