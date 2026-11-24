import type { CSSProperties } from 'react';
import Reveal from '../animations/Reveal';
import Card from '../ui/Card';

interface Achievement {
  place: string;
  category: string;
  event: string;
  scope: string;
  accent: string;
  icon: 'trophy' | 'medal' | 'star';
}

const achievements: Achievement[] = [
  {
    place: "1st Runners Up",
    category: "AI Hackathon",
    event: "3rd IAIT National IT Fest",
    scope: "Nationals",
    accent: "#f59e0b",
    icon: "trophy",
  },
  {
    place: "2nd Runners Up",
    category: "IoT Hackathon",
    event: "FastRoboX 1.0 · IEEE Student Branch",
    scope: "Nationals",
    accent: "#60a5fa",
    icon: "trophy",
  },
  {
    place: "Top 5",
    category: "UI/UX",
    event: "AUST CSE Carnival 7.0",
    scope: "University",
    accent: "#a855f7",
    icon: "medal",
  },
  {
    place: "Top 10",
    category: "Techathon",
    event: "UFTB RoboFusion 1.0",
    scope: "Nationals",
    accent: "#10b981",
    icon: "medal",
  },
  {
    place: "Top 10",
    category: "Project Showcase",
    event: "AUST CSE Carnival 8.0",
    scope: "University",
    accent: "#14b8a6",
    icon: "star",
  },
  {
    place: "9th Place",
    category: "IAPC",
    event: "AUST CSE Carnival 8.0",
    scope: "University",
    accent: "#06b6d4",
    icon: "star",
  },
  {
    place: "Top 15",
    category: "Techathon",
    event: "IUT Techathon & Rover Summit",
    scope: "Nationals",
    accent: "#8b5cf6",
    icon: "star",
  },
  {
    place: "Finalist",
    category: "AI Hackathon",
    event: "SciBlitz 2.0 · CUET IEEE Branch",
    scope: "Nationals",
    accent: "#3b82f6",
    icon: "star",
  },
];

const TrophyIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const MedalIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
    <path d="M11 12 5.12 2.2" />
    <path d="m13 12 5.88-9.8" />
    <path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" />
    <path d="M12 18v-2h-.5" />
  </svg>
);

const StarIcon = ({ color }: { color: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const iconMap = {
  trophy: TrophyIcon,
  medal: MedalIcon,
  star: StarIcon,
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title">Achievements</h2>
      </Reveal>

      <div className="achievements-grid">
        {achievements.map((item, index) => {
          const IconComponent = iconMap[item.icon];
          const rowStagger = (index % 2) * 0.07;
          return (
            <Reveal key={`${item.event}-${item.category}`} direction="up" delay={rowStagger}>
              <Card
                className="achievement-card"
                style={{ '--achievement-accent': item.accent } as CSSProperties}
              >
                <div className="achievement-icon-badge" aria-hidden="true">
                  <IconComponent color={item.accent} />
                </div>

                <div className="achievement-content">
                  <h3 className="achievement-title">
                    {item.place}
                    <span className="achievement-separator"> — </span>
                    {item.category}
                  </h3>
                  <p className="achievement-event">{item.event}</p>
                </div>

                <span className="achievement-scope-tag">{item.scope}</span>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;
