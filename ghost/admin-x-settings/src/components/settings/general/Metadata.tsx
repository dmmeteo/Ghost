import Heading from '../../../admin-x-ds/global/Heading';
import React from 'react';
import SettingGroup from '../../../admin-x-ds/settings/SettingGroup';
import SettingGroupContent from '../../../admin-x-ds/settings/SettingGroupContent';
import TextField from '../../../admin-x-ds/global/TextField';
import useSettingGroup from '../../../hooks/useSettingGroup';
import {ReactComponent as GoogleLogo} from '../../../assets/images/google-logo.svg';
import {ReactComponent as MagnifyingGlass} from '../../../assets/icons/magnifying-glass.svg';

const Metadata: React.FC = () => {
    const {
        currentState,
        focusRef,
        handleSave,
        handleCancel,
        updateSetting,
        getSettingValues,
        handleStateChange
    } = useSettingGroup();

    const [metaTitle, metaDescription, siteTitle, siteDescription] = getSettingValues(['meta_title', 'meta_description', 'title', 'description']) as string[];

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('meta_title', e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting('meta_description', e.target.value);
    };

    const values = (
        <div>
            <Heading grey={true} level={6}>Search engine result preview</Heading>
            <div className='mt-3 flex items-center'>
                <div className='basis-'>
                    <GoogleLogo className='mr-7 h-7' />
                </div>
                <div className='grow'>
                    <div className='flex w-full items-center justify-end rounded-full bg-white p-3 px-4 shadow'>
                        <MagnifyingGlass className='h-4 w-4 text-blue-600' style={{strokeWidth: '2px'}} />
                    </div>
                </div>
            </div>
            <div className='mt-4 flex items-center gap-2 border-t border-grey-200 pt-4'>
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-grey-200'></div>
                <div className='flex flex-col text-sm'>
                    <span>ghost.org</span>
                    <span className='-mt-0.5 inline-block text-xs text-grey-600'>https://ghost.org</span>
                </div>
            </div>
            <div className='mt-1 flex flex-col'>
                <span className='text-lg text-[#1a0dab]'>{metaTitle ? metaTitle : siteTitle}</span>
                <span className='text-sm text-grey-900'>{metaDescription ? metaDescription : siteDescription}</span>
            </div>
        </div>
    );

    const inputFields = (
        <SettingGroupContent>
            <TextField
                hint="Recommended: 70 characters"
                inputRef={focusRef}
                placeholder={siteTitle}
                title="Meta title"
                value={metaTitle}
                onChange={handleTitleChange}
            />
            <TextField
                hint="Recommended: 156 characters"
                placeholder={siteDescription}
                title="Meta description"
                value={metaDescription}
                onChange={handleDescriptionChange}
            />
        </SettingGroupContent>
    );

    return (
        <SettingGroup
            description='Extra content for search engines'
            navid='metadata'
            state={currentState}
            title='Metadata'
            onCancel={handleCancel}
            onSave={handleSave}
            onStateChange={handleStateChange}
        >
            {values}
            {currentState !== 'view' ? inputFields : ''}
        </SettingGroup>
    );
};

export default Metadata;