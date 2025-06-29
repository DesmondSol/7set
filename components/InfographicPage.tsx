
import React, { useEffect, useState, useRef } from 'react';
import { TranslationKey, Partner, Trainer, Testimonial } from '../types'; 
import { Language, Page } from '../types';
import { PARTNERS_DATA, TRAINERS_DATA, TESTIMONIALS_DATA } from '../constants';
import { Modal } from './common/Modal';
import { Button } from './common/Button';

declare var Chart: any; 

interface InfographicPageProps {
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const PartnerScroller = ({ t }: { t: (key: TranslationKey, defaultText?: string) => string }) => {
  // To make it seamless, we need to duplicate the items.
  const duplicatedPartners = [...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <div className="scroller w-full">
      <div className="scroller__inner">
        {duplicatedPartners.map((partner, index) => (
          <a href={partner.website} key={`${partner.id}-${index}`} target="_blank" rel="noopener noreferrer" title={partner.name}>
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              className="h-10 md:h-12 object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};


const InfographicPage: React.FC<InfographicPageProps> = ({ language, t }) => {
  const [chartJsReady, setChartJsReady] = useState(false);
  const initializedChartIDsRef = useRef<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<{type: 'partner' | 'trainer' | 'testimonial', data: Partner | Trainer | Testimonial} | null>(null);

  const getModalTitle = () => {
    if (!selectedItem) return '';
    switch (selectedItem.type) {
        case 'partner': return t('partner_modal_title');
        case 'trainer': return t('trainer_modal_title');
        case 'testimonial': return t('testimonial_modal_title');
        default: return '';
    }
  };

  const renderModalContent = () => {
      if (!selectedItem) return null;
      const { type, data } = selectedItem;
      
      switch (type) {
          case 'partner': {
              const partner = data as Partner;
              return (
                  <div className="text-center">
                      <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-20 max-w-[200px] object-contain mx-auto mb-4 bg-white p-2 rounded-lg" />
                      <h4 className="text-2xl font-bold text-slate-100 mb-4">{partner.name}</h4>
                      <p className="text-slate-300 mb-6">{partner.description}</p>
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary">{t('visit_website_button')}</Button>
                      </a>
                  </div>
              );
          }
          case 'trainer': {
              const trainer = data as Trainer;
              return (
                  <div className="text-center">
                      <img src={trainer.photoUrl} alt={trainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-slate-600"/>
                      <h4 className="text-2xl font-bold text-slate-100">{trainer.name}</h4>
                      <p className="text-md font-semibold text-blue-400 mb-4">{trainer.specialty}</p>
                      <p className="text-slate-300 text-left whitespace-pre-line">{trainer.bio}</p>
                  </div>
              );
          }
          case 'testimonial': {
              const testimonial = data as Testimonial;
              return (
                  <div>
                       <div className="flex flex-col items-center text-center mb-4">
                          <img src={testimonial.photoUrl} alt={testimonial.authorName} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-slate-600"/>
                          <h4 className="text-xl font-bold text-slate-100">{testimonial.authorName}</h4>
                          <p className="text-sm font-medium text-slate-400">{testimonial.authorTitle}</p>
                      </div>
                      <blockquote className="text-lg italic text-slate-300 border-l-4 border-blue-500 pl-4 py-2">
                          "{testimonial.quote}"
                      </blockquote>
                  </div>
              );
          }
          default: return null;
      }
  };

  function wrapLabel(str: string, maxLen: number): string | string[] {
    if (str.length <= maxLen) {
      return str;
    }
    const words = str.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + word).length > maxLen && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = '';
      }
      currentLine += (currentLine.length > 0 ? ' ' : '') + word;
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    return lines;
  }

  const getTooltipTitleCallback = () => ({ // Make it a function to access `t`
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          title: function(tooltipItems: any[]) {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
              return label.join(' ');
            }
            return label;
          }
        }
      },
      legend: {
        labels: {
          color: '#E5E7EB', 
          font: {
            size: 14
          }
        }
      }
    }
  });


  useEffect(() => {
    const checkChartJsAvailability = () => {
      if (typeof Chart !== 'undefined') {
        setChartJsReady(true);
        return true;
      }
      return false;
    };

    if (checkChartJsAvailability()) {
      return; 
    }

    const intervalId = setInterval(() => {
      if (checkChartJsAvailability()) {
        clearInterval(intervalId);
      }
    }, 100); 

    return () => clearInterval(intervalId); 
  }, []);


  useEffect(() => {
    if (chartJsReady) {
      initializedChartIDsRef.current = []; 
      const tooltipCallbacks = getTooltipTitleCallback();

      const initStartPackageChart = () => {
        const canvasElement = document.getElementById('startPackageChart') as HTMLCanvasElement | null;
        if (!canvasElement) return null;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return null;
        initializedChartIDsRef.current.push('startPackageChart');
        return new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
                t('infographic_chart_start_week1'), 
                t('infographic_chart_start_week2'), 
                t('infographic_chart_start_week3'), 
                t('infographic_chart_start_week4')
            ],
            datasets: [{
              label: 'Focus', // This label might not be directly visible in doughnut but good for data structure
              data: [25, 25, 25, 25],
              backgroundColor: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'],
              borderColor: '#073B4C', borderWidth: 4, hoverOffset: 8
            }]
          },
          options: { ...tooltipCallbacks, responsive: true, maintainAspectRatio: false, plugins: { ...tooltipCallbacks.plugins, title: { display: false } } }
        });
      };

