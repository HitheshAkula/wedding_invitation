/**
 * WEDDING INVITATION CONFIGURATION
 * 
 * Central configuration file for the wedding invitation website.
 * Contains all wedding details, bride and groom information,
 * confirmed wedding dates (4th Nov Reception, 5th Nov Marriage),
 * venue details, schedule, and assets.
 */

export interface WeddingEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  description: string;
  location?: string;
}

export interface WeddingConfig {
  bride: {
    name: string;
    qualification?: string;
    parents?: string;
  };
  connector: string;
  groom: {
    name: string;
    qualification?: string;
    parents?: string;
  };
  invitationTitle: string;
  invitationSubtitle: string;
  welcomeMessage: string;
  blessingMessage: string;
  weddingDate: string; // ISO format for countdown
  weddingDateDisplay: string;
  venue: {
    name: string;
    subname?: string;
    address: string;
    city: string;
    state: string;
    googleMapsShareUrl: string;
    googleMapsDirectionsUrl: string;
  };
  events: WeddingEvent[];
  audio: {
    trackUrl: string;
    title: string;
    autoPlayPrompt: string;
  };
  sharing: {
    title: string;
    text: string;
    url?: string;
  };
}

export const weddingConfig: WeddingConfig = {
  bride: {
    name: 'GS Leelavati',
    qualification: 'B.Sc.',
    parents: 'Daughter of Sri & Smt. G.S. Family',
  },
  connector: 'Weds',
  groom: {
    name: 'R Malikarjuna',
    qualification: '',
    parents: 'Son of Sri & Smt. R. Family',
  },
  invitationTitle: 'YOU ARE CORDIALLY INVITED',
  invitationSubtitle: 'To celebrate the sacred union of two hearts and souls',
  welcomeMessage: 'With the heavenly blessings of the Almighty and our beloved elders, we invite you to grace the auspicious wedding ceremony of',
  blessingMessage: 'Your gracious presence and heartfelt blessings on this auspicious occasion will make our joy complete.',
  
  // Confirmed Wedding Dates: 4th November Reception, 5th November Marriage
  weddingDate: '2026-11-05T09:00:00+05:30', 
  weddingDateDisplay: '4th & 5th November',

  venue: {
    name: 'Shubodaya Kalayana Mantapa',
    subname: 'Auspicious Wedding Hall',
    address: 'Shubodaya Kalayana Mantapa',
    city: 'Karnataka',
    state: 'India',
    googleMapsShareUrl: 'https://share.google/pgu3tHJV1YtajV2bU',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Shubodaya+Kalayana+Mantapa',
  },

  events: [
    {
      id: 'reception',
      title: 'Wedding Reception',
      subtitle: 'An Evening of Joy & Grand Feast',
      date: 'Wednesday, 4th November',
      time: '7:00 PM Onwards',
      description: 'Join us for a joyful evening of celebration, delicious traditional feast, and heartfelt blessings for the newly wedded couple.',
    },
    {
      id: 'marriage',
      title: 'Kalyanotsavam (Marriage Ceremony)',
      subtitle: 'The Sacred Vows & Mangalasutra Dharana',
      date: 'Thursday, 5th November',
      time: 'Auspicious Sumuhurtham (Morning)',
      description: 'The auspicious moment where sacred Vedic mantras are chanted and sacred vows are exchanged amidst the divine presence of holy agni and elders.',
    },
  ],

  audio: {
    trackUrl: '/audio/wedding_music.mp3',
    title: 'Traditional South Indian Wedding Mangalyam Ambience',
    autoPlayPrompt: 'Tap anywhere to experience with sacred wedding music',
  },

  sharing: {
    title: 'GS Leelavati, B.Sc. Weds R Malikarjuna | Wedding Invitation',
    text: '🙏 We cordially invite you and your family to the wedding celebrations of GS Leelavati, B.Sc. Weds R Malikarjuna on 4th & 5th November at Shubodaya Kalayana Mantapa. Please join us and shower your divine blessings!',
  },
};
