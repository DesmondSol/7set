
import React, { useState, useEffect, useRef } from 'react';
import { MindsetData, Language, UserProfile, FounderProfileReportData, AssessmentScores, TranslationKey } from '../../types';
import { Button } from '../common/Button';
import { generateFounderProfileReport } from '../../services/geminiService'; // Ensure this path is correct

// Assuming Chart.js is loaded globally from index.html
declare var Chart: any;

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
  
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const allAssessmentsCompleted = 
    mindsetData.assessmentStatus.personality === 'completed' &&
    mindsetData.assessmentStatus.businessAcumen === 'completed' &&
    mindsetData.assessmentStatus.startupKnowledge === 'completed';

  const handleGenerateReport = async () => {
    if (!allAssessmentsCompleted) {
      setError(t('mindset_profile_report_prompt_complete_assessments'));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const report = await generateFounderProfileReport(mindsetData.assessmentAnswers, language, t);
      if (report) {
        onUpdateMindsetData({ ...mindsetData, profileReport: report, shouldAutoGenerateReport: false });
      } else {
        setError(t('error_ai_failed_generic'));
        onUpdateMindsetData({ ...mindsetData, shouldAutoGenerateReport: false });
      }
    } catch (e) {
      setError(t('error_ai_failed_generic'));
      onUpdateMindsetData({ ...mindsetData, shouldAutoGenerateReport: false });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (mindsetData.shouldAutoGenerateReport && allAssessmentsCompleted && !mindsetData.profileReport && !isLoading) {
      handleGenerateReport();
    }
  }, [mindsetData.shouldAutoGenerateReport, allAssessmentsCompleted, mindsetData.profileReport, isLoading]);


  useEffect(() => {
    if (
      mindsetData.profileReport &&
      mindsetData.profileReport.scores && 
      Object.keys(mindsetData.profileReport.scores).length > 0 && 
      radarChartRef.current &&
      typeof Chart !== 'undefined'
    ) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = radarChartRef.current.getContext('2d');
      if (ctx) {
        const scoreKeys = Object.keys(mindsetData.profileReport.scores) as (keyof AssessmentScores)[];
        const radarLabels = scoreKeys.map(key => {
            const translationKeyString = `radar_chart_${key.toString().toLowerCase()}`;
            return t(translationKeyString as TranslationKey, key.toString());
        });
        const radarData = scoreKeys.map(key => mindsetData.profileReport!.scores[key] || 0);


        if (radarLabels.length === 0 || radarData.length === 0 || radarLabels.length !== radarData.length) {
            console.warn("Radar chart data is invalid or empty. Skipping chart initialization.", radarLabels, radarData);
            setError(t('error_ai_failed_generic', "AI returned incomplete data for the profile report chart."));
            return;
        }
        
        chartInstanceRef.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: radarLabels,
            datasets: [{
              label: t('mindset_profile_report_strengths_weaknesses_title'),
              data: radarData,
              fill: true,
              backgroundColor: 'rgba(6, 214, 160, 0.3)', 
              borderColor: '#06D6A0',
              pointBackgroundColor: '#06D6A0',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#06D6A0'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                grid: { color: 'rgba(255, 255, 255, 0.2)' },
                pointLabels: { 
                    color: '#E5E7EB', 
                    font: { size: language === 'am' ? 10 : 12 } 
                },
                ticks: { 
                    beginAtZero: true, 
                    max: 100, 
                    stepSize: 20, 
                    color: '#E5E7EB', 
                    backdropColor: 'rgba(0, 0, 0, 0.3)', 
                    font: { size: 10 }
                 },
              },
            },
            plugins: { 
                legend: { labels: { color: '#E5E7EB' } },
                tooltip: {
                    callbacks: {
                        label: function(context: any) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.r !== null) {
                                label += context.parsed.r.toFixed(0);
                            }
                            return label;
                        }
                    }
                }
            }
          }
        });
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [mindsetData.profileReport, language, t]); 

  if (!allAssessmentsCompleted && !mindsetData.profileReport) { // Also don't show prompt if report already exists
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
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-slate-800 rounded-xl shadow-xl border border-slate-700 gap-3">
        <h3 className="text-2xl font-semibold text-blue-400">{t('mindset_profile_report_title')}</h3>
        {!report && allAssessmentsCompleted && ( // Only show button if no report AND assessments are done
          <Button onClick={handleGenerateReport} disabled={isLoading} variant="primary" size="lg">
            {isLoading ? <SpinnerIcon className="mr-2 h-5 w-5" /> : null}
            {isLoading ? t('mindset_profile_report_generating_button') : t('mindset_profile_report_generate_button')}
          </Button>
        )}
      </div>

      {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-lg text-sm text-center">{error}</p>}

      {report ? (
        <div className="space-y-6">
          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-amber-400 mb-2">{t(report.founderTypeTitleKey)}</h4>
            <p className="text-slate-300 whitespace-pre-line">{t(report.founderTypeDescriptionKey)}</p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-green-400 mb-3 text-center">{t('mindset_profile_report_strengths_weaknesses_title')}</h4>
            <div className="h-80 md:h-96 w-full max-w-2xl mx-auto">
              {mindsetData.profileReport?.scores && Object.keys(mindsetData.profileReport.scores).length > 0 ? (
                <canvas ref={radarChartRef}></canvas>
              ) : (
                <p className="text-slate-400 text-center pt-10">{t('error_ai_failed_generic', "Chart data not available or incomplete.")}</p>
              )}
            </div>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">{t('mindset_profile_report_cofounder_title')}</h4>
            <p className="text-slate-300 whitespace-pre-line">{t(report.cofounderPersonaSuggestionKey)}</p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <h4 className="text-xl font-semibold text-purple-400 mb-2">{t('mindset_profile_report_key_takeaways_title')}</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {report.keyTakeawaysKeys.map((key, index) => <li key={`${key}-${index}`}>{t(key)}</li>)}
            </ul>
            {report.keyTakeawaysKeys.length === 0 && <p className="text-slate-400 italic">No specific takeaways generated.</p>}
          </div>
           <p className="text-xs text-slate-500 text-center mt-2">
            {t('exported_on_label', 'Report generated on')}: {new Date(report.generatedDate).toLocaleString(language === 'am' ? 'am-ET' : 'en-US')}
          </p>
        </div>
      ) : (
        !isLoading && allAssessmentsCompleted && <p className="text-slate-400 text-center p-6 bg-slate-800 rounded-xl border border-slate-700">Click "Generate My Profile Report" to see your personalized insights.</p>
      )}
    </div>
  );
};

const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" {...props} className={`animate-spin ${props.className || ''}`}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default ProfileReport;