      const initBuildPackageChart = () => {
        const canvasElement = document.getElementById('buildPackageChart') as HTMLCanvasElement | null;
        if (!canvasElement) return null;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return null;
        initializedChartIDsRef.current.push('buildPackageChart');
        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
                t('infographic_chart_build_mvp'), 
                t('infographic_chart_build_finance'), 
                t('infographic_chart_build_marketing'), 
                t('infographic_chart_build_legal')
            ],
            datasets: [{
              label: t('infographic_deepdive_build_title'), // Or a generic 'Module Focus'
              data: [40, 25, 25, 10],
              backgroundColor: ['#FFD166', '#06D6A0', '#118AB2', '#FF6B6B'],
              borderColor: '#073B4C', borderWidth: 2
            }]
          },
          options: {
            ...tooltipCallbacks, indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            scales: { x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#E5E7EB' } }, y: { grid: { display: false }, ticks: { color: '#E5E7EB' } } },
            plugins: { ...tooltipCallbacks.plugins, title: { display: false } }
          }
        });
      };
      
      const initGrowPackageChart = () => {
        const canvasElement = document.getElementById('growPackageChart') as HTMLCanvasElement | null;
        if (!canvasElement) return null;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return null;
        const labels = [
          t('infographic_chart_grow_legal'), t('infographic_chart_grow_finance'), t('infographic_chart_grow_ops'), 
          t('infographic_chart_grow_hr'), t('infographic_chart_grow_negotiation'), t('infographic_chart_grow_kpi')
        ];
        const wrappedLabels = labels.map(label => wrapLabel(label, 16));
        initializedChartIDsRef.current.push('growPackageChart');
        return new Chart(ctx, {
          type: 'radar',
          data: {
            labels: wrappedLabels,
            datasets: [{
              label: t('infographic_deepdive_grow_title'), // Or 'GROW Module Focus'
              data: [8, 9, 7, 8, 9, 7],
              fill: true, backgroundColor: 'rgba(6, 214, 160, 0.4)', borderColor: '#06D6A0',
              pointBackgroundColor: '#06D6A0', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#06D6A0'
            }]
          },
          options: {
            ...tooltipCallbacks, responsive: true, maintainAspectRatio: false,
            scales: { r: { angleLines: { color: 'rgba(255, 255, 255, 0.2)' }, grid: { color: 'rgba(255, 255, 255, 0.2)' }, pointLabels: { color: '#E5E7EB', font: { size: 12 } }, ticks: { color: '#073B4C', backdropColor: 'rgba(229, 231, 235, 0.75)', borderRadius: 4, } } },
            plugins: { ...tooltipCallbacks.plugins, title: { display: false } }
          }
        });
      };
      
      const initLearningModelChart = () => {
        const canvasElement = document.getElementById('learningModelChart') as HTMLCanvasElement | null;
        if (!canvasElement) return null;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return null;
        initializedChartIDsRef.current.push('learningModelChart');
        return new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [t('infographic_chart_learning_action'), t('infographic_chart_learning_theory')],
            datasets: [{
              data: [65, 35],
              backgroundColor: ['#06D6A0', '#118AB2'],
              borderColor: '#073B4C', borderWidth: 4, hoverOffset: 8
            }]
          },
          options: {
            ...tooltipCallbacks, responsive: true, maintainAspectRatio: false,
            plugins: { ...tooltipCallbacks.plugins, title: { display: true, text: t('infographic_chart_learning_title'), color: '#FFFFFF', font: { size: 18, weight: 'bold' } } }
          }
        });
      };
      
      const initWeeklyHoursChart = () => {
        const canvasElement = document.getElementById('weeklyHoursChart') as HTMLCanvasElement | null;
        if (!canvasElement) return null;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return null;
        initializedChartIDsRef.current.push('weeklyHoursChart');
        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [t(Page.START), t(Page.BUILD), t(Page.GROW)],
            datasets: [
              { label: t('infographic_chart_hours_weekday'), data: [4.5, 4.5, 4.5], backgroundColor: '#118AB2' },
              { label: t('infographic_chart_hours_weekend'), data: [6, 6, 6], backgroundColor: '#06D6A0' }
            ]
          },
          options: {
            ...tooltipCallbacks, responsive: true, maintainAspectRatio: false,
            plugins: { ...tooltipCallbacks.plugins, title: { display: true, text: t('infographic_chart_hours_title'), color: '#FFFFFF', font: { size: 18, weight: 'bold' } } },
            scales: { x: { stacked: true, grid: { display: false }, ticks: { color: '#E5E7EB' } }, y: { stacked: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#E5E7EB' } } }
          }
        });
      };

      initStartPackageChart();
      initBuildPackageChart();
      initGrowPackageChart();
      initLearningModelChart();
      initWeeklyHoursChart();
    }

    return () => {
      if (typeof Chart !== 'undefined' && Chart.getChart) {
        initializedChartIDsRef.current.forEach(id => {
          const chartInstance = Chart.getChart(id);
          if (chartInstance) {
            chartInstance.destroy();
          }
        });
        initializedChartIDsRef.current = []; 
      }
    };
  }, [chartJsReady, language, t]); 


  return (
    <div className="text-slate-100 font-inter w-full overflow-y-auto h-full"> 
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{t('infographic_title')}</h1>
          <p className="text-xl md:text-2xl font-light text-[#FFD166] max-w-3xl mx-auto">{t('infographic_subtitle')}</p>
        </header>

        <section className="mb-20">
          <PartnerScroller t={t} />
        </section>

        <main>
          <section id="blueprint" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{t('infographic_blueprint_title')}</h2>
            <p className="text-lg text-center text-slate-300 mb-12 max-w-2xl mx-auto">{t('infographic_blueprint_desc')}</p>
            <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center">
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#FF6B6B]">1</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">{t(Page.START)}</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">{t('infographic_stage1_desc')}</p>
              </div>
              <div className="text-[#118AB2] text-[2.5rem] leading-none self-center mx-4 md:transform-none md:rotate-0 md:my-0 rotate-90 my-6">&rarr;</div>
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#FFD166]">2</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">{t(Page.BUILD)}</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">{t('infographic_stage2_desc')}</p>
              </div>
              <div className="text-[#118AB2] text-[2.5rem] leading-none self-center mx-4 md:transform-none md:rotate-0 md:my-0 rotate-90 my-6">&rarr;</div>
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#06D6A0]">3</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">{t(Page.GROW)}</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">{t('infographic_stage3_desc')}</p>
              </div>
            </div>
          </section>

          <section id="deep-dive" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
            <div className="bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-[#FF6B6B] mb-4">{t('infographic_deepdive_start_title')}</h3>
              <p className="text-slate-300 mb-6 text-sm">{t('infographic_deepdive_start_desc')}</p>
              <div className="relative w-full mx-auto h-64 md:h-80 max-w-md">
                <canvas id="startPackageChart"></canvas>
              </div>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-[#FFD166] mb-4">{t('infographic_deepdive_build_title')}</h3>
              <p className="text-slate-300 mb-6 text-sm">{t('infographic_deepdive_build_desc')}</p>
              <div className="relative w-full mx-auto h-64 md:h-80 max-w-md">
                <canvas id="buildPackageChart"></canvas>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#06D6A0] mb-4">{t('infographic_deepdive_grow_title')}</h3>
                  <p className="text-slate-300 text-sm">{t('infographic_deepdive_grow_desc')}</p>
                </div>
                <div className="relative w-full mx-auto h-80 md:h-96 max-w-lg">
                  <canvas id="growPackageChart"></canvas>
                </div>
              </div>
            </div>
          </section>

          <section id="model" className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-4">{t('infographic_actionled_title')}</h2>
                <p className="text-lg text-slate-300">{t('infographic_actionled_desc')}</p>
                <div className="mt-6 flex space-x-4 items-center text-lg">
                  <span className="text-2xl text-[#FFD166]">🔨</span><span className="text-slate-200">{t('infographic_actionled_workshops')}</span>
                  <span className="text-2xl text-[#FF6B6B]">📱</span><span className="text-slate-200">{t('infographic_actionled_app')}</span>
                  <span className="text-2xl text-[#06D6A0]">🌍</span><span className="text-slate-200">{t('infographic_actionled_projects')}</span>
                </div>
              </div>
              <div className="md:col-span-3 relative w-full mx-auto h-80 md:h-96 max-w-lg">
                <canvas id="learningModelChart"></canvas>
              </div>
            </div>
          </section>

          <section id="schedule" className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 relative w-full mx-auto h-80 max-w-xl">
                <canvas id="weeklyHoursChart"></canvas>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-4">{t('infographic_weekly_title')}</h2>
                <p className="text-lg text-slate-300">{t('infographic_weekly_desc')}</p>
              </div>
            </div>
          </section>

          <section id="ecosystem" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">{t('infographic_ecosystem_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🤝', titleKey: 'infographic_eco_networking_title', textKey: 'infographic_eco_networking_desc', color: '#118AB2' },
                { icon: '🎤', titleKey: 'infographic_eco_speakers_title', textKey: 'infographic_eco_speakers_desc', color: '#06D6A0' },
                { icon: '❓', titleKey: 'infographic_eco_amas_title', textKey: 'infographic_eco_amas_desc', color: '#FFD166' },
                { icon: '🏆', titleKey: 'infographic_eco_gamenights_title', textKey: 'infographic_eco_gamenights_desc', color: '#FF6B6B' }
              ].map(item => (
                <div key={item.titleKey} className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105 border border-slate-700 flex flex-col">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-100" style={{color: item.color}}>{t(item.titleKey as TranslationKey)}</h3>
                  <p className="mt-2 text-slate-300 text-sm flex-grow">{t(item.textKey as TranslationKey)}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="goal" className="text-center bg-gradient-to-br from-[#118AB2] to-[#06D6A0] p-8 md:p-12 rounded-xl mb-20 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">{t('infographic_goal_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-6xl md:text-8xl font-black text-white">{t('infographic_goal_prizes_amount')}</p>
                <p className="mt-2 text-white/80 text-sm">{t('infographic_goal_prizes_desc')}</p>
              </div>
                <div>
                <p className="text-6xl md:text-8xl font-black text-white">{t('infographic_goal_investment_amount')}</p>
                <p className="mt-2 text-white/80 text-sm">{t('infographic_goal_investment_desc')}</p>
              </div>
            </div>
          </section>

          {/* <section id="trainers" className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">{t('infographic_trainers_title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {TRAINERS_DATA.map(trainer => (
                      <div key={trainer.id} className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-slate-700">
                          <img src={trainer.photoUrl} alt={trainer.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-slate-600"/>
                          <h3 className="text-xl font-bold text-slate-100">{trainer.name}</h3>
                          <p className="text-md font-light text-blue-400 mb-4">{trainer.specialty}</p>
                          <Button variant="outline" size="sm" onClick={() => setSelectedItem({ type: 'trainer', data: trainer })}>
                              {t('view_details_button')}
                          </Button>
                      </div>
                  ))}
              </div>
          </section> */}

          <section id="testimonials" className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">{t('infographic_testimonials_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {TESTIMONIALS_DATA.map(testimonial => (
                      <div key={testimonial.id} className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105" onClick={() => setSelectedItem({ type: 'testimonial', data: testimonial })}>
                          <img src={testimonial.photoUrl} alt={testimonial.authorName} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-slate-600"/>
                          <blockquote className="text-slate-300 italic flex-grow">
                              "{testimonial.quote.substring(0, 120)}..."
                          </blockquote>
                          <div className="mt-4 font-bold text-slate-100">{testimonial.authorName}</div>
                          <div className="text-sm text-slate-400">{testimonial.authorTitle}</div>
                      </div>
                  ))}
              </div>
          </section>
          
           <section id="partners" className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">{t('infographic_partners_title')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
                  {PARTNERS_DATA.map(partner => (
                      <div key={partner.id} className="flex justify-center items-center p-4 bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg h-32 border border-slate-700 transition-transform hover:scale-105 cursor-pointer" onClick={() => setSelectedItem({ type: 'partner', data: partner })}>
                          <img src={partner.logoUrl} alt={`${partner.name} logo`} title={partner.name} className="max-h-16 w-auto object-contain"/>
                      </div>
                  ))}
              </div>
          </section>
        </main>

        <footer className="text-center pt-8 mt-12 border-t border-slate-700">
          <img src="https://7setspark.com/wp-content/uploads/2023/12/Asset-5-179x35.webp" alt="7set Spark Logo" className="h-10 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">{t('infographic_footer_copyright')}</p>
          <p className="text-slate-400 text-sm">{t('infographic_footer_address')}</p>
          <p className="text-slate-400 text-sm">{t('infographic_footer_poweredby')}
          <a className="underline hover:text-blue-600 dark:hover:text-blue-400"
          href="https://www.linkedin.com/in/sol-tig/"
          target='_blank'
          rel="noopener"
          aria-label='likedin'
        >
          Solomon T
        </a></p>
        </footer>
      </div>
       <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={getModalTitle()} size="lg">
          {renderModalContent()}
      </Modal>
    </div>
  );
};

export default InfographicPage;
