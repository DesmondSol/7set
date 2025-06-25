
import React, { useState, useEffect } from 'react';
import { MindsetData, Language, UserProfile, FounderProfileReportData } from '../../types';
import { TranslationKey } from '../../types';
import { Button } from '../common/Button';
// import { generateFounderProfileReport } from '../../services/geminiService'; // Uncomment when ready
// import { Chart } from 'chart.js'; // Ensure Chart.js is globally available or imported

interface ProfileReportProps {
  mindsetData: MindsetData;
  onUpdateMindsetData: (data: MindsetData) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
}

const ProfileReport: React.FC<ProfileReportProps> = ({ mindsetData, onUpdateMindsetData, language, t, userProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // const radarChartRef = React.useRef<HTMLCanvasElement>(null);
  // const chartInstanceRef = React.useRef<any>(null); // To store Chart instance

  const allAssessmentsCompleted = 
    mindsetData.assessmentStatus.personality === 'completed' &&
    mindsetData.assessmentStatus.businessAcumen === 'completed' &&
    mindsetData.assessmentStatus.startupKnowledge === 'completed';

  const handleGenerateReport = async () => {
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const report = await generateFounderProfileReport(mindsetData.assessmentAnswers, language);
    //   if (report) {
    //     onUpdateMindsetData({ ...mindsetData, profileReport: report });
    //   } else {
    //     setError(t('error_ai_failed_generic'));
    //   }
    // } catch (e) {
    //   setError(t('error_ai_failed_generic'));
    //   console.error(e);
    // } finally {
    //   setIsLoading(false);
    // }
    alert("AI Report Generation to be implemented!");
  };

  // useEffect(() => {
  //   if (mindsetData.profileReport && radarChartRef.current && typeof Chart !== 'undefined') {
  //     if (chartInstanceRef.current) {
  //       chartInstanceRef.current.destroy();
  //     }
  //     const ctx = radarChartRef.current.getContext('2d');
  //     if (ctx) {
  //       chartInstanceRef.current = new Chart(ctx, {
  //         type: 'radar',
  //         data: {
  //           labels: mindsetData.profileReport.strengthsWeaknessesData.labels[language] || mindsetData.profileReport.strengthsWeaknessesData.labels.en,
  //           datasets: mindsetData.profileReport.strengthsWeaknessesData.datasets.map(ds => ({
  //             ...ds,
  //             label: ds.label[language] || ds.label.en,
  //           }))
  //         },
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           scales: {
  //             r: {
  //               angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
  //               grid: { color: 'rgba(255, 255, 255, 0.2)' },
  //               pointLabels: { color: '#E5E7EB', font: { size: 12 } },
  //               ticks: { beginAtZero: true, max: 100, stepSize: 20, color: '#073B4C', backdropColor: 'rgba(229, 231, 235, 0.75)', borderRadius: 4 },
  //             },
  //           },
  //           plugins: { legend: { labels: { color: '#E5E7EB' } } }
  //         }
  //       });
  //     }
  //   }
  //   return () => {
  //     if (chartInstanceRef.current) {
  //       chartInstanceRef.current.destroy();
  //       chartInstanceRef.current = null;
  //     }
  //   };
  // }, [mindsetData.profileReport, language]);

  if (!allAssessmentsCompleted) {
    return (
      <div className="p-6 bg-slate-800 rounded-xl shadow-xl border border-slate-700 text-center">
        <h3 className="text-2xl font-semibold text-blue-400 mb-4">{t('mindset_profile_report_title')}</h3>
        <p className="text-slate-300">{t('mindset_profile_report_prompt_complete_assessments')}</p>
      </div>
    );
  }

  const report = mindsetData.profileReport;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center p-4 bg-slate-800 rounded-xl shadow-xl border border-slate-700">
        <h3 className="text-2xl font-semibold text-blue-400">{t('mindset_profile_report_title')}</h3>
        {!report && (
          <Button onClick={handleGenerateReport} disabled={isLoading} variant="primary">
            {isLoading ? t('mindset_profile_report_generating_button') : t('mindset_profile_report_generate_button')}
          </Button>
        )}
      </div>

      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-lg text-sm">{error}</p>}

      {report ? (
        <div className="space-y-6">
          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-amber-400 mb-2">{t(report.founderTypeTitleKey)}</h4>
            <p className="text-slate-300">{t(report.founderTypeDescriptionKey)}</p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-green-400 mb-3">{t('mindset_profile_report_strengths_weaknesses_title')}</h4>
            {/* <div className="h-80 md:h-96"><canvas ref={radarChartRef}></canvas></div> */}
            <p className="text-slate-400 text-center">(Radar Chart will be implemented here)</p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">{t('mindset_profile_report_cofounder_title')}</h4>
            <p className="text-slate-300">{t(report.cofounderPersonaSuggestionKey)}</p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-purple-400 mb-2">{t('mindset_profile_report_key_takeaways_title')}</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {report.keyTakeawaysKeys.map(key => <li key={key}>{t(key)}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        !isLoading && <p className="text-slate-400 text-center p-6 bg-slate-800 rounded-xl border border-slate-700">Click "Generate Report" to see your personalized insights.</p>
      )}
    </div>
  );
};

export default ProfileReport;
