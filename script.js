const API_KEY = "93ed712d34mshb047816832a362p13265ajsn59d7710391a2";
const apiHost = "wft-geo-db.p.rapidapi.com";
const cityInput = document.querySelector("#prompt");
const submitBtn = document.querySelector("#submit");
const chatContainer = document.querySelector(".chat-container");

const cityDataMap = {
    "mumbai": {
        attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
        hotels: ["Taj Mahal Palace", "The Oberoi", "Trident Nariman Point"],
        restaurants: ["Leopold Cafe", "Bademiya", "Britannia & Co."]
    },
    "new york": {
        attractions: ["Statue of Liberty", "Central Park", "Times Square"],
        hotels: ["The Plaza", "The Standard", "Four Seasons"],
        restaurants: ["Katz's Delicatessen", "Le Bernardin", "Shake Shack"]
    },
    "london": {
        attractions: ["London Eye", "Tower of London", "Buckingham Palace"],
        hotels: ["The Ritz London", "The Savoy", "Claridge's"],
        restaurants: ["Dishoom", "Gordon Ramsay", "Sketch"]
    },
    "tokyo": {
        attractions: ["Tokyo Tower", "Shinjuku Gyoen", "Asakusa Temple"],
        hotels: ["Park Hyatt", "Mandarin Oriental", "The Prince Gallery"],
        restaurants: ["Sukiyabashi Jiro", "Ichiran Ramen", "Tempura Kondo"]
    },
    "dubai": {
        attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
        hotels: ["Atlantis The Palm", "Burj Al Arab", "JW Marriott Marquis"],
        restaurants: ["Zuma", "Pierchic", "Al Dawaar Revolving Restaurant"]
    },
    "bengaluru": {
    attractions: ["Lalbagh Botanical Garden", "Bangalore Palace", "Cubbon Park"],
    hotels: ["Taj West End", "Renaissance Bengaluru Race Course Hotel", "The Park, Bangalore"],
    restaurants: ["Chili's", "Zaika E Lucknow", "Karavalli"]
  },
  "kolkata": {
    attractions: ["Victoria Memorial", "Howrah Bridge", "Indian Museum"],
    hotels: ["Taj Bengal", "The Park, Kolkata", "ITC Sonar"],
    restaurants: ["Aheli", "The Atrium Café", "China Valley"]
  },
  "hyderabad": {
    attractions: ["Charminar", "Golconda Fort", "Hussain Sagar Lake"],
    hotels: ["The Park, Hyderabad", "Taj Krishna", "ITC Kakatiya"],
    restaurants: ["Cream Stone Creations", "Paradise Biryani", "Amara Restaurant"]
  },
  "surat": {
    attractions: ["Dutch Garden", "Sarthana Nature Park", "Gopi Talav"],
    hotels: ["The Grand Bhagwati", "Courtyard by Marriott Surat", "Lords Plaza Surat"],
    restaurants: ["Barbeque Nation", "The Lime Tree", "Ziba Restaurant"]
  },
  "chennai": {
    attractions: ["Marina Beach", "Fort St. George", "Kapaleeshwarar Temple"],
    hotels: ["The Park, Chennai", "Taj Coromandel", "ITC Grand Chola"],
    restaurants: ["Amaravathi Restaurant", "Apoorva Sangeetha", "Cappuccino Restaurant"]
  },
  "ahmedabad": {
    attractions: ["Sabarmati Ashram", "Kankaria Lake", "Adalaj Stepwell"],
    hotels: ["Patang Hotel", "Hyatt Regency Ahmedabad", "Courtyard by Marriott Ahmedabad"],
    restaurants: ["Agashiye", "Gordhan Thal", "Rajwadu"]
  },
  "jaipur": {
    attractions: ["Hawa Mahal", "Amber Fort", "City Palace"],
    hotels: ["Zone by The Park, Jaipur", "Rambagh Palace", "ITC Rajputana"],
    restaurants: ["Laxmi Misthan Bhandar", "Suvarna Mahal", "Chokhi Dhani"]
  },
  "pune": {
    attractions: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort"],
    hotels: ["JW Marriott Pune", "The Westin Pune Koregaon Park", "Hyatt Pune"],
    restaurants: ["Cream Centre", "Vaishali", "Shabree"]
  },
  "meerut": {
    attractions: ["Augarnath Temple", "Gandhi Bagh", "St. John's Church"],
    hotels: ["Bravura Gold Resort", "Hotel Harmony Inn", "Hotel Crystal Palace"],
    restaurants: ["Zaika Restaurant", "The Yellow Chilli", "Bikanervala"]
  },
  "bhopal": {
    attractions: ["Upper Lake", "Bhimbetka Caves", "Van Vihar National Park"],
    hotels: ["Jehan Numa Palace Hotel", "Courtyard by Marriott Bhopal", "Hotel Lake View Ashok"],
    restaurants: ["Manohar Dairy and Restaurant", "Under the Mango Tree", "Za-aiqa"]
  },
  "lucknow": {
    attractions: ["Bara Imambara", "Rumi Darwaza", "Hazratganj"],
    hotels: ["Taj Mahal Lucknow", "Renaissance Lucknow Hotel", "Clarks Avadh"],
    restaurants: ["Ritzz Continental", "Khatirdari Multicuisine Restaurant", "Tunday Kababi"]
  },
  "warangal": {
    attractions: ["Warangal Fort", "Thousand Pillar Temple", "Bhadrakali Temple"],
    hotels: ["Hotel Suprabha", "City Grand Hotel", "Hotel Ashoka"],
    restaurants: ["Kamat Hotel", "Green Bawarchi", "Hotel Haritha Kakatiya"]
  },
  "patna": {
    attractions: ["Golghar", "Patna Museum", "Takht Sri Patna Sahib"],
    hotels: ["Hotel Maurya", "Lemon Tree Premier Patna", "Hotel Patliputra Continental"],
    restaurants: ["Bansi Vihar", "Pind Balluchi", "17 Degrees"]
  },
  "nashik": {
    attractions: ["Sula Vineyards", "Trimbakeshwar Temple", "Pandav Leni"],
    hotels: ["The Gateway Hotel Ambad Nashik", "Express Inn", "Hotel Panchavati Yatri"],
    restaurants: ["Barbeque Ville", "Hotel Yahoo", "Sadhana Restaurant"]
  },
  "los angeles": {
    attractions: ["Hollywood Sign", "Universal Studios Hollywood", "Santa Monica Pier"],
    hotels: ["The Beverly Hills Hotel", "Hotel Bel-Air", "The Ritz-Carlton, Los Angeles"],
    restaurants: ["Bestia", "Providence", "Gjelina"]
  },
  "visakhapatnam": {
    attractions: ["RK Beach", "Kailasagiri", "INS Kurusura Submarine Museum"],
    hotels: ["The Park, Visakhapatnam", "Novotel Visakhapatnam Varun Beach", "Four Points by Sheraton"],
    restaurants: ["Dharani Restaurant", "Vista", "The Square"]
  },
  "kanpur": {
    attractions: ["JK Temple", "Allen Forest Zoo", "Moti Jheel"],
    hotels: ["The Landmark Hotel", "Hotel Royal Cliff", "Hotel Mandakini Palace"],
    restaurants: ["Little Chef Restaurant", "Antarang", "Haveli Restaurant"]
  },
  "indore": {
    attractions: ["Rajwada Palace", "Lal Bagh Palace", "Sarafa Bazaar"],
    hotels: ["Sayaji Hotel", "Radisson Blu Hotel Indore", "Fairfield by Marriott Indore"],
    restaurants: ["Nafees Restaurant", "Shreemaya Celebration", "Mediterra"]
  },
  "agra": {
    attractions: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    hotels: ["Ramada Plaza by Wyndham Agra", "The Coral House Homestay", "ITC Mughal"],
    restaurants: ["Pinch of Spice", "Peshawri", "Esphahan"]
  },
  "nagpur": {
    attractions: ["Deekshabhoomi", "Futala Lake", "Sitabuldi Fort"],
    hotels: ["Radisson Blu Hotel Nagpur", "Le Meridien Nagpur", "Hotel Centre Point"],
    restaurants: ["Barbeque Nation", "The Creative Kitchen", "Ashoka Restaurant"]
  },
  "amritsar": {
    attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border"],
    hotels: ["Hyatt Regency Amritsar", "Ramada Amritsar", "Hotel Sawera"]
},
"paris": {
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    hotels: ["Shangri-La Hotel", "Hôtel Ritz Paris", "Le Meurice"],
    restaurants: ["Le Jules Verne", "L'Ambroisie", "Septime"]
},
"rome": {
    attractions: ["Colosseum", "Trevi Fountain", "Pantheon"],
    hotels: ["Hotel de Russie", "Hassler Roma", "Rome Cavalieri"],
    restaurants: ["Roscioli", "La Pergola", "Trattoria da Enzo"]
},
"singapore": {
    attractions: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island"],
    hotels: ["Raffles Hotel", "Marina Bay Sands", "The Fullerton Hotel"],
    restaurants: ["Odette", "Burnt Ends", "Jumbo Seafood"]
},
"sydney": {
    attractions: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach"],
    hotels: ["Park Hyatt Sydney", "Shangri-La Hotel", "Four Seasons Sydney"],
    restaurants: ["Quay", "Bennelong", "Tetsuya's"]
},
"berlin": {
    attractions: ["Brandenburg Gate", "Berlin Wall Memorial", "Museum Island"],
    hotels: ["Hotel Adlon Kempinski", "Regent Berlin", "The Ritz-Carlton Berlin"],
    restaurants: ["Tim Raue", "Nobelhart & Schmutzig", "Facil"]
},
"toronto": {
    attractions: ["CN Tower", "Royal Ontario Museum", "Toronto Islands"],
    hotels: ["Fairmont Royal York", "The Ritz-Carlton Toronto", "Hotel X Toronto"],
    restaurants: ["Alo Restaurant", "Canoe", "Richmond Station"]
},
"bangkok": {
    attractions: ["Grand Palace", "Wat Arun", "Chatuchak Market"],
    hotels: ["Mandarin Oriental", "The Siam", "Banyan Tree Bangkok"],
    restaurants: ["Gaa", "Bo.lan", "Raan Jay Fai"]
},
"amsterdam": {
    attractions: ["Van Gogh Museum", "Anne Frank House", "Rijksmuseum"],
    hotels: ["Hotel Pulitzer", "Conservatorium Hotel", "Waldorf Astoria Amsterdam"],
    restaurants: ["De Kas", "Restaurant Vinkeles", "Ciel Bleu"]
},
"bali": {
    attractions: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Sacred Monkey Forest Sanctuary"],
    hotels: ["The Legian Bali", "Four Seasons Resort Bali at Sayan", "Ayana Resort and Spa"],
    restaurants: ["Locavore", "Mamasan", "Sardine"]
},
"istanbul": {
    attractions: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar"],
    hotels: ["Four Seasons Hotel Istanbul", "Ciragan Palace Kempinski", "Swissôtel The Bosphorus"],
    restaurants: ["Mikla", "Nusr-Et Steakhouse", "Neolokal"]
},
"melbourne": {
    attractions: ["Royal Botanic Gardens", "Queen Victoria Market", "Great Ocean Road"],
    hotels: ["Crown Towers", "Park Hyatt Melbourne", "The Langham"],
    restaurants: ["Attica", "Chin Chin", "Vue de monde"]
},
"vienna": {
    attractions: ["Schönbrunn Palace", "St. Stephen's Cathedral", "Belvedere Museum"],
    hotels: ["Hotel Sacher", "The Ritz-Carlton Vienna", "Palais Coburg Residenz"],
    restaurants: ["Steirereck", "Mraz & Sohn", "Figlmüller"]
},
"geneva": {
    attractions: ["Jet d'Eau", "Palais des Nations", "Lake Geneva"],
    hotels: ["Four Seasons Hotel des Bergues", "Hotel d'Angleterre", "Beau-Rivage Genève"],
    restaurants: ["Bayview", "Café du Centre", "Il Lago"]
},
"brussels": {
    attractions: ["Atomium", "Grand Place", "Royal Palace of Brussels"],
    hotels: ["Hotel Amigo", "Steigenberger Wiltcher's", "The Dominican"],
    restaurants: ["Comme Chez Soi", "La Roue d'Or", "Le Chalet de la Forêt"]
},
"hong kong": {
    attractions: ["Victoria Peak", "Tsim Sha Tsui Promenade", "Big Buddha (Tian Tan Buddha)"],
    hotels: ["The Peninsula Hong Kong", "Four Seasons Hotel", "Mandarin Oriental"],
    restaurants: ["Lung King Heen", "Tim Ho Wan", "Bo Innovation"]
},
"shanghai": {
    attractions: ["The Bund", "Yu Garden", "Oriental Pearl Tower"],
    hotels: ["The Ritz-Carlton Shanghai", "Waldorf Astoria Shanghai", "Park Hyatt Shanghai"],
    restaurants: ["Ultraviolet", "Lost Heaven", "Jia Jia Tang Bao"]
},
"Istanbul": {
  attractions: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace"],
  hotels: ["Four Seasons Hotel Istanbul", "Sultanahmet Palace Hotel", "Swissôtel The Bosphorus"],
  restaurants: ["Nusr-Et Steakhouse", "Mikla", "Hamdi Restaurant"]
},

"Barcelona": {
  attractions: ["Sagrada Familia", "Park Güell", "La Rambla"],
  hotels: ["W Barcelona", "Majestic Hotel & Spa", "Hotel Arts Barcelona"],
  restaurants: ["Tickets Bar", "Can Culleretes", "El Xampanyet"]
},

"Seoul": {
  attractions: ["Gyeongbokgung Palace", "N Seoul Tower", "Bukchon Hanok Village"],
  hotels: ["Lotte Hotel Seoul", "Park Hyatt Seoul", "The Shilla Seoul"],
  restaurants: ["Janguhjin", "Tosokchon Samgyetang", "Mingles"]
},

"Toronto": {
  attractions: ["CN Tower", "Royal Ontario Museum", "Ripley's Aquarium of Canada"],
  hotels: ["Fairmont Royal York", "The Ritz-Carlton Toronto", "Shangri-La Toronto"],
  restaurants: ["ALO Restaurant", "Richmond Station", "Kōjin"]
},

"Dubai": {
  attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
  hotels: ["Burj Al Arab", "Atlantis The Palm", "Armani Hotel Dubai"],
  restaurants: ["Zuma", "Pierchic", "Al Hadheerah"]
},

"Bangkok": {
  attractions: ["Grand Palace", "Wat Arun", "Chatuchak Market"],
  hotels: ["Mandarin Oriental Bangkok", "The Siam", "Anantara Riverside"],
  restaurants: ["Gaa", "Raan Jay Fai", "Bo.lan"]
},

"Vienna": {
  attractions: ["Schönbrunn Palace", "St. Stephen's Cathedral", "Belvedere Museum"],
  hotels: ["Hotel Sacher", "The Ritz-Carlton Vienna", "Grand Hotel Wien"],
  restaurants: ["Steirereck", "Figlmüller", "Plachutta"]
},

"Buenos Aires": {
  attractions: ["La Boca", "Recoleta Cemetery", "Teatro Colón"],
  hotels: ["Alvear Palace Hotel", "Palacio Duhau", "Faena Hotel"],
  restaurants: ["Don Julio", "El preferido de Palermo", "Tegui"]
},

"Osaka": {
  attractions: ["Osaka Castle", "Dotonbori", "Universal Studios Japan"],
  hotels: ["The Ritz-Carlton Osaka", "InterContinental Osaka", "Swissôtel Nankai"],
  restaurants: ["Matsusakagyu Yakiniku", "Ichiran Ramen", "Kani Doraku"]
},

"Lisbon": {
  attractions: ["Belem Tower", "Jerónimos Monastery", "Alfama District"],
  hotels: ["Pestana Palace", "Olissippo Lapa Palace", "Corpo Santo Hotel"],
  restaurants: ["Belcanto", "Time Out Market", "Ramiro"]
},
"San Francisco": {
  attractions: ["Golden Gate Bridge", "Alcatraz Island", "Fisherman's Wharf"],
  hotels: ["Fairmont San Francisco", "Hotel Nikko", "The Ritz-Carlton San Francisco"],
  restaurants: ["Gary Danko", "Tartine Manufactory", "House of Prime Rib"]
},

"Prague": {
  attractions: ["Charles Bridge", "Prague Castle", "Old Town Square"],
  hotels: ["Four Seasons Hotel Prague", "Mandarin Oriental Prague", "Aria Hotel"],
  restaurants: ["Mlýnec", "Eska", "Field Restaurant"]
},

"Cape Town": {
  attractions: ["Table Mountain", "Cape of Good Hope", "V&A Waterfront"],
  hotels: ["One&Only Cape Town", "The Silo Hotel", "Cape Grace Hotel"],
  restaurants: ["The Test Kitchen", "Gold Restaurant", "La Colombe"]
},

"Amsterdam": {
  attractions: ["Van Gogh Museum", "Anne Frank House", "Rijksmuseum"],
  hotels: ["Waldorf Astoria Amsterdam", "Hotel Pulitzer", "Conservatorium Hotel"],
  restaurants: ["De Kas", "Ciel Bleu", "The Pancake Bakery"]
},

"Vancouver": {
  attractions: ["Stanley Park", "Capilano Suspension Bridge", "Granville Island"],
  hotels: ["Fairmont Pacific Rim", "Rosewood Hotel Georgia", "Shangri-La Hotel Vancouver"],
  restaurants: ["Miku", "Blue Water Cafe", "Hawksworth"]
},

"Mexico City": {
  attractions: ["Zócalo", "Chapultepec Castle", "Frida Kahlo Museum"],
  hotels: ["Four Seasons Hotel Mexico City", "Gran Hotel Ciudad de México", "St. Regis Mexico City"],
  restaurants: ["Pujol", "Quintonil", "Azul Histórico"]
},

"Athens": {
  attractions: ["Acropolis", "Parthenon", "Plaka District"],
  hotels: ["Hotel Grande Bretagne", "Electra Palace Athens", "King George Hotel"],
  restaurants: ["Kuzina", "To Kafeneio", "Strofi"]
},

"Doha": {
  attractions: ["Museum of Islamic Art", "Souq Waqif", "The Pearl-Qatar"],
  hotels: ["Mandarin Oriental Doha", "The Ritz-Carlton Doha", "Banana Island Resort"],
  restaurants: ["IDAM by Alain Ducasse", "Parisa", "The Cellar"]
},

"Stockholm": {
  attractions: ["Vasa Museum", "Gamla Stan", "ABBA The Museum"],
  hotels: ["Grand Hôtel Stockholm", "Hotel Diplomat", "Lydmar Hotel"],
  restaurants: ["Frantzén", "Oaxen Slip", "Smorgastarteriet"]
},

"Auckland": {
  attractions: ["Sky Tower", "Waiheke Island", "Auckland War Memorial Museum"],
  hotels: ["Cordis Auckland", "The Hotel Britomart", "Sofitel Auckland Viaduct Harbour"],
  restaurants: ["Sidart", "Depot Eatery", "Cassia"]
},
"Bhopal": {
  attractions: ["Upper Lake", "Bhimbetka Rock Shelters", "Taj-ul-Masajid"],
  hotels: ["Jehan Numa Palace Hotel", "Courtyard by Marriott Bhopal", "Noor-Us-Sabah Palace"],
  restaurants: ["Manohar Dairy & Restaurant", "Za-aiqa", "Under the Mango Tree"]
},

"Surat": {
  attractions: ["Dumas Beach", "Sarthana Nature Park", "Dutch Garden"],
  hotels: ["The Grand Bhagwati", "Lords Plaza Surat", "Gateway Hotel Athwalines"],
  restaurants: ["Barbeque Nation", "Sasumaa Gujarati Thali", "Leonardo Italian Mediterranean Dining"]
},

"Dehradun": {
  attractions: ["Robber's Cave", "Sahastradhara", "Forest Research Institute"],
  hotels: ["Hotel Madhuban", "Lemon Tree Hotel", "Four Points by Sheraton Dehradun"],
  restaurants: ["Town Table", "Orchard", "Kalsang Friends Corner"]
},

"Guwahati": {
  attractions: ["Kamakhya Temple", "Umananda Island", "Assam State Museum"],
  hotels: ["Radisson Blu Hotel Guwahati", "Hotel Dynasty", "Novotel Guwahati GS Road"],
  restaurants: ["Paradise Restaurant", "Maach", "Reign - Terra Mayaa"]
},

"Jalandhar": {
  attractions: ["Wonderland Theme Park", "Pushpa Gujral Science City", "Devi Talab Mandir"],
  hotels: ["Radisson Hotel Jalandhar", "Ramada Encore", "The Maya Hotel"],
  restaurants: ["Love Italy", "Barbeque Nation", "Chatter Box"]
},

"Udaipur": {
  attractions: ["City Palace", "Lake Pichola", "Sajjangarh Monsoon Palace"],
  hotels: ["The Oberoi Udaivilas", "Taj Lake Palace", "Trident Udaipur"],
  restaurants: ["Ambrai", "1559 AD", "Upre by 1559 AD"]
},

"Mysore": {
  attractions: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens"],
  hotels: ["Radisson Blu Plaza Hotel", "Hotel Sandesh The Prince", "Royal Orchid Metropole"],
  restaurants: ["RRR Restaurant", "The Old House", "La Gardenia"]
},

"Thrissur": {
  attractions: ["Vadakkunnathan Temple", "Athirappilly Waterfalls", "Shakthan Thampuran Palace"],
  hotels: ["Joys Palace", "Hotel Luciya Palace", "Pooram International"],
  restaurants: ["Indian Wok", "Copper Spoon", "Noorjehan’s Hotpan Restaurant"]
},

"Rajkot": {
  attractions: ["Watson Museum", "Rotary Dolls Museum", "Kaba Gandhi No Delo"],
  hotels: ["The Fern Residency", "Marasa Sarovar Portico", "Regenta RPJ Rajkot"],
  restaurants: ["Flavours Restaurant", "Apple Bite Multicuisine", "Temptations"]
},

"Jammu": {
  attractions: ["Vaishno Devi", "Raghunath Temple", "Bahu Fort"],
  hotels: ["Radisson Blu Jammu", "Hotel Asia", "Lords Inn Jammu"],
  restaurants: ["Imperial Grill", "Falak Revolving Restaurant", "Moti Mahal Delux"]
},
"Vadodara": {
  attractions: ["Laxmi Vilas Palace", "Sayaji Garden", "EME Temple"],
  hotels: ["The Fern Residency", "Grand Mercure Vadodara Surya Palace", "Sayaji Hotel Vadodara"],
  restaurants: ["Mandap", "Barbeque Nation", "22nd Parallel"]
},

"Varanasi": {
  attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath"],
  hotels: ["BrijRama Palace", "Taj Ganges", "Hotel Surya"],
  restaurants: ["Brown Bread Bakery", "Kashi Chat Bhandar", "Pizzeria Vaatika Cafe"]
},

"Coimbatore": {
  attractions: ["Marudamalai Temple", "VOC Park and Zoo", "Gass Forest Museum"],
  hotels: ["Vivanta Coimbatore", "The Residency Towers", "Zone by The Park"],
  restaurants: ["Haribhavanam", "Annalakshmi", "Sree Annapoorna"]
},

"Jodhpur": {
  attractions: ["Mehrangarh Fort", "Umaid Bhawan Palace", "Jaswant Thada"],
  hotels: ["RAAS Jodhpur", "Umaid Bhawan Palace", "The Ajit Bhawan"],
  restaurants: ["Indique", "Gypsy Restaurant", "On The Rocks"]
},

"Madurai": {
  attractions: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Palace", "Gandhi Memorial Museum"],
  hotels: ["Heritage Madurai", "The Gateway Hotel Pasumalai", "Fortune Pandiyan Hotel"],
  restaurants: ["Murugan Idli Shop", "Sree Sabarees", "Kumar Mess"]
},

"Raipur": {
  attractions: ["Nandan Van Zoo", "Purkhouti Muktangan", "Mahant Ghasidas Memorial Museum"],
  hotels: ["Courtyard by Marriott Raipur", "Hyatt Raipur", "Hotel Babylon International"],
  restaurants: ["The Shells", "Manju Mamta Restaurant", "Dialogue in the Dark"]
},

"Ranchi": {
  attractions: ["Rock Garden", "Tagore Hill", "Kanke Dam"],
  hotels: ["Radisson Blu Hotel Ranchi", "Capitol Hill", "Hotel Green Horizon"],
  restaurants: ["Kaveri Restaurant", "The Great Kabab Factory", "Yellow Sapphire"]
},

"Jabalpur": {
  attractions: ["Bhedaghat", "Dhuandhar Falls", "Madan Mahal Fort"],
  hotels: ["Hotel Narmada Jacksons", "Hotel Satya Ashoka", "Hotel Samdareeya"],
  restaurants: ["Indian Coffee House", "The Chhattisgarhi Tadka", "Clock Tower Restaurant"]
},

"Thiruvananthapuram": {
  attractions: ["Padmanabhaswamy Temple", "Kovalam Beach", "Napier Museum"],
  hotels: ["Vivanta Thiruvananthapuram", "Hilton Garden Inn", "The South Park Hotel"],
  restaurants: ["Villa Maya", "Zam Zam Restaurant", "Ariya Nivaas"]
},

"Hubli": {
  attractions: ["Unkal Lake", "Chandramouleshwara Temple", "Indira Gandhi Glass House Garden"],
  hotels: ["The President Hotel", "Clarks Inn Hubli", "Hotel Naveen"],
  restaurants: ["Gufha Restaurant", "The Sigdi", "Olive Garden"]
},
"Phagwara": {
  attractions: ["Gurudwara Sukhchain Sahib", "Town Hall Clock Tower", "Shiv Mandir Phagwara"],
  hotels: ["Hotel Prime Residency", "The Grand Ambassador", "Hotel Palki Residency"],
  restaurants: ["Sagar Ratna", "Haveli Phagwara", "Bikanervala"]
},

"Jalandhar": {
  attractions: ["Devi Talab Mandir", "Wonderland Theme Park", "Pushpa Gujral Science City"],
  hotels: ["Radisson Hotel Jalandhar", "Ramada by Wyndham", "Best Western Summerlea"],
  restaurants: ["Barbeque Nation", "Love Italy", "The Great Kabab Factory"]
}






    
};

