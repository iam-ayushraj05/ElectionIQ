export const COUNTRIES = {
  india: {
    name: "India",
    flag: "🇮🇳",
    body: "Election Commission of India (ECI)",
    votingAge: 18,
    seats: "543 Lok Sabha",
    voters: "96.8 Crore+",
  },
  us: {
    name: "United States",
    flag: "🇺🇸",
    body: "Federal Election Commission (FEC)",
    votingAge: 18,
    seats: "538 Electoral Votes",
    voters: "258 Million+",
  },
  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    body: "Electoral Commission UK",
    votingAge: 18,
    seats: "650 Parliament Seats",
    voters: "48 Million+",
  },
};

export const TIMELINE_STEPS = [
  {
    id: 1,
    emoji: "📋",
    title: "Voter Registration",
    phase: "Before Election",
    badge: "badge-blue",
    desc: "Citizens must enroll in the Electoral Roll to be eligible to vote. You can register online, offline, or through your Booth Level Officer (BLO).",
    details: [
      "Visit voters.eci.gov.in to register online (Form 6)",
      "You must be 18+ and an Indian citizen",
      "Provide Aadhaar, DOB proof, and address proof",
      "Check your name on the electoral roll before election day",
      "BLO (Booth Level Officer) can help you at the local level",
    ],
    color: "rgba(99,132,255,0.15)",
  },
  {
    id: 2,
    emoji: "🏛️",
    title: "Election Announcement",
    phase: "ECI Declaration",
    badge: "badge-purple",
    desc: "The Election Commission of India announces election dates. The Model Code of Conduct (MCC) comes into force immediately.",
    details: [
      "The President/Governor issues the Gazette Notification",
      "Model Code of Conduct kicks in — parties cannot make new promises",
      "Election schedule: nomination, scrutiny, withdrawal, poll date, results",
      "Observers are appointed by ECI to monitor the process",
      "Deployment of central forces begins",
    ],
    color: "rgba(167,139,250,0.15)",
  },
  {
    id: 3,
    emoji: "📝",
    title: "Candidate Nomination",
    phase: "Filing Phase",
    badge: "badge-orange",
    desc: "Candidates file their nomination papers with the Returning Officer. Candidates must pay a security deposit and declare assets.",
    details: [
      "Lok Sabha candidates deposit ₹25,000 (₹12,500 for SC/ST)",
      "Nomination papers include criminal record disclosure",
      "Scrutiny of nominations — invalid ones are rejected",
      "Candidates can withdraw nominations within a deadline",
      "Election symbol assigned to independent candidates",
    ],
    color: "rgba(245,166,35,0.15)",
  },
  {
    id: 4,
    emoji: "📣",
    title: "Campaign Period",
    phase: "Campaigning",
    badge: "badge-orange",
    desc: "Political parties and candidates campaign for votes through rallies, advertisements, and door-to-door outreach — all within MCC rules.",
    details: [
      "Campaigning ends 48 hours before polling (silence period)",
      "Paid news and voter bribing are punishable offenses",
      "Expenditure limit: ₹95 lakh per Lok Sabha candidate",
      "ECI monitors social media and hate speech",
      "NOTA option is available for voters who reject all candidates",
    ],
    color: "rgba(245,166,35,0.15)",
  },
  {
    id: 5,
    emoji: "🗳️",
    title: "Polling Day",
    phase: "Voting",
    badge: "badge-red",
    desc: "Voters visit their assigned polling booth to cast votes using Electronic Voting Machines (EVM). A VVPAT slip confirms the vote.",
    details: [
      "Bring valid ID: Voter ID, Aadhaar, Passport, or 12 approved alternatives",
      "Find your booth at electoralsearch.eci.gov.in",
      "Press the button next to your candidate on the EVM",
      "VVPAT shows a paper slip for 7 seconds to confirm your vote",
      "Voters get an indelible ink mark on the left index finger",
      "Mock polling is conducted before actual voting begins",
    ],
    color: "rgba(248,113,113,0.15)",
  },
  {
    id: 6,
    emoji: "📊",
    title: "Counting & Results",
    phase: "Post-Polling",
    badge: "badge-green",
    desc: "Votes are counted on the declared counting day. The winning candidate is declared by the Returning Officer and results are announced.",
    details: [
      "Counting starts at 8 AM on counting day",
      "Postal ballots (from armed forces etc.) are counted first",
      "Each round of counting covers one EVM from a specific area",
      "A candidate needs a simple majority to win",
      "ECI publishes final results on results.eci.gov.in",
      "Winning candidate is issued an election certificate",
    ],
    color: "rgba(52,211,153,0.15)",
  },
];

