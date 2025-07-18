
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Pitch, PitchType, Language } from '../../types';
import { TranslationKey } from '../../types';

interface PitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pitch: Pitch) => void;
  pitchData: Pitch | null;
  language: Language;
  t: (key: TranslationKey, defaultText?: string) => string;
}

export const PitchModal: React.FC<PitchModalProps> = ({ isOpen, onClose, onSave, pitchData, language, t }) => {
  const [type, setType] = useState<PitchType>('investor_pitch');
  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (pitchData) {
      setType(pitchData.type);
      setTitle(pitchData.title);
      setTargetAudience(pitchData.targetAudience);
      setKeyMessage(pitchData.keyMessage);
      setContent(pitchData.content);
      setNotes(pitchData.notes || '');
    } else {
      setType('investor_pitch');
      setTitle('');
      setTargetAudience('');
      setKeyMessage('');
      setContent('');
      setNotes('');
    }
  }, [pitchData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!title.trim() || !targetAudience.trim() || !keyMessage.trim() || !content.trim()) {
        alert(language === 'am' ? 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ!' : 'Please fill in all required fields!');
        return;
    }
    onSave({
      id: pitchData?.id || '', 
      type,
      title,
      targetAudience,
      keyMessage,
      content,
      notes,
    });
  };
  
  const pitchTypeOptions: { value: PitchType; labelKey: TranslationKey }[] = [
    { value: 'investor_pitch', labelKey: 'pitch_type_investor' },
    { value: 'sales_pitch', labelKey: 'pitch_type_sales' },
    { value: 'email_campaign', labelKey: 'pitch_type_email_campaign' },
  ];
  
  const inputBaseClasses = "w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 text-sm";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pitchData ? t('pitch_modal_edit_title') : t('pitch_modal_create_title')} size="xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="pitchType" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_type_label')}</label>
          <select id="pitchType" value={type} onChange={(e) => setType(e.target.value as PitchType)} 
                  className={`${inputBaseClasses} appearance-none`}>
            {pitchTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-slate-700 text-slate-200">{t(opt.labelKey)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pitchTitle" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_title_label')}</label>
          <input type="text" id="pitchTitle" value={title} onChange={(e) => setTitle(e.target.value)} required 
                 className={inputBaseClasses}
                 placeholder={t('pitch_title_placeholder')} />
        </div>
        <div>
          <label htmlFor="pitchTargetAudience" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_target_audience_label')}</label>
          <input type="text" id="pitchTargetAudience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} required
                 className={inputBaseClasses}
                 placeholder={t('pitch_target_audience_placeholder')} />
        </div>
        <div>
          <label htmlFor="pitchKeyMessage" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_key_message_label')}</label>
          <input type="text" id="pitchKeyMessage" value={keyMessage} onChange={(e) => setKeyMessage(e.target.value)} required
                 className={inputBaseClasses}
                 placeholder={t('pitch_key_message_placeholder')} />
        </div>
        <div>
          <label htmlFor="pitchContent" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_content_label')}</label>
          <textarea id="pitchContent" value={content} onChange={(e) => setContent(e.target.value)} rows={type === 'email_campaign' ? 8 : 6} required
                    className={inputBaseClasses}
                    placeholder={t('pitch_content_placeholder')} />
           {type === 'email_campaign' && <p className="text-xs text-slate-400 mt-1">{language === 'am' ? 'ለኢሜል ዘመቻዎች፣ እያንዳንዱን ኢሜል በአዲስ መስመር ወይም በJSON ድርድር ቅርጸት ይለያዩ።' : 'For email campaigns, separate each email on a new line or as a JSON array if generated by AI.'}</p>}
        </div>
        <div>
          <label htmlFor="pitchNotes" className="block text-sm font-medium text-slate-300 mb-1">{t('pitch_notes_label')}</label>
          <textarea id="pitchNotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                    className={inputBaseClasses} />
        </div>
        <div className="flex justify-end pt-3 space-x-3">
          <Button type="button" variant="outline" onClick={onClose}>{t('cancel_button')}</Button>
          <Button type="submit" variant="primary">{t('save_button')}</Button>
        </div>
      </form>
    </Modal>
  );
};