function detectIntent(text) {
    const lowerText = text.toLowerCase();
    if (/coordinat(es|e)?|latitude|longitude/.test(lowerText)) return "coordinates";
    if (/hotel|stay|accommodation/.test(lowerText)) return "hotels";
    if (/restaurant|food|eat|dine/.test(lowerText)) return "restaurants";
    if (/attraction|visit|see|places to go|tourist spot/.test(lowerText)) return "attractions";
    return "default";
}

async function fetchCityDetails(city, intent) {
    const url = `https://${apiHost}/v1/geo/cities?namePrefix=${city}&limit=1`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": apiHost
        }
    };
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        const cityData = data.data[0];
        if (!cityData) {
            const fallback = getManualCityInfo(city, intent);
            return fallback ? fallback : `❌ Sorry, I couldn't find information for "${city}".`;
        }
        if (intent === "coordinates") {
            return `📍 Coordinates of ${cityData.city}:<br>Latitude: ${cityData.latitude}, Longitude: ${cityData.longitude}`;
        } else {
            return `
📌 <strong>${cityData.city}, ${cityData.country}</strong><br>
🗺️ Region: ${cityData.region}<br>
🌍 Latitude: ${cityData.latitude}, Longitude: ${cityData.longitude}<br>
✅ Population: ${cityData.population.toLocaleString()}`;
        }
    } catch (error) {
        return `⚠️ Error fetching data: ${error.message}`;
    }
}

