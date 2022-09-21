/* eslint-disable global-require */
export interface IGamesData {
  name: string;
  price: string;
  route: string;
  descriptionBack: string;
  age: string;
}

export const categoriesListData: Array<IGamesData> = [
  {
    name: "Assasin",
    price: "29.99",
    route: require("../../../../../assets/images/assasin.jpg"),
    descriptionBack:
      "The word assassin, pronounced 'uh-SASS-in' describes a person who murders a prominent person, like a political or religious leader. Often, this person is hired to kill, though he or she might act on personal motivations.",
    age: "12+",
  },
  {
    name: "Cyberpunk",
    price: "29.99",
    route: require("../../../../../assets/images/cyberpunk.jpg"),
    descriptionBack:
      "In science fiction circles, 'cyberpunk' is a genre that often features countercultural antiheroes trapped in a dehumanizing high-tech future. Its roots extend back to the technical fiction of the 1940s and 50s, but it was years before it matured.",
    age: "12+",
  },
  {
    name: "League of Legends",
    price: "29.99",
    route: require("../../../../../assets/images/lol.jpg"),
    descriptionBack:
      "What is League of Legends? League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the others base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.",
    age: "12+",
  },
];
