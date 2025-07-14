
import React, { useState, useEffect, useMemo } from 'react';
import { GrowData, ChecklistTool, Language, UserProfile, TranslationKey, ChecklistTab } from '../../types';
import { GROW_SECTIONS_HELP, INITIAL_RELEASE_LIST_DATA, INITIAL_GROWTH_LIST_DATA } from '../../constants';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { FloatingActionButton } from '../common/FloatingActionButton';

interface ChecklistsPageProps {
  initialData: GrowData['checklists'];
  onUpdateData: (data: GrowData['checklists']) => void;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
  userProfile: UserProfile | null;
}

// Internal component for displaying one of the checklist tools
const ChecklistViewer: React.FC<{
    listData: ChecklistTab[];
    listType: 'releaseList' | 'growthList';
    onItemToggle: (listType: 'releaseList' | 'growthList', tabId: string, cardId: string, itemId: string) => void;
    t: (key: TranslationKey, defaultText?: string) => string;
}> = ({ listData, listType, onItemToggle, t }) => {
    const [activeTabId, setActiveTabId] = useState(listData.length > 0 ? listData[0].id : '');

    // Reset active tab if it's no longer valid (e.g., data changes)
    useEffect(() => {
        if (listData.length > 0 && !listData.find(tab => tab.id === activeTabId)) {
            setActiveTabId(listData[0].id);
        }
    }, [listData, activeTabId]);

    const activeTabData = listData.find(tab => tab.id === activeTabId);

    return (
        <div className="w-full">
            <div className="border-b border-slate-700">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {listData.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTabId(tab.id)}
                            className={`whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTabId === tab.id ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}>
                            {t(tab.titleKey as TranslationKey)}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="pt-6">
                {activeTabData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeTabData.cards.length === 0 ? (
                            <div className="col-span-full text-center py-10 text-slate-500 italic">
                                {t('coming_soon_message')}
                            </div>
                        ) : activeTabData.cards.map(card => {
                            const totalItems = card.items.length;
                            const completedItems = card.items.filter(item => item.completed).length;
                            const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

                            return (
                                <div key={card.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex flex-col">
                                    <h4 className="font-bold text-slate-100">{t(card.titleKey as TranslationKey)}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-400 my-2">
                                        <div className="w-full bg-slate-600 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div></div>
                                        <span>{completedItems}/{totalItems}</span>
                                    </div>
                                    <div className="space-y-2 mt-2 flex-grow">
                                        {card.items.map(item => (
                                            <label key={item.id} className="flex items-start gap-3 p-2 rounded hover:bg-slate-700/50 cursor-pointer">
                                                <input type="checkbox" checked={item.completed} onChange={() => onItemToggle(listType, activeTabData.id, card.id, item.id)} className="mt-1 h-4 w-4 rounded bg-slate-600 border-slate-500 text-blue-500 focus:ring-blue-500" />
                                                <span className={`text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{t(item.textKey as TranslationKey)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ChecklistsPage: React.FC<ChecklistsPageProps> = ({ initialData, onUpdateData, language, t, userProfile }) => {
    const [activeTool, setActiveTool] = useState<ChecklistTool>(ChecklistTool.RELEASE_LIST);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    
    // Ensure data is initialized from constants if it's empty in storage
    const releaseList = useMemo(() => initialData.releaseList && initialData.releaseList.length > 0 ? initialData.releaseList : INITIAL_RELEASE_LIST_DATA, [initialData.releaseList]);
    const growthList = useMemo(() => initialData.growthList && initialData.growthList.length > 0 ? initialData.growthList : INITIAL_GROWTH_LIST_DATA, [initialData.growthList]);

    useEffect(() => {
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    }, []);

    const checklistsGrowHelp = GROW_SECTIONS_HELP.find(s => s.title === 'Checklists_Section');
    const currentToolHelp = checklistsGrowHelp?.tools.find(tool => tool.tool === activeTool);
    
    const handleItemToggle = (listType: 'releaseList' | 'growthList', tabId: string, cardId: string, itemId: string) => {
        const listToUpdate = listType === 'releaseList' ? releaseList : growthList;
        const updatedList = listToUpdate.map(tab => {
            if (tab.id === tabId) {
                return {
                    ...tab,
                    cards: tab.cards.map(card => {
                        if (card.id === cardId) {
                            return {
                                ...card,
                                items: card.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
                            };
                        }
                        return card;
                    })
                };
            }
            return tab;
        });
        onUpdateData({
            ...initialData,
            [listType]: updatedList,
        });
    };

    return (
        <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-8rem-2rem)] relative bg-transparent">
            <aside className={`fixed top-20 right-0 w-full h-[calc(100vh-5rem)] bg-slate-800 z-40 p-6 overflow-y-auto shadow-xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:w-[320px] md:h-full md:translate-x-0 md:z-auto md:border-r md:border-slate-700`}>
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold text-slate-100">{t('checklists_sidebar_title')}</h3>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white"><CloseIcon className="h-6 w-6" /></button>
                </div>
                <nav>
                    <ul className="space-y-2">
                        {checklistsGrowHelp?.tools.map(({ tool }) => (
                            <li key={tool}>
                                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTool(tool as ChecklistTool); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${activeTool === tool ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-700'}`}>
                                    {t(tool as TranslationKey, tool)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-grow p-4 md:p-8 bg-transparent shadow-inner overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-100">{t(activeTool as TranslationKey, activeTool)}</h2>
                    <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
                        {isSidebarOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                    </Button>
                </div>
                {activeTool === ChecklistTool.RELEASE_LIST && <ChecklistViewer listData={releaseList} listType="releaseList" onItemToggle={handleItemToggle} t={t} />}
                {activeTool === ChecklistTool.GROWTH_LIST && <ChecklistViewer listData={growthList} listType="growthList" onItemToggle={handleItemToggle} t={t} />}
            </main>
             <FloatingActionButton icon={<HelpIcon className="h-6 w-6"/>} tooltip={t('checklists_help_button_tooltip')} onClick={() => setIsHelpModalOpen(true)} className="bottom-6 right-6 z-30" colorClass="bg-slate-600 hover:bg-slate-500" />
             <Modal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} title={`${t('mra_help_modal_title_prefix')}: ${t(activeTool as TranslationKey)}`} size="xl">
                <div className="prose prose-sm prose-invert max-w-none text-slate-300 whitespace-pre-line max-h-[70vh] overflow-y-auto pr-2">
                    {currentToolHelp ? t(currentToolHelp.explanationKey as TranslationKey) : "Help not found."}
                </div>
            </Modal>
        </div>
    );
};

// --- SVG Icons ---
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
const HelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>);
