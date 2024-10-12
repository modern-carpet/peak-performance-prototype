import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Dumbbell, Apple, Clock, Heart, Moon } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Progress from '@radix-ui/react-progress';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;
const CardContent = ({ children }) => <div>{children}</div>;

const ProgressBar = ({ value, className }) => (
  <Progress.Root className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <Progress.Indicator
      className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    />
  </Progress.Root>
);

const PerformanceScoreCard = ({ score, trend }) => (
  <Card className="col-span-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
      {trend === 'up' ? (
        <TrendingUp className="h-4 w-4 text-green-500" />
      ) : (
        <TrendingDown className="h-4 w-4 text-red-500" />
      )}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{score}</div>
      <ProgressBar value={score} className="mt-2" />
    </CardContent>
  </Card>
);

const MetricCard = ({ title, value, subvalue, icon: Icon, color }) => (
  <Card className="col-span-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subvalue}</p>
    </CardContent>
  </Card>
);

const OverviewTab = () => (
  <div>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <PerformanceScoreCard score={92} trend="up" />
      <MetricCard title="Recovery" value="95%" subvalue="+5% from yesterday" icon={Zap} color="green-500" />
      <MetricCard title="Training Load" value="825 AU" subvalue="Optimal" icon={Dumbbell} color="blue-500" />
      <MetricCard title="Nutrition" value="92%" subvalue="Macro Balance" icon={Apple} color="orange-500" />
    </div>
    <Card>
      <CardHeader>
        <CardTitle>7-Day Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[
            { day: 'Mon', performance: 88, recovery: 90, training: 85, nutrition: 92 },
            { day: 'Tue', performance: 90, recovery: 92, training: 88, nutrition: 90 },
            { day: 'Wed', performance: 89, recovery: 89, training: 90, nutrition: 91 },
            { day: 'Thu', performance: 92, recovery: 94, training: 92, nutrition: 93 },
            { day: 'Fri', performance: 91, recovery: 93, training: 89, nutrition: 92 },
            { day: 'Sat', performance: 93, recovery: 95, training: 91, nutrition: 94 },
            { day: 'Sun', performance: 92, recovery: 94, training: 90, nutrition: 93 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="performance" stroke="#8884d8" />
            <Line type="monotone" dataKey="recovery" stroke="#82ca9d" />
            <Line type="monotone" dataKey="training" stroke="#ffc658" />
            <Line type="monotone" dataKey="nutrition" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const TrainingTab = () => (
  <div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <MetricCard 
        title="Weekly Volume" 
        value="24,500 kg" 
        subvalue="+5% from last week" 
        icon={Dumbbell} 
        color="blue-500" 
      />
      <MetricCard 
        title="Strength Gain" 
        value="+5.2%" 
        subvalue="Last 30 days" 
        icon={TrendingUp} 
        color="green-500" 
      />
      <MetricCard 
        title="Training Time" 
        value="12.5 hrs" 
        subvalue="This week" 
        icon={Clock} 
        color="purple-500" 
      />
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Training Load Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Strength', value: 35 },
            { name: 'Hypertrophy', value: 25 },
            { name: 'Endurance', value: 20 },
            { name: 'HIIT', value: 15 },
            { name: 'Recovery', value: 5 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const NutritionTab = () => (
  <div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <MetricCard 
        title="Calorie Intake" 
        value="2,450 kcal" 
        subvalue="-50 kcal from target" 
        icon={Apple} 
        color="green-500" 
      />
      <MetricCard 
        title="Protein" 
        value="180g" 
        subvalue="2.2g/kg body weight" 
        icon={Apple} 
        color="blue-500" 
      />
      <MetricCard 
        title="Hydration" 
        value="3.2 L" 
        subvalue="+0.2 L from target" 
        icon={Apple} 
        color="blue-300" 
      />
    </div>
    {/* Add more nutrition-specific content here */}
  </div>
);

const RecoveryTab = () => (
  <div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <MetricCard 
        title="Sleep Score" 
        value="92%" 
        subvalue="8.2 hrs | 98% efficiency" 
        icon={Moon} 
        color="indigo-500" 
      />
      <MetricCard 
        title="HRV" 
        value="75 ms" 
        subvalue="+5 ms from baseline" 
        icon={Heart} 
        color="red-500" 
      />
      <MetricCard 
        title="Resting HR" 
        value="48 bpm" 
        subvalue="-2 bpm from avg" 
        icon={Heart} 
        color="pink-500" 
      />
    </div>
    {/* Add more recovery-specific content here */}
  </div>
);

const BiomarkersTab = () => (
  <div>
    <Card>
      <CardHeader>
        <CardTitle>Key Biomarkers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="font-bold">Testosterone</p>
            <p>750 ng/dL <span className="text-green-500">(Optimal)</span></p>
          </div>
          <div>
            <p className="font-bold">Cortisol</p>
            <p>15 μg/dL <span className="text-yellow-500">(Slightly High)</span></p>
          </div>
          <div>
            <p className="font-bold">Vitamin D</p>
            <p>55 ng/mL <span className="text-green-500">(Optimal)</span></p>
          </div>
        </div>
      </CardContent>
    </Card>
    {/* Add more biomarker-specific content here */}
  </div>
);

const PeakPerformEliteDashboard = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Peak Perform Elite Dashboard</h1>
      <Tabs.Root defaultValue="overview">
        <Tabs.List className="mb-6">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="training">Training</Tabs.Trigger>
          <Tabs.Trigger value="nutrition">Nutrition</Tabs.Trigger>
          <Tabs.Trigger value="recovery">Recovery</Tabs.Trigger>
          <Tabs.Trigger value="biomarkers">Biomarkers</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">
          <OverviewTab />
        </Tabs.Content>
        <Tabs.Content value="training">
          <TrainingTab />
        </Tabs.Content>
        <Tabs.Content value="nutrition">
          <NutritionTab />
        </Tabs.Content>
        <Tabs.Content value="recovery">
          <RecoveryTab />
        </Tabs.Content>
        <Tabs.Content value="biomarkers">
          <BiomarkersTab />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default PeakPerformEliteDashboard;