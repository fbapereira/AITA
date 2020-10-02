export class VoteOption {
  abbreviation: string;
  text: string;
  image: string;
}

export const VOTE_OPTIONS: VoteOption[] = [
  {
    abbreviation: 'YTA',
    text: 'You are the Asshole',
    image: './assets/images/YTA.png',
  },
  {
    abbreviation: 'ESH',
    text: 'Everybody Sucks Here',
    image: './assets/images/ESH.png',
  },
  {
    abbreviation: 'NTA',
    text: 'Not The Asshole',
    image: './assets/images/NTA.png',
  },
  {
    abbreviation: 'NAH',
    text: 'Not a Asshole Here',
    image: './assets/images/NAH.png',
  },
  {
    abbreviation: 'INFO',
    text: 'Info missing',
    image: './assets/images/INFO.png',
  },
];