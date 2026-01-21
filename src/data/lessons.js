/**
 * Lesson Data - All units, lessons, and challenges
 */

export const UNITS = [
  {
    id: 'unit-1',
    title: 'Welcome to Paradise',
    description: 'Get to know your tropical resort home',
    icon: '🏝️',
    color: 'from-green-400 to-emerald-500',
    lessons: [
      { id: 'lesson-1-1', title: 'Resort Orientation', xp: 50 },
      { id: 'lesson-1-2', title: 'Meet the Staff', xp: 50 },
      { id: 'lesson-1-3', title: 'Resort Amenities', xp: 50 },
      { id: 'lesson-1-4', title: 'Safety First', xp: 50 },
      { id: 'lesson-1-5', title: 'Unit Review', xp: 100 },
    ],
  },
  {
    id: 'unit-2',
    title: 'Local Wildlife Discovery',
    description: 'Learn about the amazing creatures around you',
    icon: '🦜',
    color: 'from-blue-400 to-cyan-500',
    lessons: [
      { id: 'lesson-2-1', title: 'Birds of Paradise', xp: 50 },
      { id: 'lesson-2-2', title: 'Marine Life', xp: 50 },
      { id: 'lesson-2-3', title: 'Jungle Creatures', xp: 50 },
      { id: 'lesson-2-4', title: 'Nocturnal Animals', xp: 50 },
      { id: 'lesson-2-5', title: 'Unit Review', xp: 100 },
    ],
  },
  {
    id: 'unit-3',
    title: 'Sustainability Practices',
    description: 'Discover how we protect our environment',
    icon: '🌿',
    color: 'from-amber-400 to-orange-500',
    lessons: [
      { id: 'lesson-3-1', title: 'Eco-Friendly Living', xp: 50 },
      { id: 'lesson-3-2', title: 'Conservation Efforts', xp: 50 },
      { id: 'lesson-3-3', title: 'Reduce & Recycle', xp: 50 },
      { id: 'lesson-3-4', title: 'Protecting Wildlife', xp: 50 },
      { id: 'lesson-3-5', title: 'Unit Review', xp: 100 },
    ],
  },
  {
    id: 'unit-4',
    title: 'Tropical Ecosystems',
    description: 'Explore the interconnected web of life',
    icon: '🌴',
    color: 'from-teal-400 to-green-500',
    lessons: [
      { id: 'lesson-4-1', title: 'Rainforest Layers', xp: 50 },
      { id: 'lesson-4-2', title: 'Coral Reef Systems', xp: 50 },
      { id: 'lesson-4-3', title: 'Mangrove Forests', xp: 50 },
      { id: 'lesson-4-4', title: 'Food Chains', xp: 50 },
      { id: 'lesson-4-5', title: 'Unit Review', xp: 100 },
    ],
  },
]

