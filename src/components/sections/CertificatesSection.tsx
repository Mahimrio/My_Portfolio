import { useState } from 'react';
import Reveal from '../animations/Reveal';

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  credentialId?: string;
  link?: string;
  accent?: string;
  previewTags?: {
    topLeft: string;
    topRight: string;
    heading: string;
    subtext: string;
    footerText: string;
  };
}

const certificates: CertificateItem[] = [
  {
    title: "SciBlitz 2.0 – AI Hackathon Certificate of Achievement",
    issuer: "IEEE CUET Student Branch / SheSTEM",
    date: "2026",
    description: "Recognized for developing impactful AI-driven solutions, technical expertise, and collaborative problem-solving in the AI Hackathon at SciBlitz 2.0.",
    image: `${import.meta.env.BASE_URL}certificates/Sciblitz CUET AI Hackathon.png`,
    link: `${import.meta.env.BASE_URL}certificates/Sciblitz CUET AI Hackathon.png`,
    accent: "#3b82f6",
    previewTags: {
      topLeft: "IEEE CUET",
      topRight: "CERTIFICATE",
      heading: "SciBlitz 2.0 – AI Hackathon",
      subtext: "This certificate is proudly presented for excellence in the AI Hackathon at SciBlitz 2.0",
      footerText: "★ OFFICIAL ★",
    },
  },
  {
    title: "Unpacking AI – Practical Foundations Certificate",
    issuer: "GIZ & Humboldt Institute for Internet and Society",
    date: "2026",
    description: "Completed coursework on AI practical foundations, co-designed by the Humboldt Institute for Internet and Society and implemented by GIZ under Digital Skills to Succeed in Asia.",
    image: `${import.meta.env.BASE_URL}certificates/Unpacking AI.png`,
    link: `${import.meta.env.BASE_URL}certificates/Unpacking AI.png`,
    accent: "#3b82f6",
    previewTags: {
      topLeft: "GIZ / HIIG",
      topRight: "CERTIFICATE",
      heading: "Unpacking AI – Practical Foundations",
      subtext: "This certificate is proudly presented for completing the coursework by HIIG & GIZ",
      footerText: "★ OFFICIAL ★",
    },
  },
  {
    title: "Techathon 2026 – Hackathon Certificate of Participation",
    issuer: "Techathon Nationals & Rover Summit 2026 (Team Prognosis)",
    date: "2026",
    description: "Participated in the Hackathon segment at Techathon Nationals and Rover Summit 2026, organized by the IUT Robotics Society.",
    image: `${import.meta.env.BASE_URL}certificates/IUT Techathon.jpeg`,
    link: `${import.meta.env.BASE_URL}certificates/IUT Techathon.jpeg`,
    accent: "#3b82f6",
    previewTags: {
      topLeft: "IUT",
      topRight: "CERTIFICATE",
      heading: "Techathon 2026 – Certificate of Participation",
      subtext: "This certificate is proudly presented for participation in Techathon 2026 (Team Prognosis)",
      footerText: "★ OFFICIAL ★",
    },
  },
  {
    title: "Securing the Digital Future – Certificate of Participation",
    issuer: "AUST Cybersecurity & AI Club (AUSTCAIC)",
    date: "2026",
    description: "Participated in an expert-led seminar by Dhaka Bank CISO focusing on digital security, emerging cyber threats, AI integration, and career opportunities.",
    image: `${import.meta.env.BASE_URL}certificates/CAIC Volunteer-1.jpeg`,
    link: `${import.meta.env.BASE_URL}certificates/CAIC Volunteer-1.jpeg`,
    accent: "#3b82f6",
    previewTags: {
      topLeft: "AUST",
      topRight: "CERTIFICATE",
      heading: "Securing the Digital Future – Certificate of Participation",
      subtext: "This certificate is proudly presented for active participation in AUSTCAIC Seminar",
      footerText: "★ OFFICIAL ★",
    },
  },
];