function getManualCityInfo(cityName, intent) {
    const cityInfo = cityDataMap[cityName.toLowerCase()];
    if (!cityInfo) return null;
    if (intent === "attractions") {
        return `🔹 Top Attractions in ${cityName}:<br>- ${cityInfo.attractions.join("<br>- ")}`;
    } else if (intent === "hotels") {
        return `🏨 Top Hotels in ${cityName}:<br>- ${cityInfo.hotels.join("<br>- ")}`;
    } else if (intent === "restaurants") {
        return `🍽️ Popular Restaurants in ${cityName}:<br>- ${cityInfo.restaurants.join("<br>- ")}`;
    } else {
        return `
✨ Here's what you can explore in ${cityName}:<br><br>
🔹 Attractions:<br>- ${cityInfo.attractions.join("<br>- ")}<br><br>
🏨 Hotels:<br>- ${cityInfo.hotels.join("<br>- ")}<br><br>
🍽️ Restaurants:<br>- ${cityInfo.restaurants.join("<br>- ")}`;
    }
}

function isGreeting(text) {
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
    return greetings.some(g => text.toLowerCase().includes(g));
}

function extractCityName(input) {
    const knownCities = [
        "mumbai", "bengaluru", "kolkata", "hyderabad", "surat", "chennai", "ahmedabad", "jaipur", "pune",
        "meerut", "bhopal", "lucknow", "new york", "warangal", "patna", "nashik", "los angeles",
        "visakhapatnam", "kanpur", "indore", "agra", "nagpur", "amritsar", "madurai", "chandigarh",
        "ludhiana", "jamshedpur", "bhubaneswar", "vijayawada", "ranchi", "prayagraj", "rajkot", "varanasi",
        "jodhpur", "vadodara", "srinagar", "raipur", "mysuru", "lagos", "kochi", "chhatrapati sambhaji nagar",
        "chicago", "thrissur", "houston", "philadelphia", "dallas", "faridabad", "tiruchirappalli", "beijing",
        "shanghai", "guangzhou", "amsterdam", "barcelona", "bangkok", "dubai", "paris", "singapore", "sydney",
        "tokyo", "hong kong", "london", "rome", "bali", "istanbul", "melbourne", "berlin", "brussels", "geneva",
        "toronto", "vienna"
    ];
    const inputLower = input.toLowerCase();
    return knownCities.find(city => inputLower.includes(city));
}