export const CHALLENGES = {
  // Unit 1 - Welcome to Paradise
  'lesson-1-1': [
    {
      id: 'c1-1-1',
      type: 'multiple-choice',
      question: 'Where is the main restaurant located?',
      options: [
        { id: 'a', text: 'Beach', correct: false },
        { id: 'b', text: 'Lobby', correct: true },
        { id: 'c', text: 'Pool', correct: false },
        { id: 'd', text: 'Garden', correct: false },
      ],
      feedback: {
        correct: "That's right! The main restaurant is in the lobby.",
        incorrect: 'Not quite. The main restaurant is actually in the lobby.',
      },
    },
    {
      id: 'c1-1-2',
      type: 'multiple-choice',
      question: 'What time does the resort front desk close?',
      options: [
        { id: 'a', text: 'It never closes', correct: true },
        { id: 'b', text: '10 PM', correct: false },
        { id: 'c', text: 'Midnight', correct: false },
        { id: 'd', text: '8 PM', correct: false },
      ],
      feedback: {
        correct: 'Correct! Our front desk is open 24/7 for your convenience.',
        incorrect: "Actually, our front desk never closes - it's open 24/7!",
      },
    },
    {
      id: 'c1-1-3',
      type: 'multiple-choice',
      question: 'What is the name of the resort mascot?',
      options: [
        { id: 'a', text: 'Pedro the Parrot', correct: false },
        { id: 'b', text: 'Tuki the Toucan', correct: true },
        { id: 'c', text: 'Felix the Flamingo', correct: false },
        { id: 'd', text: 'Coco the Crab', correct: false },
      ],
      feedback: {
        correct: 'Yes! Tuki the Toucan is our beloved mascot! 🦜',
        incorrect: 'Close! Our mascot is actually Tuki the Toucan.',
      },
    },
  ],
  'lesson-1-2': [
    {
      id: 'c1-2-1',
      type: 'multiple-choice',
      question: 'Who should you contact for room service?',
      options: [
        { id: 'a', text: 'Front desk', correct: true },
        { id: 'b', text: 'Pool attendant', correct: false },
        { id: 'c', text: 'Security', correct: false },
        { id: 'd', text: 'Spa reception', correct: false },
      ],
      feedback: {
        correct: 'Correct! The front desk handles all room service requests.',
        incorrect: 'Not quite. Contact the front desk for room service.',
      },
    },
    {
      id: 'c1-2-2',
      type: 'multiple-choice',
      question: 'What color uniform do the housekeeping staff wear?',
      options: [
        { id: 'a', text: 'Blue', correct: false },
        { id: 'b', text: 'White', correct: false },
        { id: 'c', text: 'Green', correct: true },
        { id: 'd', text: 'Yellow', correct: false },
      ],
      feedback: {
        correct: 'Right! Our housekeeping team wears eco-green uniforms.',
        incorrect: 'Actually, our housekeeping staff wear green uniforms.',
      },
    },
    {
      id: 'c1-2-3',
      type: 'multiple-choice',
      question: 'Where can you find the concierge desk?',
      options: [
        { id: 'a', text: 'By the pool', correct: false },
        { id: 'b', text: 'Near the main entrance', correct: true },
        { id: 'c', text: 'At the beach', correct: false },
        { id: 'd', text: 'In the spa', correct: false },
      ],
      feedback: {
        correct: 'Yes! The concierge desk is located near the main entrance.',
        incorrect: "The concierge desk is actually near the main entrance - it's easy to find!",
      },
    },
  ],
  'lesson-1-3': [
    {
      id: 'c1-3-1',
      type: 'multiple-choice',
      question: 'What time does breakfast start?',
      options: [
        { id: 'a', text: '6:00 AM', correct: false },
        { id: 'b', text: '7:00 AM', correct: true },
        { id: 'c', text: '8:00 AM', correct: false },
        { id: 'd', text: '9:00 AM', correct: false },
      ],
      feedback: {
        correct: 'Correct! Breakfast starts at 7:00 AM.',
        incorrect: 'Actually, breakfast starts at 7:00 AM.',
      },
    },
    {
      id: 'c1-3-2',
      type: 'multiple-choice',
      question: 'Which amenity requires a reservation?',
      options: [
        { id: 'a', text: 'Pool', correct: false },
        { id: 'b', text: 'Beach', correct: false },
        { id: 'c', text: 'Spa treatments', correct: true },
        { id: 'd', text: 'Gym', correct: false },
      ],
      feedback: {
        correct: 'Yes! Spa treatments require advance reservation.',
        incorrect: 'Spa treatments are the one that requires a reservation.',
      },
    },
    {
      id: 'c1-3-3',
      type: 'multiple-choice',
      question: 'Where is the fitness center located?',
      options: [
        { id: 'a', text: 'Ground floor, west wing', correct: true },
        { id: 'b', text: 'Rooftop', correct: false },
        { id: 'c', text: 'Basement', correct: false },
        { id: 'd', text: 'Second floor', correct: false },
      ],
      feedback: {
        correct: "That's right! The fitness center is on the ground floor, west wing.",
        incorrect: "The fitness center is on the ground floor in the west wing.",
      },
    },
  ],
  'lesson-1-4': [
    {
      id: 'c1-4-1',
      type: 'multiple-choice',
      question: 'What should you do if you see wildlife on the property?',
      options: [
        { id: 'a', text: 'Try to feed them', correct: false },
        { id: 'b', text: 'Observe from a safe distance', correct: true },
        { id: 'c', text: 'Try to pet them', correct: false },
        { id: 'd', text: 'Chase them away', correct: false },
      ],
      feedback: {
        correct: 'Perfect! Always observe wildlife from a safe distance.',
        incorrect: 'The safest approach is to observe wildlife from a distance.',
      },
    },
    {
      id: 'c1-4-2',
      type: 'multiple-choice',
      question: 'Where are the emergency assembly points?',
      options: [
        { id: 'a', text: 'Only at the lobby', correct: false },
        { id: 'b', text: 'Main lobby and beach area', correct: true },
        { id: 'c', text: 'Only at the parking lot', correct: false },
        { id: 'd', text: 'In your room', correct: false },
      ],
      feedback: {
        correct: 'Correct! Emergency assembly points are at the main lobby and beach area.',
        incorrect: 'The emergency assembly points are at the main lobby and beach area.',
      },
    },
    {
      id: 'c1-4-3',
      type: 'multiple-choice',
      question: 'What number do you call for on-site emergencies?',
      options: [
        { id: 'a', text: '0', correct: true },
        { id: 'b', text: '911', correct: false },
        { id: 'c', text: '100', correct: false },
        { id: 'd', text: '999', correct: false },
      ],
      feedback: {
        correct: 'Yes! Dial 0 for on-site emergencies to reach our security team.',
        incorrect: 'For on-site emergencies, dial 0 to reach our security team.',
      },
    },
  ],
  'lesson-1-5': [
    {
      id: 'c1-5-1',
      type: 'multiple-choice',
      question: 'Which bird is the resort mascot?',
      options: [
        { id: 'a', text: 'Parrot', correct: false },
        { id: 'b', text: 'Toucan', correct: true },
        { id: 'c', text: 'Flamingo', correct: false },
        { id: 'd', text: 'Pelican', correct: false },
      ],
      feedback: {
        correct: 'Yes! Tuki the Toucan is our beloved mascot!',
        incorrect: 'Close! Our mascot is actually Tuki the Toucan.',
      },
    },
    {
      id: 'c1-5-2',
      type: 'multiple-choice',
      question: 'What should you do when encountering wildlife?',
      options: [
        { id: 'a', text: 'Feed them', correct: false },
        { id: 'b', text: 'Pet them', correct: false },
        { id: 'c', text: 'Observe from distance', correct: true },
        { id: 'd', text: 'Ignore them', correct: false },
      ],
      feedback: {
        correct: 'Perfect! Always observe wildlife from a safe distance.',
        incorrect: 'Remember: observe wildlife from a safe distance.',
      },
    },
    {
      id: 'c1-5-3',
      type: 'multiple-choice',
      question: 'What service is available 24 hours?',
      options: [
        { id: 'a', text: 'Spa', correct: false },
        { id: 'b', text: 'Restaurant', correct: false },
        { id: 'c', text: 'Front desk', correct: true },
        { id: 'd', text: 'Gift shop', correct: false },
      ],
      feedback: {
        correct: 'Correct! The front desk is available 24/7.',
        incorrect: 'The front desk is the only service available 24 hours.',
      },
    },
    {
      id: 'c1-5-4',
      type: 'multiple-choice',
      question: 'When does breakfast start?',
      options: [
        { id: 'a', text: '6:00 AM', correct: false },
        { id: 'b', text: '7:00 AM', correct: true },
        { id: 'c', text: '8:00 AM', correct: false },
        { id: 'd', text: '9:00 AM', correct: false },
      ],
      feedback: {
        correct: 'Correct! Breakfast starts at 7:00 AM.',
        incorrect: 'Breakfast starts at 7:00 AM.',
      },
    },
  ],

  // Unit 2 - Local Wildlife Discovery
  'lesson-2-1': [
    {
      id: 'c2-1-1',
      type: 'multiple-choice',
      question: 'What makes the Keel-billed Toucan unique?',
      options: [
        { id: 'a', text: 'Its singing voice', correct: false },
        { id: 'b', text: 'Its colorful bill', correct: true },
        { id: 'c', text: 'Its size', correct: false },
        { id: 'd', text: 'Its flying speed', correct: false },
      ],
      feedback: {
        correct: 'Correct! The colorful bill can be up to 1/3 of their body length!',
        incorrect: "The Keel-billed Toucan is famous for its striking colorful bill.",
      },
    },
    {
      id: 'c2-1-2',
      type: 'multiple-choice',
      question: 'How many times per second can a hummingbird flap its wings?',
      options: [
        { id: 'a', text: '10 times', correct: false },
        { id: 'b', text: '25 times', correct: false },
        { id: 'c', text: '53 times', correct: true },
        { id: 'd', text: '100 times', correct: false },
      ],
      feedback: {
        correct: 'Amazing! Hummingbirds can flap their wings about 53 times per second.',
        incorrect: 'Hummingbirds flap their wings an incredible 53 times per second!',
      },
    },
    {
      id: 'c2-1-3',
      type: 'multiple-choice',
      question: 'What is special about the Scarlet Macaw?',
      options: [
        { id: 'a', text: 'It can swim', correct: false },
        { id: 'b', text: 'It can live up to 80 years', correct: true },
        { id: 'c', text: 'It hunts at night', correct: false },
        { id: 'd', text: 'It cannot fly', correct: false },
      ],
      feedback: {
        correct: 'Yes! Scarlet Macaws can live up to 80 years in captivity.',
        incorrect: 'Scarlet Macaws are known for their impressive lifespan of up to 80 years!',
      },
    },
  ],
  'lesson-2-2': [
    {
      id: 'c2-2-1',
      type: 'multiple-choice',
      question: 'How long can sea turtles hold their breath?',
      options: [
        { id: 'a', text: '5 minutes', correct: false },
        { id: 'b', text: '30 minutes', correct: false },
        { id: 'c', text: '4-7 hours when resting', correct: true },
        { id: 'd', text: '1 minute', correct: false },
      ],
      feedback: {
        correct: 'Incredible! Sea turtles can hold their breath for 4-7 hours while resting.',
        incorrect: 'Sea turtles can actually hold their breath for 4-7 hours when resting!',
      },
    },
    {
      id: 'c2-2-2',
      type: 'multiple-choice',
      question: 'What do dolphins use echolocation for?',
      options: [
        { id: 'a', text: 'Entertainment', correct: false },
        { id: 'b', text: 'Finding food and navigation', correct: true },
        { id: 'c', text: 'Sleeping', correct: false },
        { id: 'd', text: 'Mating', correct: false },
      ],
      feedback: {
        correct: 'Correct! Dolphins use echolocation to find food and navigate.',
        incorrect: 'Dolphins use echolocation primarily for finding food and navigation.',
      },
    },
    {
      id: 'c2-2-3',
      type: 'multiple-choice',
      question: 'Why are coral reefs important?',
      options: [
        { id: 'a', text: 'They provide decoration', correct: false },
        { id: 'b', text: 'They support 25% of marine species', correct: true },
        { id: 'c', text: 'They produce oil', correct: false },
        { id: 'd', text: 'They clean the air', correct: false },
      ],
      feedback: {
        correct: 'Yes! Coral reefs support about 25% of all marine species.',
        incorrect: 'Coral reefs are crucial habitats supporting 25% of all marine species!',
      },
    },
  ],
  'lesson-2-3': [
    {
      id: 'c2-3-1',
      type: 'multiple-choice',
      question: 'How long can green iguanas grow?',
      options: [
        { id: 'a', text: '1 foot', correct: false },
        { id: 'b', text: '3 feet', correct: false },
        { id: 'c', text: '6 feet', correct: true },
        { id: 'd', text: '10 feet', correct: false },
      ],
      feedback: {
        correct: 'Correct! Green iguanas can grow up to 6 feet including their tail.',
        incorrect: 'Green iguanas can grow impressively long - up to 6 feet!',
      },
    },
    {
      id: 'c2-3-2',
      type: 'multiple-choice',
      question: "What gives the Blue Morpho butterfly its color?",
      options: [
        { id: 'a', text: 'Paint', correct: false },
        { id: 'b', text: 'Pigment', correct: false },
        { id: 'c', text: 'Microscopic scales', correct: true },
        { id: 'd', text: 'Diet', correct: false },
      ],
      feedback: {
        correct: 'Yes! Microscopic scales on their wings create the iridescent blue color.',
        incorrect: 'The blue color comes from microscopic scales that reflect light!',
      },
    },
    {
      id: 'c2-3-3',
      type: 'multiple-choice',
      question: 'Where do capuchin monkeys live?',
      options: [
        { id: 'a', text: 'On the ground', correct: false },
        { id: 'b', text: 'In tree canopies', correct: true },
        { id: 'c', text: 'In caves', correct: false },
        { id: 'd', text: 'In the water', correct: false },
      ],
      feedback: {
        correct: 'Correct! Capuchin monkeys spend most of their time in tree canopies.',
        incorrect: 'Capuchin monkeys are arboreal and live in tree canopies.',
      },
    },
  ],
  'lesson-2-4': [
    {
      id: 'c2-4-1',
      type: 'multiple-choice',
      question: 'Why do red-eyed tree frogs have bright red eyes?',
      options: [
        { id: 'a', text: 'To see better', correct: false },
        { id: 'b', text: 'To startle predators', correct: true },
        { id: 'c', text: 'To attract mates', correct: false },
        { id: 'd', text: 'No special reason', correct: false },
      ],
      feedback: {
        correct: 'Yes! The bright red eyes startle predators, giving the frog time to escape.',
        incorrect: 'The bright red eyes are used to startle predators - a defense mechanism!',
      },
    },
    {
      id: 'c2-4-2',
      type: 'multiple-choice',
      question: 'When are hermit crabs most active?',
      options: [
        { id: 'a', text: 'Morning', correct: false },
        { id: 'b', text: 'Afternoon', correct: false },
        { id: 'c', text: 'Night', correct: true },
        { id: 'd', text: 'All day', correct: false },
      ],
      feedback: {
        correct: 'Correct! Hermit crabs are nocturnal and most active at night.',
        incorrect: 'Hermit crabs are nocturnal creatures, most active at night.',
      },
    },
    {
      id: 'c2-4-3',
      type: 'multiple-choice',
      question: 'How do bats navigate in the dark?',
      options: [
        { id: 'a', text: 'Excellent eyesight', correct: false },
        { id: 'b', text: 'Sense of smell', correct: false },
        { id: 'c', text: 'Echolocation', correct: true },
        { id: 'd', text: 'Memory', correct: false },
      ],
      feedback: {
        correct: 'Yes! Bats use echolocation to navigate and find food in darkness.',
        incorrect: 'Bats use echolocation - emitting sounds that bounce back to them.',
      },
    },
  ],
  'lesson-2-5': [
    {
      id: 'c2-5-1',
      type: 'multiple-choice',
      question: 'What percentage of marine species do coral reefs support?',
      options: [
        { id: 'a', text: '5%', correct: false },
        { id: 'b', text: '25%', correct: true },
        { id: 'c', text: '50%', correct: false },
        { id: 'd', text: '75%', correct: false },
      ],
      feedback: {
        correct: 'Correct! Coral reefs support about 25% of all marine species.',
        incorrect: 'Coral reefs support about 25% of all marine species.',
      },
    },
    {
      id: 'c2-5-2',
      type: 'multiple-choice',
      question: "What's unique about hummingbird flight?",
      options: [
        { id: 'a', text: 'They fly very high', correct: false },
        { id: 'b', text: 'They can hover and fly backwards', correct: true },
        { id: 'c', text: 'They only fly at night', correct: false },
        { id: 'd', text: 'They cannot fly', correct: false },
      ],
      feedback: {
        correct: 'Yes! Hummingbirds can hover in place and even fly backwards!',
        incorrect: 'Hummingbirds are the only birds that can hover and fly backwards.',
      },
    },
    {
      id: 'c2-5-3',
      type: 'multiple-choice',
      question: 'How do red-eyed tree frogs defend themselves?',
      options: [
        { id: 'a', text: 'Poison', correct: false },
        { id: 'b', text: 'Biting', correct: false },
        { id: 'c', text: 'Startling predators with their eyes', correct: true },
        { id: 'd', text: 'Running fast', correct: false },
      ],
      feedback: {
        correct: 'Correct! Their bright red eyes startle predators.',
        incorrect: 'They use their bright red eyes to startle predators.',
      },
    },
    {
      id: 'c2-5-4',
      type: 'multiple-choice',
      question: 'What do both bats and dolphins have in common?',
      options: [
        { id: 'a', text: 'They both swim', correct: false },
        { id: 'b', text: 'They both use echolocation', correct: true },
        { id: 'c', text: 'They both fly', correct: false },
        { id: 'd', text: 'They both live in trees', correct: false },
      ],
      feedback: {
        correct: 'Yes! Both bats and dolphins use echolocation to navigate.',
        incorrect: 'Both bats and dolphins use echolocation - a form of biological sonar!',
      },
    },
  ],
}

