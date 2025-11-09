// A mapping of celebrity ID pairs to their "progeny" image.
// The key is always sorted ascendingly: "smallerID-largerID".
export const progenyData: Record<string, string> = {
  '1-2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Salomon_Koninck_-_A_Scholar_-_Walters_37255.jpg/800px-Salomon_Koninck_-_A_Scholar_-_Walters_37255.jpg', // Einstein + Curie
  '4-23': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Petrus_Christus_-_Portrait_of_a_Young_Woman_-_Google_Art_Project.jpg/800px-Petrus_Christus_-_Portrait_of_a_Young_Woman_-_Google_Art_Project.jpg', // Shakespeare + Queen Elizabeth I
  '6-12': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Jan_van_Eyck_-_Portrait_of_a_Man_in_a_Blue_Chaperon_-_Google_Art_Project.jpg/800px-Jan_van_Eyck_-_Portrait_of_a_Man_in_a_Blue_Chaperon_-_Google_Art_Project.jpg' // Tesla + Genghis Khan
};

// A fallback image for pairs that don't have a specific entry.
export const defaultProgenyImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Giuseppe_Arcimboldo_-_Vertumnus_-_Google_Art_Project.jpg/800px-Giuseppe_Arcimboldo_-_Vertumnus_-_Google_Art_Project.jpg';