function addUserMessage(message) {
    const userHTML = `
    <div class="user-chat-box">
        <img src="user.png" id="userImage" width="8%">
        <div class="user-chat-area">${message}</div>
    </div>`;
    chatContainer.innerHTML += userHTML;
}

function addBotMessage(message) {
    removeTypingIndicator();
    const botHTML = `
    <div class="ai-chat-box">
        <img src="ai.png" id="aiImage" width="10%">
        <div class="ai-chat-area">${message}</div>
    </div>`;
    chatContainer.innerHTML += botHTML;
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    speakText(message);
}

function showTypingIndicator() {
    const typingHTML = `
    <div class="ai-chat-box typing-indicator">
        <img src="ai.png" id="aiImage" width="10%">
        <div class="ai-chat-area">🤖 Typing...</div>
    </div>`;
    chatContainer.innerHTML += typingHTML;
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
}

function removeTypingIndicator() {
    const typing = document.querySelector(".typing-indicator");
    if (typing) typing.remove();
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text.replace(/<br>/g, " ").replace(/<\/?[^>]+(>|$)/g, ""));
    speechSynthesis.speak(utterance);
}

async function handleUserInput() {
    const userInput = cityInput.value.trim();
    if (!userInput) return;
    addUserMessage(userInput);
    cityInput.value = "";
    
    if (isGreeting(userInput)) {
        addBotMessage("👋 Hello! I'm your AI City Explorer. Ask me about any city — attractions, food, hotels, or even coordinates!");
        return;
    }

    const detectedCity = extractCityName(userInput);
    if (!detectedCity) {
        addBotMessage("❓ I couldn't detect a city. Please try again with a known city name.");
        return;
    }

    const intent = detectIntent(userInput);
    showTypingIndicator();
    const cityDetails = await fetchCityDetails(detectedCity, intent);
    addBotMessage(cityDetails);

    const manualInfo = getManualCityInfo(detectedCity, intent);
    if (manualInfo) addBotMessage(manualInfo);
}

submitBtn.addEventListener("click", handleUserInput);
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserInput();
});
