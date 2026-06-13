export default function LinkedInShare() {
  const caption = encodeURIComponent(
    `Just built a Self-Healing Supply Chain Simulator using AI agents! 🚀\n\nTwo Claude-powered agents autonomously detected a logistics disruption, analyzed inventory risk, negotiated carrier rates, and resolved the issue — all with bounded autonomy and human-in-the-loop approval.\n\nKey takeaway: AI agents work best when they have clear boundaries and humans stay in the loop for high-stakes decisions.\n\n#SupplyChain #AI #Logistics #DecisionIntelligence #Claude`
  );

  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://github.com')}&summary=${caption}`;

  return (
    <button
      onClick={() => window.open(url, '_blank', 'width=600,height=500')}
      className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-medium rounded-lg transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Share on LinkedIn
    </button>
  );
}
