
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { UserProfile, Language } from '../types';
import { TranslationKey } from '../locales';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  currentUserProfile: UserProfile | null;
  t: (key: TranslationKey, defaultText?: string) => string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentUserProfile,
  t,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [photo, setPhoto] = useState<string | null>(null); // Base64 string
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentUserProfile) {
      setName(currentUserProfile.name || '');
      setEmail(currentUserProfile.email || '');
      setPhone(currentUserProfile.phone || '');
      setOtherDetails(currentUserProfile.otherDetails || '');
      setPhoto(currentUserProfile.photo || null);
      setPhotoPreview(currentUserProfile.photo || null);
    } else {
      // Reset form if no current profile (e.g., first time)
      setName('');
      setEmail('');
      setPhone('');
      setOtherDetails('');
      setPhoto(null);
      setPhotoPreview(null);
    }
  }, [currentUserProfile, isOpen]); // Rerun effect if modal opens or profile changes

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhoto(base64String);
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone, otherDetails, photo });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('user_profile_modal_title')} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-300">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <label
            htmlFor="photoUpload"
            className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-200 transition-colors"
          >
            {photoPreview ? t('user_profile_change_photo_button') : t('user_profile_upload_photo_button')}
          </label>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('user_profile_name_label')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('user_profile_name_placeholder')}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('user_profile_email_label')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('user_profile_email_placeholder')}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('user_profile_phone_label')}</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('user_profile_phone_placeholder')}
          />
        </div>

        <div>
          <label htmlFor="otherDetails" className="block text-sm font-medium text-gray-700">{t('user_profile_other_details_label')}</label>
          <textarea
            id="otherDetails"
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('user_profile_other_details_placeholder')}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="mr-2">{t('cancel_button')}</Button>
          <Button type="submit" variant="primary">{t('user_profile_save_button')}</Button>
        </div>
      </form>
    </Modal>
  );
};


const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);