export const QUICK_FACTS = [
  { icon: "🧑‍🤝‍🧑", value: "96.8Cr+", label: "Registered Voters (2024)" },
  { icon: "🏛️", value: "543", label: "Lok Sabha Seats" },
  { icon: "📅", value: "7", label: "Phases in 2024 GE" },
  { icon: "📋", value: "18", label: "Minimum Voting Age" },
  { icon: "🗳️", value: "1M+", label: "Polling Stations" },
  { icon: "🏆", value: "272", label: "Seats for Majority" },
];

export const GLOSSARY_TERMS = [
  { term: "Electoral Roll", def: "The official list of all registered voters in a constituency. You must be on this list to vote." },
  { term: "Constituency", def: "A geographical area that elects one representative. India has 543 Lok Sabha constituencies." },
  { term: "Model Code of Conduct", def: "A set of guidelines issued by ECI when elections are announced, restricting parties from making new policies or voter inducements." },
  { term: "NOTA", def: "'None of the Above' — an option on the EVM allowing voters to reject all candidates without abstaining from voting." },
  { term: "EVM", def: "Electronic Voting Machine — the tamper-proof device used to cast and store votes in Indian elections since 1982." },
  { term: "VVPAT", def: "Voter Verifiable Paper Audit Trail — prints a paper slip showing which candidate you voted for, visible for 7 seconds." },
  { term: "Booth Level Officer (BLO)", def: "A local government official responsible for maintaining the electoral roll and helping residents register to vote." },
  { term: "Returning Officer", def: "The official appointed by ECI to oversee the election in a constituency, accept nominations, and declare results." },
  { term: "Lok Sabha", def: "The lower house of India's Parliament. Its 543 members are directly elected by the public every 5 years." },
  { term: "Rajya Sabha", def: "The upper house of Parliament. Members are elected by state legislative assemblies, not the general public." },
  { term: "By-Election", def: "A mid-term election held to fill a vacant seat due to death, resignation, or disqualification of an MP/MLA." },
  { term: "Indelible Ink", def: "A chemical ink applied to the left index finger after voting to prevent double voting. It lasts several weeks." },
  { term: "Affidavit", def: "A sworn declaration filed by candidates disclosing criminal records, assets, liabilities, and educational qualifications." },
  { term: "Anti-Defection Law", def: "A law (10th Schedule) that disqualifies elected members who switch parties or vote against party directions." },
];

export const CHAT_SUGGESTIONS = [
  "🗳️ How do I register to vote in India?",
  "📅 What is the election timeline?",
  "❓ What is NOTA and how does it work?",
  "📊 How does EVM voting work?",
  "📋 What documents do I need to vote?",
  "🏛️ What is the Model Code of Conduct?",
  "🔢 How are votes counted?",
  "🔍 What if my name is not on the voter list?",
];

export const QUICK_MENU = [
  { id: "register", label: "🗳️ Register to Vote", prompt: "Explain step-by-step how to register as a voter in India. Include documents needed, online and offline methods, and the role of BLO." },
  { id: "voting", label: "📊 How Voting Works", prompt: "Explain the complete voting process in India on polling day — from entering the booth to using the EVM and VVPAT, step by step." },
  { id: "timeline", label: "📅 Election Timeline", prompt: "Show me the complete election timeline in India from announcement to result declaration, with key phases and dates." },
  { id: "faq", label: "❓ FAQs", prompt: "What are the most common questions people ask about Indian elections? Cover topics like voter ID loss, voting without ID, age eligibility, and how votes are counted." },
];

export const ELECTION_DATA = {
  india: {
    steps: [
      "Get your name on the Electoral Roll (Form 6)",
      "Election Commission announces dates & MCC begins",
      "Candidates file nominations with Returning Officer",
      "Campaign period — rallies, ads, door-to-door",
      "Polling Day — vote using EVM at your booth",
      "Counting Day — results declared by Returning Officer",
    ],
    documents: ["Voter ID Card (EPIC)", "Aadhaar Card", "Passport", "Driving Licence", "PAN Card", "MNREGA Job Card"],
    timeline: [
      "📢 Election Announcement & MCC",
      "📝 Nomination Filing",
      "🔍 Scrutiny of Nominations",
      "🚪 Withdrawal of Nominations",
      "📣 Campaign Period",
      "🗳️ Polling Day",
      "📊 Counting & Results",
    ],
  },
};
