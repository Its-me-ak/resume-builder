import {Zap} from 'lucide-react'

export default function Badge() {
  return (
    <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1">
      <Zap width={16} />
      <span>Simple Process</span>
    </div>
  );
}
