export type Tag = "Cleaning" | "Digital" | "Social" | "Already Done" | "Food" | "Selfhelp" | "Adulting" | "Body" | "Clothes" | "Entertainment" | "Hygiene" | "Outside";
export type Pack = "Basic" | "Onboarding" | "Tutorial";
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
    "id": "rec0k2eM9UHe3BipS",
    "text": "Clear some space on your phone",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "phone declutter"
  },
  {
    "id": "rec1CItmBRbWS5aYX",
    "text": "Clear your downloads folder from your computer ",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [],
    "group": "computer declutter"
  },
  {
    "id": "rec1UU0FbA6FvEYws",
    "text": "Throw away something in your freezer ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "rec4J3vrR6QldfwPb",
      "rechtfLUPvcQwpkBZ",
      "rec1kiGvO0xC5Trwk"
    ]
  },
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
    "id": "rec1fXZe3ZWChskJk",
    "text": "Don't check Facebook today ",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recQ3oDc6uvlHCb50",
      "reczSOAn6FQnowvS3"
    ],
    "group": "Screentime"
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
    "id": "rec1kiGvO0xC5Trwk",
    "text": "Refill your ice cube tray ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "rec1pmoJGF26JWydj",
    "text": "Do something nice for a pet, or just check this off if you don't have one",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Vibes"
  },
  {
    "id": "rec1wkzcNeWnvaanZ",
    "text": "Don't post something on social media today",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Screentime"
  },
  {
    "id": "rec2DiBGCbTjaicS9",
    "text": "Send a selfie to your mom or dad and say hi",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [],
    "group": "Texting"
  },
  {
    "id": "rec3H0kl9eCAnbfsV",
    "text": "Use the word “palliative” in a sentence today ",
    "tags": [
      "Selfhelp",
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "vocab"
  },
  {
    "id": "rec3LcWa9ahTxCiHR",
    "text": "Consider buying the HARDCORE PASS to prove your superiority ldtdl://iap",
    "tags": [],
    "pack": "Onboarding",
    "exclude": [],
    "group": "4"
  },
  {
    "id": "rec3gxpak6GZlPHaw",
    "text": "Do something for a friend that you wish they would do for you",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "id": "rec3wefIosH4bwOEI",
    "text": "Journal for 6 minutes about whatever comes to mind",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Writing"
  },
  {
    "id": "rec4HEgaMRqCYsKxd",
    "text": "Cheers someone (even if just over text) for something",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
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
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Texting"
  },
  {
    "id": "rec5FzhZu0NSeQDra",
    "text": "Respond to one email",
    "tags": [
      "Adulting",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Response"
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
    "exclude": [
      "recTyxtCQAgy26Tv5"
    ]
  },
  {
    "id": "rec6hpFcLFOezPThp",
    "text": "Do 5 tricep dips ",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Workout"
  },
  {
    "id": "rec6i5dT5g5h4PcRo",
    "text": "Put something on your calendar to do tomorrow ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rec6zC9EC1o5xdILm",
    "text": "Throw away your rattiest wash cloth or towel",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Purge"
  },
  {
    "id": "rec7Rv0kg06fJa0j6",
    "text": "Take a vitamin or supplement ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rec7WvxkP2mpGE0X9",
    "text": "Don't check the news today",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "rec7v98fh1mGzFZfF",
    "text": "Pick up one piece of trash from anywhere and throw it away ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "rec8253yTHKhREaJS",
    "text": "Long-press to undo a task",
    "tags": [],
    "pack": "Onboarding",
    "exclude": [],
    "group": "1"
  },
  {
    "id": "rec8xZ2m2bgRinLu1",
    "text": "Wear something that fits you ",
    "tags": [
      "Clothes",
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recYUVcBYkQkFyb5L",
      "rectnKiSYYR1N6Nmj"
    ]
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
    "exclude": [],
    "group": "Vibes"
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
    "id": "recAZospFsqgeZmqr",
    "text": "Listen to a song from your favorite band from high school ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Music"
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
    "id": "recBX4Ev2XpHDFEig",
    "text": "Empty your computer's Downloads folder ",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [
      "recdr8HAqoDFiUz91",
      "reccoINlbfHAV9MuE"
    ],
    "group": "computer declutter"
  },
  {
    "id": "recC6c3zqqbqR1ePe",
    "text": "Wear your favorite pair of socks",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "rechhPbpAx4m8uIkE"
    ]
  },
  {
    "id": "recCn5U7agYcUPBGr",
    "text": "Change your toothbrush head (or entire toothbrush)",
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
    "exclude": [],
    "group": "changing"
  },
  {
    "id": "recDaatWFgB8tyHFu",
    "text": "Swipe to mark them done.\nTry it now",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "3"
  },
  {
    "id": "recDcneNqMqgDrls1",
    "text": "Update your computer instead of clicking \"remind me later\" ",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recDhhZWt9xCjNvr0",
    "text": "Listen to a rainstorm album on spotify ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Music"
  },
  {
    "id": "recEhgHjnwU9x0pJk",
    "text": "Text someone and thank them for something ",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Texting"
  },
  {
    "id": "recFQ8Ltuv2XMOogb",
    "text": "Write for 5 minutes on The Most Dangerous Writing App https://maebert.github.io/themostdangerouswritingapp",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Writing"
  },
  {
    "id": "recFRWMNQcKaTGoHa",
    "text": "Say “no” to something or someone today",
    "tags": [
      "Selfhelp",
      "Social"
    ],
    "pack": "Basic",
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
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recG1mut274IdFstW",
    "text": "Smell something that smells good ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recGdC80r6oaQIZzi",
    "text": "Respond to one text message ",
    "tags": [
      "Adulting",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Response"
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
    "id": "recHKR8Doyg2uICbg",
    "text": "Clean out your backpack or purse ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recHQ3GG41cQR1RE1",
    "text": "Set a recurring alarm for 1:11 to take a break",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recHTC3OD4lfxi3UA",
    "text": "Shave... anything.",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "exclude": [
      "recaAWs0893jt4rTv"
    ],
    "group": "changing"
  },
  {
    "id": "recHhwbcAOQN5OfxM",
    "text": "Change the alarm on your phone to a symphony warming up",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recHvUhPmpjTiu1pG",
    "text": "Treat Yo'self on Amazon ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recILklMUtgF4rMvl",
    "text": "Do a cat / cow stretch for 15 seconds ",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "recIQtfykX3ynLHxd",
    "text": "Relax your face muscles ",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "recITd8JgqpIVvPKp",
    "text": "Throw away something in your medicine cabinet that's expired",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recIb1RdbPA2YEEDp",
    "text": "Minus the work of actually doing them",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "1"
  },
  {
    "id": "recIedwD0KLN3CaVi",
    "text": "Throw away 3 old spices from your spice drawer ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Purge"
  },
  {
    "id": "recJ1SddZun0jbkaK",
    "text": "Delete an app you haven't used in a month",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "phone declutter"
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
    "id": "recK6KoXLjD6jeFfd",
    "text": "Respond to your last 3 facebook messages",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "rec1fXZe3ZWChskJk",
      "recQ3oDc6uvlHCb50",
      "rec1wkzcNeWnvaanZ"
    ],
    "group": "Texting"
  },
  {
    "id": "recKGHy4RvqctpECX",
    "text": "Make a grocery list ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recKiWq2r2AuzwLmt",
    "text": "Pick a new theme in the settings ldtdl://themes",
    "tags": [],
    "pack": "Onboarding",
    "rating": 1,
    "exclude": [],
    "group": "3"
  },
  {
    "id": "recKzm5KfjVf86IHq",
    "text": "Throw away a book on your shelf that you're never going to read",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Purge"
  },
  {
    "id": "recL9XN00tCyeS6Gp",
    "text": "Stretch your fingers for 15 seconds",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "recLhjOjTL6a2jmQO",
    "text": "Ignore one piece of self-criticism today",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Confidence"
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
    "id": "recLwHttFWd7FRmbG",
    "text": "Declutter the nearest surface to you right now",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Purge"
  },
  {
    "id": "recMATBzja0rwRtMB",
    "text": "Water a plant ",
    "tags": [
      "Outside"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recMHlViNGHE5yTAv",
    "text": "Read something at some point today",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recMkadGL9Rt6znXu",
    "text": "Do something you didn't do already this week",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
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
    "id": "recNjamirrCSMEuR1",
    "text": "Take the recycling out",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "recagnPnn2ygiRmhA"
    ]
  },
  {
    "id": "recO05Im1RVAh25gF",
    "text": "Text someone a compliment ",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Texting"
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
    "id": "recOMZhJmxoPVvQ2B",
    "text": "Listen to a podcast you've been meaning to listen to ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [
      "recUqCGy3pxTeBI8U",
      "recbP0L5jQwSXv2m2"
    ]
  },
  {
    "id": "recOnnUmusXiPVAak",
    "text": "Send a message to the first person you can think of",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Texting"
  },
  {
    "id": "recPfOzRGy9gY4qOj",
    "text": "Anwswer the next Robo-Call you get and press '2' to unsubscribe",
    "tags": [
      "Adulting",
      "Digital"
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
    "exclude": [],
    "group": "Purge"
  },
  {
    "id": "recPuOPt60bdnnKoF",
    "text": "Read a random Wikipedia article https://en.wikipedia.org/wiki/Special:Random",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recPuSI4b33MPtSci",
    "text": "Finish this list to get started",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "5"
  },
  {
    "id": "recQ3oDc6uvlHCb50",
    "text": "Unfollow the first person in your facebook feed who posts something negative",
    "tags": [
      "Social",
      "Digital"
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
    "exclude": [],
    "group": "computer declutter"
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
    "text": "Wash your hands really well",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recRUR2lKT7UciGht",
    "text": "Learn about a new cognitive bias and pretend it doesn't affect you https://en.wikipedia.org/wiki/List_of_cognitive_biases",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recSScigrNvfl8E1l",
    "text": "Get 10 minutes of vitamin D, then go back inside",
    "tags": [
      "Outside"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recSVxL05KQGMVyOk",
    "text": "Give yourself twice as much time to do something as you think you'll need",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recSbyblhKiuc1CQT",
    "text": "Each day you get six new low-effort tasks",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "2"
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
    "id": "recSx3OUVCtCtDf00",
    "text": "Respond to the 12th message thread in your phone",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Texting"
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
    "exclude": [
      "rectXeqmZINhUnyXD"
    ]
  },
  {
    "id": "recTCyO6GJLyTQ75r",
    "text": "Make your bed",
    "tags": [
      "Cleaning"
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
    "id": "recTrno9Vo5m3imf8",
    "text": "Delete ten contacts in your phone",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "phone declutter"
  },
  {
    "id": "recTyxtCQAgy26Tv5",
    "text": "Charge your phone",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recUMiRQW51ctlAt7",
    "text": "Check off a task you don't feel like doing today",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recUYPoTtiIYGZkQF",
    "text": "Listen to a song you used to love in college",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Music"
  },
  {
    "id": "recUjYPGF3Dm80KTL",
    "text": "Do 10 squats",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Workout"
  },
  {
    "id": "recUqCGy3pxTeBI8U",
    "text": "Listen to a Podcast while cleaning something",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recVEumrpVtvDhu6h",
    "text": "Call your mom or dad and say hi",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "rec2DiBGCbTjaicS9"
    ]
  },
  {
    "id": "recWhDVBnybzfmudT",
    "text": "Dust something",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "recLwHttFWd7FRmbG",
      "recv6zl0M78DKfB6w"
    ]
  },
  {
    "id": "recWsNz1ejodyd1uv",
    "text": "Don't check Instagram today ",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "rec1wkzcNeWnvaanZ",
      "rec1fXZe3ZWChskJk",
      "recQ3oDc6uvlHCb50"
    ],
    "group": "Screentime"
  },
  {
    "id": "recXhlnsdjXLftMib",
    "text": "Do a 15 second calf stretch",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "recXkWP95qFimLW2m",
    "text": "Remember something positive about someone you're not on great terms with",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Vibes"
  },
  {
    "id": "recXmWiQ3tXjvgv1T",
    "text": "Eat something without watching TV ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Screentime"
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
    "id": "recYHB9TC8BWAqa2G",
    "text": "Use mouthwash today",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [
      "rectioqVhT3UqPH8U",
      "recvir1DcXywnt97Z"
    ]
  },
  {
    "id": "recYUVcBYkQkFyb5L",
    "text": "Wear something with no holes in it",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [],
    "group": "changing"
  },
  {
    "id": "recYZi5WErHSy0KAd",
    "text": "Watch 10 minutes of stand up comedy ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "recu9dXOYeEUECR0R",
      "recOMZhJmxoPVvQ2B",
      "recUqCGy3pxTeBI8U",
      "recpgAZHGlCLyHRAk"
    ]
  },
  {
    "id": "recYhTg2p4pFbqfB8",
    "text": "Run your washing machine on the \"clean drum\" cycle",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recosuxTxeoev1VI5"
    ]
  },
  {
    "id": "recYoY9Rr6Gco4Pxa",
    "text": "Decide not to answer one email and delete it",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Correspondance"
  },
  {
    "id": "recYtWbXdjMVf0njU",
    "text": "Stalk a friend on Spotify and listen to what they're listening to",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Music"
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
    "id": "recaAWs0893jt4rTv",
    "text": "Change into (or out of) your pajamas ",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [],
    "group": "changing"
  },
  {
    "id": "recaLTAi9QWt7lO9L",
    "text": "Think of that one movie people always can't believe you haven't seen and make a plan to watch it this week",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
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
    "id": "recanOuUr4rJKdTzz",
    "text": "Decide what you're going to eat for dinner ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "recb4DZhTfaQHl6bb",
    "text": "Use the word “invidious” in a sentence today",
    "tags": [
      "Selfhelp",
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "vocab"
  },
  {
    "id": "recbK756GgBqH4gzX",
    "text": "Think about cats ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Vibes"
  },
  {
    "id": "recbP0L5jQwSXv2m2",
    "text": "Listen to the first song that pops into your head",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Music"
  },
  {
    "id": "recbiUiepLyxgAYf1",
    "text": "Pick something to not worry about today",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recbqaLte8Iz5VTm0",
    "text": "The satisfaction of checking things off your To-Do list...",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "0"
  },
  {
    "id": "recc3gR4DZS2WmtFA",
    "text": "Don't check Twitter today ",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "rec1fXZe3ZWChskJk",
      "recWsNz1ejodyd1uv"
    ],
    "group": "Screentime"
  },
  {
    "id": "reccS2HruhoYbP5C6",
    "text": "Wash your legs extra good in the shower today",
    "tags": [
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "exclude": [],
    "group": "computer declutter"
  },
  {
    "id": "recdczB0LDWLYyD9p",
    "text": "Skip doing ⬇️ that thing. ",
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
    "id": "recdhdqo4oVex1SQv",
    "text": "Do something you didn't do yesterday",
    "tags": [
      "Already Done"
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
    "exclude": [],
    "group": "computer declutter"
  },
  {
    "id": "recdr8HAqoDFiUz91",
    "text": "Empty your computer's Trash bin ",
    "tags": [
      "Digital"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": [],
    "group": "computer declutter"
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
    "id": "receMdmNyoeUr0N2k",
    "text": "Do 10 situps",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Workout"
  },
  {
    "id": "recfUAEoswlljsnBZ",
    "text": "Use the word “ubiquity” in a sentence today",
    "tags": [
      "Selfhelp",
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "vocab"
  },
  {
    "id": "recfZzVf4wudzH8VO",
    "text": "Splash cold water on your face ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": []
  },
  {
    "id": "recfdkP0yiQGaFL1g",
    "text": "Find a new book to read and order it ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recOMZhJmxoPVvQ2B"
    ]
  },
  {
    "id": "recg3UXMxvryPdUWN",
    "text": "Fill up a water bottle and put it in the fridge for later ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recgfVbaBlUcC1G1r",
    "text": "Get your physical mail from the mailbox (deal with it tomorrow) ",
    "tags": [
      "Adulting",
      "Outside"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recjzJUBA5RSKwR7r"
    ]
  },
  {
    "id": "recggLS2fPvWXrctz",
    "text": "Plan a time to watch an inspiring documentary ",
    "tags": [
      "Entertainment"
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
    "text": "Eat one thing that isn't brown today",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "rechYFAAgCkVGTo0q",
    "text": "Brush your hair ",
    "tags": [
      "Already Done",
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "exclude": [],
    "group": "Purge"
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
    "id": "recj7W0b438fGGRKn",
    "text": "Clean your hair brush ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recjIZsMTjcGuZ25y",
    "text": "Turn on some music ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [
      "recbP0L5jQwSXv2m2",
      "recDhhZWt9xCjNvr0"
    ],
    "group": "Music"
  },
  {
    "id": "recjYkFjmYUZMseuZ",
    "text": "Send a selfie to a friend",
    "tags": [
      "Social",
      "Digital"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Texting"
  },
  {
    "id": "recjh7T3Ob99UatIc",
    "text": "Sort the laundry (worry about washing it tomorrow)",
    "tags": [
      "Cleaning"
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
    "exclude": [],
    "group": "Eat"
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
    "exclude": [],
    "group": "computer declutter"
  },
  {
    "id": "recl4uDrl9dMLqGTQ",
    "text": "Swipe down for settings",
    "tags": [],
    "pack": "Tutorial",
    "rating": 4,
    "exclude": [],
    "group": "4"
  },
  {
    "id": "reclHSgnV43YGmTVq",
    "text": "Drink something without bubbles",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "drink something"
  },
  {
    "id": "recm5HivjbZfnFqiz",
    "text": "Watch a youtube tutorial on something you're curious about ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "text": "Give this app a 5 star rating ldtdl://review",
    "tags": [],
    "pack": "Onboarding",
    "rating": 1,
    "exclude": [],
    "group": "2"
  },
  {
    "id": "recn9BZ0BXHvnpq8n",
    "text": "Go through your favorites photos folder & send one to a friend",
    "tags": [
      "Social"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [
      "recjYkFjmYUZMseuZ",
      "rec2DiBGCbTjaicS9"
    ],
    "group": "Texting"
  },
  {
    "id": "recnL68WVoT1sHKLT",
    "text": "Take a shower ",
    "tags": [
      "Already Done",
      "Hygiene"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "id": "recoOoeyYFoxDwj0v",
    "text": "Think of 3 good qualities about yourself ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Confidence"
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
    "text": "Think of a friend's family",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Vibes"
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
    "id": "recpgAZHGlCLyHRAk",
    "text": "Read r/contagiouslaughter for 10 minutes https://reddit.com/r/contagiouslaughter",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 4,
    "exclude": []
  },
  {
    "id": "recpm6GCl7ro2iMcL",
    "text": "Open The Least Dangerous To-Do List",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  },
  {
    "id": "recqO5hqj0g2XvcOn",
    "text": "Eat something without looking at your computer",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Screentime"
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
    "id": "recqlcgtq4vx3QDPn",
    "text": "Tap to get a reminder when there are new tasks available ldtdl://notif",
    "tags": [],
    "pack": "Onboarding",
    "exclude": [],
    "group": "0"
  },
  {
    "id": "recqsKKNeU9sVnpJX",
    "text": "Do 5 pushups",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Workout"
  },
  {
    "id": "recqwR5NQRXviCpII",
    "text": "Eat something without sugar ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "recrEIoCYuPJy4yjY",
    "text": "Eat something with protein in it ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "recs9iZj5Klpssdjq",
    "text": "Stretch your neck for 15 seconds",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "recsFDL0LZ3tC7ceW",
    "text": "Eat something without looking at your phone",
    "tags": [
      "Food",
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "Screentime"
  },
  {
    "id": "recsRfg6ed929WYBx",
    "text": "Buy a new loofah",
    "tags": [
      "Hygiene"
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
    "id": "rectCVlPY1lnLDbcQ",
    "text": "Do a 15 second arm stretch",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "stretch"
  },
  {
    "id": "rectSHUxUOKJkt5q7",
    "text": "Buy something self-care-esque for yourself (bubble bath, face mask, ...)",
    "tags": [
      "Body"
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
      "Hygiene",
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "rectnKiSYYR1N6Nmj",
    "text": "Wear something with no stains on it",
    "tags": [
      "Clothes",
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [
      "recYUVcBYkQkFyb5L"
    ]
  },
  {
    "id": "recu9dXOYeEUECR0R",
    "text": "Watch a Ted Talk ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "recm5HivjbZfnFqiz",
      "recPuOPt60bdnnKoF"
    ]
  },
  {
    "id": "recuCEUcvEDMiT7By",
    "text": "Do a 30 second wall sit ",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "Workout"
  },
  {
    "id": "recuEySRQ66DRpBMi",
    "text": "Eat lunch",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "recuaI6bG643JFAbt",
    "text": "Do a 15 second downward dog",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "stretch"
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
    "id": "recv6zl0M78DKfB6w",
    "text": "Clean one countertop ",
    "tags": [
      "Cleaning"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recvG8Cr5KswLeWSA",
    "text": "Do a thing. The first thing that comes to mind. ",
    "tags": [
      "Already Done"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": []
  },
  {
    "id": "recvdWamenOWeNMl8",
    "text": "Set a reminder to do something tomorrow ",
    "tags": [
      "Adulting"
    ],
    "pack": "Basic",
    "exclude": []
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
    "rating": 4,
    "exclude": [],
    "group": "phone declutter"
  },
  {
    "id": "recvoxet4yPBJppji",
    "text": "Eat dinner ",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Eat"
  },
  {
    "id": "recwRy0UOOmy5FCWz",
    "text": "Wear your favorite jeans",
    "tags": [
      "Clothes"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [],
    "group": "changing"
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
    "id": "recwc9E90irnpiQ8k",
    "text": "Use the word “insouciant” in a sentence today",
    "tags": [
      "Selfhelp",
      "Social"
    ],
    "pack": "Basic",
    "rating": 3,
    "exclude": [],
    "group": "vocab"
  },
  {
    "id": "recwoou6cOSbNVIsG",
    "text": "Close your eyes and breathe for 30 seconds ",
    "tags": [
      "Body"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": [
      "recTMfOQRFCfrNEhf"
    ]
  },
  {
    "id": "recxOfxJEe0jRWP9j",
    "text": "Find a new recipe to make... someday, not today",
    "tags": [
      "Food"
    ],
    "pack": "Basic",
    "rating": 2,
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
    "exclude": [],
    "group": "Confidence"
  },
  {
    "id": "recxklISCcu0n3dvw",
    "text": "Listen to Out Like Pluto on Spotify https://open.spotify.com/artist/2FDBR8CuAU3r9LOplIclhE?si=p--_IokDSK6tVgALIqpCNQ",
    "tags": [
      "Entertainment"
    ],
    "pack": "Basic",
    "rating": 1,
    "exclude": [],
    "group": "Shameless Plug"
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
    "exclude": [
      "rec1wkzcNeWnvaanZ"
    ]
  },
  {
    "id": "reczvFZLQjeBPRUFO",
    "text": "Order something online ",
    "tags": [
      "Selfhelp"
    ],
    "pack": "Basic",
    "rating": 2,
    "exclude": []
  }
];

export default data;