const PINNED_CERT_COUNT = 3;

// Default Certificate Placeholder Graphic
const DefaultCertificateGraphic = ({ tags }: { tags?: CertificateItem['previewTags'] }) => {
  const topLeft = tags?.topLeft || 'AUST';
  const topRight = tags?.topRight || 'CERTIFICATE';
  const heading = tags?.heading || 'Certificate of Achievement';
  const subtext = tags?.subtext || 'This certificate is proudly presented for excellence';
  const footerText = tags?.footerText || '★ OFFICIAL ★';

  return (
    <div className="cert-graphic-preview">
      <div className="cert-graphic-inner">
        <div className="cert-graphic-header">
          <span className="cert-graphic-logo">{topLeft}</span>
          <span className="cert-graphic-badge">{topRight}</span>
        </div>
        <h4 className="cert-graphic-title">{heading}</h4>
        <p className="cert-graphic-sub">{subtext}</p>
        <div className="cert-graphic-footer">
          <div className="cert-graphic-line" />
          <div className="cert-graphic-seal">{footerText}</div>
          <div className="cert-graphic-line" />
        </div>
      </div>
    </div>
  );
};

const RibbonMedalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a6 6 0 0 0-6 6c0 2.22 1.21 4.15 3 5.19V22l3-2l3 2v-8.81c1.79-1.04 3-2.97 3-5.19a6 6 0 0 0-6-6zm0 2a4 4 0 1 1 0 8a4 4 0 0 1 0-8z" />
  </svg>
);

const CertificatesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const handleToggle = () => {
    if (showAll) {
      setIsCollapsing(true);
      setTimeout(() => {
        setShowAll(false);
        setIsCollapsing(false);
      }, 350);
    } else {
      setShowAll(true);
    }
  };

  const visibleCertificates = (showAll || isCollapsing) ? certificates : certificates.slice(0, PINNED_CERT_COUNT);
  const isExpandedActive = showAll && !isCollapsing;

  return (
    <section id="certificates" className="content-section">
      <Reveal direction="down">
        <h2 className="section-title">Certifications</h2>
      </Reveal>

      <div className="certificates-photo-grid">
        {visibleCertificates.map((item, index) => {
          const isExtra = index >= PINNED_CERT_COUNT;
          let animClass = '';
          if (isExtra) {
            animClass = isCollapsing ? 'collapse-animate' : 'expand-animate';
          }
          return (
            <Reveal key={item.title} direction="up" delay={isExtra ? 0.04 * (index - PINNED_CERT_COUNT) : 0.15 * index}>
              <div className={`cert-photo-card ${animClass}`}>
                {/* 1. Image Preview / Document Box */}
                <div className="cert-photo-wrapper">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="cert-photo-img" loading="lazy" />
                  ) : (
                    <DefaultCertificateGraphic tags={item.previewTags} />
                  )}
                </div>

                {/* 2. Card Content Body */}
                <div className="cert-photo-body">
                  <div className="cert-medal-box">
                    <RibbonMedalIcon />
                  </div>

                  <div className="cert-photo-details">
                    <h3 className="cert-photo-title">{item.title}</h3>
                    <p className="cert-photo-issuer">{item.issuer}</p>
                    <p className="cert-photo-date">Issued: {item.date}</p>
                    <p className="cert-photo-desc">{item.description}</p>

                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-photo-action"
                      >
                        <span>View Certificate ↗</span>
                      </a>
                    ) : (
                      <span className="cert-photo-pending">PDF Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {certificates.length > PINNED_CERT_COUNT && (
        <div className="see-more-container">
          <button
            className="see-more-btn"
            onClick={handleToggle}
            aria-expanded={isExpandedActive}
          >
            <span>{isExpandedActive ? 'Show Less' : `See More Certifications (${certificates.length - PINNED_CERT_COUNT}+)`}</span>
            <svg
              className={`see-more-chevron ${isExpandedActive ? 'chevron-up' : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default CertificatesSection;