// Default challenges for lessons without specific content
const DEFAULT_CHALLENGES = [
  {
    id: 'default-1',
    type: 'multiple-choice',
    question: 'This lesson is coming soon! What do you think about eco-tourism?',
    options: [
      { id: 'a', text: "It's important for conservation", correct: true },
      { id: 'b', text: "It doesn't matter", correct: false },
      { id: 'c', text: "I'm not sure", correct: false },
      { id: 'd', text: 'Never heard of it', correct: false },
    ],
    feedback: {
      correct: "Great thinking! Eco-tourism plays a vital role in conservation efforts.",
      incorrect: 'Eco-tourism is actually very important for conservation!',
    },
  },
  {
    id: 'default-2',
    type: 'multiple-choice',
    question: 'Why is biodiversity important?',
    options: [
      { id: 'a', text: "It isn't important", correct: false },
      { id: 'b', text: 'It helps ecosystems stay healthy', correct: true },
      { id: 'c', text: 'Only for scientists', correct: false },
      { id: 'd', text: 'Just for decoration', correct: false },
    ],
    feedback: {
      correct: 'Exactly! Biodiversity is essential for healthy, resilient ecosystems.',
      incorrect: 'Biodiversity is crucial for maintaining healthy ecosystems.',
    },
  },
  {
    id: 'default-3',
    type: 'multiple-choice',
    question: 'What can you do to help the environment?',
    options: [
      { id: 'a', text: 'Nothing', correct: false },
      { id: 'b', text: 'Reduce, reuse, recycle', correct: true },
      { id: 'c', text: 'Wait for others to act', correct: false },
      { id: 'd', text: "It's not my responsibility", correct: false },
    ],
    feedback: {
      correct: 'Perfect! Every small action like reducing, reusing, and recycling helps.',
      incorrect: 'We can all help by reducing, reusing, and recycling!',
    },
  },
]

/**
 * Get challenges for a lesson
 * Returns lesson-specific challenges or default challenges
 */
export function getChallengesForLesson(lessonId) {
  return CHALLENGES[lessonId] || DEFAULT_CHALLENGES
}

/**
 * Get lesson info by ID
 */
export function getLessonById(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId)
    if (lesson) {
      return { ...lesson, unit }
    }
  }
  return null
}

export default { UNITS, CHALLENGES, getChallengesForLesson, getLessonById }
