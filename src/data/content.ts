import { TRanking } from '@/types';

export interface IContent {
  title: string;
  tags: string[];
  text: string;
  id: string;
  ranking?: TRanking;
}

export const content: IContent[] = [
  {
    title: 'Choosing the Right Floor Plan',
    id: '1',
    tags: ['facades', 'kitchen', 'interior'],
    text: 'This article explores choosing the right floor plan in detail.',
  },
  {
    title: 'Designing Your Dream Kitchen',
    tags: ['natural light', 'floorplans'],
    id: '2',
    text: 'This article explores designing your dream kitchen in detail.',
  },
  {
    title: 'Open Plan Living',
    id: '3',
    tags: ['sustainability', 'style', 'budget'],
    ranking: 'anchored',
    text: 'This article explores open plan living in detail.',
  },
  {
    title: 'Maximising Natural Light',
    id: '4',
    tags: ['kitchen', 'lighting'],
    text: 'This article explores maximising natural light in detail.',
  },
  {
    title: 'Building for a Growing Family',
    id: '5',
    tags: ['interior', 'style', 'lighting'],
    text: 'This article explores building for a growing family in detail.',
  },
  {
    title: 'Modern Facade Options',
    id: '6',
    tags: ['inclusions', 'bathroom', 'interior'],
    text: 'This article explores modern facade options in detail.',
  },
  {
    title: 'Two-Storey vs Single-Storey',
    id: '7',
    tags: ['energy', 'style', 'budget'],
    ranking: 'featured',
    text: 'This article explores two-storey vs single-storey in detail.',
  },
  {
    title: 'Energy Efficient Home Design',
    id: '8',
    tags: ['kitchen', 'energy'],
    text: 'This article explores energy efficient home design in detail.',
  },
  {
    title: 'Smart Storage Ideas',
    id: '9',
    tags: ['bathroom', 'budget', 'technology', 'kitchen'],
    text: 'This article explores smart storage ideas in detail.',
  },
  {
    title: 'Customising Your Bathroom',
    id: '10',
    tags: ['natural light', 'lighting', 'budget', 'energy'],
    text: 'This article explores customising your bathroom in detail.',
  },
  {
    title: 'Understanding House Orientation',
    id: '11',
    tags: ['budget', 'facades', 'orientation'],
    text: 'This article explores understanding house orientation in detail.',
  },
  {
    title: 'How to Choose a Block',
    id: '12',
    tags: ['planning', 'orientation', 'lighting', 'sustainability'],
    text: 'This article explores how to choose a block in detail.',
  },
  {
    title: 'Facade Trends for 2025',
    id: '13',
    tags: ['style', 'sustainability', 'bathroom', 'lighting'],
    text: 'This article explores facade trends for 2025 in detail.',
  },
  {
    title: 'Interior Style Guide',
    id: '14',
    ranking: 'featured',
    tags: ['lighting', 'home office', 'technology'],
    text: 'This article explores interior style guide in detail.',
  },
  {
    title: 'Landscaping Inspiration',
    id: '15',
    tags: ['bedrooms', 'sustainability', 'bathroom', 'lighting'],
    text: 'This article explores landscaping inspiration in detail.',
  },
  {
    title: 'How to Read Floorplans',
    id: '16',
    tags: ['orientation', 'landscaping', 'facades'],
    text: 'This article explores how to read floorplans in detail.',
  },
  {
    title: 'Navigating Build Timelines',
    id: '17',
    tags: ['planning', 'energy'],
    text: 'This article explores navigating build timelines in detail.',
  },
  {
    title: 'Budgeting for Your Build',
    id: '18',
    tags: ['bedrooms', 'energy', 'interior'],
    text: 'This article explores budgeting for your build in detail.',
  },
  {
    title: 'Why Location Matters',
    id: '19',
    tags: ['orientation', 'technology'],
    text: 'This article explores why location matters in detail.',
  },
  {
    title: 'Top Inclusions to Look For',
    id: '20',
    ranking: 'featured',
    tags: ['storage', 'kitchen', 'floorplans', 'bathroom'],
    text: 'This article explores top inclusions to look for in detail.',
  },
  {
    title: 'Walk-In Pantry Benefits',
    id: '21',
    tags: ['orientation', 'kitchen'],
    text: 'This article explores walk-in pantry benefits in detail.',
  },
  {
    title: 'Home Office Integration',
    id: '22',
    tags: ['orientation', 'style', 'planning', 'energy'],
    text: 'This article explores home office integration in detail.',
  },
  {
    title: 'Sustainable Building Materials',
    id: '23',
    tags: ['facades', 'interior'],
    text: 'This article explores sustainable building materials in detail.',
  },
  {
    title: 'Latest Kitchen Layouts',
    id: '24',
    tags: ['floorplans', 'natural light', 'budget'],
    text: 'This article explores latest kitchen layouts in detail.',
  },
  {
    title: 'Feature Walls That Work',
    id: '25',
    tags: ['sustainability', 'interior', 'planning'],
    text: 'This article explores feature walls that work in detail.',
  },
  {
    title: 'Neutral vs Bold Interiors',
    id: '26',
    tags: ['energy', 'outdoor', 'lighting'],
    text: 'This article explores neutral vs bold interiors in detail.',
  },
  {
    title: 'Outdoor Living Essentials',
    id: '27',
    ranking: 'featured',
    tags: ['home office', 'interior', 'orientation', 'natural light'],
    text: 'This article explores outdoor living essentials in detail.',
  },
  {
    title: 'Smart Home Tech Overview',
    id: '28',
    tags: ['storage', 'lighting', 'planning', 'landscaping'],
    text: 'This article explores smart home tech overview in detail.',
  },
  {
    title: 'Choosing Roof Styles',
    id: '29',
    tags: ['budget', 'planning'],
    text: 'This article explores choosing roof styles in detail.',
  },
  {
    title: 'Lighting Tips for New Homes',
    id: '30',
    tags: ['planning', 'inclusions'],
    text: 'This article explores lighting tips for new homes in detail.',
  },
];
