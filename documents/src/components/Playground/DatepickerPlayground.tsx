import React, {useEffect, useId, useMemo, useState} from 'react';
import moment, {Moment} from 'moment';
import jalaliMoment from 'jalali-moment';

import {Datepicker} from '../../../../dist/esm/index.js';

import styles from './styles.module.css';

type PlaygroundTheme = 'blue' | 'green' | 'yellow' | 'red' | 'papular';
type PlaygroundMode = 'light' | 'dark';
type PlaygroundLang = 'en' | 'fa';

const THEMES: PlaygroundTheme[] = ['blue', 'green', 'yellow', 'red', 'papular'];
const MODES: PlaygroundMode[] = ['light', 'dark'];
const LANGS: {value: PlaygroundLang; label: string}[] = [
  {value: 'en', label: 'English'},
  {value: 'fa', label: 'Persian'},
];

const placeholders: Record<PlaygroundLang, string> = {
  en: 'Select a date',
  fa: 'تاریخ را انتخاب کنید',
};

const emptyMessages: Record<PlaygroundLang, string> = {
  en: 'No date selected yet.',
  fa: 'هنوز تاریخی انتخاب نشده است.',
};

const selectionLabels: Record<PlaygroundLang, string> = {
  en: 'Selected date: ',
  fa: 'تاریخ انتخابی: ',
};

function getDisplayMoment(value: Moment | undefined, lang: PlaygroundLang) {
  if (!value) {
    return undefined;
  }

  if (lang === 'fa') {
    return jalaliMoment(value.format('YYYY-MM-DD'), 'YYYY-MM-DD').locale('fa');
  }

  return value.clone().locale('en');
}

export default function DatepickerPlayground(): JSX.Element {
  const [theme, setTheme] = useState<PlaygroundTheme>('blue');
  const [mode, setMode] = useState<PlaygroundMode>('light');
  const [lang, setLang] = useState<PlaygroundLang>('en');
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(moment());

  const themeId = useId();
  const modeId = useId();
  const langId = useId();

  useEffect(() => {
    setSelectedDate((current) => (current ? current.clone() : current));
  }, [lang]);

  const displayMoment = useMemo(
    () => getDisplayMoment(selectedDate, lang),
    [selectedDate, lang],
  );

  const formattedValue = displayMoment?.format('YYYY/MM/DD');

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <fieldset className={styles.controlGroup}>
          <legend id={themeId} className={styles.legend}>
            Theme
          </legend>
          <select
            aria-labelledby={themeId}
            className={styles.select}
            value={theme}
            onChange={(event) => setTheme(event.target.value as PlaygroundTheme)}>
            {THEMES.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className={styles.controlGroup}>
          <legend id={modeId} className={styles.legend}>
            Mode
          </legend>
          <select
            aria-labelledby={modeId}
            className={styles.select}
            value={mode}
            onChange={(event) => setMode(event.target.value as PlaygroundMode)}>
            {MODES.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className={styles.controlGroup}>
          <legend id={langId} className={styles.legend}>
            Language
          </legend>
          <select
            aria-labelledby={langId}
            className={styles.select}
            value={lang}
            onChange={(event) => setLang(event.target.value as PlaygroundLang)}>
            {LANGS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      <div className={styles.preview} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <Datepicker
          allowClear
          lang={lang}
          modeTheme={mode}
          theme={theme}
          value={selectedDate}
          onChange={(value) => setSelectedDate(value ?? undefined)}
          input={<input className={styles.input} placeholder={placeholders[lang]} />}
          closeWhenSelectADay
        />

        <p className={styles.selection}>
          {formattedValue ? `${selectionLabels[lang]}${formattedValue}` : emptyMessages[lang]}
        </p>
      </div>
    </div>
  );
}
