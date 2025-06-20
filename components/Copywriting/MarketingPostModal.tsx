
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MarketingPost, MarketingPostStatus, Language } from '../../types';
import { TranslationKey } from '../../locales';

interface MarketingPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: MarketingPost) => void;
  postData: MarketingPost | Partial<MarketingPost> | null; // Allow partial for prefill
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

const formatDateToDateTimeLocalInput = (dateString?: string): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // Check if it's a valid date
        if (isNaN(date.getTime())) {
             // If dateString is just a date like YYYY-MM-DD, create a valid Date object
            const parts = dateString.split('T')[0].split('-');
            if (parts.length === 3) {
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) -1; // Month is 0-indexed
                const day = parseInt(parts[2], 10);
                const validDate = new Date(year, month, day);
                 if (!isNaN(validDate.getTime())) {
                    return `${validDate.getFullYear()}-${('0' + (validDate.getMonth() + 1)).slice(-2)}-${('0' + validDate.getDate()).slice(-2)}T00:00`;
                }
            }
            return ''; // Fallback for invalid date string
        }

        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
        console.error("Error formatting date for input:", e);
        return ''; // Fallback for any error during date processing
    }
};


export const MarketingPostModal: React.FC<MarketingPostModalProps> = ({ isOpen, onClose, onSave, postData, language, t }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [visualRecommendation, setVisualRecommendation] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<MarketingPostStatus>('todo');

  useEffect(() => {
    if (isOpen) { // Only update form when modal becomes visible or postData changes while open
        if (postData) {
            setTitle(postData.title || '');
            setContent(postData.content || '');
            setPlatform(postData.platform || '');
            setScheduledDate(formatDateToDateTimeLocalInput(postData.scheduledDate));
            setVisualRecommendation(postData.visualRecommendation || '');
            setNotes(postData.notes || '');
            setStatus(postData.status || 'todo');
        } else {
            // Reset for new post
            setTitle('');
            setContent('');
            setPlatform('');
            setScheduledDate(formatDateToDateTimeLocalInput(new Date().toISOString())); // Default to now for new post
            setVisualRecommendation('');
            setNotes('');
            setStatus('todo');
        }
    }
  }, [postData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !platform.trim()) {
        alert(language === 'am' ? 'እባክዎ ርዕስ፣ ይዘት እና መድረክ ይሙሉ!' : 'Please fill in title, content, and platform!');
        return;
    }
    onSave({
      id: postData?.id || '', // ID will be generated if new, or preserved if editing
      title,
      content,
      platform,
      scheduledDate,
      visualRecommendation,
      notes,
      status,
    });
  };

  const statusOptions: { value: MarketingPostStatus; labelKey: TranslationKey }[] = [
    { value: 'todo', labelKey: 'marketing_post_status_todo' },
    { value: 'in-progress', labelKey: 'marketing_post_status_in_progress' },
    { value: 'done', labelKey: 'marketing_post_status_done' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={postData && postData.id ? t('marketing_post_modal_edit_title') : t('marketing_post_modal_create_title')} size="xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">{t('marketing_post_title_label')}</label>
          <input type="text" id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder={t('marketing_post_title_placeholder')} />
        </div>
        <div>
          <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">{t('marketing_post_content_label')}</label>
          <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} rows={5} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={t('marketing_post_content_placeholder')} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="postPlatform" className="block text-sm font-medium text-gray-700">{t('marketing_post_platform_label')}</label>
                <input type="text" id="postPlatform" value={platform} onChange={(e) => setPlatform(e.target.value)} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                        placeholder={t('marketing_post_platform_placeholder')} />
            </div>
            <div>
                <label htmlFor="postScheduledDate" className="block text-sm font-medium text-gray-700">{t('marketing_post_scheduled_date_label')}</label>
                <input type="datetime-local" id="postScheduledDate" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
        </div>
        <div>
          <label htmlFor="postVisualRecommendation" className="block text-sm font-medium text-gray-700">{t('marketing_post_visual_recommendation_label')}</label>
          <input type="text" id="postVisualRecommendation" value={visualRecommendation} onChange={(e) => setVisualRecommendation(e.target.value)}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder={t('marketing_post_visual_placeholder')} />
        </div>
        <div>
          <label htmlFor="postNotes" className="block text-sm font-medium text-gray-700">{t('marketing_post_notes_label')}</label>
          <textarea id="postNotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={t('marketing_post_notes_placeholder')} />
        </div>
        <div>
            <label htmlFor="postStatus" className="block text-sm font-medium text-gray-700">{t('marketing_post_status_label')}</label>
            <select id="postStatus" value={status} onChange={(e) => setStatus(e.target.value as MarketingPostStatus)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                ))}
            </select>
        </div>
        <div className="flex justify-end pt-2 space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>{t('cancel_button')}</Button>
          <Button type="submit" variant="primary">{t('save_button')}</Button>
        </div>
      </form>
    </Modal>
  );
};
