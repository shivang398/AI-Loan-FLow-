import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface FoirGaugeProps {
  foir: number;
}

const FoirGauge: React.FC<FoirGaugeProps> = ({ foir }) => {
  const clamped = Math.min(100, Math.max(0, foir));
  const color = clamped < 40 ? '#10B981' : clamped < 55 ? '#F59E0B' : '#EF4444';
  const data = [{ value: clamped, fill: color }];

  return (
    <div className="relative flex flex-col items-center">
      <div style={{ width: 140, height: 100 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="80%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={12}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background={{ fill: '#F1F5F9' }} dataKey="value" cornerRadius={6} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-2">
        <span className="text-2xl font-extrabold" style={{ color, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {clamped}%
        </span>
        <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>FOIR</div>
      </div>
    </div>
  );
};

export default FoirGauge;
