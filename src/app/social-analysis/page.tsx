"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { MessageSquare, AlertCircle, BarChart3, TrendingUp, Users } from 'lucide-react';

// Party Colors
const COLORS = {
  CPIM: '#ef4444', // Red
  BJP: '#f97316',  // Orange/Saffron
  INC: '#3b82f6',  // Blue
};

const EMOTION_COLORS = {
  Positive: '#10b981', // Green
  Negative: '#ef4444', // Red
  Neutral: '#6b7280'   // Gray
};

export default function SocialAnalysisDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API endpoint that reads the JSON.
    // For simplicity in this demo, we'll import it directly if Next.js allows, 
    // or simulate an API call.
    const loadData = async () => {
      try {
        const response = await import('../../data/analyzed_social_data.json');
        setData(response.default || response);
      } catch (err) {
        console.error("No analyzed data found. Run the tools/analyzer.js script first.", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Data Available</h2>
        <p className="text-neutral-400 mb-6">
          Please run the scraper and analyzer scripts first to generate the dataset.
        </p>
        <div className="bg-black/50 p-4 rounded-lg text-left font-mono text-sm text-green-400 overflow-x-auto">
          node tools/fb_scraper.js<br/>
          node tools/analyzer.js
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalComments = data.length;
  
  // Aggregate data for Party x Theme Bar Chart
  const themesMap: any = {};
  data.forEach(item => {
    if (!themesMap[item.theme]) {
      themesMap[item.theme] = { name: item.theme, CPIM: 0, BJP: 0, INC: 0 };
    }
    if (themesMap[item.theme][item.party] !== undefined) {
      themesMap[item.theme][item.party]++;
    }
  });
  const themeChartData = Object.values(themesMap);

  // Aggregate data for Emotion Pie Chart
  const emotionMap: any = { Positive: 0, Negative: 0, Neutral: 0 };
  data.forEach(item => {
    if (emotionMap[item.emotion] !== undefined) {
      emotionMap[item.emotion]++;
    }
  });
  const emotionChartData = Object.keys(emotionMap).map(key => ({
    name: key,
    value: emotionMap[key]
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Content Analysis Overview</h1>
        <p className="text-neutral-400 mt-2">
          Empirical testing of thematic emphasis across political parties based on Facebook comments.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm shadow-black/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-400">Total Comments Analysed</p>
              <h3 className="text-2xl font-bold text-white">{totalComments.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm shadow-black/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-400">Dominant Theme</p>
              <h3 className="text-xl font-bold text-white truncate">
                {themeChartData.sort((a: any, b: any) => (b.CPIM + b.BJP + b.INC) - (a.CPIM + a.BJP + a.INC))[0]?.name || 'N/A'}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm shadow-black/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-400">Top Emotional Framing</p>
              <h3 className="text-xl font-bold text-white">
                {emotionChartData.sort((a, b) => b.value - a.value)[0]?.name || 'N/A'} Tone
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Bar Chart: Themes by Party */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm shadow-black/50">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-neutral-400" />
            Thematic Emphasis by Party
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={themeChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888" 
                  fontSize={12} 
                  tickMargin={10} 
                  angle={-15} 
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip 
                  cursor={{fill: '#222'}}
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="CPIM" name="CPIM" fill={COLORS.CPIM} radius={[4, 4, 0, 0]} />
                <Bar dataKey="INC" name="INC" fill={COLORS.INC} radius={[4, 4, 0, 0]} />
                <Bar dataKey="BJP" name="BJP" fill={COLORS.BJP} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotion Pie Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm shadow-black/50">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-neutral-400" />
            Overall Emotional Framing
          </h3>
          <div className="h-[300px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {emotionChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name as keyof typeof EMOTION_COLORS] || '#888'} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Raw Data Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm shadow-black/50">
        <div className="p-6 border-b border-neutral-800">
          <h3 className="text-lg font-bold text-white">Recent Classified Comments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-neutral-400 uppercase bg-black/20 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-medium">Party</th>
                <th className="px-6 py-4 font-medium">Comment Extract</th>
                <th className="px-6 py-4 font-medium">Classified Theme</th>
                <th className="px-6 py-4 font-medium">Assigned Frame</th>
                <th className="px-6 py-4 font-medium">Emotion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {data.slice(0, 10).map((row, i) => (
                <tr key={i} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${row.party === 'CPIM' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        row.party === 'BJP' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                      {row.party}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-300 max-w-md truncate" title={row.text}>
                    "{row.text}"
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-400">{row.theme}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-400">{row.frame}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`inline-flex items-center gap-1.5
                      ${row.emotion === 'Positive' ? 'text-emerald-400' : 
                        row.emotion === 'Negative' ? 'text-red-400' : 'text-neutral-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.emotion === 'Positive' ? 'bg-emerald-400' : 
                        row.emotion === 'Negative' ? 'bg-red-400' : 'bg-neutral-400'}`}></span>
                      {row.emotion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
