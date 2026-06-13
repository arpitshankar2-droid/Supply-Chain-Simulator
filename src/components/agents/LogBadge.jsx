export default function LogBadge({ badge }) {
  const styles = {
    'Claude AI': 'bg-accent-purple/20 text-accent-purple border-accent-purple/30',
    'Math/Rule': 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
    'Simulation': 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30',
    'system': 'bg-dark-700 text-dark-400 border-dark-600',
  };

  const style = styles[badge] || styles['system'];

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border ${style}`}>
      {badge}
    </span>
  );
}
