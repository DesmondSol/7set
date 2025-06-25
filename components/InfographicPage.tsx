
import React, { useEffect, useState, useRef } from 'react';
import { TranslationKey } from '../../locales'; // Corrected path

declare var Chart: any; 

const InfographicPage: React.FC = () => {
  const [chartJsReady, setChartJsReady] = useState(false);
  const initializedChartIDsRef = useRef<string[]>([]);


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

  const tooltipTitleCallback = {
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
          color: '#E5E7EB', // slate-200
          font: {
            size: 14
          }
        }
      }
    }
  };

  function initStartPackageChart() {
    const canvasElement = document.getElementById('startPackageChart') as HTMLCanvasElement | null;
    if (!canvasElement) return null;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return null;
    initializedChartIDsRef.current.push('startPackageChart');
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Week 1: Mindset & Vision', 'Week 2: Strategy & Value Prop', 'Week 3: Market Research & Team', 'Week 4: Pitch Fundamentals'],
        datasets: [{
          label: 'Focus',
          data: [25, 25, 25, 25],
          backgroundColor: [
            '#FF6B6B', // Coral
            '#FFD166', // Yellow
            '#06D6A0', // Green
            '#118AB2'  // Blue
          ],
          borderColor: '#073B4C', // Dark Navy background
          borderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        ...tooltipTitleCallback,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...tooltipTitleCallback.plugins,
          title: {
            display: false,
          }
        }
      }
    });
  }

  function initBuildPackageChart() {
    const canvasElement = document.getElementById('buildPackageChart') as HTMLCanvasElement | null;
    if (!canvasElement) return null;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return null;
    initializedChartIDsRef.current.push('buildPackageChart');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['AI & MVP Dev', 'Financial Literacy', 'Digital Marketing & Sales', 'Legal Basics'],
        datasets: [{
          label: 'Module Focus',
          data: [40, 25, 25, 10],
          backgroundColor: [
            '#FFD166',
            '#06D6A0',
            '#118AB2',
            '#FF6B6B'
          ],
          borderColor: '#073B4C',
          borderWidth: 2
        }]
      },
      options: {
        ...tooltipTitleCallback,
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#E5E7EB' } // slate-200
          },
          y: {
            grid: { display: false }, 
            ticks: { color: '#E5E7EB' } // slate-200
          }
        },
        plugins: {
          ...tooltipTitleCallback.plugins,
          title: {
            display: false
          }
        }
      }
    });
  }
  
  function initGrowPackageChart() {
    const canvasElement = document.getElementById('growPackageChart') as HTMLCanvasElement | null;
    if (!canvasElement) return null;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return null;
    const labels = [
      'Company Formation & Legal', 
      'Advanced Finance & Investment', 
      'Operations & Scalability', 
      'Recruiting & Team Culture', 
      'Advanced Negotiation', 
      'KPI Management'
    ];
    const wrappedLabels = labels.map(label => wrapLabel(label, 16));
    initializedChartIDsRef.current.push('growPackageChart');
    return new Chart(ctx, {
      type: 'radar',
      data: {
        labels: wrappedLabels,
        datasets: [{
          label: 'GROW Module Focus',
          data: [8, 9, 7, 8, 9, 7],
          fill: true,
          backgroundColor: 'rgba(6, 214, 160, 0.4)', // Green with alpha
          borderColor: '#06D6A0', // Green
          pointBackgroundColor: '#06D6A0',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#06D6A0'
        }]
      },
      options: {
        ...tooltipTitleCallback,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            pointLabels: { 
              color: '#E5E7EB', // slate-200
              font: {
                size: 12
              }
            },
            ticks: {
              color: '#073B4C', // Text color for ticks (dark)
              backdropColor: 'rgba(229, 231, 235, 0.75)', // Light backdrop for ticks
              borderRadius: 4,
            }
          }
        },
        plugins: {
          ...tooltipTitleCallback.plugins,
          title: {
            display: false
          }
        }
      }
    });
  }
  
  function initLearningModelChart() {
    const canvasElement = document.getElementById('learningModelChart') as HTMLCanvasElement | null;
    if (!canvasElement) return null;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return null;
    initializedChartIDsRef.current.push('learningModelChart');
    return new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Action-Led Practical Application (>60%)', 'Lecture & Theory (<40%)'],
        datasets: [{
          data: [65, 35],
          backgroundColor: [
            '#06D6A0', // Green
            '#118AB2', // Blue
          ],
          borderColor: '#073B4C', // Dark Navy background
          borderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        ...tooltipTitleCallback,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...tooltipTitleCallback.plugins,
          title: {
            display: true,
            text: 'Learning Model Breakdown',
            color: '#FFFFFF', // White title
            font: { size: 18, weight: 'bold' }
          }
        }
      }
    });
  }
  
  function initWeeklyHoursChart() {
    const canvasElement = document.getElementById('weeklyHoursChart') as HTMLCanvasElement | null;
    if (!canvasElement) return null;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return null;
    initializedChartIDsRef.current.push('weeklyHoursChart');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['START', 'BUILD', 'GROW'],
        datasets: [
          {
            label: 'Weekday Sessions (Lecture/Interactive)',
            data: [4.5, 4.5, 4.5],
            backgroundColor: '#118AB2', // Blue
          },
          {
            label: 'Weekend Workshops (Hands-On)',
            data: [6, 6, 6],
            backgroundColor: '#06D6A0', // Green
          }
        ]
      },
      options: {
        ...tooltipTitleCallback,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            ...tooltipTitleCallback.plugins,
          title: {
            display: true,
            text: 'Total Weekly Learning Hours: 10.5',
            color: '#FFFFFF', // White title
            font: { size: 18, weight: 'bold' }
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: '#E5E7EB' } // slate-200
          },
          y: {
            stacked: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#E5E7EB' } // slate-200
          }
        }
      }
    });
  }

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
  }, [chartJsReady]); 


  return (
    // bg-[#073B4C] is set on body by index.html, so this div can be bg-transparent or another layer if needed
    <div className="text-slate-100 font-inter w-full overflow-y-auto h-full"> 
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Ignite Your Vision</h1>
          <p className="text-xl md:text-2xl font-light text-[#FFD166] max-w-3xl mx-auto">The 7set Spark Entrepreneurial Journey: Transforming Ethiopian Ideas into Global Impact</p>
        </header>

        <main>
          <section id="blueprint" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">The Program Blueprint</h2>
            <p className="text-lg text-center text-slate-300 mb-12 max-w-2xl mx-auto">Our action-led curriculum is a structured 3-stage journey, guiding you from initial idea to investor-ready venture.</p>
            <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center"> {/* items-stretch for equal height cards */}
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#FF6B6B]">1</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">START</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">1 Month: Forge your mindset & validate your idea.</p>
              </div>
              <div className="text-[#118AB2] text-[2.5rem] leading-none self-center mx-4 md:transform-none md:rotate-0 md:my-0 rotate-90 my-6">&rarr;</div>
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#FFD166]">2</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">BUILD</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">2 Months: Develop your MVP & find first customers.</p>
              </div>
              <div className="text-[#118AB2] text-[2.5rem] leading-none self-center mx-4 md:transform-none md:rotate-0 md:my-0 rotate-90 my-6">&rarr;</div>
              <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center w-full md:w-1/4 flex flex-col justify-between border border-slate-700">
                <div>
                  <div className="text-5xl font-bold text-[#06D6A0]">3</div>
                  <h3 className="text-2xl font-bold mt-2 text-slate-100">GROW</h3>
                </div>
                <p className="mt-2 text-slate-300 text-sm">2 Months: Scale your company & secure investment.</p>
              </div>
            </div>
          </section>

          <section id="deep-dive" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-20">
            <div className="bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-[#FF6B6B] mb-4">Deep Dive: START Package</h3>
              <p className="text-slate-300 mb-6 text-sm">The first month focuses on building a strong foundation. The curriculum is evenly distributed across four critical weeks, moving from mindset to a polished initial pitch.</p>
              <div className="relative w-full mx-auto h-64 md:h-80 max-w-md">
                <canvas id="startPackageChart"></canvas>
              </div>
            </div>

            <div className="bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <h3 className="text-2xl font-bold text-[#FFD166] mb-4">Deep Dive: BUILD Package</h3>
              <p className="text-slate-300 mb-6 text-sm">This two-month stage is intensely practical, focusing on bringing your product to life and into the market, with a strong emphasis on digital skills and financial literacy.</p>
              <div className="relative w-full mx-auto h-64 md:h-80 max-w-md">
                <canvas id="buildPackageChart"></canvas>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#06D6A0] mb-4">Deep Dive: GROW Package</h3>
                  <p className="text-slate-300 text-sm">The final two months are dedicated to scaling your venture. This stage covers the advanced, multifaceted skills needed to build a sustainable company and attract serious investment.</p>
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
                <h2 className="text-3xl font-bold text-white mb-4">The Action-Led Difference</h2>
                <p className="text-lg text-slate-300">We fundamentally believe in learning by doing. Our curriculum dramatically minimizes passive lectures in favor of hands-on, practical application. You won't just learn theory; you'll build, test, and execute from day one.</p>
                <div className="mt-6 flex space-x-4 items-center text-lg">
                  <span className="text-2xl text-[#FFD166]">🔨</span><span className="text-slate-200">Workshops</span>
                  <span className="text-2xl text-[#FF6B6B]">📱</span><span className="text-slate-200">App Integration</span>
                  <span className="text-2xl text-[#06D6A0]">🌍</span><span className="text-slate-200">Real-World Projects</span>
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
                <h2 className="text-3xl font-bold text-white mb-4">Your Weekly Rhythm</h2>
                <p className="text-lg text-slate-300">The program is designed to fit your life. Evening sessions cover core concepts, while intensive weekend workshops are dedicated to hands-on project work and real-life execution, totaling over 10 hours of immersive learning each week.</p>
              </div>
            </div>
          </section>

          <section id="ecosystem" className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">More Than a Classroom: Join the Ecosystem</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🤝', title: 'Networking Events', text: 'Connect with peers, mentors, and industry leaders at our bi-weekly open events.', color: '#118AB2' },
                { icon: '🎤', title: 'Guest Speakers', text: 'Gain insights from successful Ethiopian entrepreneurs and global experts.', color: '#06D6A0' },
                { icon: '❓', title: 'Investor AMAs', text: 'Ask candid questions and get direct feedback from venture capitalists and angel investors.', color: '#FFD166' },
                { icon: '🏆', title: 'Game Nights', text: 'Build team synergy and problem-solving skills in a fun, collaborative setting.', color: '#FF6B6B' }
              ].map(item => (
                <div key={item.title} className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center transition-transform hover:scale-105 border border-slate-700 flex flex-col">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-bold text-slate-100" style={{color: item.color}}>{item.title}</h3>
                  <p className="mt-2 text-slate-300 text-sm flex-grow">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section id="goal" className="text-center bg-gradient-to-br from-[#118AB2] to-[#06D6A0] p-8 md:p-12 rounded-xl mb-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">The Ultimate Goal: Funding Your Future</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-6xl md:text-8xl font-black text-white">100K+</p>
                <p className="text-2xl font-semibold text-white/90 mt-2">Birr in Pitch Prizes</p>
                <p className="mt-2 text-white/80 text-sm">Win non-dilutive capital to fuel your MVP and early-stage growth through our regular pitch competitions.</p>
              </div>
                <div>
                <p className="text-6xl md:text-8xl font-black text-white">1M+</p>
                <p className="text-2xl font-semibold text-white/90 mt-2">Birr Investment Opportunity</p>
                <p className="mt-2 text-white/80 text-sm">Graduates of the Grow package pitch for significant seed grants and gain direct access to our network of investors.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center pt-8 mt-12 border-t border-slate-700">
          <img src="https://7setspark.com/wp-content/uploads/2023/12/Asset-5-179x35.webp" alt="7set Spark Logo" className="h-10 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} 7set Spark. All rights reserved. Addis Ababa, Ethiopia.</p>
          <p className="text-slate-400 text-sm">Dembel city center 3rd floor +251923214663 </p>
          <p className="text-slate-400 text-sm">Powered by: 
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
    </div>
  );
};

export default InfographicPage;
